export const initialAuthContextReducer = {
    status:"IDLE",
    userDetails:null,
    loading:false,
    errorMessage:''
}

export function AuthContextReducer(
  state,
  action
){
  switch (action.type) {
    case "SET_USER_DETAILS":
        return { ...state, userDetails: action.payload };
    case "SET_ERROR_MESSAGE":
        return { ...state, errorMessage: action.payload };
    case "SET_LOADING":
        return { ...state, loading: action.payload };
    default:
        return state;
  }
}

