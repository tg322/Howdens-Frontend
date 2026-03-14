export const initialNewPortfolioContextReducer = {
  portfolioName: "",
  nameFinished: false,
  portfolioFiles: [],
  overFileCount:false,
  overFileSize:false,
  filesFinished:false
};

export function NewPortfolioContextReducer(state, action) {
  switch (action.type) {

    case "SET_PORTFOLIO_NAME":
      return {
        ...state,
        portfolioName: action.payload,
      };

    case "SET_NAME_FINISHED":
      return {
        ...state,
        nameFinished: action.payload,
      };

    case "SET_PORTFOLIO_FILES":
      return {
        ...state,
        portfolioFiles: action.payload,
        overFileCount: false,
        overFileSize: false,
      };

    case "SET_OVER_FILE_COUNT":
        return{
            ...state,
            overFileCount: action.payload
        };
    
    case "SET_OVER_FILE_SIZE":
        return{
            ...state,
            overFileSize: action.payload
        };
    case "SET_FILES_FINISHED":
        return{
            ...state,
            filesFinished:action.payload
        };

    default:
      return state;
  }
}