import React from 'react';

import {AppProps} from 'next/app';

import '../styles/main.css';
import '../styles/quill.scss';
import SiteLayout from '../components/layouts/site-layout';

const MyApp = ({Component, pageProps}: AppProps) => {
	const getLayout = Component.hasOwnProperty('getLayout') ?
		// @ts-ignore
		Component['getLayout'] || ((page: any) => <SiteLayout children={page} />) : (page: any) => page;
	return getLayout(<>
		<Component {...pageProps} />
	</>);
};


export default MyApp;
