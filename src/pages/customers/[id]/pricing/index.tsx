import React, {useState, useEffect} from 'react';
import {getLayout} from '../../../../components/layouts/site-layout';
import getConfig from 'next/config';
import {ZonePricesEditor} from '../../../../components/zone-prices-editor';
import {apiService} from "../../../../services/api.service";

// @ts-ignore
const Pricing = ({customerId, counties}: { customerId: string, counties: any[] }) => {

return <div>
		{ZonePricesEditor(counties, customerId, false)}
	</div>;
};
Pricing.getLayout = getLayout;

export default Pricing;

export const getServerSideProps = async ({params}: any) => {
	const r1 = await fetch(`${getConfig().serverRuntimeConfig.api}/locations/counties`);
	const counties = await r1.json();
	const {id: customerId} = params;
	return {
		props: {customerId, counties}
	};
};