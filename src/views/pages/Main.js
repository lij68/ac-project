import React from 'react';
import Carousel from 'react-material-ui-carousel';

import 회계 from './images/회계.jpg'
import 인사 from './images/인사.jpg'
import 물류 from './images/물류.jpg'

const Main = () => {
	const items = [
		{
			imgAddress: 회계
		},
		{
			imgAddress: 인사
		},
		{
			imgAddress: 물류
		}
	]
	return (
		<Carousel
			duration={1000}
		>
			{
				items.map(
					(item, i) =>
						<div style={{width: '100%', height: '800px', display:'flex'}}>
							<img src={item.imgAddress} style={{width: '100%', height: '100%'}}/>
						</div>
				)
			}
		</Carousel>
	);
};

export default Main;
