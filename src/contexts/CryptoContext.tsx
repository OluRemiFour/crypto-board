
import React, { createContext, useContext, useState } from 'react';

interface CryptoContextType {
  selectedCrypto: {
    id: string;
    symbol: string;
    name: string;
  };
  setSelectedCrypto: (crypto: { id: string; symbol: string; name: string }) => void;
}

const CryptoContext = createContext<CryptoContextType | undefined>(undefined);

export const CryptoProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedCrypto, setSelectedCrypto] = useState({
    id: 'bitcoin',
    symbol: 'btc',
    name: 'Bitcoin'
  });

  return (
    <CryptoContext.Provider value={{ selectedCrypto, setSelectedCrypto }}>
      {children}
    </CryptoContext.Provider>
  );
};

export const useCrypto = () => {
  const context = useContext(CryptoContext);
  if (context === undefined) {
    throw new Error('useCrypto must be used within a CryptoProvider');
  }
  return context;
};
