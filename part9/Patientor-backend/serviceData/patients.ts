import {data} from '../data/patients';
import { NewEntry,NewPatientEntry,Patient, PublicPatient } from '../type';
import {v1 as uuid} from 'uuid';

export const getPat = (): Patient[] => {
  const list:Patient[]=data.map(p=>({
    ...p,
    entries:[]
  }));
  return list;
};
export const GetPatById=(id:string): Patient | undefined =>{
  const patient=getPat().find(pat=>pat.id===id);
  return patient
}

export const addPat = (newPatient: NewPatientEntry): PublicPatient => {
  const patientReady = {
    id: uuid(),
    ...newPatient
  };
  data.push(patientReady);
  return patientReady;
};

export const addEntry = (id: string, entry: NewEntry): NewEntry => {

  const newEntry = {
      id: uuid(),
      ...entry
  };
  console.log("here")
  const p = data.find(patient => patient.id === id);
  
  if (p!==undefined) {
    p.entries.push(newEntry)
  }

  return newEntry;
};
