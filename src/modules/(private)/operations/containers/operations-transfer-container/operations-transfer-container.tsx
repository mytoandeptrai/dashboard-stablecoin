import { PageContainer } from '@/components/containers';
import { FormInput } from '@/components/form-fields/form-input';
import { FormNumberInput } from '@/components/form-fields/form-number-input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { FormWrapper } from '@/components/ui/form';
import type { FCC } from '@/types';
import { ArrowLeft } from 'lucide-react';
import { useOperationsTransferContainer } from '../../hooks';

type OperationsTransferContainerProps = {
  id: string;
};

const OperationsTransferContainer: FCC<OperationsTransferContainerProps> = () => {
  const { form, isLoading, onSubmit, onBack } = useOperationsTransferContainer();
  return (
    <PageContainer
      pageTitle='Transfer Tokens'
      pageDescription='Transfer tokens to a specific address'
      pageHeaderAction={
        <div className='mt-2'>
          <Button variant='outline' type='button' onClick={onBack}>
            <ArrowLeft className='size-4' />
            Back
          </Button>
        </div>
      }
    >
      <FormWrapper form={form} onSubmit={onSubmit}>
        <Card className='mt-2'>
          <CardContent className='space-y-6'>
            <FormInput
              control={form.control}
              disabled={isLoading}
              name='address'
              label={'Recipient Address'}
              placeholder={'Enter recipient address (e.g., 0x1234567890123456789012345678901234567890)'}
              required
            />
            <FormNumberInput
              control={form.control}
              disabled={isLoading}
              name='amount'
              label={'Amount to transfer'}
              placeholder={'Enter amount to transfer (e.g., 1000)'}
              required
              decimalScale={2}
              thousandSeparator
            />
            <FormInput
              control={form.control}
              disabled={isLoading}
              name='memo'
              label={'Memo'}
              placeholder={'Add a note about this transfer'}
            />
          </CardContent>
          <CardFooter className='flex justify-end gap-2'>
            <Button type='button' variant='outline' disabled={isLoading} onClick={() => form.reset()}>
              Reset
            </Button>
            <Button type='submit' disabled={isLoading} className='w-fit'>
              Transfer Tokens
            </Button>
          </CardFooter>
        </Card>
      </FormWrapper>
    </PageContainer>
  );
};

export default OperationsTransferContainer;
