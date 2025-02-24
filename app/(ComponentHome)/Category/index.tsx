import useLanguage from '@/hooks/useLanguage';
import { useCategoryMenu } from '@/zustand/useCategoryMenu';
import Link from 'next/link';
import React from 'react';
import { AiOutlineAlignLeft } from 'react-icons/ai';

const CategoryHome = () => {
	const { translate, lang } = useLanguage();
	const { categoryMenu } = useCategoryMenu();

	const renderContent = () => {
		return (
			<div className="flex flex-col ">
				{categoryMenu.map((e, index) => {
					return (
						<Link className={`text-black hover:text-black hover:font-semibold md:px-3 md:py-4 border-b-[1px] ${categoryMenu.length - 1 !== index && 'border-green-300'}`} key={e.keyName} href={`/shop?category=${e.keyName}`}>
							<div className="hover:underline cursor-pointer">{e?.lang && e.lang[lang]}</div>
						</Link>
					);
				})}
			</div>
		);
	};
	return (
		<div className={`bg-white border-zinc-500 border-[1px] w-full  flex flex-col md:rounded-xl rounded-lg overflow-hidden  `}>
			<div className={`border-b-[1px] border-zinc-500 w-full flex justify-between items-center  p-3 bg-green-200 `}>
				<div className="flex items-center gap-2">
					<AiOutlineAlignLeft style={{ fontSize: 20 }} />
					<div className="text-medium ">{translate('menuProduct.category')}</div>
				</div>
			</div>
			{renderContent()}
		</div>
	);
};

export default CategoryHome;
