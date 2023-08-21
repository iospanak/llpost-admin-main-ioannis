import React from 'react';
import {getLayout} from '../components/layouts/site-layout';
import getConfig from 'next/config';
import {ZonesEditor} from '../components/zones-editor';

// @ts-ignore
const PostaRomana = ({data: {counties}}) => {
	return <div>
		<h4 className='h4'>Poșta Română</h4>
		{ZonesEditor(counties, 'posta-romana', true)}
	</div>;
};
PostaRomana.getLayout = getLayout;

export default PostaRomana;

export async function getServerSideProps() {
	const r1 = await fetch(`${getConfig().serverRuntimeConfig.api}/locations/counties`);
	const counties = await r1.json();
	return {props: {data: {counties}}};
}
