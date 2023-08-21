import React, {FormEventHandler, useEffect, useState} from 'react';

import 'react-quill/dist/quill.snow.css';
import {useRouter} from 'next/router';
import {useToasts} from 'react-toast-notifications';
import {getLayout} from '../../../../components/layouts/site-layout';
import {apiService} from "../../../../services/api.service";
import {fd} from "../../../../lib/utils";
import Link from "next/link";


const CreateInvoice = ({customerId}: { customerId: string }) => {
    const {addToast} = useToasts();

    const router = useRouter();
    const initialFormData = Object.freeze({
        serial: '',
        number: '',
    });
    const [formData, updateFormData] = useState(initialFormData);
    // @ts-ignore
    const [customer, setCustomer] = useState(null);
    const [deliveries, setDeliveries] = useState([]);


    const getCustomer = async () => setCustomer(await apiService.get(`/customers/${customerId}`));
    const getDeliveries = async () => setDeliveries(await apiService.get(`/deliveries/to-invoice-deliveries/${customerId}`));


    useEffect(() => {
        getCustomer().then(() => null);
        getDeliveries().then(() => null);
    }, [router]);


    const handleChange = (e: { target: { name: string, value: string } }) => {
        const {name, value} = e.target;
        updateFormData({
            ...formData,
            [name]: value
        });
    };

    const submit: FormEventHandler = async (e) => {
        e.preventDefault();
        const payload = {
            ...formData,
            customerId,
            deliveryIds: []
        }

        await apiService.post(`/invoices/create-for-customer`, payload)
            .catch(() => {
                addToast('Update error', {appearance: 'error'});
            })
            .then(() => {
                addToast('Invoice created successfully', {appearance: 'success'});
                router.push({
                    pathname: '/invoices'
                });
            });

    };

    const getAwbCodes = (delivery:any) => {
        const ledger = delivery.ledger.map((l: { code: any; }) => l.code) as string[];
        // @ts-ignore
        return [...new Set(ledger)].join(', ')
    }
    // @ts-ignore
    return (
        <div>
            <form onSubmit={submit} className='space-y-8'>
                <div className='border-gray-300 border rounded-md bg-white px-11 py-9'>
                    <div className='flex flex-wrap -mx-4'>
                        <div className='space-y-8 px-4  w-full sm:w-1/2 '>
                            <label className='block text-sm font-medium text-gray-700'>
                                Serie
                                <div className='mt-1'>
                                    <input
                                        onChange={handleChange}
                                        value={formData.serial || ''}
                                        type='text'
                                        name='serial'
                                        className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
                                        placeholder=''
                                    />
                                </div>
                            </label>
                            <label className='block text-sm font-medium text-gray-700'>
                                Numar
                                <div className='mt-1'>
                                    <input
                                        onChange={handleChange}
                                        value={formData.number || ''}
                                        type='number'
                                        name='number'
                                        className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
                                        placeholder=''
                                    />
                                </div>
                            </label>
                        </div>
                        <div className='space-y-8 px-4  w-full sm:w-1/2 '>


                        </div>
                    </div>
                </div>
                <div>
                    <div className='flex justify-end'>
                        <button
                            type='button'
                            onClick={() => router.push('/customers/' + customerId)}
                            className='bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                        >
                            Cancel
                        </button>
                        <button
                            type='submit'
                            className='ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-1 hover:bg-accent-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 w-32'
                        >
                            Save
                        </button>
                    </div>
                </div>
            </form>

            <div className='flex flex-col mt-4'>
                <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
                    <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
                        <div className=''>
                            <table className='min-w-full divide-y divide-gray-200'>
                                <thead className='bg-gray-200'>
                                <tr>
                                    <th className='px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider'>
                                        Data AWB
                                    </th>
                                    <th className='px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider'>
                                        Destinatie
                                    </th>
                                    <th className='px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider'>
                                        AWB
                                    </th>
                                    <th className='px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider'>
                                        Creat la
                                    </th>
                                    <th></th>

                                </tr>
                                </thead>
                                <tbody className='bg-white divide-y divide-gray-200'>
                                {(deliveries || []).map((delivery: any) => (
                                    <tr key={delivery.id}>
                                        <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500'>
                                            {fd(delivery.sentToCarrierAt)}
                                        </td>
                                        <td className='px-6 py-4  text-sm font-medium text-gray-500'>
                                            {delivery.destinationCounty} - {delivery.destinationCity}
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500'>
                                            {getAwbCodes(delivery)}
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500'>
                                            {fd(delivery.createdAt)}
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500'>
                                            <Link href={`/deliveries/${delivery.id}`}>
                                                <div
                                                    className='text-indigo-600 hover:text-indigo-900 cursor-pointer'> Detalii
                                                </div>
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
    );
};
CreateInvoice.getLayout = getLayout;

export const getServerSideProps = async ({params}: any) => {
    const {id} = params;
    return {
        props: {customerId: id}
    };
};

export default CreateInvoice;
