import React, {useEffect, useState} from 'react';
import {apiService} from "../services/api.service";
import {ILedgerEntry} from "../pages/deliveries/[id]";
import {fdt} from "../lib/utils";
import {useToasts} from "react-toast-notifications";
import QRCode from "react-qr-code";

export default ({awb, carriers}: { awb: ILedgerEntry, carriers: any[] }) => {
    const [statusInfo, setStatusInfo] = useState<any>(null);
    const [statusHistory, setStatusHistory] = useState<Array<any>>([]);
    const {addToast} = useToasts();

    const getDeliveryStatus = async () => {
        setStatusInfo(await apiService.get(`/carriers/${awb.carrier}/get-status/${awb.code}`));
    }

    useEffect(() => {
        getDeliveryHistoryStatus().then()
    }, [statusInfo]);

    const updateStatus = async (awb: ILedgerEntry, status: string) => {
        await apiService.post(`/carriers/${awb.carrier}/set-status/${awb.code}`, {status});
        await getDeliveryStatus();
        addToast('Status modificat', {appearance: 'success'});
    };
    const getDeliveryHistoryStatus = async () => {
        setStatusHistory(await apiService.get(`/carriers/${awb.carrier}/get-status-history/${awb.code}`));
    };


    useEffect(() => {
        getDeliveryStatus().then()
    }, [])

    return <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-3">
        <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">{carriers.find(c => c.id == awb.carrier).name}</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">{awb.code}</p>
            <div>
                <QRCode value={awb.code} />
            </div>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200">
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Status</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{statusInfo?.info.label}</dd>
                </div>


                {statusHistory?.map((entry: any) => <div key={entry.created_at} className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500"> {fdt(entry.created_at)}</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {entry.info.label} ({entry.sts_user})

                    </dd>
                </div>)}

                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500"></dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {statusInfo?.next.map((sts: any) => <div key={sts.id} className='inline-block'>
                            <button
                                key={sts.id}
                                type='button'
                                onClick={() => updateStatus(awb, sts.id)}
                                className='mb-4 mr-2 bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                            >
                                {sts.actionLabel}
                            </button>
                        </div>)}

                    </dd>
                </div>
            </dl>
        </div>
    </div>

    //
    //


    // <div className='inline-block'>
    //     <button
    //         type='button'
    //         onClick={() => getDeliveryStatus()}
    //         className='bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
    //     >
    //         Refresh
    //     </button>
    //     <h2 className={'text-2xl'}>Status awb:</h2>
    //     {statusInfo ? statusInfo.map(status => <div key={status.id}>
    //         <h2>{status.awb.carrier} - {status.awb.code}</h2>
    //         <div className='font-bold'>{status.r.info.label}</div>
    //         {status.r.next.map((sts: any) => <div key={sts.id} className='inline-block'>
    //             <button
    //                 key={sts.id}
    //                 type='button'
    //                 onClick={() => updateStatus(status.awb, sts.id)}
    //                 className='mb-4 bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
    //             >
    //                 {sts.actionLabel}
    //             </button>
    //         </div>)}
    //     </div>) : 'n/a'}
    //
    //
    // </div>
}
