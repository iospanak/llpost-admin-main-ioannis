import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {apiService, decodeGetParams, encodeGetParams, filterGetParams} from '../services/api.service';
import {ChevronLeftIcon, ChevronRightIcon, SearchIcon} from '@heroicons/react/solid';
import ColumnHeader from './column-header';
import {fd} from '../lib/utils';
import Link from 'next/link';

export const DeliveriesList = (customerId: string, path = '') => {
    const defaultPagination = {
        load: false,
        page: 1,
        take: 10,
        q: '',
        order: 'ASC',
        orderBy: ''
    };
    const [deliveries, setDeliveries] = useState([]);
    const {push, query} = useRouter();
    const [pagination, setPagination] = useState(defaultPagination);
    const [hasPrev, setHasPrev] = useState(false);
    const [hasNext, setHasNext] = useState(false);
    const [pages, setPages] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');

    const setPage = (p: number) => {
        pagination.page = p;
        push({
            pathname: path,
            query: filterGetParams(query, 'd_') + '&' + encodeGetParams(pagination, 'd_')
        });
    };
    const getDeliveries = async () => {
        setHasPrev(false);
        setHasNext(false);
        const response = await apiService.page(customerId ? `/deliveries/user/${customerId}` : '/deliveries', pagination);
        if (response) {
            setDeliveries(response.data);
            setHasPrev(response.meta.hasPreviousPage);
            setHasNext(response.meta.hasNextPage);
            setPages(response.meta.pageCount);
        }
    };
    useEffect(() => {
        setPagination({...defaultPagination, ...decodeGetParams(query, 'd_'), load: true});
    }, [query]);

    useEffect(() => {
        if (pagination.load) {
            setSearchTerm(pagination.q);
            getDeliveries().then(() => {
            });
        }
    }, [pagination]);

    const handleKeyDown = (e: any) => {
        if (e.key === 'Enter' && e.target) {
            pagination.q = e.target.value;
            setPage(1);
        }
    };

    const orderBy = (column: string) => {
        pagination.orderBy = column;
        pagination.order = pagination.order === 'ASC' ? 'DESC' : 'ASC';
        setPage(1);
    };

    const downloadInvoice = async (id: string) => {
        await apiService.download('/invoices/pdf/' + id);
    };

    return (
        <div>
            <div className='bg-white overflow-hidden rounded-lg border border-gray-300'>
                <div className='flex  justify-between mt-8 mb-10'>
                    <div className='w-full max-w-2xl px-6'>
                        <div className='relative flex items-stretch flex-grow focus-within:z-10  mb-3'>
                            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-deliveries-none'>
                                <SearchIcon className='h-5 w-5 text-gray-400' aria-hidden='true'/>
                            </div>
                            <input
                                type='text'
                                onKeyDown={(e) => handleKeyDown(e)}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                value={searchTerm}
                                className='focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-md pl-10 sm:text-sm border-gray-300'
                                placeholder='Search...'
                            />
                        </div>
                    </div>
                </div>
                <div className='flex flex-col'>
                    <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
                        <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
                            <div className=''>
                                <table className='min-w-full divide-y divide-gray-200'>
                                    <thead className='bg-gray-200'>
                                    <tr>
                                        <ColumnHeader
                                            onChange={orderBy}
                                            orderBy='delivery.sourceContact'
                                            pagination={pagination}
                                            className='px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider'
                                        >
                                            Expeditor
                                        </ColumnHeader>
                                        <th
                                            className='px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider'
                                        >
                                            De la
                                        </th>
                                        <th
                                            className='px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider'
                                        >
                                            La
                                        </th>
                                        <ColumnHeader
                                            onChange={orderBy}
                                            orderBy='delivery.sentToCarrier'
                                            pagination={pagination}
                                            className='px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider'
                                        >
                                            AWB
                                        </ColumnHeader>
                                        <ColumnHeader
                                            onChange={orderBy}
                                            orderBy='delivery.created_at'
                                            pagination={pagination}
                                            className='px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider'
                                        >
                                            Creat la
                                        </ColumnHeader>
                                        <ColumnHeader
                                             onChange={orderBy}
                                             orderBy='delivery.driver'
                                             pagination={pagination}
                                             className='px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider'
                                         >
                                            Driver
                                        </ColumnHeader>
                                        <th
                                            className='px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider'
                                        >
                                            Facturat
                                        </th>
                                        <th scope='col' className='relative px-6 py-3'>
                                            <span className='sr-only'>Edit</span>
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody className='bg-white divide-y divide-gray-200'>
                                    {(deliveries || []).map((delivery: any) => (
                                        <tr key={delivery.id}>

                                            <td className='px-6 py-4  text-sm font-medium text-gray-500'>
                                                {delivery.sourceContact}
                                            </td>
                                            <td className='px-6 py-4  text-sm font-medium text-gray-500'>
                                                {delivery.sourceCounty} - {delivery.sourceCity}
                                            </td>
                                            <td className='px-6 py-4  text-sm font-medium text-gray-500'>
                                                {delivery.destinationCounty} - {delivery.destinationCity}
                                            </td>

                                            <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500'>
                                                {fd(delivery.sentToCarrierAt)}
                                            </td>

                                            <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500'>
                                                {fd(delivery.createdAt)}
                                            </td>
                                            <td className='px-6 py-4  text-sm font-medium text-gray-500'>
                                                {delivery.driver}
                                            </td>
                                            <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500'>
                                                {delivery.invoiceId ? <div
                                                    className='text-indigo-600 hover:text-indigo-900 cursor-pointer'
                                                    onClick={() => downloadInvoice(delivery.invoiceId)}>DA</div> : '-'}
                                            </td>
                                            <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
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
            <nav
                className='py-3 flex items-center justify-between'
                aria-label='Pagination'
            >
                <div className='flex-1 flex justify-between items-center'>
                    <div>
                        <p className='text-sm text-gray-700'>
						<span className='font-medium'>
						Pagina{' '}<span className='font-semibold'>{pagination.page}</span> din <span
                            className='font-semibold'>{pages}</span>
						</span>
                        </p>
                    </div>
                    <div>
                        <button
                            disabled={!hasPrev}
                            onClick={() => setPage(+pagination.page - 1)}
                            className='relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-semibold shadow-sm rounded-md text-gray-700 bg-white hover:bg-gray-50 cursor-pointer'
                        >
                            <ChevronLeftIcon className='h-5 w-5 text-gray-400'/>
                        </button>
                        <button
                            disabled={!hasNext}
                            onClick={() => setPage(+pagination.page + 1)}
                            className='ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-semibold shadow-sm rounded-md text-gray-700 bg-white hover:bg-gray-50 cursor-pointer'
                        >
                            <ChevronRightIcon className='h-5 w-5 text-gray-400'/>
                        </button>
                    </div>
                </div>
            </nav>
        </div>
    );
};
