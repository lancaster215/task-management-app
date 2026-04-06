import { CircularProgress, Stack } from '@mui/material';
import React from 'react';
export default function Loading() {
    return (
        <Stack
            sx={{
                position: 'relative',
                height: '100vh',
                width: 'auto'
            }}
        >
            <Stack
                sx={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)'
                }}
            >
                <CircularProgress size="3rem" />
            </Stack>
        </Stack>
    )
}