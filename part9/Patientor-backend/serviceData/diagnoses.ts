import diagnoses from '../data/diagnoses.json';
import { Diagnosis } from '../type';

export const getDiagnoses = (): Diagnosis[] => {
    return diagnoses;
  };
