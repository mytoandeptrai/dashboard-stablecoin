'use client';

import { Button } from '@/components/ui/button';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { ROUTES } from '@/constant';
import { useDebounce } from '@/hooks/use-debounce';
import { useTranslation } from '@/integrations/i18n';
import { cn } from '@/lib/utils';
import { useNavigate, useParams } from '@tanstack/react-router';
import { SearchIcon } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

const TOKEN_LIST_KEY = 'token-list';

export interface TokenItem {
  name: string;
  symbol: string;
  configId?: string;
  [key: string]: unknown;
}

interface SearchTokenInputProps {
  onSelectToken?: (token: TokenItem) => void;
  placeholder?: string;
  className?: string;
}

// Simulate API call with Promise
const searchTokens = (tokens: TokenItem[], query: string): Promise<TokenItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (!query.trim()) {
        resolve(tokens);
        return;
      }

      const lowerQuery = query.toLowerCase();
      const filtered = tokens.filter(
        (token) => token.name.toLowerCase().includes(lowerQuery) || token.symbol.toLowerCase().includes(lowerQuery)
      );
      resolve(filtered);
    }, 300); // Simulate network delay
  });
};

export default function SearchTokenInput({ className }: SearchTokenInputProps) {
  const { t } = useTranslation('common');
  const navigate = useNavigate();
  // Use generic useParams - stablecoinId will be undefined when not on $stablecoinId route
  const { stablecoinId } = useParams({ strict: false }) as { stablecoinId?: string };

  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [tokens, setTokens] = useState<TokenItem[]>([]);
  const [filteredTokens, setFilteredTokens] = useState<TokenItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const debouncedSearchValue = useDebounce(searchValue, 300);

  // Load tokens from localStorage
  const loadTokensFromStorage = useCallback(() => {
    try {
      const stored = localStorage.getItem(TOKEN_LIST_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as TokenItem[];
        setTokens(parsed);
        setFilteredTokens(parsed);
        return parsed;
      }
    } catch (error) {
      console.error('Failed to load tokens from localStorage:', error);
    }
    return [];
  }, []);

  // Load tokens when dialog opens
  useEffect(() => {
    if (open) {
      loadTokensFromStorage();
    }
  }, [open, loadTokensFromStorage]);

  // Search tokens when debounced value changes
  useEffect(() => {
    const performSearch = async () => {
      if (!open) return;

      setIsLoading(true);
      try {
        const results = await searchTokens(tokens, debouncedSearchValue);
        setFilteredTokens(results);
      } catch (error) {
        console.error('Search error:', error);
        setFilteredTokens([]);
      } finally {
        setIsLoading(false);
      }
    };

    performSearch();
  }, [debouncedSearchValue, tokens, open]);

  // Handle token selection
  const handleSelectToken = (token: TokenItem) => {
    if (!token.symbol) return;
    navigate({
      to: ROUTES.OPERATIONS,
      params: { stablecoinId: token.symbol as string },
      search: { action: undefined },
      replace: true,
    });
    setSearchValue('');
    setOpen(false);
  };

  return (
    <>
      <Button
        variant='outline'
        className={cn(
          'relative h-9 w-full justify-start rounded-[0.5rem] bg-background font-normal text-muted-foreground text-sm shadow-none sm:pr-12',
          className
        )}
        onClick={() => setOpen(true)}
      >
        <SearchIcon className='mr-2 size-4' />
        {stablecoinId ? <span className='text-muted-foreground'>{stablecoinId}</span> : t('labels.choose-stable-coin')}
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen} title={t('labels.choose-stable-coin')}>
        <CommandInput placeholder={t('labels.choose-stable-coin')} value={searchValue} onValueChange={setSearchValue} />
        <CommandList>
          {isLoading ? (
            <div className='flex items-center justify-center py-6'>
              <div className='size-5 animate-spin rounded-full border-2 border-primary border-t-transparent' />
            </div>
          ) : (
            <>
              <CommandEmpty>{t('labels.no-stable-coin-found')}</CommandEmpty>
              <CommandGroup>
                {filteredTokens.map((token, index) => (
                  <CommandItem
                    key={`${token.symbol}-${index}`}
                    value={`${token.name} ${token.symbol}`}
                    onSelect={() => handleSelectToken(token)}
                  >
                    <span className='font-medium'>{token.name}</span>
                    <span className='ml-2 text-muted-foreground'>- {token.symbol}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}
