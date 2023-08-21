import React, {useEffect, useState} from 'react';

import 'react-quill/dist/quill.snow.css';
import {useRouter} from 'next/router';
import {useToasts} from 'react-toast-notifications';
import {getLayout} from '../../../../components/layouts/site-layout';
import {apiService} from '../../../../services/api.service';
import getConfig from 'next/config';
import LocationForm from '../../../../components/location-form';

const Location = ({id, customerId, counties}: { id: string, customerId: string, counties: any[] }) => {
	const {addToast} = useToasts();
	const isNew = id === 'new';
	const router = useRouter();
	const [location, setLocation] = useState(null);
	const updateLocation = async (l: any) => {
		console.log(l);
		if (isNew) {
			await apiService.post(`/locations`, {...l, customerId})
				.catch(() => {
					addToast('Update error', {appearance: 'error'});
				})
				.then((r) => {
					addToast('Location created successfully', {appearance: 'success'});
					router.push({
						pathname: '/customers/' + customerId,
						query: {id: r.id}
					});
				});

		} else {
			await apiService.post(`/locations/${id}`, {...l, customerId})
				.catch(() => {
					addToast('Update error', {appearance: 'error'});
				})
				.then(async () => {
					addToast('Location updated successfully', {appearance: 'success'});
					await getLocation();
				});
		}

	};
	const remove = (l: any) => {
		console.log(l);
	};
	const getLocation = async () => setLocation(await apiService.get(`/locations/${id}`));

	useEffect(() => {
		if (isNew) {

		} else {
			getLocation().then(() => {
				console.log('get location');
			});

		}
	}, [router]);


	return (
		<div>
			{isNew ?
				<LocationForm customerId={customerId} remove={remove} counties={counties} updateLocation={updateLocation} /> :
				(location ? <LocationForm customerId={customerId} remove={remove} counties={counties} location={location} updateLocation={updateLocation} /> : '')
			}
		</div>
	);
};
Location.getLayout = getLayout;

export const getServerSideProps = async ({params}: any) => {
	const r1 = await fetch(`${getConfig().serverRuntimeConfig.api}/locations/counties`);
	const counties = await r1.json();
	const {id: customerId, location: id} = params;
	return {
		props: {customerId, id, counties}
	};
};

export default Location;
