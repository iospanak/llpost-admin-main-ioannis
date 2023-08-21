import React from 'react';

import axios from 'axios';
import getConfig from 'next/config';
import Router from 'next/router';
import {useToasts} from 'react-toast-notifications';

import {getLayout} from '../components/layouts/auth-layout';
import {authenticationService} from '../services/authentication.service';

import { LockClosedIcon } from '@heroicons/react/solid';

const {publicRuntimeConfig} = getConfig();

const Login = () => {
	const {addToast} = useToasts();

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const body = {
			email: e.currentTarget.email.value,
			password: e.currentTarget.password.value
		};
		try {
			const response = await axios.post(`http://localhost:3000/auth/login`, body);
			if (response.status === 200) {
				authenticationService.saveToken(response.data.token.accessToken);
				await Router.push('/');
			}
		} catch (error) {
			console.error('An unexpected error happened occurred:', error);
			addToast(error.message, {appearance: 'error'});
		}
	}

	return (
		<div className='min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
			<div className='sm:mx-auto sm:w-full sm:max-w-md text-center'>
				<img src='/assets/images/logo.svg' alt='' className='mx-auto w-48 mb-10' />
				<h4 className='mt-6 text-center'>Sign in to your account</h4>
			</div>
			<div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
				<div className='px-4 font-inter'>
					<form className='space-y-6' onSubmit={(e) => handleSubmit(e)}>
						<div>
							<div>
								<label htmlFor='email' className='hidden text-sm font-medium text-gray-700'>
									Email address
								</label>
								<div>
									<input
										id='email'
										name='email'
										type='email'
										autoComplete='email'
										placeholder='Email address'
										required
										className='appearance-none block w-full px-3 py-2 border-t border-x border-b border-gray-300 rounded-t-md placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
									/>
								</div>
							</div>
							<div>
								<label htmlFor='password' className='hidden text-sm font-medium text-gray-700'>
									Password
								</label>
								<div>
									<input
										id='password'
										name='password'
										type='password'
										autoComplete='current-password'
										placeholder='Password'
										required
										className='appearance-none block w-full px-3 py-2 border-t border-x border-t-0 border-gray-300 rounded-b-md placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
									/>
								</div>
							</div>
						</div>

						<div className='flex items-center justify-between'>

								<div className="w-1/2 flex items-center">
									<input
										id='remember_me'
										name='remember_me'
										type='checkbox'
										className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded'
									/>
									<label htmlFor='remember_me' className='ml-2 block text-sm text-gray-900'>
										Remember me
									</label>
								</div>
								<div className="w-auto">
									<a className="link" href="#">Forgot your password?</a>
								</div>

						</div>
						<div>
							<button
								type='submit'
								className='w-full relative flex justify-center py-2 px-4 border border-primary-1 rounded-md shadow-sm text-sm font-medium text-white bg-primary-1 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
							>
								<LockClosedIcon className='h-5 float-left w-5 text-blue-500 absolute left-4'/> Sign in
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};
Login.getLayout = getLayout;

export default Login;
