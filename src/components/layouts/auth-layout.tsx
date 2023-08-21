import React from 'react';
import {ToastProvider} from 'react-toast-notifications';

// @ts-ignore
const AuthLayout = ({children}) => {
	return (
		<>
			<header>
			</header>
			<ToastProvider>
				<div>{children}</div>
			</ToastProvider>
		</>
	);
};

export const getLayout = (page: any) => <AuthLayout>{page}</AuthLayout>;

export default AuthLayout;
