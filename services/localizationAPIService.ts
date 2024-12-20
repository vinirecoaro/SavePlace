import env from '@/constants/env';
import Localization from "@/model/localization";

const apiGqlUrl = env.API_GRAPH_QL;

export async function fetchLocalizations() {
 let locsList : Localization[] = []
       try {
         const response = await fetch(apiGqlUrl, {
             method: "POST",
             headers: {
                 'Content-Type': 'application/json'
             },
             body: JSON.stringify({
                 query: `query {
                     localizations {
                       id,name,latitude,longitude,pinColor
                     }
                   }`,
             })
         }); // POST
         const { data } = await response.json()
         locsList = data.localizations
         return locsList
     } catch (error) {
         console.log("Falha ao buscar localizações")
     } 
}

export async function postLocalization( newLocalization : Localization){
    try {
        const response = await fetch(apiGqlUrl,{
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: `mutation($localization: addLocalizationInput) { 
                addLocalization(localization: $localization) { 
                    id 
                    }
                }`, 
                variables: {
                    localization: {
                        name: newLocalization.name,
                        latitude: newLocalization.latitude,
                        longitude: newLocalization.longitude,
                        pinColor: newLocalization.pinColor
                    }
                }
            }),
        })
        const {data} = await response.json()
        const id = data.addLocalization.id
        const addedLoc : Localization = new Localization(
            id,
            newLocalization.name,
            newLocalization.latitude,
            newLocalization.longitude,
            newLocalization.pinColor
        )
        return addedLoc
    } catch (error) {
        console.log(error)
    }
}

export async function changeLocalization(updatedLocalization : Localization){
    try {
        const response = await fetch(apiGqlUrl,{
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: `mutation($localization: updateLocalizationInput) { 
                updateLocalization(localization: $localization) { 
                    id,
                    name,
                    latitude,
                    longitude,
                    pinColor
                    }
                }`, 
                variables: {
                    localization: {
                        id: updatedLocalization.id,
                        name: updatedLocalization.name,
                        latitude: updatedLocalization.latitude,
                        longitude: updatedLocalization.longitude,
                        pinColor: updatedLocalization.pinColor
                    }
                }
            }),
        })
        const updetedLoc : Localization = new Localization(
            updatedLocalization.id,
            updatedLocalization.name,
            updatedLocalization.latitude,
            updatedLocalization.longitude,
            updatedLocalization.pinColor
        )
        return updetedLoc
    } catch (error) {
        console.log(error)
    }
}

