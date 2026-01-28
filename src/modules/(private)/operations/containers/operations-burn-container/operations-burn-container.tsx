import { PageContainer } from '@/components/containers';
import { FormInput } from '@/components/form-fields/form-input';
import { FormNumberInput } from '@/components/form-fields/form-number-input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { FormWrapper } from '@/components/ui/form';
import type { FCC } from '@/types';
import { ArrowLeft } from 'lucide-react';
import { useOperationsBurnContainer } from '../../hooks';

type OperationsBurnContainerProps = {
  id: string;
};

const OperationsBurnContainer: FCC<OperationsBurnContainerProps> = () => {
  const { form, isLoading, onSubmit, onBack } = useOperationsBurnContainer();
  return (
    <PageContainer
      pageTitle='Burn Tokens'
      pageDescription='Remove tokens from circulation'
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
            <FormNumberInput
              control={form.control}
              disabled={isLoading}
              name='amount'
              label={'Amount to burn'}
              placeholder={'Enter amount to burn (e.g., 1000)'}
              required
              decimalScale={2}
              thousandSeparator
            />
            <FormInput
              control={form.control}
              disabled={isLoading}
              name='memo'
              label={'Memo'}
              placeholder={'Add a note about this burn'}
            />
          </CardContent>
          <CardFooter className='flex justify-end gap-2'>
            <Button type='button' variant='outline' disabled={isLoading} onClick={() => form.reset()}>
              Reset
            </Button>
            <Button type='submit' disabled={isLoading} className='w-fit'>
              Burn Tokens
            </Button>
          </CardFooter>
        </Card>
      </FormWrapper>
    </PageContainer>
  );
};

export default OperationsBurnContainer;
