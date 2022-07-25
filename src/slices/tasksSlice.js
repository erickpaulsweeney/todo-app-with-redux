import { createSlice } from "@reduxjs/toolkit";

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {
        value: [
            { id: 0, isComplete: true, text: 'Complete online Javscript course' },
            { id: 1, isComplete: false, text: 'Jog around the park 3x' },
            { id: 2, isComplete: false, text: '10 minutes meditation' },
            { id: 3, isComplete: false, text: 'Read for 1 hour' },
            { id: 4, isComplete: false, text: 'Pick up groceries' },
            { id: 5, isComplete: false, text: 'Complete ToDo App on Frontend Mentor' },
        ]
    },
    reducers: {
        addTodo: (state, action) => {
            state.value.push({ id: new Date().getTime(), isComplete: false, text: action.payload });
        },
        toggleTask: (state, action) => {
            for (let i = 0; i < state.value.length; i++) {
                if (state.value[i].id === action.payload) {
                    state.value[i].isComplete = !state.value[i].isComplete;
                }
            }
        },
        clearCompleted: (state, action) => {
            let targets = [];
            state.value.forEach((el, idx) => el.isComplete && targets.push(idx));
            for (let i = targets.length - 1; i >= 0; i--) {
                state.value.splice(targets[i], 1);
            }
        }
    }
});


export const { addTodo, toggleTask, clearCompleted } = tasksSlice.actions;
export default tasksSlice.reducer;