import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
    name: 'filter',
    initialState: {
        value: 'all'
    },
    reducers: {
        changeFilter: (state, action) => {
            if (action.payload === 'active') {
                state.value = 'active';
            }
            else if (action.payload === 'completed') {
                state.value = 'completed';
            }
            else state.value = 'all';
        }
    }
});

export const { changeFilter } = filterSlice.actions;
export default filterSlice.reducer;