import React, {useState} from 'react';

export default function InputZoneDriver({cities, drivers, zone, setDriver, remove}: any) {
	const initialFormData = Object.freeze({
		cityId: '',
		driverId: '',
		name: ''
	});
	const [formData, updateFormData] = useState(zone || initialFormData);
	const save = () => {
		if (!zone) {
			updateFormData(initialFormData);
		}
		setDriver(formData);
	};
	return (
		<div className='flex flex-wrap '>
			<div className='px-4 flex-1'>
				<label className='block text-sm font-medium text-gray-700'>
					Oras
					{zone ? <input
							type={'text'}
							defaultValue={zone.city || 'tot judetul'} readOnly
							className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
						/>
						: <div className='mt-1'>
							<select
								className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
								placeholder='Alegeti oras'
								onChange={({target}) => updateFormData({...formData, cityId: target.value})}
								value={formData.cityId}
							>
								<option key={''} value={''}>tot judetul</option>
								{cities.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
							</select>
						</div>}
				</label>
			</div>
			<div className='px-4 flex-1'>
				<label className='block text-sm font-medium text-gray-700'>
					Nume
					<div className='mt-1'>
						<input
							type={'text'}
							className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
							placeholder='ex: Zona 1'
							onChange={({target}) => updateFormData({...formData, name: target.value})}
							value={formData.name}
						>
						</input>
					</div>
				</label>
			</div>
			<div className='px-4 flex-1'>
				<label className='block text-sm font-medium text-gray-700'>
					Livrator
                    {zone ? <input
							type={'text'}
							defaultValue={(zone.user_first_name) ? zone.user_first_name + " " + zone.user_last_name : 'no driver'} readOnly
							className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
						/>
					:  
                    <div className='mt-1'>
							<select
								className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
								placeholder='Alegeti Livrator'
								onChange={({target}) => updateFormData({...formData, driverId: target.value})}
								value={formData.driverid}
							>
								<option key={''} value={''}>tot livratori</option>
								{drivers.map((c: any) => <option key={c.id} value={c.id}>{c.firstName + " " + c.lastName}</option>)}
							</select>
                            </div>}
                    </label>
                </div>
			<div className={'flex-1 self-end'}>
				<button type={'button'} onClick={() => save()} className='block py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-1 hover:bg-accent-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600'>
					{zone ? 'Salveaza' : 'Adauga'}
				</button>
			</div>
			<div className={'flex-1 self-end'}>
				{zone ? <button type={'button'} onClick={() => remove()} className='block py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-1 hover:bg-accent-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600'>
					Sterge
				</button> : ''}
			</div>
		</div>
	);
}
