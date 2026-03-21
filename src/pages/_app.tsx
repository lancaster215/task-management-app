import React from 'react';
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from 'react-redux';
import { store } from "../store";
import { ThemeProvider } from '@emotion/react';
import { theme } from '@/styles/theme';
import { CssBaseline } from '@mui/material';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<ThemeProvider theme={theme}>
			<Provider store={store}>
				<CssBaseline />
				<Component {...pageProps} />
			</Provider>
		</ThemeProvider>
	)
}
