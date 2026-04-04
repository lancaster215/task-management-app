import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, IconButton, InputAdornment, OutlinedInput, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';
import styles from "../styles";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useRegister } from '../../hooks/api/authorization/useRegister';
import { theme } from '@/styles/theme';

export const registerSchema = z.object({
    username: z.string().min(1, "Username is required"),
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    password: z.string().min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string().min(8, { message: "Confirm password must be at least 8 characters" }),
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
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

export type RegisterFormData = z.infer<typeof registerSchema>;

interface RegisterProps {
    setIsNewUser: (data: string) => void
}

export default function Register({ setIsNewUser }: RegisterProps) {
    const { control, handleSubmit, reset, formState: { errors } } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            username: '',
            firstName: '',
            lastName: '',
            password: '',
            confirmPassword: '',
        }
    });
    const [showPassword, setShowPassword] = useState({
        password: false,
        confirmPassword: false,
    });
    const [errorMessage, setErrorMessage] = useState<string>('')
    const { mutateAsync: register, isError, error } = useRegister()

    const onSubmit = async (data: RegisterFormData) => {
        // handleSubmitToAPI(data)
        try {
            const registerResponse = await register(data);
            if (registerResponse.success) {
                setIsNewUser('login')
            }
        } catch (err) {
            setErrorMessage(String(err))
        } finally {
            reset();
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
            {Boolean(errorMessage) &&
                <Typography
                    variant="h3"
                    sx={{
                        color: theme.palette.background.red
                    }}
                >
                    {errorMessage}
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
                        error={!!errors.username}
                        helperText={errors.username?.message}
                    />
                )}
            />
            <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="First Name"
                        fullWidth
                        error={!!errors.firstName}
                        helperText={errors.firstName?.message}
                    />
                )}
            />
            <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Last Name"
                        fullWidth
                        error={!!errors.lastName}
                        helperText={errors.lastName?.message}
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
                        type={showPassword.password ? 'text' : 'password'}
                        fullWidth
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label={
                                                showPassword.password
                                                    ? 'hide the password'
                                                    : 'display the password'
                                            }
                                            onClick={() =>
                                                setShowPassword((prev) => ({
                                                    ...prev,
                                                    password: !prev.password,
                                                }))
                                            }
                                            onMouseDown={(e) => e.preventDefault()}
                                            onMouseUp={(e) => e.preventDefault()}
                                            edge="end"
                                        >
                                            {showPassword.password ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />
                )}
            />
            <Controller
                name="confirmPassword"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Confirm password"
                        type={showPassword.confirmPassword ? 'text' : 'password'}
                        fullWidth
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword?.message}
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label={
                                                showPassword.confirmPassword
                                                    ? 'hide the password'
                                                    : 'display the password'
                                            }
                                            onClick={() =>
                                                setShowPassword((prev) => ({
                                                    ...prev,
                                                    confirmPassword: !prev.confirmPassword,
                                                }))
                                            }
                                            onMouseDown={(e) => e.preventDefault()}
                                            onMouseUp={(e) => e.preventDefault()}
                                            edge="end"
                                        >
                                            {showPassword.confirmPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />
                )}
            />
            <Button type="submit" variant="contained">Register</Button>
        </Box>
    )
}