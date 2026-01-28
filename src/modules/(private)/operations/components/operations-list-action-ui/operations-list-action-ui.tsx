import { cn } from '@/lib/utils';
import type { FCC } from '@/types';
import type { LucideProps } from 'lucide-react';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';

type OperationsListActionUiProps = {
  operations: {
    id: string;
    label: string;
    icon: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>;
    href: string;
    color: string;
  }[];
  onClickAction: (action: string) => void;
};

const OperationsListActionUi: FCC<OperationsListActionUiProps> = ({ operations, onClickAction }) => {
  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
      {operations.map((op) => {
        const Icon = op.icon;
        const isDisabled = op.href === '#';
        return (
          <button
            type='button'
            key={op.id}
            onClick={() => onClickAction(op.href)}
            disabled={isDisabled}
            className={cn(
              'flex cursor-pointer flex-col items-center gap-2 rounded-lg border-2 border-slate-200 bg-white p-6 transition-all hover:border-slate-300 hover:shadow-md',
              {
                'cursor-not-allowed border-slate-200 bg-slate-50 opacity-50': isDisabled,
              }
            )}
          >
            <div className={`flex size-12 items-center justify-center rounded-full ${op.color}`}>
              {Icon && <Icon className='h-6 w-6 text-slate-700' />}
            </div>
            <p className='text-center font-medium text-sm'>{op.label}</p>
            {isDisabled && <p className='text-slate-500 text-xs'>Coming soon</p>}
          </button>
        );
      })}
    </div>
  );
};

export default OperationsListActionUi;
