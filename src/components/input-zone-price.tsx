import React, {useState} from 'react';

export default function InputZonePrice({cities, zone, setPrice, remove, onlyDelivery}: any) {
	const initialFormData = Object.freeze({
		cityId: '',
		pickup: 0,
		delivery: 0,
		name: ''
	});
	const [formData, updateFormData] = useState(zone || initialFormData);
	const save = () => {
		if (!zone) {
			updateFormData(initialFormData);
		}
		setPrice(formData);
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
			{onlyDelivery?"":<div className='px-4  '>
				<label className='block text-sm font-medium text-gray-700'>
					Pret ridicare
					<div className='mt-1'>
						<input
							type={'number'}
							className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
							placeholder='ridicare'
							onChange={({target}) => updateFormData({...formData, pickup: +target.value})}
							value={formData.pickup}
						>
						</input>
					</div>
				</label>
			</div>}
			<div className='px-4  '>
				<label className='block text-sm font-medium text-gray-700'>
					Pret livrare
					<div className='mt-1'>
						<input
							type={'number'}
							className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
							placeholder='livrare'
							onChange={({target}) => updateFormData({...formData, delivery: +target.value})}
							value={formData.delivery}
						>
						</input>
					</div>
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
