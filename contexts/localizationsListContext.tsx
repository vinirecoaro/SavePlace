import Localization from "@/model/localization";
import { changeLocalization, deleteLocalizationService, fetchLocalizations, postLocalization } from "@/services/localizationAPIService";
import { createContext, useCallback, useContext, useState } from "react";

// Define the context type
interface LocalizationsListContextType {
    localizations: Localization[];
    loadLocalizations: () => Promise<void>;
    addLocalization: (newLocalization: Localization) => Promise<void>;
    updateLocalization: (newLocalization: Localization) => Promise<void>;
    deleteLocalization: (locId : String) => Promise<void>;
}

const LocalizationsListContext = createContext<LocalizationsListContextType | undefined>(undefined)

export const LocalizationsListProvider = ({children} : { children: React.ReactNode }) => {

    const [localizations, setLocalizations] = useState<Localization[]>([])
    
    const loadLocalizations = useCallback(async()=> {
        try {
            const fetchedLocalizations = await fetchLocalizations()
            if(fetchedLocalizations){
                console.log(fetchedLocalizations)
                setLocalizations(fetchedLocalizations)
            }else{
                console.error("localizações nulas");
            }
        } catch (error) {
            console.error('Erro ao carregar itens:', error);
        }
    },[])

    const addLocalization = useCallback( async (newLocalization : Localization) => {
       await postLocalization(newLocalization)
    },[])

    const updateLocalization = useCallback( async (updatedLocalization : Localization) => {
        await changeLocalization(updatedLocalization)
    },[])

    const deleteLocalization = useCallback( async (locId : String) => {
        await deleteLocalizationService(locId)
    },[])
    
    return(
        <LocalizationsListContext.Provider value={{ localizations, loadLocalizations, addLocalization, updateLocalization, deleteLocalization }}>
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