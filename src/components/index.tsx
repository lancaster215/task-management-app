import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { DashboardProps } from '@/pages/dashboard';
import { v4 as uuidv4 } from "uuid";
import { RootState } from "@/store";
import AddNewAccountModal from './modal/addNewAccount';
import { useDispatch, useSelector } from 'react-redux';
import { setAssignee } from '@/store/taskSlice';
import { BASE_URL } from './constants/baseURL';
import TabPanel from './tab_panel';
import SideDrawer from './drawer';

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


export default function Dashboard({ task: task, assignee: preRenderedAssignee }: DashboardProps) {
  const { assignee: fromReduxFromAssignee } = useSelector<RootState, RootState['task']>((state) => state.task);
  const dispatch = useDispatch();
  const [openAddNewAccountModal, setOpenAddNewAccountModal] = useState<boolean>(false);
  const [newUser, setNewUser] = useState<User>({
    id: '',
    name: '',
  })
  const [openSidebar, setOpenSideBar] = useState(false);

  const handleOnSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    try {
      const payload = {
        id: uuidv4(),
        name: newUser.name,
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
    } catch (err) {
      console.error(`Error in adding user: ${err}`)
    }
    setOpenAddNewAccountModal(!openAddNewAccountModal)
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
      <AddNewAccountModal
        openAddNewAccountModal={openAddNewAccountModal}
        setOpenAddNewAccountModal={setOpenAddNewAccountModal}
        handleOnSubmit={handleOnSubmit}
        onNoButton={() => setOpenAddNewAccountModal(!openAddNewAccountModal)}
        newUser={newUser}
        setNewUser={setNewUser}
      />

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
          fromReduxFromAssignee={fromReduxFromAssignee}
          setOpenAddNewAccountModal={setOpenAddNewAccountModal}
          openAddNewAccountModal={openAddNewAccountModal}
          sidebarWidth={SIDEBAR_WIDTH}
          openSidebar={openSidebar}
          setOpenSideBar={setOpenSideBar}
        />

        {/* TABS */}
        <TabPanel
          task={task}
          assignee={preRenderedAssignee}
          sidebarWidth={SIDEBAR_WIDTH}
          openSidebar={openSidebar}
        />
      </Box>
    </Box>
  )
}