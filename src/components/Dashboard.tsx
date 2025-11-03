import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Props } from '@/pages';
import TablePanel from './tab_panel/TablePanel';
import GraphPanel from './tab_panel/graphs';
import { Avatar,  Divider, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Tooltip } from '@mui/material';
import PersonAdd from '@mui/icons-material/PersonAdd';
import { v4 as uuidv4 } from "uuid";
import { RootState } from "@/store";
import AddNewAccountModal from './modal/addNewAccount';
import { useDispatch, useSelector } from 'react-redux';
import { setAssignee } from '@/store/taskSlice';
import { useRouter } from 'next/router';
import { BASE_URL } from './constants/baseURL';

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

export function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Dashboard({task: task, assignee: preRenderedAssignee}: Props) {
  const { assignee } = useSelector<RootState, RootState['task']>((state) => state.task);
  const dispatch = useDispatch();
  const router = useRouter();
  const [openAddNewAccountModal, setOpenAddNewAccountModal] = useState<boolean>(false);
  const [value, setValue] = useState<number>(0);
  const [newUser, setNewUser] = useState<User>({
    id: '',
    name: '',
  })
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleClickAnchor = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
    } catch(err) {
        console.error(`Error in adding user: ${err}`)
    }
    setOpenAddNewAccountModal(!openAddNewAccountModal)
  }

  return (
    <Box sx={{ width: '100%', justifyContent: 'center', display: 'flex' }}>
      <AddNewAccountModal
        openAddNewAccountModal={openAddNewAccountModal}
        setOpenAddNewAccountModal={setOpenAddNewAccountModal}
        handleOnSubmit={handleOnSubmit}
        onNoButton={() => setOpenAddNewAccountModal(!openAddNewAccountModal)}
        newUser={newUser}
        setNewUser={setNewUser}
      />
      <Box sx={{width: '15%'}}/>
      <Box sx={{width: '70%', backgroundColor: '#0d1117'}}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', justifyContent: 'center', display: 'flex' }}>
          <Tabs value={value} onChange={handleChange} aria-label="tabs">
            <Tab label="Table" {...a11yProps(0)} sx={{color: 'white'}}/>
            <Tab label="Kanban" {...a11yProps(1)} sx={{color: 'white'}} />
            <Tab label="Graphs" {...a11yProps(2)} sx={{color: 'white'}} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <TablePanel task={task} assignee={preRenderedAssignee ?? assignee}/>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          Item Two
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <GraphPanel />
        </CustomTabPanel>
      </Box>
      <Box sx={{width: '15%'}}>
        <Tooltip title="All Users">
          <IconButton
            onClick={handleClickAnchor}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose}>
          <Avatar /> <ListItemText>{assignee.name}</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => router.push("/assignee")}>
          <ListItemText>All Users</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => setOpenAddNewAccountModal(!openAddNewAccountModal)}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add assignee
        </MenuItem>
      </Menu>
    </Box>
  )
}