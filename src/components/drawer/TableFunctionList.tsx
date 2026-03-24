import { Box, Button, Collapse, List, ListItem, ListItemButton, ListItemText, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { clearFilter, setFilter } from '@/store/taskSlice';
import { sideBarItems } from '../constants/sidebarItems';

function TableFunctionList() {
    const dispatch = useDispatch();
    const [openFilter, setOpenFilter] = useState<string | null>(null);
    const [dateFilter, setDateFilter] = useState({
        startDate: '',
        endDate: '',
    })

    const handleToggle = (title: string) => {
        setOpenFilter(openFilter === title ? null : title);
    };

    const handleDateFilter = (value: string, type: string) => {
        console.log(value, type, dateFilter)
        setDateFilter({
            ...dateFilter,
            [type]: value
        })
        dispatch(setFilter({ value, type }))
    }


    const handleFilter = (value: string, type: string) => {
        dispatch(setFilter({ value, type }))
    }

    return (
        <Box sx={{ width: 250 }} role="presentation">
            <List>
                {sideBarItems.map((item) => {
                    const openFilterBoolean = openFilter === item.title
                    return (
                        <React.Fragment key={item.title}>
                            <ListItem disablePadding>
                                <ListItemButton onClick={() => handleToggle(item.title)}>
                                    <ListItemText
                                        primary={item.title}
                                        sx={{ '& .MuiListItemText-primary': { color: '#161b22', fontWeight: 500 } }}
                                    />
                                    {openFilterBoolean ? <ExpandLess sx={{ color: '#161b22' }} /> : <ExpandMore sx={{ color: '#161b22' }} />}
                                </ListItemButton>
                            </ListItem>

                            <Collapse in={openFilterBoolean} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    {item.type === 'startDate' || item.type === 'endDate' ?
                                        <TextField
                                            type="date"
                                            value={dateFilter[item.type]}
                                            onChange={(e) => handleDateFilter(e.target.value, item.type)}
                                            sx={{
                                                color: 'black',
                                                '& .MuiSvgIcon-root': { color: 'black' },
                                                '& .MuiOutlinedInput-notchedOutline': { borderColor: 'black' },
                                                fontSize: "clamp(10px, 1.5vw, 16px)",
                                                input: { color: "black" },
                                                label: { color: "black" },
                                                margin: "0 1rem"
                                            }}
                                        />
                                        : item?.filterOptions?.map((option) => (
                                            <ListItemButton
                                                key={option.value}
                                                sx={{ pl: 4 }}
                                                onClick={() => handleFilter(option.value, item.type)}
                                            >
                                                <ListItemText
                                                    primary={option.label}
                                                    sx={{ '& .MuiListItemText-primary': { fontSize: '0.9rem', color: '#666' } }}
                                                />
                                            </ListItemButton>
                                        ))}
                                </List>
                            </Collapse>
                        </React.Fragment>
                    )
                })}
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '1rem' }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => dispatch(clearFilter())}
                        sx={{
                            fontSize: "clamp(8px, 1.5vw, 15px)",
                        }}
                    >
                        <Typography sx={{ color: 'black' }}>Clear Filter</Typography>
                    </Button>
                </Box>
            </List>
        </Box>
    )
}

export default TableFunctionList