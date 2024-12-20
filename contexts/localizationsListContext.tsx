import Localization from "@/model/localization";
import { fetchLocalizations } from "@/services/localizationAPIService";
import { createContext, useCallback, useContext, useState } from "react";

// Define the context type
interface LocalizationsListContextType {
    localizations: Localization[];
    loadLocalizations: () => Promise<void>;
}

const LocalizationsListContext = createContext<LocalizationsListContextType | undefined>(undefined)

export const LocalizationsListProvider = ({children} : { children: React.ReactNode }) => {

    const [localizations, setLocalizations] = useState<Localization[]>([])
    
    const loadLocalizations = useCallback(async()=> {
        try {
            const fetchedLocalizations = await fetchLocalizations()
            setLocalizations(fetchedLocalizations ?? [])
        } catch (error) {
            console.error('Erro ao carregar itens:', error);
        }
    },[])
    
    return(
        <LocalizationsListContext.Provider value={{ localizations, loadLocalizations }}>
            {children}
        </LocalizationsListContext.Provider>
    )
}

export const useLocalizationsList = (): LocalizationsListContextType => {
    const context = useContext(LocalizationsListContext);
    if (!context) {
        throw new Error("useLocalizationsList must be used within a LocalizationsListProvider");
    }
    return context;
};