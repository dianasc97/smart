import { Client } from "../types/clientsTypes"; 

const CLIENTS_KEY = "clients";
const EXECUTIVES_KEY = "executives";

export const getClients = (): Client[] => {
  const clients = localStorage.getItem(CLIENTS_KEY);
  return clients ? JSON.parse(clients) : [];
};

export const getExecutives = (): string[] => {
  const executives = localStorage.getItem(EXECUTIVES_KEY);
  return executives ? JSON.parse(executives) : [];
};

export const getClientById = (id: string): Client | null => {
  return getClients().find((c) => c.id === id) || null;
};

export const addClient = (client: Client) => { 
  const clients = getClients();
  clients.push(client);
  localStorage.setItem(CLIENTS_KEY, JSON.stringify(clients));
};

export const addExecutive = (executiveName: string) => {
  const executives = getExecutives();
  
  if (!executives.includes(executiveName)) {
    executives.push(executiveName);
    localStorage.setItem(EXECUTIVES_KEY, JSON.stringify(executives));
  }
};

export const updateClient = (updatedClient: Client) => {
  const clients = getClients().map((c) =>
    c.id === updatedClient.id ? updatedClient : c
  );
  localStorage.setItem(CLIENTS_KEY, JSON.stringify(clients));
};

export const removeClient = (id: string) => { 
  const clients = getClients().filter((c) => c.id !== id);
  localStorage.setItem(CLIENTS_KEY, JSON.stringify(clients));
};

export const removeExecutive = (executiveName: string) => {
  const executives = getExecutives().filter((e) => e !== executiveName);
  localStorage.setItem(EXECUTIVES_KEY, JSON.stringify(executives));
};
