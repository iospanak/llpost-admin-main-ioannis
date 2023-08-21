import React, {ChangeEvent, FormEventHandler, useEffect, useState} from 'react';

import 'react-quill/dist/quill.snow.css';
import {useRouter} from 'next/router';
import {getLayout} from '../../../../components/layouts/site-layout';
import {apiService} from '../../../../services/api.service';
import {useToasts} from 'react-toast-notifications';

const New = ({customerId}: { customerId: string, counties: any[] }) => {

    const router = useRouter();
    const initialFormData = Object.freeze({
        customerId,
        sourceId: '',
        destinationId: '',
        carrier: '',
        driver: ''
    });

    const [formData, updateFormData] = useState(initialFormData);
    const [locations, setLocations] = useState([]);
    const [drivers, setDrivers] = useState([]);
    const getLocations = async () => setLocations((await apiService.get(`/locations/user/${customerId}`)).data);
    const getDrivers = async () => setDrivers((await apiService.get(`/users/role/DD`)).data);

    const {addToast} = useToasts();

    useEffect(() => {
        updateFormData(initialFormData);
        getLocations().then(() => {});
        getDrivers().then(() => {});
        console.log('////')
    }, []);

    // @ts-ignore
    const handleChange = (e: ChangeEvent) => {
        // @ts-ignore
        const {name, value} = e.target;
        updateFormData({
            ...formData,
            [name]: value
        });
    };

    const submit: FormEventHandler = async (e) => {
        e.preventDefault();

        await apiService.post(`/deliveries`, {...formData, customerId})
            .catch(() => {
                addToast('Update error', {appearance: 'error'});
            })
            .then(() => {
                addToast('Location created successfully', {appearance: 'success'});
                router.push({
                    pathname: '/customers/' + customerId
                });
            });


    };

    return locations.length ? <div>
        <form className='space-y-8 ' onSubmit={submit}>
            <label className='block text-sm font-medium text-gray-700'>
                De la
                <div className='mt-1'>
                    <select
                        required={true}
                        className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
                        placeholder='Alegeti adresa expeditie'
                        onChange={({target}) => updateFormData({...formData, sourceId: target.value})}
                        value={formData.sourceId}
                    >
                        <option key={0} value=''>-</option>
                        {locations.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                </div>
            </label>
            <label className='block text-sm font-medium text-gray-700'>
                 De la
                 <div className='mt-1'>
                     <select
                         required={true}
                         className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
                         placeholder='Alegeti adresa expeditie'
                         onChange={({target}) => updateFormData({...formData, destinationId: target.value})}
                         value={formData.destinationId}
                     >
                         <option key={0} value=''>-</option>
                         {locations.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
                     </select>
                 </div>
            </label>
            <label className='block text-sm font-medium text-gray-700'>
                Alegeti livrator
                <div className='mt-1'>
                    <select
                        required={true}
                        className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
                        placeholder='Alegeti livrator'
                        onChange={({target}) => updateFormData({...formData, driver: target.value})}
                        value={formData.driver}
                    >
                        <option key={0} value=''>-</option>
                        {drivers.map((c: any) => <option key={c.id} value={c.id}>{c.email}</option>)}
                    </select>
                </div>
            </label>
            <div>
                <div className='flex justify-end'>
                    <button
                        type='button'
                        onClick={() => router.push('/customers/' + customerId)}
                        className='bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                    >
                        Anulare
                    </button>
                    <button
                        type='submit'
                        className='ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-1 hover:bg-accent-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 w-32'
                    >
                        Salveaza
                    </button>
                </div>
            </div>
        </form>
    </div> : 'loading...';
};
New.getLayout = getLayout;

export const getServerSideProps = async ({params}: any) => {
    // const r1 = await fetch(`${getConfig().serverRuntimeConfig.api}/locations/counties`);
    // const counties = await r1.json();
    const {id: customerId} = params;
    return {
        props: {customerId}
    };
};

export default New;
