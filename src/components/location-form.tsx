import React, {useEffect, useState} from 'react';
import {apiService} from '../services/api.service';

export default function LocationForm({counties, location, updateLocation, remove}: any) {
	const [cities, setCities] = useState(Array<any>());
	const getCities = async () => setCities(await apiService.get('/locations/counties/' + activeCounty) || []);
	const [activeCounty, setActiveCounty] = useState(location ? location.city.county : 'Alba');

	console.log(location)
	useEffect(() => {
		getCities().then(() => {

		});
	}, [activeCounty]);
	useEffect(() => {
		console.log(location)
		cities.length ? updateFormData({...formData, cityId: location ? location.city.id : cities[0].id}) : null;
	}, [cities]);


	const initialFormData = Object.freeze({
		cityId: '',
		address: '',
		name: '',
		comment: '',
		contact: '',
		postalCode: '',
		email: '',
		phone: '',
	});
	const [formData, updateFormData] = useState(location || initialFormData);
	const save = () => {
		updateLocation(formData);
	};
	return (
		<div>
			<div className='flex flex-wrap '>
				<div className='px-4 flex-1'>
					<label className='block text-sm font-medium text-gray-700'>
						Judet
						<div className='mt-1'>
							<select
								className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
								placeholder='Alegeti oras'
								onChange={({target}) => setActiveCounty(target.value)}
								value={activeCounty}
							>
								{counties.map((c: any) => <option key={c} value={c}>{c}</option>)}
							</select>
						</div>
					</label>
				</div>
				<div className='px-4 flex-1'>
					<label className='block text-sm font-medium text-gray-700'>
						Oras
						<div className='mt-1'>
							<select
								className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
								placeholder='Alegeti oras'
								onChange={({target}) => updateFormData({...formData, cityId: target.value})}
								value={formData.cityId}
							>
								{cities.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
							</select>
						</div>
					</label>
				</div>
				<div className='px-4 flex-1'>
					<label className='block text-sm font-medium text-gray-700'>
						Nume/ID livrare
						<div className='mt-1'>
							<input
								type={'text'}
								className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
								placeholder='ex: Sediu'
								onChange={({target}) => updateFormData({...formData, name: target.value})}
								value={formData.name}
							>
							</input>
						</div>
					</label>
				</div>
				<div className='px-4 flex-1'>
					<label className='block text-sm font-medium text-gray-700'>
						Cod postal
						<div className='mt-1'>
							<input
								type={'text'}
								className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
								onChange={({target}) => updateFormData({...formData, postalCode: target.value})}
								value={formData.postalCode}
							>
							</input>
						</div>
					</label>
				</div>
			</div>
			<div className='flex flex-wrap py-4 '>
				<div className='px-4  flex-1'>
					<label className='block text-sm font-medium text-gray-700'>
						Adresa
						<div className='mt-1'>
							<input
								type={'text'}
								className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
								placeholder='ex: Strada Marului nr 42'
								onChange={({target}) => updateFormData({...formData, address: target.value})}
								value={formData.address}
							>
							</input>
						</div>
					</label>
				</div>
			</div>
			<div className='flex flex-wrap py-4 '>
				<div className='px-4  flex-1'>
					<label className='block text-sm font-medium text-gray-700'>
						Persona de contact
						<div className='mt-1'>
							<input
								type={'text'}
								className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
								placeholder=''
								onChange={({target}) => updateFormData({...formData, contact: target.value})}
								value={formData.contact}
							>
							</input>
						</div>
					</label>
				</div>
			</div>
			<div className='flex flex-wrap py-4 '>
				<div className='px-4  flex-1'>
					<label className='block text-sm font-medium text-gray-700'>
						Email
						<div className='mt-1'>
							<input
								type={'email'}
								className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
								onChange={({target}) => updateFormData({...formData, email: target.value})}
								value={formData.email}
							>
							</input>
						</div>
					</label>
				</div>
			</div>
			<div className='flex flex-wrap py-4 '>
				<div className='px-4  flex-1'>
					<label className='block text-sm font-medium text-gray-700'>
						Telefon contact
						<div className='mt-1'>
							<input
								type={'text'}
								className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
								placeholder='ex: +40.123.123.123'
								onChange={({target}) => updateFormData({...formData, phone: target.value})}
								value={formData.phone}
							>
							</input>
						</div>
					</label>
				</div>
			</div>
			<div className='flex flex-wrap py-4 '>
				<div className='px-4  flex-1'>
					<label className='block text-sm font-medium text-gray-700'>
						Alte informatii
						<div className='mt-1'>
							<input
								type={'text'}
								className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
								placeholder='ex: interfon, informatii ajutatoare'
								onChange={({target}) => updateFormData({...formData, comment: target.value})}
								value={formData.comment}
							>
							</input>
						</div>
					</label>
				</div>
			</div>
			<div className='flex flex-wrap py-4 '>
				<div className={'px-4  flex-1 self-end'}>
					<button type={'button'} onClick={() => save()} className='block py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-1 hover:bg-accent-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600'>
						{location ? 'Salveaza' : 'Adauga'}
					</button>
				</div>
				<div className={'px-4  flex-1 self-end'}>
					{location ? <button type={'button'} onClick={() => remove()} className='block py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-1 hover:bg-accent-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600'>
						Sterge
					</button> : ''}
				</div>
			</div>
		</div>
	);
}
