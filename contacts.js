import * as fs from 'fs/promises';
import * as path from 'path';
import shortid from 'shortid';
import createDirname from './lib/dirname.js';
import { handleError } from "./lib/handlerror.js";

const { __dirname } = createDirname(import.meta.url);
const contactsPath = path.join(`${__dirname}`, './db/contacts.json');

export async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
      console.table(JSON.parse(data.toString()));
    
      } catch (error) {
    handleError(error);
  }
}
export async function getContactById(contactId) {
  try {
    
   const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data.toString());
    const contact = contacts.find((contact) => contact.id === contactId);
    console.table(contact);
  } catch (error) {
    handleError(error);
  }
}

export async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data.toString());
    const newContacts = contacts.filter((contact) => contact.id !== contactId);
    
    console.log(`Контакт с id ${contactId} успешно удален`);
    console.table(newListContacts);
  } catch (error) {
    handleError(error);
  }
}

export async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath);
      const contacts = JSON.parse(data.toString());
      const id = shortid();
    
    const newContacts = [...contacts, { id, name, email, phone }];
    await fs.writeFile(contactsPath, JSON.stringify(newContacts));

    console.table(newContacts);
  } catch (error) {
    handleError(error);
  }
}