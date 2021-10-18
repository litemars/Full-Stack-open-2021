import patient from '../data/patients.json';
import { Gender,NewPatientEntry,Patient, PublicPatient } from '../type';
import {v1 as uuid} from 'uuid';

export const getPat = (): Patient[] => {
  const list:Patient[]=patient.map(p=>({
    ...p,
    gender:p.gender=="Male"?Gender.Male:p.gender=="Female"?Gender.Female:Gender.Other,
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
  patient.push(patientReady);
  return patientReady;
};
  
