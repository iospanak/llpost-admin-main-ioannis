import {getLayout} from '../components/layouts/site-layout';
import {DeliveriesList} from '../components/deliveries-list';

const Deliveries = () => {
	return DeliveriesList('');
};
Deliveries.getLayout = getLayout;
//
// export function getServerSideProps({query = {page: 1, q: ''}}) {
// 	const {page = 1, q = ''} = query;
// 	return {props: {page, q}};
// }

export default Deliveries;
