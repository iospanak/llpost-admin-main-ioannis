import React, {FormEventHandler, useEffect, useState} from 'react';

import 'react-quill/dist/quill.snow.css';
import {useRouter} from 'next/router';
import {useToasts} from 'react-toast-notifications';
import {getLayout} from '../../../components/layouts/site-layout';
import {apiService} from '../../../services/api.service';
import {RoleTypeLabels} from '../../users';
import Link from 'next/link';


export enum RoleType {
    USER = 'USER',
    ADMIN = 'ADMIN',
    DD = 'DD', // Delivery Driver
    LGV = 'LGV', // Large goods delivery driver
    WAREHOUSE = 'WAREHOUSE', // warehouse asistant
    OPERATIONS = 'OPERATIONS', // operations technician
}


const User = ({id}: { id: string }) => {
    const {addToast} = useToasts();
    const isNew = id === 'new';
    const {query} = useRouter();

    const router = useRouter();
    const initialFormData = Object.freeze({
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        customerId: '',
        role: RoleType.USER
    });

    const [formData, updateFormData] = useState(initialFormData);

    const getUser = async () => updateFormData(await apiService.get(`/users/${id}`));

    useEffect(() => {
        if (isNew) {
            updateFormData(initialFormData);
        } else {
            getUser().then(() => {
            });
        }
    }, [router]);

    useEffect(() => {
        console.log(query)

        if (query.customerId) {

            updateFormData({
                ...formData,
                customerId: query.customerId as string
            });

        }


    }, [query]);

    const handleChange = (e: { target: { name: string, value: string } }) => {
        const {name, value} = e.target;
        updateFormData({
            ...formData,
            [name]: value
        });
    };

    const submit: FormEventHandler = async (e) => {
        e.preventDefault();
        if (isNew) {
            await apiService.post(`/users`, formData)
                .catch(() => {
                    addToast('Update error', {appearance: 'error'});
                })
                .then((r) => {
                    addToast('User created successfully', {appearance: 'success'});
                    router.push({
                        pathname: '/users/[id]',
                        query: {id: r.id}
                    });
                });
        } else {

            await apiService.post(`/users/${id}`, formData)
                .catch(() => {
                    addToast('Update error', {appearance: 'error'});
                })
                .then(async () => {
                    addToast('User updated successfully', {appearance: 'success'});
                    await getUser();
                });
        }
    };
    // @ts-ignore
    return (
        <div>
            <form onSubmit={submit} className='space-y-8'>
                <div className='border-gray-300 border rounded-md bg-white px-11 py-9'>
                    <div className='flex flex-wrap -mx-4'>
                        <div className='space-y-8 px-4  w-full sm:w-1/2 '>
                            <label className='block text-sm font-medium text-gray-700'>
                                Prenume
                                <div className='mt-1'>
                                    <input
                                        onChange={handleChange}
                                        value={formData.firstName || ''}
                                        type='text'
                                        name='firstName'
                                        className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
                                        placeholder=''
                                    />
                                </div>
                            </label>
                            <label className='block text-sm font-medium text-gray-700'>
                                Nume
                                <div className='mt-1'>
                                    <input
                                        onChange={handleChange}
                                        value={formData.lastName || ''}
                                        type='text'
                                        name='lastName'
                                        className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
                                        placeholder=''
                                    />
                                </div>
                            </label>
                            <label className='block text-sm font-medium text-gray-700'>
                                Email
                                <div className='mt-1'>
                                    <input
                                        onChange={handleChange}
                                        value={formData.email || ''}
                                        type='email'
                                        autoComplete='false'
                                        required
                                        name='email'
                                        className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
                                        placeholder=''
                                    />
                                </div>
                            </label>
                            <label className='block text-sm font-medium text-gray-700'>
                                Password
                                <div className='mt-1'>
                                    <input
                                        onChange={handleChange}
                                        value={formData.password || ''}
                                        type='password'
                                        autoComplete='false'
                                        name='password'
                                        className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
                                        placeholder='Adauga doar daca se schimba'
                                    />
                                </div>
                            </label>
                            {formData.customerId?'':<label className='block text-sm font-medium text-gray-700'>
                                Rol
                                <div className='mt-1'>
                                    <select
                                        className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
                                        placeholder='Alegeti oras'
                                        onChange={({target}) => updateFormData({
                                            ...formData,
                                            role: target.value as RoleType
                                        })}
                                        value={formData.role}
                                    >
                                        <option value={RoleType.USER}>{RoleTypeLabels.USER}</option>
                                        <option value={RoleType.ADMIN}>{RoleTypeLabels.ADMIN}</option>
                                        <option value={RoleType.DD}>{RoleTypeLabels.DD}</option>
                                        <option value={RoleType.LGV}>{RoleTypeLabels.LGV}</option>
                                        <option value={RoleType.WAREHOUSE}>{RoleTypeLabels.WAREHOUSE}</option>
                                        <option value={RoleType.OPERATIONS}>{RoleTypeLabels.OPERATIONS}</option>
                                    </select>
                                </div>
                            </label>}

                        </div>
                        <div className='space-y-8 px-4  w-full sm:w-1/2 '>


                        </div>
                    </div>
                </div>
                <div>
                    <div className='flex justify-end'>
                    {(formData.role == RoleType.WAREHOUSE) && <Link href={'/users/'+id+'/magaziner'}>
                        	<button type={'button'} className='block py-2 mr-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-1 hover:bg-accent-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600'>
                        		Assign Drivers
                        	</button>
                        </Link>}
                        <button
                            type='button'
                            onClick={() => formData.customerId?router.push('/customers/'+formData.customerId):router.push('/users')}
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


        </div>
    );
};
User.getLayout = getLayout;

export const getServerSideProps = async ({params}: any) => {
    const {id} = params;
    return {
        props: {id}
    };
};

export default User;
