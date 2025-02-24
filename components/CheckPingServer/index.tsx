import useLanguage from '@/hooks/useLanguage';
import useModalDrawer from '@/hooks/useModalDrawer';
import ClientApi from '@/services/clientApi';
import { useLayoutEffect } from 'react';
import ModalDelete from '../ModalDelete';

const CheckPingServer = () => {
	const { openModalDrawer } = useModalDrawer();
	const { translate } = useLanguage();
	useLayoutEffect(() => {
		(async () => {
			const res = await ClientApi.pingServer();
			if (!res?.data && process.env.NEXT_PUBLIC_ENABLE_CHECK_SERVER_WORKING) {
				openModalDrawer({
					content: <ModalDelete titleConfirm={translate('common.continue')} disableCancel title={translate('pingServer.title')} des={translate('pingServer.des')} />,
					configModal: {
						overClickClose: false,
						showBtnClose: false,
					},
				});
			}
		})();
	}, []);

	return <></>;
};

export default CheckPingServer;
