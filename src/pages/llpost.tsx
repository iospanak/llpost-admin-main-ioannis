import React from 'react';
import {getLayout} from '../components/layouts/site-layout';
import getConfig from 'next/config';
import {DriverZonesEditor} from '../components/driver-zones-editor';

// @ts-ignore
const LLPost = ({data: {counties}}) => {
	return <div>
		<h4 className='h4'>LLPost</h4>
		{DriverZonesEditor(counties, 'llpost', false)}
	</div>;
};
LLPost.getLayout = getLayout;

export default LLPost;

export async function getServerSideProps() {
	const r1 = await fetch(`${getConfig().serverRuntimeConfig.api}/locations/counties`);
	const counties = await r1.json();
	return {props: {data: {counties}}};
}
