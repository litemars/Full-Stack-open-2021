import { Gender,NewPatientEntry, Entry, NewEntry } from "./type";

const checkString = (str: unknown): str is string => {
  return typeof str === 'string';
};

const isDischarge = (param: any): param is {date: string, criteria: string;} => {
  if (!param.date|| !param.criteria) {
    return false;
  } else {
    return true;
  }
};

const parserDischarge = (value: unknown): {date: string, criteria: string}=>{
  console.log("discharge",value,typeof value)
  if(!isDischarge(value)){
    throw new Error('Incorrect or missing discharge');
  }
  return value;
}
const parser = (value: unknown): string => {
  console.log("check",value)
    if (!checkString(value)) {
      throw new Error('Missing or incorrect field/s');
    }
    return value;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parserGender = (gender: any): Gender => {
  switch(gender){
    case "Other": return Gender.Other
    case "Female": return Gender.Female
    case "Male":return Gender.Male
    default: return Gender.Other
  }
};
  
type PatientEntry = {
    name: unknown,
    dateOfBirth: unknown,
    ssn: unknown,
    gender: unknown,
    entries: Entry[],
    occupation: unknown
  };
export const toNewPatientEntry = ({ name, dateOfBirth, ssn, gender, occupation }: PatientEntry): NewPatientEntry => {
    
  const entry: NewPatientEntry = {
      name: parser(name),
      dateOfBirth: parser(dateOfBirth),
      ssn: parser(ssn),
      gender: parserGender(gender),
      entries: [],
      occupation: parser(occupation),
    };
  
    return entry;
  };
type EntryFields = { description : unknown, date: unknown, specialist: unknown, type: unknown, healthCheckRating: unknown, discharge: unknown, employerName: unknown, diagnosisCodes:String[] };

export const toNewEntry = ( { description, date, specialist, diagnosisCodes, type, healthCheckRating, discharge }: EntryFields ): NewEntry => {
    
    const newEntry = {
      description: parser(description),
      date: parser(date),
      specialist: parser(specialist),
      discharge: parserDischarge(discharge),
      diagnosisCodes: [parser(diagnosisCodes[0])],
      type: parser(type),
      healthCheckRating: parser(healthCheckRating),   
    } as NewEntry;
    console.log("new entry",newEntry)
    return newEntry;
  };