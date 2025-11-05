import { ConversionContext } from '@/contexts/ConversionContext';
import { useContext } from 'react';

export function useConversion() {
  const context = useContext(ConversionContext);
  if (context === undefined) {
    throw new Error('useConversion must be used within a ConversionProvider');
  }
  return context;
}

