import React, {useEffect, useState} from 'react';

import {getLayout} from '../components/layouts/site-layout';
import {apiService} from '../services/api.service';


const Index = () => {


	const [carriers, setCarriers] = useState<Array<{ name: string, id: string }>>([]);
	const getCarriers = async () => setCarriers(await apiService.get('/carriers') || []);

	useEffect(() => {
		getCarriers().then(null);
	}, []);


	return (
		<div>
			<div className='flex flex-wrap -mx-3 mt-6 space-y-6'>
				<div className='w-full sm:w-1/2 lg:w-1/3 px-3'>
					<h5 className='h5'>Curieri</h5>
					<div className='border-gray-300 border rounded-md bg-white'>
						{carriers.map((item) => {
							return (
								<div key={item.id} className={`border-b border-gray-300 flex`}>
									<div className='p-4'>{item.name}</div>
								</div>
							);
						})}
					</div>
				</div>
				<div className='w-full sm:w-1/2 lg:w-1/3 px-3'>
					<h5 className='h5'>Ultimele livrari</h5>
					no data
				</div>
				<div className='w-full sm:w-1/2 lg:w-1/3 px-3'>
					<h5 className='h5'>Ultimele exceptii</h5>
					no data
				</div>
			</div>

		</div>
	);
};
Index.getLayout = getLayout;
export default Index;
