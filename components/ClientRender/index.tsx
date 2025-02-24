'use client';
import React, { useLayoutEffect } from 'react';
import MyModal from '../MyModal';
import { useCategoryMenu } from '@/zustand/useCategoryMenu';
import dynamic from 'next/dynamic';
const MyModalAdmin = dynamic(() => import('@/components/MyModalAdmin'));
const MyDrawer = dynamic(() => import('@/components/MyDrawer'));
const ToastNoti = dynamic(() => import('@/components/ToastNoti'), {
	ssr: false,
});

const ClientRender = ({ children, menuCategory = [] }: { children: React.ReactNode; menuCategory?: any[] }) => {
	const { setCategoryMenu } = useCategoryMenu();

	useLayoutEffect(() => {
		setCategoryMenu(menuCategory);
	}, [menuCategory, setCategoryMenu]);

	return (
		<>
			{children}
			<MyModal />
			<MyDrawer />
			<ToastNoti />
			<MyModalAdmin />
		</>
	);
};

export default ClientRender;
