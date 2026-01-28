import { PageContainer } from '@/components/containers';
import type { FCC } from '@/types';
import { useOperationsContainer } from '../../hooks';
import OperationsListActionUi from '../../components/operations-list-action-ui';
import { operations } from './operations-container.config';
import OperationsMintContainer from '../operations-mint-container';
import OperationsBurnContainer from '../operations-burn-container';
import OperationsTransferContainer from '../operations-transfer-container';

type OperationsContainerProps = {
  id: string;
};

const OperationsContainer: FCC<OperationsContainerProps> = ({ id }) => {
  const { action, onClickAction } = useOperationsContainer();

  if (action === 'mint') {
    return <OperationsMintContainer id={id} />;
  }

  if (action === 'burn') {
    return <OperationsBurnContainer id={id} />;
  }

  if (action === 'transfer') {
    return <OperationsTransferContainer id={id} />;
  }

  return (
    <PageContainer pageTitle='Operations' pageDescription='Choose an operation to execute'>
      <OperationsListActionUi operations={operations} onClickAction={onClickAction} />
    </PageContainer>
  );
};

export default OperationsContainer;
