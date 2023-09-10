import { useToasts } from 'react-toast-notifications';
import React, { useEffect, useState } from 'react';
import { apiService } from '../services/api.service';
//import InputZonePrice from './input-zone-price';
import InputZoneDriver from './input-zone-driver';

export const DriverZonesEditor = (counties: any[], carrier: string, onlyDelivery:boolean ) => {
	const {addToast} = useToasts();

	const [activeCounty, setActiveCounty] = useState('Alba');
	const [zones, setZones] = useState(Array<any>());
	const [cities, setCities] = useState(Array<any>());
	const [countiesCounts, setCountiesCounts] = useState(Array<any>());
    const [drivers,setDrivers] = useState(Array<any>());

	const getZones = async () => {
		const z = await apiService.get('/carriers/' + carrier + '/get-zones') || [];
		setZones(z);
		setCountiesCounts(counties.map((c: any) => z.filter((zz: any) => zz.county == c).length));
	};
	const getCities = async () => setCities(await apiService.get('/locations/counties/' + activeCounty) || []);
    const getDrivers = async () => setDrivers((await apiService.get(`/users/role/DD`)).data);
	const zonesForCounty = () => activeCounty ? zones.filter(z => z.county == activeCounty) : [];
	const addDriver= (zone: any) => {
		console.log(zone)
		apiService.post('/carriers/'+carrier+'/set-driver-zone', {
			name: zone.name,
			zone: {
                driverId: zone.driverId,
				cityId: zone.cityId,
				county: activeCounty
			}
		}).then(() => {
			addToast(zone.id ? 'Zona a fost modificata' : 'Zona a fost adaugata', {appearance: 'success'});
			getZones().then(null);
		});


	};
	const remove = (id: string) => {
		apiService.delete('/carriers/'+carrier+'/remove-driver-zone/' + id).then(() => {
			getZones().then(null);
			addToast('Zona a fost stearsa', {appearance: 'success'});
		});
	};
	useEffect(() => {
		getZones().then(null);
	}, []);
	useEffect(() => {
		getCities().then(null);
        getDrivers().then(null)
	}, [activeCounty]);
	return (
		<div>
			<div className='flex flex-row'>
				<div className='m-4   '>
					<div className='bg-white  shadow overflow-auto' style={{maxHeight: 'calc(100vh - 200px)', minWidth: '220px'}}>
						<ul className='divide-y divide-gray-100  '>
							{counties.map((c: string, i: number) => <li onClick={() => setActiveCounty(c)} key={c} className={`p-2   px-4 cursor-pointer flex items-center justify-between ${c == activeCounty ? 'bg-blue-800 text-white' : ''}`}>
								{c}
								{countiesCounts[i] ? <span className='px-2 py-1 ml-4 text-sm text-white bg-blue-800 rounded-full'>{countiesCounts[i]}</span> : ''}
							</li>)}

						</ul>
					</div>

				</div>
				<div className='flex-row'>
					<InputZoneDriver cities={cities} drivers={drivers} zone={null} setDriver={(zone: any) => addDriver(zone)} onlyDelivery={onlyDelivery} />
					<hr className={'pb-4 mt-4'} />
					{zonesForCounty().map(zone => <InputZoneDriver key={zone.id} cities={cities} drivers={drivers} zone={zone} setDriver={(zone: any) => addDriver(zone)}
																  onlyDelivery={onlyDelivery}
																  remove={() => remove(zone.id)}/>)}
				</div>
			</div>
		</div>
	);
};
