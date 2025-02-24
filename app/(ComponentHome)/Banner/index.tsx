import MyImage from '@/components/MyImage';
import { images } from '@/configs/images';
import useAos from '@/hooks/useAos';
import useMedia from '@/hooks/useMedia';

import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
const ContainerList = styled.div`
	display: flex;
	flex-flow: column wrap;
	width: 100%;
	height: 100%;
	transition: ease 1000ms;
	scroll-snap-type: x mandatory;
	@media screen and (max-width: 568px) {
		height: 80vw;
	}
`;
const Banner = () => {
	useAos();
	const { isMobile } = useMedia();

	const [index, setIndex] = useState(0);
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	function resetTimeout() {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}
	}

	useEffect(() => {
		resetTimeout();
		timeoutRef.current = setTimeout(() => handleControl(false), 3000);
		return () => {
			resetTimeout();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [index]);

	const handleControl = (isPre = true) => {
		resetTimeout();
		if (isPre) {
			if (index > 0) {
				setIndex((prevIndex) => prevIndex - 1);
			} else {
				setIndex(4);
			}
		}

		if (!isPre) {
			if (index < listBanner.length - 1) {
				setIndex((prevIndex) => prevIndex + 1);
			} else {
				setIndex(0);
			}
		}
	};

	const listBanner = [
		{
			url: images.home.banner.bannerCoffee,
		},
		{
			url: images.home.banner.bannerLaptop,
		},
		{
			url: images.home.banner.bannerLaptop2,
		},
		{
			url: images.home.banner.bannerNest,
		},
		{
			url: images.home.banner.bannerNest2,
		},
	];

	const renderListImg = () => {
		return (
			<ContainerList style={{ transform: `translateX(${-index * 100}%)` }}>
				{listBanner.map((e) => {
					return (
						<div className="flex flex-shrink-0  relative overflow-hidden w-full h-full" key={e.url}>
							<MyImage
								alt={`img-banner-${e.url}`}
								src={e.url}
								style={{
									minWidth: '100%',
									minHeight: '100%',
									maxWidth: 'unset',
								}}
								className="absolute select-none !w-auto !h-auto"
							/>
						</div>
					);
				})}
			</ContainerList>
		);
	};

	const renderControl = () => {
		return (
			<>
				<div className="absolute md:top-[50%] top-[45%] left-3 right-[-20px]">
					<MyImage alt={`icon-btnPre`} src={images.home.banner.btnSlider} onClick={() => handleControl()} className="!relative !w-[45px] !h-auto cursor-pointer hover:scale-110" />
				</div>
				<div className="absolute md:bottom-[5vh] bottom-[5vw] flex md:gap-4 gap-3 w-full justify-center items-center">
					{listBanner.map((_, indexItem) => {
						return (
							<div onClick={() => setIndex(indexItem)} key={`icon-${indexItem}`} className="  hover:scale-110 cursor-pointer md:w-9 w-8  flex justify-center items-center relative">
								<MyImage alt={`icon-${index}`} src={images.home.banner[indexItem === index ? 'btnPositionActive' : 'btnPositionUnActive']} className="!relative !w-full !h-auto " />
								<div className="absolute-center text-white  text-center">{indexItem + 1}</div>
							</div>
						);
					})}
				</div>
				<div className="absolute right-5 md:top-[50%] top-[45%]">
					<MyImage alt={`icon-btnPre`} src={images.home.banner.btnSlider} onClick={() => handleControl(false)} className=" rotate-180 !relative !w-[45px] !h-auto cursor-pointer hover:scale-110" />
				</div>
			</>
		);
	};
	return (
		<div className="w-full overflow-hidden relative" data-aos={isMobile ? '' : 'fade-left'}>
			{renderListImg()}
			{renderControl()}
		</div>
	);
};

export default Banner;
