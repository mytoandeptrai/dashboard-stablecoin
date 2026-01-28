import { Route } from '@/routes/(private)/stable-coin/$stablecoinId/operations';

export const useOperationsContainer = () => {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();

  const onClickAction = (action: string) => {
    navigate({
      search: { ...search, action },
      replace: true,
    });
  };

  return {
    action: search?.action,
    onClickAction,
  };
};
