import _ from "lodash";
import {
  CREATE_PATIENT,
  FETCH_PATIENTS,
  FETCH_PATIENT,
  DELETE_PATIENT
} from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_PATIENTS:
      return _.mapKeys(action.payload, "email");
    case FETCH_PATIENT:
      return { ...state, [action.payload.email]: action.payload };
    case CREATE_PATIENT:
      return { ...state, [action.payload.email]: action.payload };
    case DELETE_PATIENT:
      return _.omit(state, action.payload);
    default:
      return state;
  }
};
