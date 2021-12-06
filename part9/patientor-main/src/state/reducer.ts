import { State } from "./state";
import { Patient, Diagnosis } from "../types";

export type Action =
  |{
    type: 'UPDATE_PATIENT';
    payload: Patient;
    }
  | {
    type: 'SET_DIAGNOSIS_LIST';
    payload: Diagnosis[];
    } 
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    };



export const reducer = (state: State, action: Action): State => {
  console.log("action type",action.type);
  switch (action.type) {
    case 'UPDATE_PATIENT':
            return {
                ...state,
                patients: {
                    ...state.patients,
                    [action.payload.id]: action.payload,
                },
            };
        case 'SET_DIAGNOSIS_LIST':
            return {
                ...state,
                diagnoses: action.payload,
            };
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    default:
      return state;
  }
};
