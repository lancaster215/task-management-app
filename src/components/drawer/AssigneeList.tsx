import React from 'react';
import { Avatar, Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import PersonAdd from '@mui/icons-material/PersonAdd';
import { useGetAssignees } from '../hooks/api/assignee/useGetAssignees';


interface AssigneeListProps {
    openAddNewAccountModal: boolean,
    setOpenAddNewAccountModal: (open: boolean) => void,
    openAddNewAssignee: boolean,
    setOpenAddNewAssignee: (open: boolean) => void,
}

function AssigneeList({
    setOpenAddNewAccountModal,
    openAddNewAccountModal,
    setOpenAddNewAssignee,
    openAddNewAssignee,
}: AssigneeListProps) {
    const { data: assignees, isLoading } = useGetAssignees()

    const sideBarItems = [
        {
            title: "Select Assigee",
            link: () => setOpenAddNewAssignee(!openAddNewAssignee),
            withAvatar: true,
            avatar: <Avatar />,
            disabled: isLoading ? false : assignees.length === 0
        },

        {
            title: 'Add assignee',
            link: () => setOpenAddNewAccountModal(!openAddNewAccountModal),
            withAvatar: true,
            avatar: <PersonAdd fontSize="small" />,
            disabled: false
        },
    ]
    return (
        <Box sx={{ width: 250 }} role="presentation">
            <List>
                {sideBarItems.map((text, index) => (
                    <ListItem key={text.title} disablePadding>
                        <ListItemButton onClick={text.link} disabled={text.disabled}>
                            {text.withAvatar &&
                                <ListItemIcon>
                                    {text.avatar}
                                </ListItemIcon>
                            }
                            <ListItemText primary={text.title}
                                sx={{
                                    '& .MuiListItemText-primary': {
                                        color: '#161b22',
                                    },
                                    // This also helps if you want to change the icon color to match
                                    '& .MuiListItemIcon-root': {
                                        color: '#161b22',
                                    }
                                }} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    )
}

export default AssigneeList