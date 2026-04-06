import Login from '@/components/login';
import Register from '@/components/register';
import { theme } from '@/styles/theme';
import { Stack, Box, ToggleButton, ToggleButtonGroup } from '@mui/material';
import React, { useState } from 'react';

const LoginPage: React.FC = () => {
    const [isNewUser, setIsNewUser] = useState<'login' | 'register' | string>('login');

    const handleToggle = (
        event: React.MouseEvent<HTMLElement>,
        authorizeState: string,
    ) => {
        setIsNewUser(authorizeState);
    }
    return (
        <Box
            sx={{
                height: '100vh',
                width: 'auto',
                display: 'block',
                position: 'relative',
            }}
        >
            <Stack
                sx={{
                    position: 'absolute',
                    width: '100%',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-25%, -50%)',
                }}
            >
                {
                    isNewUser === 'login' ?
                        <Login /> :
                        <Register setIsNewUser={setIsNewUser} />
                }
                <ToggleButtonGroup
                    color="primary"
                    value={isNewUser}
                    exclusive
                    onChange={handleToggle}
                    aria-label="authorization"
                    sx={{
                        width: '50%',
                        justifyContent: 'center',
                        padding: '10px',
                    }}
                >
                    <ToggleButton value="login" sx={{ color: theme.palette.background.default }}>Login</ToggleButton>
                    <ToggleButton value="register" sx={{ color: theme.palette.background.default }}>Register</ToggleButton>
                </ToggleButtonGroup>
            </Stack>
        </Box>
    )
}

export default LoginPage