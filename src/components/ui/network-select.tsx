import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from './select';
import { useOnboardingStore } from '@/stores/use-onboarding-store';

const NETWORK_OPTIONS = [
  { label: 'Testnet', value: 'testnet' },
  { label: 'Mainnet', value: 'mainnet' },
];

const NetworkSelect = () => {
  const selectedNetwork = useOnboardingStore((state) => state.selectedNetwork);
  const setSelectedNetwork = useOnboardingStore((state) => state.setSelectedNetwork);
  return (
    <Select value={selectedNetwork} onValueChange={setSelectedNetwork}>
      <SelectTrigger>
        <SelectValue placeholder='Select a network' />
      </SelectTrigger>
      <SelectContent>
        {NETWORK_OPTIONS.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default NetworkSelect;
