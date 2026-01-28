import { PageContainer } from '@/components/containers';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card';
import {
  Stepper,
  StepperContent,
  StepperIndicator,
  StepperItem,
  StepperNav,
  StepperPanel,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from '@/components/ui/stepper';
import { cn } from '@/lib/utils';
import type { FCC } from '@/types';
import { useCreateCoinContainer } from '../../hooks';
import CreateCoinStep_1Container from '../create-coin-step-1-container/create-coin-step-1-container';
import CreateCoinStep_2Container from '../create-coin-step-2-container/create-coin-step-2-container';
import CreateCoinStep_3Container from '../create-coin-step-3-container/create-coin-step-3-container';
import CreateCoinStep_4Container from '../create-coin-step-4-container/create-coin-step-4-container';
import CreateCoinStep_5Container from '../create-coin-step-5-container/create-coin-step-5-container';
import { FormWrapper } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';

type CreateCoinContainerProps = {};

const CreateCoinContainer: FCC<CreateCoinContainerProps> = () => {
  const { t, currentStep, steps, form, options, onSubmit, setCurrentStep, onClickNext, onClickBack } =
    useCreateCoinContainer();
  return (
    <PageContainer pageTitle={t('title')}>
      <FormWrapper form={form} onSubmit={onSubmit}>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between pb-2'>
            <CardDescription>{t('description')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='mx-auto max-w-7xl'>
              <Stepper value={currentStep} onValueChange={setCurrentStep} className='space-y-8'>
                <StepperNav>
                  {steps.map((step, index) => (
                    <StepperItem key={index} step={index + 1} className='relative flex-1 items-start'>
                      <StepperTrigger className='flex flex-col gap-2.5' allowedToClickTrigger={false}>
                        <StepperIndicator>{index + 1}</StepperIndicator>
                        <StepperTitle
                          className={cn('', {
                            'text-muted-foreground': index + 1 !== currentStep,
                          })}
                        >
                          {t(step.label)}
                        </StepperTitle>
                      </StepperTrigger>
                      {steps.length > index + 1 && (
                        <StepperSeparator className='absolute inset-x-0 top-3 left-[calc(50%+0.875rem)] m-0 group-data-[orientation=horizontal]/stepper-nav:w-[calc(100%-2rem+0.225rem)] group-data-[orientation=horizontal]/stepper-nav:flex-none group-data-[state=completed]/step:bg-primary' />
                      )}
                    </StepperItem>
                  ))}
                </StepperNav>

                <StepperPanel className='text-sm'>
                  {steps.map((step) => (
                    <StepperContent
                      className='flex w-full items-center justify-center py-6'
                      key={step.value}
                      value={step.value}
                    >
                      {step.value === 1 && <CreateCoinStep_1Container />}
                      {step.value === 2 && <CreateCoinStep_2Container options={options.supplyType} />}
                      {step.value === 3 && <CreateCoinStep_3Container options={options} />}
                      {step.value === 4 && <CreateCoinStep_4Container />}
                      {step.value === 5 && <CreateCoinStep_5Container />}
                    </StepperContent>
                  ))}
                </StepperPanel>
              </Stepper>
            </div>
          </CardContent>
          <Separator />
          <CardFooter>
            <div className='flex w-full items-end justify-end gap-2.5'>
              <Button type='button' variant='outline' onClick={onClickBack} disabled={currentStep === 1}>
                {t('buttons.previous', { ns: 'common' })}
              </Button>
              <Button type='button' onClick={onClickNext} disabled={!form.formState.isValid}>
                {currentStep === steps.length
                  ? t('buttons.deploy', { ns: 'common' })
                  : t('buttons.next', { ns: 'common' })}
              </Button>
            </div>
          </CardFooter>
        </Card>
      </FormWrapper>
    </PageContainer>
  );
};

export default CreateCoinContainer;
