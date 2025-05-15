import { Client } from "appwrite";
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID ;


const Client = new Client().setEndPoint('https:://cloud.appwrite.io/v1').setProject(PROJECT_ID)
const database = new Databases(client)

export const updateSearchCount = async(searchTerm, movie) => {
    
}