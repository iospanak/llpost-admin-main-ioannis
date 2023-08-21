import React, {useEffect, useState} from 'react';

import {ChevronLeftIcon, ChevronRightIcon, SearchIcon} from '@heroicons/react/solid';
import Link from 'next/link';
import {useRouter} from 'next/router';

import ColumnHeader from '../components/column-header';
import {getLayout} from '../components/layouts/site-layout';
import {apiService, decodeGetParams, encodeGetParams} from '../services/api.service';

const Customers = () => {
	const defaultPagination = {
		load: false,
		page: 1,
		take: 10,
		q: '',
		order: 'ASC',
		orderBy: ''
	};
	const [customers, setCustomers] = useState([]);
	const {push, query} = useRouter();
	const [pagination, setPagination] = useState(defaultPagination);
	const [hasPrev, setHasPrev] = useState(false);
	const [hasNext, setHasNext] = useState(false);
	const [pages, setPages] = useState(0);
	const [searchTerm, setSearchTerm] = useState('');

	const setPage = (p: number) => {
		pagination.page = p;
		push({
			pathname: '/customers/',
			query: encodeGetParams(pagination,'c_')
		});
	};
	const getCustomers = async () => {
		setHasPrev(false);
		setHasNext(false);
		const response = await apiService.page('/customers/', pagination);
		if (response) {
			setCustomers(response.data);
			setHasPrev(response.meta.hasPreviousPage);
			setHasNext(response.meta.hasNextPage);
			setPages(response.meta.pageCount);
		}
	};
	useEffect(() => {
		setPagination({...defaultPagination, ...decodeGetParams(query,'c_'), load: true});
	}, [query]);

	useEffect(() => {
		if (pagination.load) {
			setSearchTerm(pagination.q);
			getCustomers().then(() => {
			});
		}
	}, [pagination]);

	const handleKeyDown = (e: any) => {
		if (e.key === 'Enter' && e.target) {
			pagination.q = e.target.value;
			setPage(1);
		}
	};

	const orderBy = (column: string) => {
		pagination.orderBy = column;
		pagination.order = pagination.order === 'ASC' ? 'DESC' : 'ASC';
		setPage(1);
	};

	return (
		<div>
			<div className='bg-white overflow-hidden rounded-lg border border-gray-300'>
				<div className='flex flex-wrap justify-between mt-8 mb-10'>
					<div className='w-auto px-6'>
						<Link href='/customers/new'>
							<button type={'button'} className='block py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-1 hover:bg-accent-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600'>
								+
							</button>
						</Link>
					</div>
					<div className='w-full max-w-2xl px-6'>
						<div className='relative flex items-stretch flex-grow focus-within:z-10  mb-3'>
							<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-customers-none'>
								<SearchIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
							</div>
							<input
								type='text'
								onKeyDown={(e) => handleKeyDown(e)}
								onChange={(e) => setSearchTerm(e.target.value)}
								value={searchTerm}
								className='focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-md pl-10 sm:text-sm border-gray-300'
								placeholder='Search...'
							/>
						</div>
					</div>
				</div>
				<div className='flex flex-col'>
					<div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
						<div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
							<div className=''>
								<table className='min-w-full divide-y divide-gray-200'>
									<thead className='bg-gray-200'>
									<tr>
										<ColumnHeader
											onChange={orderBy}
											orderBy='customer.name'
											pagination={pagination}
											className='px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider'
										>
											Nume
										</ColumnHeader>
										<th scope='col' className='relative px-6 py-3'>
											<span className='sr-only'>Edit</span>
										</th>
									</tr>
									</thead>
									<tbody className='bg-white divide-y divide-gray-200'>
									{customers.map((customer: any) => (
										<tr key={customer.id}>
											<td className='px-6 py-4  text-sm font-medium text-gray-900'>

												{customer.name}

											</td>

											<td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
												<Link href={`/customers/${customer.id}`}>
													<div className='text-indigo-600 hover:text-indigo-900 cursor-pointer'> Edit</div>
												</Link>
											</td>
										</tr>
									))}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
			<nav
				className='py-3 flex items-center justify-between'
				aria-label='Pagination'
			>
				<div className='flex-1 flex justify-between items-center'>
					<div>
						<p className='text-sm text-gray-700'>
						<span className='font-medium'>
						Pagina{' '}<span className='font-semibold'>{pagination.page}</span> din <span className='font-semibold'>{pages}</span>
						</span>
						</p>
					</div>
					<div>
						<button
							disabled={!hasPrev}
							onClick={() => setPage(+pagination.page - 1)}
							className='relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-semibold shadow-sm rounded-md text-gray-700 bg-white hover:bg-gray-50 cursor-pointer'
						>
							<ChevronLeftIcon className='h-5 w-5 text-gray-400' />
						</button>
						<button
							disabled={!hasNext}
							onClick={() => setPage(+pagination.page + 1)}
							className='ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-semibold shadow-sm rounded-md text-gray-700 bg-white hover:bg-gray-50 cursor-pointer'
						>
							<ChevronRightIcon className='h-5 w-5 text-gray-400' />
						</button>
					</div>
				</div>
			</nav>
		</div>
	);
};
Customers.getLayout = getLayout;

export function getServerSideProps({query = {page: 1, q: ''}}) {
	const {page = 1, q = ''} = query;
	return {props: {page, q}};
}

export default Customers;
