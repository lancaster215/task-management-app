import React, { Suspense, useState } from 'react';
import Box from '@mui/material/Box';
import TabPanel from '../tab_panel';
import SideDrawer from '../drawer';
import Loading from '../loading';
import { SIDEBAR_WIDTH } from '../../constants/sidebarItems';
import { useGetTasks } from '@/hooks/api/tasks/useGetTasks';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

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


export default function Dashboard() {
  const isClient = typeof window !== "undefined";
  const [openAddNewAccountModal, setOpenAddNewAccountModal] = useState<boolean>(false);
  const [openSidebar, setOpenSideBar] = useState(false);
  const [openAssigneeTable, setOpenAssigneeTable] = useState<boolean>(false);
  const userIdFromLocalStorage = isClient && localStorage.getItem('userId');
  const { user } = useSelector<RootState, RootState['user']>((state) => state.user)
  const { data: tasks, isLoading: isLoadingTasks } = useGetTasks(user.userId || String(userIdFromLocalStorage))

  return (
    <Suspense fallback={<Loading />}>
      <Box
        sx={{
          width: '100%',
          padding: '20px',
          justifyContent: 'center',
          display: 'flex',
          bgcolor: 'background.default',
        }}
      >

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
            openAssigneeTable={openAssigneeTable}
            setOpenAssigneeTable={setOpenAssigneeTable}
          />

          {/* TABS */}
          {/* <TabPanel
            sidebarWidth={SIDEBAR_WIDTH}
            openSidebar={openSidebar}
          /> */}
        </Box>
      </Box>
    </Suspense>
  )
}