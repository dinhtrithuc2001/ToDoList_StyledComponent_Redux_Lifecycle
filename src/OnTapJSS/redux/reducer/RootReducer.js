import { createStore, combineReducers } from "redux";
import ToDoListReducer from "./ToDoListReducer";

const RootReducer = combineReducers({
    ToDoListReducer
})

export const store = createStore(RootReducer)