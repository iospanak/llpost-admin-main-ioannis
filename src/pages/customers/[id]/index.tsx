import React, { FormEventHandler, useEffect, useState } from 'react';

import 'react-quill/dist/quill.snow.css';
import { useRouter } from 'next/router';
import { useToasts } from 'react-toast-notifications';
import { getLayout } from '../../../components/layouts/site-layout';
import { apiService } from '../../../services/api.service';
import { DeliveriesList } from '../../../components/deliveries-list';
import { LocationsList } from '../../../components/locations-list';
import Link from "next/link";

const Customer = ({id}: { id: string }) => {
	const {addToast} = useToasts();
	const isNew = id === 'new';
	const router = useRouter();
	const initialFormData = Object.freeze({
		name: '',
		discount: 0,
		deliveryTime: '16:00',
		roReg: '',
		roCui: '',
		address: ''
	});

	const [formData, updateFormData] = useState(initialFormData);
	//const [deliveries, setDeliveries] = useState([]);

	const getCustomer = async () => updateFormData(await apiService.get(`/customers/${id}`));
	// const getLocations = async () => setLocations(await apiService.get(`/locations/user/${id}`));
	//const getDeliveries = async () => setDeliveries(await apiService.get(`/deliveries/user/${id}`));

	useEffect(() => {
		//	getLocations().then(() => { });
		//	getDeliveries().then(() => { });

		if (isNew) {
			updateFormData(initialFormData);
		} else {
			getCustomer().then(() => {
			});

		}
	}, [router]);

	const handleChange = (e: { target: { name: string, value: string | number, type: string } }) => {
		let {name, value, type} = e.target;
		if (type == 'number') {
			value = +value
		}
		updateFormData({
			...formData,
			[name]: value
		});
	};

	const submit: FormEventHandler = async (e) => {
		e.preventDefault();
		if (isNew) {
			await apiService.post(`/customers`, formData)
				.catch(() => {
					addToast('Update error', {appearance: 'error'});
				})
				.then((r) => {
					addToast('Customer created successfully', {appearance: 'success'});
					router.push({
						pathname: '/customers/[id]',
						query: {id: r.id}
					});
				});

		} else {
			await apiService.post(`/customers/${id}`, formData)
				.catch(() => {
					addToast('Update error', {appearance: 'error'});
				})
				.then(async () => {
					addToast('Customer updated successfully', {appearance: 'success'});
					await getCustomer();
				});
		}

	};
	return (
		<div>
			<form onSubmit={submit} className='space-y-8'>
				<div className='border-gray-300 border rounded-md bg-white p-4'>
					<div className='flex flex-wrap '>
							<label className='p-2 w-1/2 block text-sm font-medium text-gray-700 '>
								Nume
								<div className='mt-1'>
									<input
										onChange={handleChange}
										value={formData.name || ''}
										type='text'
										name='name'
										className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
										placeholder=''
									/>
								</div>
							</label>
							<label className='p-2 w-1/2 block text-sm font-medium text-gray-700 '>
								CUI
								<div className='mt-1'>
									<input
										onChange={handleChange}
										value={formData.roCui || ''}
										type='text'
										name='roCui'
										className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
										placeholder=''
									/>
								</div>
							</label>
							<label className='p-2 w-1/2 block text-sm font-medium text-gray-700'>
								Reg. Com.
								<div className='mt-1'>
									<input
										onChange={handleChange}
										value={formData.roReg || ''}
										type='text'
										name='roReg'
										className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
										placeholder=''
									/>
								</div>
							</label>
							<label className='p-2 w-full block text-sm font-medium text-gray-700'>
								Adresa
								<div className='mt-1'>
									<input
										onChange={handleChange}
										value={formData.address || ''}
										type='text'
										name='address'
										className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
										placeholder=''
									/>
								</div>
							</label>
							<label className='p-2 w-1/4 block text-sm font-medium text-gray-700'>
								Discount %
								<div className='mt-1'>
									<input
										onChange={handleChange}
										value={formData.discount || 0}
										type='number'
										name='discount'
										required={true}
										className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
										placeholder='procent discount'
									/>
								</div>
							</label>

						<label className='p-2 w-1/4 block text-sm font-medium text-gray-700'>
							Ora livrare
							<div className='mt-1'>
								<input
									onChange={handleChange}
									value={formData.deliveryTime || "16:00"}
									type='text'
									name='deliveryTime'
									required={true}
									className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
									placeholder='16:00'
								/>
							</div>
						</label>


							<div className={'p-2 w-full'}>

									<button
										type='button'
										onClick={() => router.push('/customers')}
										className='  bg-white py-2 px-4 mr-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
									>
										Anulare
									</button>
									<button
										type='submit'
										className=' inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-1 hover:bg-accent-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 w-32'
									>
										Salveaza
									</button>

							</div>


					</div>
				</div>
				<div>
					<div className='flex justify-end mb-4'>
						<button
							type='button'
							onClick={() => router.push('/customers/' + id + '/deliveries/new')}
							className='ml-3 bg-white py-2 mr-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
						>
							Adauga livrare
						</button>

						<Link href={'/users/new/?customerId='+id}>
							<button type={'button'} className='block py-2 mr-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-1 hover:bg-accent-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600'>
								Adauga cont
							</button>
						</Link>
						<Link href={'/customers/'+id+'/invoices/create'}>
							<button type={'button'} className='block py-2 mr-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-1 hover:bg-accent-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600'>
								Factureaza
							</button>
						</Link>
						<Link href={'/customers/'+id+'/pricing'}>
                        	<button type={'button'} className='block py-2 mr-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-1 hover:bg-accent-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600'>
                        		Pret
                        	</button>
                        </Link>
					</div>
				</div>
			</form>



			{!isNew ? LocationsList(id,`/customers/${id}`) : ''}

			{!isNew ? DeliveriesList(id,`/customers/${id}`) : ''}
		</div>
	);
};
Customer.getLayout = getLayout;

export const getServerSideProps = async ({params}: any) => {
	const {id} = params;
	return {
		props: {id}
	};
};

export default Customer;
