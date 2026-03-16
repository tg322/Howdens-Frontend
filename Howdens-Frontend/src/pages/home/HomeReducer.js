export const contextState = {
    idle:"IDLE",
    success:"SUCCESS",
    ready:"READY",
    error:"ERROR",
}


export const initialHomeContextReducer = {
    status:"IDLE",
    portfilios:[]
};

export function HomeContextReducer(state, action) {
  switch (action.type) {
    case "INIT":
        return{
            ...state,
            status:"LOADING"
        }
    
    case "INIT_SUCCESS":
        return{
            ...state,
            portfolios:action.payload,
            status:"READY"
        }
    default:
      return state;
  }
}