import {data} from '../data/diagnoses';
import { Diagnosis } from '../type';

export const getDiagnoses = (): Diagnosis[] => {
    return data;
  };
