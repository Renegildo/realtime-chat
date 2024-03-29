import { Account, Client, Databases } from 'appwrite';

export const PROJECT_ID = import.meta.env.VITE_PROJECT_ID;
export const DATABASE_ID = import.meta.env.VITE_DATABASE_ID;
export const COLLECTION_ID_MESSAGES = import.meta.env.VITE_COLLECTION_ID_MESSAGES;

const client = new Client();

export const databases = new Databases(client);
export const account = new Account(client);

client
	.setEndpoint('https://cloud.appwrite.io/v1')
	.setProject(PROJECT_ID);

export default client;