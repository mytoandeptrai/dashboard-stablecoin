import { PageContainer } from '@/components/containers';
import { useTranslation } from '@/integrations/i18n';

const DashboardContainer = () => {
  const { t } = useTranslation('dashboard-page');

  return (
    <PageContainer pageTitle={t('title')}>
      <div className='space-y-6'>
        {/* Dialog 2: Network Selection - shown after wallet connected */}
        {/* <NetworkSelectionDialog
        isOpen={walletSelection.showNetworkSelectionDialog}
        selectedNetwork={walletSelection.selectedNetwork}
        onNetworkChange={walletSelection.handleNetworkChange}
        onAccept={walletSelection.handleNetworkAccept}
        onCancel={walletSelection.handleNetworkCancel}
      /> */}
      </div>
    </PageContainer>
  );
};

export default DashboardContainer;
