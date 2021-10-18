export interface Diagnosis {
    code: string,
    name: string,
    latin?: string
  }
export interface Entry {
  }
  
export interface Patient {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: Gender,
    entries: Entry[],
    occupation: string
  }
  export type PublicPatient = Omit<Patient, 'ssn' | 'entries' >
  export type NewPatientEntry = Omit<Patient, 'id'>;
  export enum Gender {
    Male = 'Male',
    Female = 'Female',
    Other = 'Other'
  }
  