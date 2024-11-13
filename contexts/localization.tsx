import Localization from '@/model/localization'; // Certifique-se de importar corretamente a classe Localization
import React, { createContext, useContext, useState } from 'react';

// Tipo para o contexto
interface LocalizationContextType {
  localization: Localization | null; // O valor pode ser uma instância de Localization ou null
  setLocalization: (localization: Localization) => void; // Função para atualizar o estado da localização
}

// Criar o contexto com um valor padrão de null
const LocalizationContext = createContext<LocalizationContextType | undefined>(undefined);

// Provedor de contexto
export const LocalizationProvider = ({ children }: { children: React.ReactNode }) => {
  const [localization, setLocalization] = useState<Localization | null>(null);

  return (
    <LocalizationContext.Provider value={{ localization, setLocalization }}>
      {children}
    </LocalizationContext.Provider>
  );
};

// Hook para acessar o contexto
export const useLocalization = () => {
  const context = useContext(LocalizationContext);
  if (!context) {
    throw new Error('useLocalization must be used within a LocalizationProvider');
  }
  return context;
};
