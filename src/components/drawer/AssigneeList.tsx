import React from 'react';
import { Assignee } from "@/pages/dashboard";
import { Avatar, Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useRouter } from "next/router";
import PersonAdd from '@mui/icons-material/PersonAdd';


interface AssigneeListProps {
    fromReduxFromAssignee: Assignee,
    openAddNewAccountModal: boolean,
    setOpenAddNewAccountModal: (open: boolean) => void,
}


function AssigneeList({ fromReduxFromAssignee, setOpenAddNewAccountModal, openAddNewAccountModal }: AssigneeListProps) {
    const router = useRouter();
    const sideBarItems = [
        {
            title: fromReduxFromAssignee.name ? fromReduxFromAssignee.name : "Select Assigee",
            link: fromReduxFromAssignee.name ? () => { } : () => router.push("/assignee"),
            withAvatar: true,
            avatar: <Avatar />,
        },

        {
            title: 'Add assignee',
            link: () => setOpenAddNewAccountModal(!openAddNewAccountModal),
            withAvatar: true,
            avatar: <PersonAdd fontSize="small" />
        },
    ]
    return (
        <Box sx={{ width: 250 }} role="presentation">
            <List>
                {sideBarItems.map((text, index) => (
                    <ListItem key={text.title} disablePadding>
                        <ListItemButton onClick={text.link}>
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