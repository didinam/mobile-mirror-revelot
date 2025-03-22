
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CurrencyOption } from '@/types';

// Sample currency options with exchange rates
const currencyOptions: CurrencyOption[] = [
  { code: 'USD', symbol: '$', name: 'US Dollar', rate: 1, isDefault: true },
  { code: 'EUR', symbol: '€', name: 'Euro', rate: 0.91 },
  { code: 'GBP', symbol: '£', name: 'British Pound', rate: 0.79 },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen', rate: 150.12 },
  { code: 'CAD', symbol: 'CA$', name: 'Canadian Dollar', rate: 1.36 },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', rate: 1.52 },
  { code: 'MYR', symbol: 'RM', name: 'Malaysian Ringgit', rate: 4.73 },
];

interface CurrencyContextType {
  currentCurrency: CurrencyOption;
  availableCurrencies: CurrencyOption[];
  setCurrency: (currencyCode: string) => void;
  formatPrice: (price: number, originalCurrency?: string) => string;
  convertPrice: (price: number, fromCurrency?: string, toCurrency?: string) => number;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentCurrency, setCurrentCurrency] = useState<CurrencyOption>(
    currencyOptions.find(curr => curr.isDefault) || currencyOptions[0]
  );

  useEffect(() => {
    // Check if user has previously selected a currency
    const savedCurrency = localStorage.getItem('userCurrency');
    if (savedCurrency) {
      const currency = currencyOptions.find(c => c.code === savedCurrency);
      if (currency) {
        setCurrentCurrency(currency);
      }
    }
  }, []);

  const setCurrency = (currencyCode: string) => {
    const currency = currencyOptions.find(c => c.code === currencyCode);
    if (currency) {
      setCurrentCurrency(currency);
      localStorage.setItem('userCurrency', currency.code);
    }
  };

  // Convert price from one currency to another
  const convertPrice = (
    price: number, 
    fromCurrency: string = 'USD', 
    toCurrency: string = currentCurrency.code
  ) => {
    if (fromCurrency === toCurrency) return price;
    
    // Find source and target currency info
    const sourceCurrency = currencyOptions.find(c => c.code === fromCurrency);
    const targetCurrency = currencyOptions.find(c => c.code === toCurrency);
    
    if (!sourceCurrency || !targetCurrency) return price;
    
    // Convert to USD first (base currency) then to target currency
    const usdAmount = price / sourceCurrency.rate;
    return usdAmount * targetCurrency.rate;
  };

  // Format price with currency symbol
  const formatPrice = (price: number, originalCurrency: string = 'USD') => {
    const convertedPrice = convertPrice(price, originalCurrency);
    
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currentCurrency.code,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(convertedPrice);
  };

  return (
    <CurrencyContext.Provider value={{ 
      currentCurrency, 
      availableCurrencies: currencyOptions, 
      setCurrency,
      formatPrice,
      convertPrice
    }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
