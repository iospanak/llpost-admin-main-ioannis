import React, {Fragment, useState} from 'react';

import {Dialog, Transition} from '@headlessui/react';
import {
	HomeIcon,
	LogoutIcon,
	MenuIcon,
	TruckIcon,
	UsersIcon,
	XIcon,
	ShoppingCartIcon,
	BriefcaseIcon,
	CogIcon,
	CurrencyDollarIcon
} from '@heroicons/react/outline';
import Link from 'next/link';
import Router, {useRouter} from 'next/router';
import {ToastProvider} from 'react-toast-notifications';

import {useUser} from '../../lib/hooks';
import {classNames} from '../../lib/utils';
import {authenticationService} from '../../services/authentication.service';

const navigation = [

	{name: 'Dashboard', href: '/', icon: HomeIcon},
	{name: 'Utilizatori', href: '/users', icon: UsersIcon},
	{name: 'Clienti', href: '/customers', icon: BriefcaseIcon},
	{name: 'Poșta Română', href: '/posta-romana', icon: TruckIcon},
	{name: 'LLPost', href: '/llpost', icon: TruckIcon},
	{name: 'Livrari', href: '/deliveries', icon: ShoppingCartIcon},
	{name: 'Facturi', href: '/invoices', icon: CurrencyDollarIcon},
	{name: 'Setari', href: '/registry', icon: CogIcon},

];

// @ts-ignore
const SiteLayout = ({children}) => {
	useUser();
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const router = useRouter();
	const isLinkActive = (link: string): boolean => (link !== '/' ? router.pathname.startsWith(link) : link == router.pathname);
	const logout = async () => {
		authenticationService.removeToken();
		await Router.push('/login');
	};

	return (
		<div className='h-screen flex overflow-hidden bg-white'>
			<Transition.Root show={sidebarOpen} as={Fragment}>
				<Dialog
					as='div'
					static
					className='fixed inset-0 flex z-40 md:hidden'
					open={sidebarOpen}
					onClose={setSidebarOpen}
				>
					<Transition.Child
						as={Fragment}
						enter='transition-opacity ease-linear duration-300'
						enterFrom='opacity-0'
						enterTo='opacity-100'
						leave='transition-opacity ease-linear duration-300'
						leaveFrom='opacity-100'
						leaveTo='opacity-0'
					>
						<Dialog.Overlay className='fixed inset-0 bg-gray-600 bg-opacity-75' />
					</Transition.Child>
					<Transition.Child
						as={Fragment}
						enter='transition ease-in-out duration-300 transform'
						enterFrom='-translate-x-full'
						enterTo='translate-x-0'
						leave='transition ease-in-out duration-300 transform'
						leaveFrom='translate-x-0'
						leaveTo='-translate-x-full'
					>
						<div className='relative flex-1 flex flex-col max-w-xs w-full bg-white'>
							<Transition.Child
								as={Fragment}
								enter='ease-in-out duration-300'
								enterFrom='opacity-0'
								enterTo='opacity-100'
								leave='ease-in-out duration-300'
								leaveFrom='opacity-100'
								leaveTo='opacity-0'
							>
								<div className='absolute top-0 right-0 -mr-12 pt-2'>
									<button
										className='ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
										onClick={() => setSidebarOpen(false)}
									>
										<span className='sr-only'>Close sidebar</span>
										<XIcon className='h-6 w-6 text-white' aria-hidden='true' />
									</button>
								</div>
							</Transition.Child>
							<div className='flex-1 h-0 pt-5 pb-4 overflow-y-auto'>
								<div className='flex-shrink-0 flex items-center px-4'>
									<img
										className='h-8 w-auto'
										src='/assets/images/logo.svg'
										alt='Logo'
									/>
								</div>
								<nav className='mt-5 px-2 space-y-1'>
									{navigation.map((item) => (
										<a
											key={item.name}
											href={item.href}
											className={classNames(
												isLinkActive(item.href)
													? 'bg-indigo-600 text-gray-900'
													: 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
												'group flex items-center px-2 py-2 text-base font-medium rounded-md'
											)}
										>
											<item.icon
												className={classNames(
													isLinkActive(item.href) ? 'text-white' : 'text-gray-400 group-hover:text-gray-500',
													'mr-4 flex-shrink-0 h-6 w-6'
												)}
												aria-hidden='true'
											/>
											{item.name}
										</a>
									))}
								</nav>
							</div>
							<div className='flex-shrink-0 flex border-t border-gray-200 p-4'>
								<div className='flex-shrink-0 w-full group block'>
									<div className='flex items-center'>
										<div>
											<LogoutIcon className='text-gray-400 w-6 h-6' />
										</div>
										<div className='ml-3'>

											<p onClick={logout} className='font-semibold text-primary-1 group-hover:text-gray-700 cursor-pointer'>Logout</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</Transition.Child>
					<div className='flex-shrink-0 w-14'>{/* Force sidebar to shrink to fit close icon */}</div>
				</Dialog>
			</Transition.Root>

			{/* Static sidebar for desktop */}
			<div className='hidden md:flex md:flex-shrink-0'>
				<div className='flex flex-col w-64'>
					{/* Sidebar component, swap this element with another sidebar if you like */}
					<div className='flex flex-col h-0 flex-1 border-r border-gray-200 bg-gray-200'>
						<div className='flex-1 flex flex-col pt-5 pb-4 overflow-y-auto'>
							<div className='flex items-center flex-shrink-0 px-4'>
								<img
									className='w-32'
									src='/assets/images/logo.svg'
									alt='Logo'
								/>
							</div>
							<nav className='mt-5 flex-1 space-y-1'>
								{navigation.map((item) => (
									<Link
										key={item.name}
										href={item.href}
									>
										<div
											className={classNames(
												isLinkActive(item.href) ? 'bg-primary-3 text-primary-1' : 'text-accent-1 hover:opacity-80',
												'group flex items-center px-4 py-2 text-sm font-medium cursor-pointer font-semibold relative'
											)}
										>
											{isLinkActive(item.href) && <div className='absolute top-0 bottom-0 left-0 w-1 bg-primary-1'></div>}
											<item.icon
												className={classNames(
													isLinkActive(item.href) ? 'text-primary-1' : 'text-gray-400',
													'mr-3 flex-shrink-0 h-6 w-6'
												)}
												aria-hidden='true'
											/>
											{item.name}
										</div>
									</Link>
								))}
							</nav>
						</div>
						<div className='flex-shrink-0 flex border-t border-gray-200 p-4'>
							<div className='flex-shrink-0 w-full group block'>
								<div className='flex items-center'>
									<div>
										<LogoutIcon className='text-gray-400 w-6 h-6' />
									</div>
									<div className='ml-3'>

										<p onClick={logout} className='font-semibold text-primary-1 group-hover:text-gray-700 cursor-pointer'>Iesire</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='flex flex-col w-0 flex-1 overflow-hidden'>
				<div className='md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3'>
					<button
						className='-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'
						onClick={() => setSidebarOpen(true)}
					>
						<span className='sr-only'>Deschide</span>
						<MenuIcon className='h-6 w-6' aria-hidden='true' />
					</button>
				</div>
				<main className='flex-1 relative z-0 overflow-y-auto focus:outline-none px-4 sm:px-8 lg:px-16 bg-gray-100'>

					<div className='flex justify-end mt-6 mb-5 space-x-6'>

					</div>
					<ToastProvider autoDismiss autoDismissTimeout={3000}>
						{children}
					</ToastProvider>
				</main>
			</div>
		</div>
	);
};

export const getLayout = (page: any) => <SiteLayout>{page}</SiteLayout>;

export default SiteLayout;
