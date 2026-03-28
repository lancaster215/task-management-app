import React, { useState } from 'react';
import Box from '@mui/material/Box';
import AddNewAssigneeModal, { AssigneeFormData } from './modal/addNewAssignee';
import TabPanel from './tab_panel';
import SideDrawer from './drawer';
import AssigneeTable from './modal/assigneeTableModal';
import handleRemoveAssignee from '@/api/assignee/handleRemoveAssignee';
import handleGetAssignees from '@/api/assignee/handleGetAssignees';
import { useAddAssignee } from './hooks/api/assignee/useAddAssignee';
import { useQuery } from '@tanstack/react-query';

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
  const { mutateAsync: addAssignee, isPending } = useAddAssignee();
  const { data: assignees, isLoading } = useQuery({
    queryKey: ['assignees'],
    queryFn: handleGetAssignees
  });

  const [openAddNewAccountModal, setOpenAddNewAccountModal] = useState<boolean>(false);
  const [openSidebar, setOpenSideBar] = useState(false);
  const [openAddNewAssignee, setOpenAddNewAssignee] = useState<boolean>(false);

  const handleAddNewAssigne = async (formData: AssigneeFormData) => {
    try {
      await addAssignee(formData);
      setOpenAddNewAccountModal(false);
    } catch (error) {
      // Error is already handled in the hook, but you can add UI toasts here
    }
  }

  const handleDelete = async (selected: string) => {
    await handleRemoveAssignee(selected)
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