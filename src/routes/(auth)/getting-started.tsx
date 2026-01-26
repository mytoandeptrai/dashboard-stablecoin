import { GettingStartedContainer } from '@/modules/(public)/getting-started';
import { createFileRoute } from '@tanstack/react-router';
export const Route = createFileRoute('/(auth)/getting-started')({
  component: RouteComponent,
});

function RouteComponent() {
  return <GettingStartedContainer />;
}
