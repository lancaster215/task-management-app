import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DashboardProps } from '@/pages/dashboard';
import { v4 as uuidv4 } from "uuid";
import { RootState } from "@/store";
import AddNewAssigneeModal, { AssigneeFormData } from './modal/addNewAssignee';
import { useDispatch, useSelector } from 'react-redux';
import { setAssignee, setAssignees } from '@/store/taskSlice';
import { BASE_URL } from './constants/baseURL';
import TabPanel from './tab_panel';
import SideDrawer from './drawer';
import AssigneeTable from './modal/selectAssignee';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export interface User {
  name: string,
  id: string
}


export function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const SIDEBAR_WIDTH = 280;


export default function Dashboard() {
  const { assignees } = useSelector((state: RootState) => state.task);

  const dispatch = useDispatch();
  const [openAddNewAccountModal, setOpenAddNewAccountModal] = useState<boolean>(false);
  const [openSidebar, setOpenSideBar] = useState(false);
  const [openAddNewAssignee, setOpenAddNewAssignee] = useState<boolean>(false);

  useEffect(() => { }, [assignees])

  const handleAddNewAssigne = async (formData: AssigneeFormData) => {
    try {
      const payload = {
        id: uuidv4(),
        name: formData.name,
      }
      const addUserResponse = await fetch(`${BASE_URL}/api/addUser`, {
        method: 'POST',
        headers: {
          "Content-Type": 'application/json'
        },
        body: JSON.stringify(payload)
      })

      const addUserData = await addUserResponse.json();

      if (addUserData.user) {
        dispatch(setAssignee(addUserData.user));
      }
      const userResponse = await fetch(`${BASE_URL}/api/users`).then(r => r.json());
      dispatch(setAssignees(userResponse))
    } catch (err) {
      console.error(`Error in adding user: ${err}`)
    }
    setOpenAddNewAccountModal(!openAddNewAccountModal)
  }

  const handleDelete = async (selected: string) => {
    try {
      const res = await fetch(`${BASE_URL}/api/removeUser`, {
        method: 'POST',
        headers: {
          "Content-Type": 'application/json'
        },
        body: JSON.stringify({ selected }) //array
      })

      if (res.ok) {
        const newUser = await fetch(`${BASE_URL}/api/users`).then(r => r.json());
        const newAssignee = newUser.filter((task: User) => task.id === selected)
        dispatch(setAssignees(newAssignee))
      }
    } catch (err) {
      console.error(`Error in removing task: ${err}`)
    }
  }

  return (
    <Box
      sx={{
        width: '100%',
        padding: '20px',
        justifyContent: 'center',
        display: 'flex',
        bgcolor: 'background.default',
      }}
    >
      <AddNewAssigneeModal
        openAddNewAccountModal={openAddNewAccountModal}
        setOpenAddNewAccountModal={setOpenAddNewAccountModal}
        handleAddNewAssigne={handleAddNewAssigne}
        onNoButton={() => setOpenAddNewAccountModal(!openAddNewAccountModal)}
      />

      {assignees && assignees.length > 0 &&
        <AssigneeTable
          openAddNewAssignee={openAddNewAssignee}
          setOpenAddNewAssignee={setOpenAddNewAssignee}
          handleDelete={handleDelete}
        />
      }

      <Box
        sx={{
          width: '100%',
          backgroundColor: 'palette.background.default',
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '8px',
          minHeight: '80vh'
        }}
      >
        {/* SIDE DRAWER */}
        <SideDrawer
          setOpenAddNewAccountModal={setOpenAddNewAccountModal}
          openAddNewAccountModal={openAddNewAccountModal}
          sidebarWidth={SIDEBAR_WIDTH}
          openSidebar={openSidebar}
          setOpenSideBar={setOpenSideBar}
          openAddNewAssignee={openAddNewAssignee}
          setOpenAddNewAssignee={setOpenAddNewAssignee}
        />

        {/* TABS */}
        <TabPanel
          sidebarWidth={SIDEBAR_WIDTH}
          openSidebar={openSidebar}
        />
      </Box>
    </Box>
  )
}