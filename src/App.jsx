import { useReducer } from "react";

const ACTIONS = {
    ADD_TODO: 'add-todo',
    TOGGLE_TASK: 'toggle-task',
    FILTER_ALL: 'filter-all',
    FILTER_ACTIVE: 'filter-active',
    FILTER_COMPLETED: 'filter-completed',
    CLEAR_COMPLETED: 'clear-completed',
    TOGGLE_THEME: 'toggle-theme'
}

function reducer(state, action) {
    switch (action.type) {
        case ACTIONS.ADD_TODO:
            let addList = state.todos.slice();
            addList.push({ id: action.id, isComplete: false, text: action.payload });
            return { ...state, todos: addList };
        case ACTIONS.TOGGLE_TASK:
            let item;
            for (let i = 0; i < state.todos.length; i++) {
                if (state.todos[i].id === action.payload) item = i;
            }
            let toggleList = state.todos.slice();
            toggleList[item].isComplete = !toggleList[item].isComplete;
            return { ...state, todos: toggleList };
        case ACTIONS.FILTER_ALL:
            return { ...state, filter: 'all' };
        case ACTIONS.FILTER_ACTIVE:
            return { ...state, filter: 'active' };
        case ACTIONS.FILTER_COMPLETED:
            return { ...state, filter: 'completed' };
        case ACTIONS.CLEAR_COMPLETED:
            let clearCompleted = state.todos.slice().filter(el => el.isComplete === false)
            return { ...state, todos: clearCompleted };
        case ACTIONS.TOGGLE_THEME:
            return { ...state, theme: state.theme === 'dark' ? 'light' : 'dark' }
        default:
            return state;
    }
}

function generateKey() {
    return new Date().getTime();
}

function App() {
    let [state, dispatch] = useReducer(reducer, { todos: [
        { id: 0, isComplete: true, text: 'Complete online Javscript course' },
        { id: 1, isComplete: false, text: 'Jog around the park 3x' },
        { id: 2, isComplete: false, text: '10 minutes meditation' },
        { id: 3, isComplete: false, text: 'Read for 1 hour' },
        { id: 4, isComplete: false, text: 'Pick up groceries' },
        { id: 5, isComplete: false, text: 'Complete ToDo App on Frontend Mentor' },
    ], filter: 'all', theme: 'dark' });

    let brightBlue = 'hsl(220, 98%, 61%)';
    let mainBackground = state.theme === 'dark' ? '#181824' : '#f7f7f9';
    let cardBackground = state.theme === 'dark' ? '#25273c' : '#ffffff';
    let primaryText = state.theme === 'dark' ? '#FFFFFF' : '#646373';
    let secondaryText = state.theme === 'dark' ? '#4f5166' : '#c0bfc4';
    let borderColor = state.theme === 'dark' ? '#2c2e43' : '#EDEDEF';
    let shadowColor = state.theme === 'dark' ? 'rgba(0, 0, 0, 0.192)' : 'rgba(129, 129, 129, 0.192)' ;

    return (
        <div className="container-all" style={{ backgroundColor: mainBackground }}>
            <div className="bg-img-mobile mobile"><img src={state.theme === 'dark' ? '/images/bg-mobile-dark.jpg' : '/images/bg-mobile-light.jpg'} alt="Background" /></div>
            <div className="bg-img-desktop desktop"><img src={state.theme === 'dark' ? '/images/bg-desktop-dark.jpg' : '/images/bg-desktop-light.jpg'} alt="Background" /></div>
            <div className="header">
                <div className="todo-title">TODO</div>
                <div className="container-theme-icon" onClick={() => dispatch({ type: ACTIONS.TOGGLE_THEME })}>
                    <img src={state.theme === 'dark' ? '/images/icon-sun.svg' : '/images/icon-moon.svg'} className='theme-icon' alt="Theme icon" />
                </div>
            </div>

            <div className="container-main">
                <div className="input-row" style={{ backgroundColor: cardBackground, boxShadow: '0px 15px 20px 5px ' + shadowColor }}>
                    <div className="circle-shape" style={{ borderColor: borderColor }}></div>
                    <input type="text" className="input-bar" placeholder="Create a new todo..." onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            dispatch({ type: ACTIONS.ADD_TODO, payload: e.target.value, id: generateKey() });
                            e.target.value = '';
                        }
                    }} />
                </div>
                <div className="container-list" style={{ backgroundColor: cardBackground, boxShadow: '0px 15px 20px 5px ' + shadowColor }}>

                    {state.todos.map((el) => {
                        if (state.filter === 'active') {
                            if (el.isComplete === true) return null;
                        }
                        if (state.filter === 'completed') {
                            if (el.isComplete === false) return null;
                        }
                        return <div key={el.id} className="list-item" style={{
                            textDecoration: el.isComplete && 'line-through',
                            color: el.isComplete ? secondaryText : primaryText,
                            borderColor: borderColor
                        }}>
                            <button className="toggle-btn"
                                style={{
                                    background: el.isComplete && 'linear-gradient(to bottom, hsl(192, 100%, 67%), hsl(280, 87%, 65%))',
                                    borderColor: borderColor
                                }}
                                onClick={() => dispatch({ type: ACTIONS.TOGGLE_TASK, payload: el.id })}>
                                <img src="/images/icon-check.svg" className="icon-check" alt="Check icon" style={{ display: !el.isComplete && 'none' }} />
                            </button>
                            {el.text}
                        </div>
                    })}
                </div>
                <div className="last-row mobile" style={{ backgroundColor: cardBackground, borderColor: borderColor, boxShadow: '0px 15px 20px 5px ' + shadowColor }}>
                    <div className="items-left">{state.todos.length} items left</div>
                    <button className="btn-clear-completed" onClick={() => dispatch({ type: ACTIONS.CLEAR_COMPLETED })}>Clear Completed</button>
                </div>

                <div className="container-filters-desktop desktop" style={{ backgroundColor: cardBackground, borderColor: borderColor, boxShadow: '0px 15px 20px 5px ' + shadowColor }}>
                    <div className="items-left">{state.todos.length} items left</div>
                    <div className="buttons-group">
                        <div className="btn-all"
                            style={{ color: state.filter === 'all' && brightBlue }}
                            onClick={() => state.filter !== 'all' && dispatch({ type: ACTIONS.FILTER_ALL })} >All</div>
                        <div className="btn-active"
                            style={{ color: state.filter === 'active' && brightBlue }}
                            onClick={() => state.filter !== 'active' && dispatch({ type: ACTIONS.FILTER_ACTIVE })} >Active</div>
                        <div className="btn-completed"
                            style={{ color: state.filter === 'completed' && brightBlue }}
                            onClick={() => state.filter !== 'completed' && dispatch({ type: ACTIONS.FILTER_COMPLETED })} >Completed</div>
                    </div>
                    <div className="btn-clear-completed" onClick={() => dispatch({ type: ACTIONS.CLEAR_COMPLETED })} style={{  }}>Clear Completed</div>
                </div>

                <div className="container-filters-mobile mobile" style={{ backgroundColor: cardBackground, boxShadow: '0px 15px 20px 5px ' + shadowColor }}>
                    <button className="btn-all"
                        style={{ color: state.filter === 'all' && brightBlue }}
                        onClick={() => state.filter !== 'all' && dispatch({ type: ACTIONS.FILTER_ALL })} >All</button>
                    <button className="btn-active"
                        style={{ color: state.filter === 'active' && brightBlue }}
                        onClick={() => state.filter !== 'active' && dispatch({ type: ACTIONS.FILTER_ACTIVE })} >Active</button>
                    <button className="btn-completed"
                        style={{ color: state.filter === 'completed' && brightBlue }}
                        onClick={() => state.filter !== 'completed' && dispatch({ type: ACTIONS.FILTER_COMPLETED })} >Completed</button>
                </div>
            </div>
        </div>
    );
}

export default App;