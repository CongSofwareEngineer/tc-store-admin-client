'use client';
import ContainerContent from '@/components/ContainerContent';
import Header from '@/components/Header';
import useAos from '@/hooks/useAos';
import useFirstLoadPage from '@/hooks/useFirstLoadPage';
import useLanguage from '@/hooks/useLanguage';
import useMedia from '@/hooks/useMedia';
import { NextPage } from 'next';
import React from 'react';
import Banner from './(ComponentHome)/Banner';
import InfoHome from './(ComponentHome)/InfoHome';
import ListProduct from './(ComponentHome)/ListProduct';
import SocialMedia from './(ComponentHome)/SocialMedia';
import CategoryHome from './(ComponentHome)/Category';
import { FilterAPI } from '@/constants/app';

const HomeScreen: NextPage = () => {
	useAos();
	useFirstLoadPage();
	const { translate } = useLanguage();
	const { isMobile } = useMedia();

	const renderDesktop = () => {
		return (
			<div>
				<div className="flex  gap-5">
					<div className="w-[250px]" data-aos="fade-right">
						<CategoryHome />
					</div>
					<Banner />
				</div>
				<div className="w-[90%] m-auto my-14">
					<InfoHome />
				</div>
				<div className="w-full flex flex-col gap-4" data-aos="fade-up">
					<ListProduct title={translate('textPopular.shoes')} type={FilterAPI.Shoes} />

					{/* <ListProduct title={translate('textPopular.nest')} type={'nest'} /> */}
				</div>
				<SocialMedia />
			</div>
		);
	};

	const renderMobile = () => {
		return (
			<div>
				<Banner />
				<div className="w-[90%] m-auto my-8">
					<InfoHome />
				</div>
				<div className="mb-3" />
				<ListProduct title={translate('textPopular.shoes')} type={FilterAPI.Shoes} />
				<div className="mb-3" />
				{/* <ListProduct title={translate('textPopular.nest')} type={'nest'} /> */}
			</div>
		);
	};

	const renderHToSEO = () => {
		return (
			<>
				<h2 className="sr-only">Sản Phẩm Nổi Bật Tại TC Store</h2>
				<h2 className="sr-only">Giày Dép Thời Trang - Phong Cách & Chất Lượng</h2>
				<h2 className="sr-only">Yến Sào Cao Cấp - Bổ Dưỡng Cho Sức Khỏe</h2>
				<h2 className="sr-only">Laptop Hiện Đại - Công Nghệ Hàng Đầu</h2>
				<h2 className="sr-only">Cà Phê Nguyên Chất - Hương Vị Tự Nhiên</h2>
				<h2 className="sr-only">Mua Sắm Nhiều Mặt Hàng Khác Tại TC Store</h2>
			</>
		);
	};

	return (
		<>
			<Header>
				<h1 className="sr-only">TC Store - Cửa Hàng Đa Dạng Sản Phẩm: Giày Dép, Yến Sào, Laptop, Cà Phê & Nhiều Mặt Hàng Khác</h1>
			</Header>
			<ContainerContent>
				{renderHToSEO()}

				{isMobile ? renderMobile() : renderDesktop()}
			</ContainerContent>
		</>
	);
};

export default HomeScreen;
