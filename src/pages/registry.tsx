import React, { FormEventHandler, useEffect, useState } from 'react';
import { apiService } from "../services/api.service";
import { useToasts } from "react-toast-notifications";
import { getLayout } from '../components/layouts/site-layout';


const Registry = () => {
    const [keys, setKeys] = useState<{ key: string, value: string, inputType: string, label: string }[]>([]);


    const {addToast} = useToasts();


    const handleChange = (e: { target: { name: string, value: string } }) => {
        // @ts-ignore
        const {name: key, value} = e.target;
        setKeys(keys.map(k => k.key == key ? ({...k, value}) : k));
    };

    const submit: FormEventHandler = async (e) => {
        e.preventDefault();
        await apiService.post(`/registry`, keys)
            .catch(() => {
                addToast('A aparut o eroare', {appearance: 'error'});
            })
            .then(async () => {
                addToast('Setarile au fost salvate cu succes', {appearance: 'success'});
                await getKeys();
            });
    };

    const getKeys = async () => {
        const response = await apiService.get('/registry');
        if (response) {
            setKeys(response);
        }
    };

    useEffect(() => {
        getKeys().then()
    }, []);
    //
    return <div>
        <form onSubmit={submit} className='space-y-8'>
            <div className='border-gray-300 border rounded-md bg-white px-11 py-9'>
                <div className='flex flex-wrap -mx-4'>
                    <div className='space-y-8 px-4  w-full sm:w-1/2 '>
                        {keys.map(key => <label key={key.key} className='block text-sm font-medium text-gray-700'>
                            {key.label}
                            <div className='mt-1'>
                                <input
                                    onChange={handleChange}
                                    value={key.value || ''}
                                    type={key.inputType == 'currency' ? 'number' : 'text'}
                                    name={key.key}
                                    className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
                                    placeholder=''
                                />
                            </div>
                        </label>)}

                    </div>
                    <div className='space-y-8 px-4  w-full sm:w-1/2 '>

                    </div>
                </div>
            </div>
            <div>
                <div className='flex justify-end'>
                    <button
                        type='submit'
                        className='ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-1 hover:bg-accent-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 w-32'
                    >
                        Salveaza
                    </button>
                </div>
            </div>
        </form>

    </div>;
};
Registry.getLayout = getLayout;

export default Registry;


