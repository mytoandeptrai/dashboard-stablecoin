import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(private)/stable-coin/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/(private)/stable-coin/"!</div>;
}
