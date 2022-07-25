import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./slices/themeSlice";
import filterReducer from "./slices/filterSlice";
import tasksReducer from "./slices/tasksSlice";

const store = configureStore({
    reducer: {
        theme: themeReducer,
        filter: filterReducer,
        tasks: tasksReducer
    }
})

export default store;