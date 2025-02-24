import { images } from '@/configs/images';
import useModalDrawer from '@/hooks/useModalDrawer';
import { Button } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import ModalDelete from '../ModalDelete';

const Header = ({ children }: { children: React.ReactNode }) => {
	const { openModalDrawer } = useModalDrawer();
	return (
		<header>
			<div className="w-full h-14 " />
			<div className="w-full h-14 fixed z-10 inset-0 ">
				<div className="border-b-2 border-green-300 w-full flex m-auto justify-center items-center bg-white">
					<div id="id-container-header" className="md:px-12 px-5 h-14 w-full max-w-[1350px] flex md:gap-3 justify-between items-center">
						<div className="h-full relative ">
							<Link href={'/'}>
								<Image src={images.logo} alt="logo-tcstore" fill className="!relative !w-auto !h-full" />
							</Link>
						</div>
						<Button
							onClick={() => {
								openModalDrawer({
									content: <ModalDelete />,
									onlyDrawer: true,
									configDrawer: {
										title: 'Hello',
										// height: '100dvh',
										// width: '100dvh',
										position: 'bottom',
									},
								});
							}}
						>
							openModalDrawer
						</Button>
						{/* <Nav />
            <Account /> */}
					</div>
				</div>
			</div>
			{children}
		</header>
	);
};

export default Header;
