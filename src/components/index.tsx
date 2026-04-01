import React, { Suspense, useState } from 'react';
import Box from '@mui/material/Box';
import AddNewAssigneeModal, { AssigneeFormData } from './modal/addNewAssignee';
import TabPanel from './tab_panel';
import SideDrawer from './drawer';
import AssigneeTable from './modal/assigneeTableModal';
import handleGetAssignees from '@/api/assignee/handleGetAssignees';
import { useAddAssignee } from './hooks/api/assignee/useAddAssignee';
import { useQuery } from '@tanstack/react-query';
import Loading from './loading';
import { useRemoveAssignee } from './hooks/api/assignee/useRemoveAssignee';
import { SIDEBAR_WIDTH } from './constants/sidebarItems';
import { setAssignee } from '@/store/assigneeSlice';
import { useDispatch } from 'react-redux';

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
  const dispatch = useDispatch();
  const { mutateAsync: addAssignee, isPending: isPendingAddingAssignee } = useAddAssignee();
  const { mutateAsync: removeAssignee, isPending: isPendingDeletingAssigne } = useRemoveAssignee();
  const { data: assignees, isLoading, isError } = useQuery({
    queryKey: ['assignees'],
    queryFn: handleGetAssignees
  });

  const [openAddNewAccountModal, setOpenAddNewAccountModal] = useState<boolean>(false);
  const [openSidebar, setOpenSideBar] = useState(false);
  const [openAssigneeTable, setOpenAssigneeTable] = useState<boolean>(false);

  const handleAddNewAssigne = async (formData: AssigneeFormData) => {
    try {
      await addAssignee(formData);
      setOpenAddNewAccountModal(false);
      dispatch(setAssignee(formData));
    } catch (error) {
      console.log('handleAddNewAssigne', error)
    }
  }

  const handleDelete = async (selected: string) => {
    try {
      await removeAssignee(selected);
      dispatch(setAssignee({ name: '', id: '' }))
    } catch (error) {
    }
  }

  if (isPendingAddingAssignee || isPendingDeletingAssigne) {
    return (
      <Loading />
    )
  }

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
        <AddNewAssigneeModal
          openAddNewAccountModal={openAddNewAccountModal}
          setOpenAddNewAccountModal={setOpenAddNewAccountModal}
          handleAddNewAssigne={handleAddNewAssigne}
          onNoButton={() => setOpenAddNewAccountModal(!openAddNewAccountModal)}
        />

        {assignees && assignees.length > 0 &&
          <AssigneeTable
            openAssigneeTable={openAssigneeTable}
            setOpenAssigneeTable={setOpenAssigneeTable}
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
            openAssigneeTable={openAssigneeTable}
            setOpenAssigneeTable={setOpenAssigneeTable}
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