import { images } from '@/configs/images';
import useAos from '@/hooks/useAos';
import Image from 'next/image';
import React from 'react';

const InfoHome = () => {
	useAos();

	const renderItem = (image: string, title: string, des: string) => {
		return (
			<div data-aos="zoom-in" className="flex gap-4 flex-1 items-center justify-center ">
				<div className="w-14 h-14">
					<Image fill src={image} alt={`info-home-${title}`} className="!relative !h-auto" />
				</div>
				<div className="flex-1 justify-start items-start">
					<div className="uppercase font-semibold text-medium">{title}</div>
					<div>{des}</div>
				</div>
			</div>
		);
	};
	return (
		<div className="w-full flex flex-col md:flex-row gap-8 md:gap-7 justify-between md:mt-8">
			{renderItem(images.icon.iconResponsibility, 'TINH THẦN VÀ TRÁCH NHIỆM', 'Mỗi sản phẩm là biểu hiện trí tuệ và công sức bỏ ra.')}
			{renderItem(images.icon.iconShield, 'CAM KẾT CHẤT LƯỢNG', 'Sản phẩm chúng tôi 100% chất lượng và tự nhiên.')}
			{renderItem(images.icon.iconSupport, 'CHĂM SÓC KHÁCH HÀNG 24/7', 'Hỗ trợ và giải đáp thắc mắc các thông tin 24/7.')}
		</div>
	);
};

export default InfoHome;
