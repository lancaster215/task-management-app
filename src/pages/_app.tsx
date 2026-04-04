import React from 'react';
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from 'react-redux';
import { store } from "../store";
import { ThemeProvider } from '@emotion/react';
import { theme } from '@/styles/theme';
import { CssBaseline } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider theme={theme}>
				<Provider store={store}>
					<CssBaseline />
					<Component {...pageProps} />
				</Provider>
			</ThemeProvider>
		</QueryClientProvider>
	)
}
