import {SQLiteDatabase} from 'expo-sqlite'

export const DATABASE_NAME = 'app.db'
export const TB_LOCALIZATIONS_NAME = 'localizations'
const DATABASE_VERSION = 1

//SQL create table
const CREATE_TB_LOCALIZATIONS = `
    CREATE TABLE ${TB_LOCALIZATIONS_NAME} (
        id INTERGER PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        latitude TEXT NOT NULL,
        longitude TEXT NOT NULL,
        pinColor TEXT NOT NULL
    )
`

export async function migrateDb(db : SQLiteDatabase){
    try{
        let response = await db.getFirstAsync<{user_version: number}>('PRAGMA user_version')
        let {user_version : dbVersion} = response ?? {user_version: 0}
        if(dbVersion >= DATABASE_VERSION) return
        if(dbVersion === 0){
            await db.execAsync(`${CREATE_TB_LOCALIZATIONS}`)
        }
        if(dbVersion < DATABASE_VERSION){
            //migracao
        }
        await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`)
    }catch(error){}
}