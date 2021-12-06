export interface Diagnosis {
    code: string,
    name: string,
    latin?: string
  }
export enum Type {
    Hospital = 'Hospital',
    HealthCheck = 'HealthCheck',
    OccupationalHealthcare = 'OccupationalHealthcare'
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
export interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnosis['code']>;
  }
  export interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
  }
  
  export interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge: {
      date: string;
      criteria: string;
    }
  }
  
  export interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare";
    sickLeave?: {
      startDate: string;
      endDate: string;
    }
  }
export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
  }
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

export type NewEntry =
  | Omit<HospitalEntry, "id">
  | Omit<OccupationalHealthcareEntry, "id">
  | Omit<HealthCheckEntry, "id">;
export type EntryWithoutId = UnionOmit<Entry, 'id'>;

export type PublicPatient = Omit<Patient, 'ssn' | 'entries' >
export type NewPatientEntry = Omit<Patient, 'id'>;
export enum Gender {
    Male = 'Male',
    Female = 'Female',
    Other = 'Other'
  }
  