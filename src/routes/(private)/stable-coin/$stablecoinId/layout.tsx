import { ROUTES } from '@/constant';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/(private)/stable-coin/$stablecoinId')({
  beforeLoad: ({ params }) => {
    const { stablecoinId } = params;
    /** If no stablecoinId or stablecoinId is a child route which requires -> navigate to not selected page */
    if (!stablecoinId || stablecoinId === 'operations') {
      throw redirect({
        to: ROUTES.NOT_SELECTED,
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
