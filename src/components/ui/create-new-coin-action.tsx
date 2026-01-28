import { useNavigate } from '@tanstack/react-router';
import { Button } from './button';
import { ROUTES } from '@/constant';
import { PlusIcon } from 'lucide-react';
import { useConnection } from 'wagmi';
import { toast } from 'sonner';

const CreateNewCoinAction = () => {
  const navigate = useNavigate();
  const { isConnected } = useConnection();

  const onClick = () => {
    if (!isConnected) {
      toast.error('Please connect your wallet to create a new coin');
      return;
    }
    navigate({ to: ROUTES.CREATE_COIN, replace: true });
  };

  return (
    <Button size='icon' className='ml-2' onClick={onClick} type='button'>
      <PlusIcon className='size-4' />
    </Button>
  );
};

export default CreateNewCoinAction;
