import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "./slices/themeSlice";
import { changeFilter } from "./slices/filterSlice";
import { addTodo, toggleTask, clearCompleted } from "./slices/tasksSlice";
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

function App() {
    const theme = useSelector(state => state.theme);
    const filter = useSelector(state => state.filter);
    const tasks = useSelector(state => state.tasks);
    const dispatch = useDispatch();

    let bgImgMobile = theme.value === 'dark' ? '/images/bg-mobile-dark.jpg' : '/images/bg-mobile-light.jpg';
    let bgImgDesktop = theme.value === 'dark' ? '/images/bg-desktop-dark.jpg' : '/images/bg-desktop-light.jpg';
    let themeIcon = theme.value === 'dark' ? '/images/icon-sun.svg' : '/images/icon-moon.svg';
    let brightBlue = 'hsl(220, 98%, 61%)';
    let mainBackground = theme.value === 'dark' ? '#181824' : '#f7f7f9';
    let cardBackground = theme.value === 'dark' ? '#25273c' : '#ffffff';
    let primaryText = theme.value === 'dark' ? '#FFFFFF' : '#646373';
    let secondaryText = theme.value === 'dark' ? '#4f5166' : '#c0bfc4';
    let borderColor = theme.value === 'dark' ? '#2c2e43' : '#EDEDEF';
    let itemBorderColor = theme.value === 'dark' ? '#37384c' : '#EDEDEF';
    let shadowColor = theme.value === 'dark' ? 'rgba(0, 0, 0, 0.192)' : 'rgba(129, 129, 129, 0.192)';
    let currItems = 0;

    return (
        <All mainBackground={mainBackground}>
            <GlobalStyle />
            <BackgroundMobile><img src={bgImgMobile} alt="Background" /></BackgroundMobile>
            <BackgroundDesktop><img src={bgImgDesktop} alt="Background" /></BackgroundDesktop>

            <Header>
                <Title>TODO</Title>
                <IconDiv title="Toggle theme between dark and light mode" onClick={() => dispatch(toggleTheme())}>
                    <Icon src={themeIcon} alt="Theme icon" />
                </IconDiv>
            </Header>

            <Main>
                <InputRow title="Type to create a new entry" primaryText={primaryText} cardBackground={cardBackground} shadowColor={shadowColor}>
                    <Circle borderColor={borderColor} />
                    <Input placeholder="Create a new todo..." brightBlue={brightBlue} primaryText={primaryText} secondaryText={secondaryText} onKeyDown={(e) => {
                        if (e.key === 'Enter' && e.target.value.length > 0) {
                            dispatch(addTodo(e.target.value));
                            e.target.value = '';
                        }
                    }} />
                </InputRow>

                <List cardBackground={cardBackground} shadowColor={shadowColor}>
                    {tasks.value.map((el) => {
                        if (filter.value === 'active') {
                            if (el.isComplete === true) return null;
                        }
                        if (filter.value === 'completed') {
                            if (el.isComplete === false) return null;
                        }
                        currItems++;
                        return <ListItem key={el.id} isComplete={el.isComplete} itemBorderColor={itemBorderColor} primaryText={primaryText} secondaryText={secondaryText}>
                            <ToggleButton title="Toggle task between active and completed" isComplete={el.isComplete} borderColor={borderColor} onClick={() => dispatch(toggleTask(el.id))}>
                                <CheckIcon isComplete={el.isComplete} src="/images/icon-check.svg" alt="Check icon" />
                            </ToggleButton>
                            {el.text}
                        </ListItem>
                    })}
                </List>

                <BottomRow cardBackground={cardBackground} shadowColor={shadowColor} secondaryText={secondaryText} borderColor={borderColor}>
                    <ItemsLeft title="Number of tasks displayed according to filter" secondaryText={secondaryText}>{currItems} item{currItems > 1 && 's'} left {currItems <= 1 && '\xA0'}</ItemsLeft>
                    <ClearButton title="Removes all tasks marked completed" onClick={() => dispatch(clearCompleted())} primaryText={primaryText} secondaryText={secondaryText}>Clear Completed</ClearButton>
                </BottomRow>

                <FiltersDesktop cardBackground={cardBackground} secondaryText={secondaryText} borderColor={borderColor} shadowColor={shadowColor}>
                    <ItemsLeft title="Number of tasks displayed according to filter" secondaryText={secondaryText}>{currItems} item{currItems > 1 && 's'} left {currItems <= 1 && '\xA0'}</ItemsLeft>
                    <ButtonsDiv>
                        <FilterButton filter={filter.value} brightBlue={brightBlue} name={'all'} title="Filter list to show all"
                            onClick={() => filter.value !== 'all' && dispatch(changeFilter('all'))} >All</FilterButton>
                        <FilterButton filter={filter.value} brightBlue={brightBlue} name={'active'} title="Filter list to show active tasks only"
                            onClick={() => filter.value !== 'active' && dispatch(changeFilter('active'))} >Active</FilterButton>
                        <FilterButton filter={filter.value} brightBlue={brightBlue} name={'completed'} title="Filter list to show completed tasks only"
                            onClick={() => filter.value !== 'completed' && dispatch(changeFilter('completed'))} >Completed</FilterButton>
                    </ButtonsDiv>
                    <ClearButton title="Removes all tasks marked completed" onClick={() => dispatch(clearCompleted())} primaryText={primaryText} secondaryText={secondaryText}>Clear Completed</ClearButton>
                </FiltersDesktop>

                <FiltersMobile cardBackground={cardBackground} shadowColor={shadowColor} secondaryText={secondaryText}>
                    <FilterButton filter={filter.value} brightBlue={brightBlue} name={'all'} 
                        onClick={() => filter.value !== 'all' && dispatch(changeFilter('all'))} >All</FilterButton>
                    <FilterButton filter={filter.value} brightBlue={brightBlue} name={'active'}
                        onClick={() => filter.value !== 'active' && dispatch(changeFilter('active'))} >Active</FilterButton>
                    <FilterButton filter={filter.value} brightBlue={brightBlue} name={'completed'}
                        onClick={() => filter.value !== 'completed' && dispatch(changeFilter('completed'))} >Completed</FilterButton>
                </FiltersMobile>
            </Main>
        </All>
    );
}

export default App;