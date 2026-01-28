import { createFileRoute } from '@tanstack/react-router';
import { NotSelectedContainer } from '@/modules/(private)/not-selected';

export const Route = createFileRoute('/(private)/stable-coin/not-selected/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <NotSelectedContainer />;
}
