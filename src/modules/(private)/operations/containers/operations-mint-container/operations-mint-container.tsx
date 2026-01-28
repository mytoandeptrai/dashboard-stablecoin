import { PageContainer } from '@/components/containers';
import { FormInput } from '@/components/form-fields/form-input';
import { FormNumberInput } from '@/components/form-fields/form-number-input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { FormWrapper } from '@/components/ui/form';
import type { FCC } from '@/types';
import { ArrowLeft } from 'lucide-react';
import { useOperationsMintContainer } from '../../hooks';

type OperationsMintContainerProps = {
  id: string;
};

const OperationsMintContainer: FCC<OperationsMintContainerProps> = () => {
  const { form, isLoading, onSubmit, onBack } = useOperationsMintContainer();
  return (
    <PageContainer
      pageTitle='Mint Tokens'
      pageDescription='Create new tokens and add them to circulation'
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
              label={'Amount to mint'}
              placeholder={'Enter amount to mint (e.g., 1000)'}
              required
              decimalScale={2}
              thousandSeparator
            />
            <FormInput
              control={form.control}
              disabled={isLoading}
              name='memo'
              label={'Memo'}
              placeholder={'Add a note about this mint'}
            />
          </CardContent>
          <CardFooter className='flex justify-end gap-2'>
            <Button type='button' variant='outline' disabled={isLoading} onClick={() => form.reset()}>
              Reset
            </Button>
            <Button type='submit' disabled={isLoading} className='w-fit'>
              Mint Tokens
            </Button>
          </CardFooter>
        </Card>
      </FormWrapper>
    </PageContainer>
  );
};

export default OperationsMintContainer;
