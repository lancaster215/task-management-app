import React, { Suspense, useState } from 'react';
import Box from '@mui/material/Box';
import TabPanel from '../tab_panel';
import SideDrawer from '../drawer';
import Loading from '../loading';
import { SIDEBAR_WIDTH } from '../../constants/sidebarItems';

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
  const [openSidebar, setOpenSideBar] = useState(false);

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
            sidebarWidth={SIDEBAR_WIDTH}
            openSidebar={openSidebar}
            setOpenSideBar={setOpenSideBar}
          />

          {/* TABS */}
          <TabPanel
            sidebarWidth={SIDEBAR_WIDTH}
            openSidebar={openSidebar}
          />
        </Box>
      </Box>
    </Suspense>
  )
}