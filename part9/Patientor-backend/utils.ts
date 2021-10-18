import { Gender,NewPatientEntry, Entry } from "./type";

const checkString = (str: unknown): str is string => {
    return str instanceof String;
};

const parser = (value: unknown): string => {
    if (!checkString(value)) {
      throw new Error('Missing or incorrect field/s');
    }
    return value;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parserGender = (gender: any): Gender => {
    if(!Object.values(Gender).includes(gender)){
        throw new Error('Missing or incorrect gender');
    }
    return gender
};
  
type PatientEntry = {
    name: unknown,
    dateOfBirth: unknown,
    ssn: unknown,
    gender: unknown,
    entries: Entry[],
    occupation: unknown
  };
export const toNewPatientEntry = ({ name, dateOfBirth, ssn, gender, entries, occupation }: PatientEntry): NewPatientEntry => {
    const entry: NewPatientEntry = {
      name: parser(name),
      dateOfBirth: parser(dateOfBirth),
      ssn: parser(ssn),
      gender: parserGender(gender),
      entries: entries,
      occupation: parser(occupation),
    };
  
    return entry;
  };