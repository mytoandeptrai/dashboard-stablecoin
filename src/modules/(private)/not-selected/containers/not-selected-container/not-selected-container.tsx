import { PageContainer } from '@/components/containers';
import { Empty, EmptyDescription, EmptyMedia, EmptyTitle } from '@/components/ui/empty';
import { VStack } from '@/components/utilities';
import type { FCC } from '@/types';
import { CirclePoundSterling } from 'lucide-react';

type NotSelectedContainerProps = {
  //
};

const NotSelectedContainer: FCC<NotSelectedContainerProps> = () => {
  return (
    <PageContainer fullHeight>
      <VStack align='center' justify='center' className='flex-1'>
        <Empty className='gap-2'>
          <EmptyMedia className='bg-transparent'>
            <CirclePoundSterling className='size-28' />
          </EmptyMedia>
          <EmptyTitle className='text-2xl'>Choose a stablecoin to start operating!</EmptyTitle>
          <div>
            <EmptyDescription className='max-w-md text-center'>You have not chosen a stablecoin yet.</EmptyDescription>
            <EmptyDescription className='max-w-md text-center'>Choose an item to operate.</EmptyDescription>
          </div>
        </Empty>
      </VStack>
    </PageContainer>
  );
};

export default NotSelectedContainer;
