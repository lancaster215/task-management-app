'use-client'

import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';
import styles from "../styles";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { theme } from '@/styles/theme';
import { useLogin } from '../hooks/api/authorization/useLogin';
import { useDispatch } from 'react-redux';
import { setUser } from '@/store/userSlice';
import { useRouter } from 'next/router';
export const loginSchema = z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(8, { message: "Password must be at least 8 characters" })
    // .max(20, { message: "Password must not exceed 20 characters" })
    // .refine((val) => /[A-Z]/.test(val), {
    //     message: "Password must contain at least one uppercase letter",
    // })
    // .refine((val) => /[a-z]/.test(val), {
    //     message: "Password must contain at least one lowercase letter",
    // })
    // .refine((val) => /[0-9]/.test(val), {
    //     message: "Password must contain at least one number",
    // })
    // .refine((val) => /[!@#$%^&*]/.test(val), {
    //     message: "Password must contain at least one special character",
    // }),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
    const router = useRouter()
    const dispatch = useDispatch();
    const { control, handleSubmit, reset, formState: { errors } } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: '',
            password: '',
        }
    });
    const { mutateAsync: login, isPending: loginPending, isError: loginError } = useLogin();
    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = async (data: LoginFormData) => {
        try {
            const dataLogin = await login(data);
            console.log(dataLogin, 'data login');
            if (dataLogin.success) {
                dispatch(setUser(dataLogin.user.username))
                router.push('/dashboard')
            }
        } catch (error) {
            console.log("Error logging in", error);
        }
    };

    return (
        <Box
            component="form"
            onSubmit={
                handleSubmit(
                    onSubmit,
                    (err) => console.log('FORM ERRORS', err)
                )
            }
            sx={styles.formBox}
        >
            {loginError &&
                <Typography
                    variant="h3"
                    sx={{
                        color: theme.palette.background.red
                    }}
                >
                    Error Logging in
                </Typography>
            }
            <Controller
                name="username"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Username"
                        fullWidth
                        error={!!errors.username || loginError}
                        helperText={errors.username?.message}
                    />
                )}
            />
            <Controller
                name="password"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        fullWidth
                        error={!!errors.password || loginError}
                        helperText={errors.password?.message}
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label={
                                                showPassword
                                                    ? 'hide the password'
                                                    : 'display the password'
                                            }
                                            onClick={() =>
                                                setShowPassword((prev) => !prev)
                                            }
                                            onMouseDown={(e) => e.preventDefault()}
                                            onMouseUp={(e) => e.preventDefault()}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />
                )}
            />
            <Button type="submit" variant="contained">Login</Button>
        </Box>
    )
}