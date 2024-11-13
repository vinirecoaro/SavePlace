import React, { createContext, useContext, useState } from 'react';

// Tipo para o contexto
interface EditLocalizationContextType {
  editLocalization: boolean | null; // O valor pode ser uma instância de Localization ou null
  setEditLocalization: (action: boolean) => void; // Função para atualizar o estado da localização
}

// Criar o contexto com um valor padrão de null
const EditLocalizationContext = createContext<EditLocalizationContextType | undefined>(undefined);

// Provedor de contexto
export const EditLocalizationProvider = ({ children }: { children: React.ReactNode }) => {
  const [editLocalization, setEditLocalization] = useState<boolean | null>(null);

  return (
    <EditLocalizationContext.Provider value={{ editLocalization, setEditLocalization }}>
      {children}
    </EditLocalizationContext.Provider>
  );
};

// Hook para acessar o contexto
export const useEditLocalization = () => {
  const context = useContext(EditLocalizationContext);
  if (!context) {
    throw new Error('useLocalization must be used within a LocalizationProvider');
  }
  return context;
};
