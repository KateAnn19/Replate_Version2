import {
  DELETE_PICKUP_START,
  DELETE_PICKUP_SUCCESS,
  DELETE_PICKUP_FAILURE,
  GET_BUSPROFDETAILS_START,
  GET_BUSPROFDETAILS_SUCCESS,
  GET_BUSPROFDETAILS_FAILURE,
  DELETE_BUSPROFILE_START,
  DELETE_BUSPROFILE_SUCCESS,
  DELETE_BUSPROFILE_FAILURE,
  GET_VOLPROFDETAILS_START,
  GET_VOLPROFDETAILS_SUCCESS,
  GET_VOLPROFDETAILS_FAILURE,
  DELETE_VOLPROFILE_START,
  DELETE_VOLPROFILE_SUCCESS,
  DELETE_VOLPROFILE_FAILURE,
  POST_LOGIN_CREDENTIALS_START,
  POST_LOGIN_CREDENTIALS_SUCCESS,
  POST_LOGIN_CREDENTIALS_FAILURE
} from "../actions";

export const initialState = {
  isFetching: false,
  pickups: [],
  error: "",
  busProf: {},
  volProf: {},
  loginInfo: {}
};

export const replateReducer = (state = initialState, action) => {
  // console.log("in replate reducer", state);
  // console.log("in replate reducer action", action);
  // console.log("in replate reducer action.payload", action.payload);
  switch (action.type) {
    case GET_BUSPROFDETAILS_START:
      return {
        ...state,
        isFetching: true,
      };
    case GET_BUSPROFDETAILS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        busProf: action.payload,
      };
    case GET_BUSPROFDETAILS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    case GET_VOLPROFDETAILS_START:
      return {
        ...state,
        isFetching: true,
      };
    case GET_VOLPROFDETAILS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        volProf: action.payload,
      };
    case GET_VOLPROFDETAILS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    case DELETE_VOLPROFILE_START:
      return {
        ...state,
        isFetching: true,
      };
    case DELETE_VOLPROFILE_SUCCESS:
      return {
        ...state,
        isFetching: false,
      };
    case DELETE_VOLPROFILE_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    case DELETE_BUSPROFILE_START:
      return {
        ...state,
        isFetching: true,
      };
    case DELETE_BUSPROFILE_SUCCESS:
      return {
        ...state,
        isFetching: false,
      };
    case DELETE_BUSPROFILE_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    case DELETE_PICKUP_START:
      return {
        ...state,
        isFetching: true,
      };
    case DELETE_PICKUP_SUCCESS:
      return {
        ...state,
        isFetching: false,
        pickups: state.pickups.filter((p) => p.id !== action.payload),
      };
    case DELETE_PICKUP_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
      case POST_LOGIN_CREDENTIALS_START:
      return {
        ...state,
        isFetching: true
      };
    case POST_LOGIN_CREDENTIALS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        loginInfo: localStorage.setItem("token", action.payload)
        // loginInfo: action.payload
      };
    case POST_LOGIN_CREDENTIALS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
