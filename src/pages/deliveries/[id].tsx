import React, { FormEventHandler, useEffect, useState } from 'react';

import 'react-quill/dist/quill.snow.css';
import { getLayout } from '../../components/layouts/site-layout';
import { useRouter } from 'next/router';
import { apiService } from '../../services/api.service';
import AWBDetails from "../../components/awb-details";
import {PhoneIcon} from "@heroicons/react/outline";
import {fdt} from "../../lib/utils";

export interface StatusInfo {
	id: string,
	label: string,
	actionLabel: string
}

export interface ILedgerEntry {
	carrier: string;
	code: string;
	createdAt: Date;
	deliveryId: Date;
	id: string;
}


export interface IDelivery  {
	id: string;
	createdAt: Date;
	sentToCarrierAt: string;
	updatedAt: Date;
	code: string;
	carrier: string;
	sourceCity: string;
	sourceCounty: string;
	sourceAddress: string;
	sourcePostalCode: string;
	sourceComment: string;
	sourcePhone: string;
	sourceEmail: string;
	sourceContact: string;
	destinationPostalCode: string;
	destinationCountryCode: string;
	destinationCity: string;
	destinationCounty: string;
	destinationAddress: string;
	destinationComment: string;
	destinationPhone: string;
	destinationEmail: string;
	destinationContact: string;
	driverId: string;
	deliveryPrice: number;
	sentToCarrier?: any;
	weight?: any;
	height?: any;
	width?: any;
	charge?: any;
	contents?: any;
	recipientName?: any;
	recipientIban?: any;
	cashOnDelivery?: boolean;
	openOnDelivery?: boolean;
	ledger: ILedgerEntry[];

}


const Delivery = ({id}: { id: string }) => {
		const [carriers, setCarriers] = useState<Array<{ name: string, id: string }>>([]);
		const getCarriers = async () => setCarriers(await apiService.get('/carriers') || []);

		const router = useRouter();

		const [delivery, updateDelivery] = useState<IDelivery>({} as IDelivery);
		const getDelivery = async (id: string) => updateDelivery(await apiService.get(`/deliveries/${id}`));

		//const [driver, setDriver] = useState(null);
        /* getDriver = async () =>{
            const driverId = delivery.driver;
            console.log("Driver: " + driverId);
            setDriver(await apiService.get(`/users/${driverId}`));
        };*/

		useEffect(() => {
			getDelivery(id).then(null);
			getCarriers().then(null);
			//getDriver().then(null);
		}, [router]);


		const submit: FormEventHandler = async (e) => {
			e.preventDefault();
		};



	   const downloadAwb = async () => {
	   	    await apiService.download('/deliveries/pdf/'+delivery.ledger[0].code);
	   	    // await getDeliveryStatus();
	   };


	   const createAwb = async (carrier: string) => {
			await apiService.post('/carriers/create-awb', {
				deliveryId: id,
				carrier
			});
			await getDelivery(id);
			// await getDeliveryStatus();
	   };

		return (
			<div>
				<form className='space-y-8 ' onSubmit={submit}>
					<div className="bg-white shadow overflow-hidden sm:rounded-lg">
						<div className="px-2 py-2 sm:px-2">
							<div className='flex flex-wrap flex-grow '>
								<div className='flex-1'>
									<h3 className="text-lg leading-6 font-medium text-gray-900">Expeditor</h3>
								</div>
								<div className='flex-1'>
									<h3 className="text-lg leading-6 font-medium text-gray-900">Destinatar</h3>
								</div>
							</div>
						</div>
						<div className="border-t border-gray-200 px-2 py-2 sm:px-2">
							<div className='flex flex-wrap flex-grow '>
								<div className=' flex-1'>
									<div className='block text-sm font-medium text-gray-700'>
										{delivery.sourceContact} ({delivery.sourceEmail}), <PhoneIcon
										className={'h-5 w-5 text-gray-400 inline-block '}/>{delivery.sourcePhone}
									</div>
									<div className='block text-sm font-medium text-gray-700'>
										{delivery.sourceCity} ({delivery.sourceCounty}), {delivery.sourceAddress} {delivery.sourcePostalCode}
									</div>
								</div>
								<div className='flex-1'>
									<div className='block text-sm font-medium text-gray-700'>
										<div className='block text-sm font-medium text-gray-700'>
											{delivery.destinationContact} ({delivery.destinationEmail}), <PhoneIcon
											className={'h-5 w-5 text-gray-400 inline-block '}/>{delivery.destinationPhone}
										</div>
										<div className='block text-sm font-medium text-gray-700'>
											{delivery.destinationCity} ({delivery.destinationCounty}), {delivery.destinationAddress} {delivery.destinationPostalCode}
										</div>
									</div>
								</div>

							</div>

						</div>
					</div>


					<div className='bg-white shadow overflow-hidden sm:rounded-lg my-4'>
						<div className="px-2 py-2 sm:px-2">
							<h3 className="text-lg leading-6 font-medium text-gray-900">Detalii</h3>
						</div>
						<div className="border-t border-gray-200 px-2 py-2 sm:px-2">
							<div className='flex flex-wrap flex-grow '>
								<div className='flex-1'>
									Pret: {delivery.deliveryPrice} lei
								</div>
								<div className='flex-1'>
									Greutate: {delivery.weight} grame
								</div>
								<div className='flex-1'>
									Inaltime x Latime x Lungime: {delivery.height}x{delivery.width}x{delivery.height}
								</div>
								{delivery.cashOnDelivery ? <div className='flex-1'>
									Ramburs: {delivery.charge} ( {delivery.recipientName}, {delivery.recipientIban})
								</div> : ''}
								<div className='flex-1'>
									Deschidere la livrare: {delivery.openOnDelivery ? 'Da' : 'Nu'}
								</div>
							</div>
							<div className='flex flex-wrap flex-grow mt-4 '>
								Continut: {delivery.contents}
							</div>
							<div className='flex flex-wrap flex-grow mt-4 '>
                            	Driver: {delivery.driverId}
                            </div>

							<div className='flex flex-wrap flex-grow mt-4 '>
								Creat la : {fdt(delivery.sentToCarrierAt)}
							</div>

						</div>
					</div>

					<div>
						<div className='flex justify-end'>
							<button
								type='button'
								onClick={() => downloadAwb()}
								className='bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
							>
								Descarca AWB
							</button>

							<button
								type='button'
								onClick={() => router.push('/deliveries')}
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

							{(carriers || []).map(carrier => <div className='inline-block'>
								<button
									type='button'
									onClick={() => createAwb(carrier.id)}
									className='ml-3 bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
								>
									Creaza AWB pentru {carrier.name}
								</button>
							</div>)}

						</div>
						{delivery?.ledger?.map(awb => <AWBDetails carriers={carriers} awb={awb}/>)}

					</div>
				</form>
			</div>
		);
	}
;
Delivery.getLayout = getLayout;

export const getServerSideProps = async ({params}: any) => {
	const {id} = params;
	return {
		props: {id}
	};
};

export default Delivery;
