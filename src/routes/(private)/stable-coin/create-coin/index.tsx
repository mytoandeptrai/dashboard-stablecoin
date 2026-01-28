import { createFileRoute } from '@tanstack/react-router';
import { CreateCoinContainer } from '@/modules/(private)/create-coin';

export const Route = createFileRoute('/(private)/stable-coin/create-coin/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <CreateCoinContainer />;
}
