import patient from '../data/patients.json';
import { Gender, Patient } from '../type';
import {v1 as uuid} from 'uuid';

export const getPat = (): Patient[] => {
 // const list:Patient[]=[]
  const list:Patient[]=patient.map(p=>({
    ...p,
    gender:p.gender=="male"?Gender.Male:Gender.Female
  }));
  return list;
};

export const addPat = (newPatient: Patient): Patient => {
  const patientReady = {
    id: uuid(),
    ...newPatient
  };
  patient.push(patientReady);
  return patientReady;
};
  
