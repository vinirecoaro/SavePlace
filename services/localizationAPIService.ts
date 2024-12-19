import env from '@/constants/env';
import Localization from "@/model/localization";

const apiGqlUrl = env.API_GRAPH_QL;

export async function fetchItems() {
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
         console.log("Falha na requisição")
     } 
}

