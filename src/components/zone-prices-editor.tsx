import { useToasts } from 'react-toast-notifications';
import React, { useEffect, useState } from 'react';
import { apiService } from '../services/api.service';
import InputZonePrice from './input-zone-price';

export const ZonePricesEditor = (counties: any[], customer: string, onlyDelivery:boolean ) => {
	const {addToast} = useToasts();

	const [activeCounty, setActiveCounty] = useState('Alba');
	const [zones, setZones] = useState(Array<any>());
	const [cities, setCities] = useState(Array<any>());
	const [countiesCounts, setCountiesCounts] = useState(Array<any>());
	const [customerData, setCustomerData] = useState(null);

	const getCustomer = async () => {
	    const z = await apiService.get(`/customers/${customer}`);
	    setCustomerData(z);
	};

	useEffect(() => {
	    if (customerData === null)
           getCustomer().then(() => null);
    }, []);

	const getZones = async () => {
		const z = await apiService.get('/pricing/' + customer + '/get-zones') || [];
		setZones(z);
		setCountiesCounts(counties.map((c: any) => z.filter((zz: any) => zz.county == c).length));
	};
	const getCities = async () => setCities(await apiService.get('/locations/counties/' + activeCounty) || []);
	const zonesForCounty = () => activeCounty ? zones.filter(z => z.county == activeCounty) : [];
	const addPrice = (zone: any) => {
		console.log(zone)
		apiService.post('/pricing/'+customer+'/set-price-zone', {
			name: zone.name,
			pickup: +zone.pickup||0,
			delivery: +zone.delivery ||0,
			zone: {
				cityId: zone.cityId,
				county: activeCounty
			},
			customer: zone.customer
		}).then(() => {
			addToast(zone.id ? 'Zona a fost modificata' : 'Zona a fost adaugata', {appearance: 'success'});
			getZones().then(null);
		});


	};
	const remove = (id: string) => {
		apiService.delete('/pricing/'+customer+'/remove-price-zone/' + id).then(() => {
			getZones().then(null);
			addToast('Zona a fost stearsa', {appearance: 'success'});
		});
	};
	useEffect(() => {
		getZones().then(null);
	}, []);
	useEffect(() => {
		getCities().then(null);
	}, [activeCounty]);

	return (
		<div>
		<h4 className='h4'>Pricing For {customerData?customerData.name:'Unknown'}</h4>
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
					<InputZonePrice cities={cities} zone={null} setPrice={(price: any) => addPrice(price)} onlyDelivery={onlyDelivery} />
					<hr className={'pb-4 mt-4'} />
					{zonesForCounty().map(zone => <InputZonePrice key={zone.id} cities={cities} zone={zone} setPrice={(prices: any) => addPrice(prices)}
																  onlyDelivery={onlyDelivery}
																  remove={() => remove(zone.id)}/>)}
				</div>
			</div>
		</div>
	);
};