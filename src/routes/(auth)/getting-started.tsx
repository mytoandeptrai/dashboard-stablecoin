import { ConnectButton } from '@rainbow-me/rainbowkit';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(auth)/getting-started')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ConnectButton label='Connect to your wallet' accountStatus='address' chainStatus='icon' showBalance={false} />
  );
}
