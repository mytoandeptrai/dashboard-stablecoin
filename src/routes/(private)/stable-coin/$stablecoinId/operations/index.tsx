import { OperationsContainer } from '@/modules/(private)/operations';
import { createFileRoute } from '@tanstack/react-router';

import z from 'zod';

const operationsSearchSchema = z.object({
  action: z.string().optional(),
});

export const Route = createFileRoute('/(private)/stable-coin/$stablecoinId/operations/')({
  validateSearch: (search) => {
    const result = operationsSearchSchema.parse(search);
    return {
      action: result.action ?? undefined,
    };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { stablecoinId } = Route.useParams();
  return <OperationsContainer id={stablecoinId} />;
}
