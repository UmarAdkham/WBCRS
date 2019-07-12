import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import obligorReducer from "./obligorReducer";
import elementReducer from "./elementReducer";
import scorecardReducer from "./scorecardReducer";

export default combineReducers({
  auth: authReducer,
  oblgr: obligorReducer,
  element: elementReducer,
  scorecard: scorecardReducer,
  errors: errorReducer
});