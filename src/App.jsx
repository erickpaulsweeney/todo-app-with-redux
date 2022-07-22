import { useReducer } from "react";
import { 
    GlobalStyle, 
    All, 
    BackgroundMobile, 
    BackgroundDesktop, 
    Header, 
    Title, 
    IconDiv,
    Icon,
    Main,
    InputRow, 
    Circle, 
    Input, 
    List, 
    ListItem,
    ToggleButton, 
    CheckIcon, 
    BottomRow, 
    ItemsLeft, 
    ClearButton, 
    FiltersDesktop, 
    ButtonsDiv, 
    FilterButton, 
    FiltersMobile
} from "./StyledComponents"

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

    let [state, dispatch] = useReducer(reducer, {
        todos: [
            { id: 0, isComplete: true, text: 'Complete online Javscript course' },
            { id: 1, isComplete: false, text: 'Jog around the park 3x' },
            { id: 2, isComplete: false, text: '10 minutes meditation' },
            { id: 3, isComplete: false, text: 'Read for 1 hour' },
            { id: 4, isComplete: false, text: 'Pick up groceries' },
            { id: 5, isComplete: false, text: 'Complete ToDo App on Frontend Mentor' },
        ], filter: 'all', theme: 'dark'
    });

    let bgImgMobile = state.theme === 'dark' ? '/images/bg-mobile-dark.jpg' : '/images/bg-mobile-light.jpg';
    let bgImgDesktop = state.theme === 'dark' ? '/images/bg-desktop-dark.jpg' : '/images/bg-desktop-light.jpg';
    let themeIcon = state.theme === 'dark' ? '/images/icon-sun.svg' : '/images/icon-moon.svg';
    let brightBlue = 'hsl(220, 98%, 61%)';
    let mainBackground = state.theme === 'dark' ? '#181824' : '#f7f7f9';
    let cardBackground = state.theme === 'dark' ? '#25273c' : '#ffffff';
    let primaryText = state.theme === 'dark' ? '#FFFFFF' : '#646373';
    let secondaryText = state.theme === 'dark' ? '#4f5166' : '#c0bfc4';
    let borderColor = state.theme === 'dark' ? '#2c2e43' : '#EDEDEF';
    let itemBorderColor = state.theme === 'dark' ? '#37384c' : '#EDEDEF';
    let shadowColor = state.theme === 'dark' ? 'rgba(0, 0, 0, 0.192)' : 'rgba(129, 129, 129, 0.192)';
    let currItems = 0;

    return (
        <All mainBackground={mainBackground}>
            <GlobalStyle />
            <BackgroundMobile><img src={bgImgMobile} alt="Background" /></BackgroundMobile>
            <BackgroundDesktop><img src={bgImgDesktop} alt="Background" /></BackgroundDesktop>

            <Header>
                <Title>TODO</Title>
                <IconDiv title="Toggle theme between dark and light mode" onClick={() => dispatch({ type: ACTIONS.TOGGLE_THEME })}>
                    <Icon src={themeIcon} alt="Theme icon" />
                </IconDiv>
            </Header>

            <Main>
                <InputRow title="Type to create a new entry" primaryText={primaryText} cardBackground={cardBackground} shadowColor={shadowColor}>
                    <Circle borderColor={borderColor} />
                    <Input placeholder="Create a new todo..." brightBlue={brightBlue} primaryText={primaryText} secondaryText={secondaryText} onKeyDown={(e) => {
                        if (e.key === 'Enter' && e.target.value.length > 0) {
                            dispatch({ type: ACTIONS.ADD_TODO, payload: e.target.value, id: generateKey() });
                            e.target.value = '';
                        }
                    }} />
                </InputRow>

                <List cardBackground={cardBackground} shadowColor={shadowColor}>
                    {state.todos.map((el) => {
                        if (state.filter === 'active') {
                            if (el.isComplete === true) return null;
                        }
                        if (state.filter === 'completed') {
                            if (el.isComplete === false) return null;
                        }
                        currItems++;
                        return <ListItem key={el.id} isComplete={el.isComplete} itemBorderColor={itemBorderColor} primaryText={primaryText} secondaryText={secondaryText}>
                            <ToggleButton title="Toggle task between active and completed" isComplete={el.isComplete} borderColor={borderColor} onClick={() => dispatch({ type: ACTIONS.TOGGLE_TASK, payload: el.id })}>
                                <CheckIcon isComplete={el.isComplete} src="/images/icon-check.svg" alt="Check icon" />
                            </ToggleButton>
                            {el.text}
                        </ListItem>
                    })}
                </List>

                <BottomRow cardBackground={cardBackground} shadowColor={shadowColor} secondaryText={secondaryText} borderColor={borderColor}>
                    <ItemsLeft title="Number of tasks displayed according to filter" secondaryText={secondaryText}>{currItems} item{currItems > 1 && 's'} left {currItems <= 1 && '\xA0'}</ItemsLeft>
                    <ClearButton title="Removes all tasks marked completed" onClick={() => dispatch({ type: ACTIONS.CLEAR_COMPLETED })} primaryText={primaryText} secondaryText={secondaryText}>Clear Completed</ClearButton>
                </BottomRow>

                <FiltersDesktop cardBackground={cardBackground} secondaryText={secondaryText} borderColor={borderColor} shadowColor={shadowColor}>
                    <ItemsLeft title="Number of tasks displayed according to filter" secondaryText={secondaryText}>{currItems} item{currItems > 1 && 's'} left {currItems <= 1 && '\xA0'}</ItemsLeft>
                    <ButtonsDiv>
                        <FilterButton filter={state.filter} brightBlue={brightBlue} name={'all'} title="Filter list to show all"
                            onClick={() => state.filter !== 'all' && dispatch({ type: ACTIONS.FILTER_ALL })} >All</FilterButton>
                        <FilterButton filter={state.filter} brightBlue={brightBlue} name={'active'} title="Filter list to show active tasks only"
                            onClick={() => state.filter !== 'active' && dispatch({ type: ACTIONS.FILTER_ACTIVE })} >Active</FilterButton>
                        <FilterButton filter={state.filter} brightBlue={brightBlue} name={'completed'} title="Filter list to show completed tasks only"
                            onClick={() => state.filter !== 'completed' && dispatch({ type: ACTIONS.FILTER_COMPLETED })} >Completed</FilterButton>
                    </ButtonsDiv>
                    <ClearButton title="Removes all tasks marked completed" onClick={() => dispatch({ type: ACTIONS.CLEAR_COMPLETED })} primaryText={primaryText} secondaryText={secondaryText}>Clear Completed</ClearButton>
                </FiltersDesktop>

                <FiltersMobile cardBackground={cardBackground} shadowColor={shadowColor} secondaryText={secondaryText}>
                    <FilterButton filter={state.filter} brightBlue={brightBlue} name={'all'} 
                        onClick={() => state.filter !== 'all' && dispatch({ type: ACTIONS.FILTER_ALL })} >All</FilterButton>
                    <FilterButton filter={state.filter} brightBlue={brightBlue} name={'active'}
                        onClick={() => state.filter !== 'active' && dispatch({ type: ACTIONS.FILTER_ACTIVE })} >Active</FilterButton>
                    <FilterButton filter={state.filter} brightBlue={brightBlue} name={'completed'}
                        onClick={() => state.filter !== 'completed' && dispatch({ type: ACTIONS.FILTER_COMPLETED })} >Completed</FilterButton>
                </FiltersMobile>
            </Main>
        </All>
    );
}

export default App;