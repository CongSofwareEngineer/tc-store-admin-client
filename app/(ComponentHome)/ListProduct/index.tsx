import ItemProduct from '@/components/ItemProduct';
import LoadingGetData from '@/components/LoadingGetData';
import MyCollapse from '@/components/MyCollapse';
import { TYPE_PRODUCT } from '@/constants/admin';
import { FilterAPI } from '@/constants/app';
import useProductByLimit from '@/hooks/tank-query/useProductByLimit';
import useLanguage from '@/hooks/useLanguage';
import { getUrlProduct } from '@/utils/functions';
import Link from 'next/link';
import { AiOutlineRight } from 'react-icons/ai';
export type ListProductType = {
	title?: string;
	type?: string;
};

const ListProduct = ({ title, type = 'all' }: ListProductType) => {
	const { data, isLoading } = useProductByLimit(type, 5);
	const { translate } = useLanguage();

	const getUrl = () => {
		if (type === TYPE_PRODUCT.shoes) {
			return 'shoes';
		}
		return `shop?${FilterAPI.Category}=${type || 'all'}`;
	};

	const renderListItem = () => {
		return (
			<div className="pb-3 flex gap-3 md:gap-5 overflow-x-auto w-full">
				<LoadingGetData loading={isLoading} colDesktop={5} />

				{Array.isArray(data?.data) &&
					data?.data?.map((item) => {
						return <ItemProduct showFeedback showSold key={item.keyName} item={item} href={getUrlProduct(item)} className={'w-[180px] md:w-[230px]   md:h-[350px]'} />;
					})}

				{Array.isArray(data?.data) && data?.data?.length === 0 && <div>{translate('warning.noData')}</div>}
			</div>
		);
	};

	const renderTitle = () => {
		return (
			<div className="flex flex-1 justify-between">
				<div>{title}</div>
				<Link onClick={(event) => event.stopPropagation()} href={getUrl()} className="text-medium cursor-pointer hover:font-semibold  text-green-600">
					<span> {translate('textPopular.viewMore')}</span>
					<AiOutlineRight className="text-sm ml-2" />
				</Link>
			</div>
		);
	};

	return (
		<MyCollapse classNameTitle="pl-0" title={renderTitle()}>
			{renderListItem()}
		</MyCollapse>
	);
};

export default ListProduct;
