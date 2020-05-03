import patients from "../apis/patients";
import {
  CREATE_PATIENT,
  FETCH_PATIENTS,
  FETCH_PATIENT,
  DELETE_PATIENT
} from "./types";

export const createPatient = (formValues) => async (dispatch) => {
  const response = await patients.post("/patients", formValues);
  dispatch({ type: CREATE_PATIENT, payload: response.data });
};

export const fetchPatients = () => async dispatch => {
    const response = await patients.get('/patients')
    dispatch({type: FETCH_PATIENTS, payload: response.data})
}

export const fetchPatient = (email) => async dispatch => {
    const response = await patients.get(`/patients/${email}`)

    dispatch({type: FETCH_PATIENT, payload: response.data})
}

export const deletePatient = (email) => async dispatch => {
    await patients.delete(`/patients/${email}`)

    dispatch({type: DELETE_PATIENT, payload: email})
}
