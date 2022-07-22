import styled from "styled-components";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Josefin Sans', sans-serif;
}
body {
    overflow: hidden;
}
`

const All = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${props => props.mainBackground};
    color: white;
    position: relative;
`

const BackgroundMobile = styled.div`
    display: none;

    @media (max-width: 400px) {
        display: block;
        position: absolute;
        top: 0%;
        width: 100%;
        z-index: 0;
    }
`

const BackgroundDesktop = styled.div`
    display: block;
    position: absolute;
    top: 0%;
    left: 0%;
    width: 100%;
    z-index: 0;
    transform-origin: top left;
    transform: scale(1.4);

    @media (max-width: 400px) {
        display: none;
    }
`

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: transparent;
    position: relative;
    z-index: 1;
    width: 40em;
    height: 10em;
    margin-bottom: 1.5em;

    @media (max-width: 400px) {
        width: 20em;
        height: 5em;
        margin-bottom: 1.5em;
    }
`

const Title = styled.div`
    font-size: 3em;
    font-weight: 700;
    letter-spacing: 0.3em;

    @media (max-width: 400px) {
        font-size: 1.5em;
    }
`

const IconDiv = styled.div`
    cursor: pointer;
    width: 2.5em;
    height: 2.5em;

    @media (max-width: 400px) {
        height: 1.5em;
        width: 1.5em; 
    }
`

const Icon = styled.img`
    width: 100%;
    height: 100%;
`

const Main = styled.div`
    width: 40em;
    position: relative;
    z-index: 1;

    @media (max-width: 400px) {
        width: 20em;
    }
`

const InputRow = styled.div`
    width: 100%;
    height: 5em;
    color: ${props => props.primaryText};
    background-color: ${props => props.cardBackground};
    border: none;
    margin-bottom: 2em;
    padding: 10px 25px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    gap: 20px;
    box-shadow: 0px 15px 20px 5px ${props => props.shadowColor};

    @media (max-width: 400px) {
        height: 3em;
        padding: 10px 15px;
        gap: 10px;
    }
`

const Circle = styled.div`
    height: 2em;
    width: 2em;
    border: 2px solid ${props => props.borderColor};
    border-radius: 50%;
    background-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 400px) {
        height: 1.5em;
        width: 1.5em;
    }
`

const Input = styled.input`
    background-color: transparent;
    border: none;
    caret-color: ${props => props.brightBlue};
    color: ${props => props.primaryText};
    font-size: 18px;
    width: 28em;

    &:focus {
        outline: none;
    }

    &::placeholder {
        color: ${props => props.secondaryText};
    }

    @media (max-width: 400px) {
        font-size: 12px;
        width: 20em;
    }
`

const List = styled.div`
    background-color: ${props => props.cardBackground};
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    height: 30em;
    overflow-y: scroll;
    box-shadow: 0px 15px 20px 5px ${props => props.shadowColor};

    &::-webkit-scrollbar {
        display: none;
    }

    @media (max-width: 400px) {
        height: 19em;
    }
`

const ListItem = styled.div`
    height: 4.5em;
    display: flex;
    gap: 20px;
    padding: 10px 25px;
    align-items: center;
    border-bottom: 1px solid ${props => props.itemBorderColor};
    font-size: 18px;
    text-decoration: ${props => props.isComplete && 'line-through'};
    color: ${props => props.isComplete ? props.secondaryText : props.primaryText};
    white-space: nowrap;
    overflow-x: scroll;
    overflow-y: hidden;

    &::-webkit-scrollbar {
        display: none;
    }

    @media (max-width: 400px) {
        font-size: 12px;
        height: 4em;
        gap: 10px;
        padding: 25px 15px;
    }
`

const ToggleButton = styled.div`
    min-height: 2em;
    min-width: 2em;
    border: ${props => props.isComplete ? 'none' : `2px solid ${props.borderColor}`}};
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background: ${props => props.isComplete && 'linear-gradient(to bottom, hsl(192, 100%, 67%), hsl(280, 87%, 65%))'};
    position: relative;

    &:hover&::before {
        opacity: 1;
    }

    &::before {
        content: "";
        position: absolute;
        z-index: 1;
        opacity: 0;
        inset: 0;
        padding: 2px;
        border-radius: 50%;
        background: linear-gradient(to bottom, hsl(192, 100%, 67%), hsl(280, 87%, 65%));
        -webkit-mask: 
            linear-gradient(#fff 0 0) content-box, 
            linear-gradient(#fff 0 0);
                mask: 
            linear-gradient(#fff 0 0) content-box, 
            linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
          mask-composite: exclude;
    }

    @media (max-width: 400px) {
        height: 1em;
        width: 1em;
    }
`

const CheckIcon = styled.img`
    display: ${props => props.isComplete ? 'block' : 'none'};
    width: 50%;
    height: 50%;
`

const BottomRow = styled.div`
    display: none;

    @media (max-width: 400px) {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        background-color: ${props => props.cardBackground};
        font-size: 12px;
        padding: 25px 15px;
        border-top: 1px solid ${props => props.borderColor};
        color: ${props => props.secondaryText};
        margin-bottom: 20px;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        box-shadow: 0px 5px 15px 2px ${props => props.shadowColor};
    }
`

const ItemsLeft = styled.div`
    color: ${props => props.secondaryText}
`

const ClearButton = styled.div`
    cursor: pointer; 
    color: ${props => props.secondaryText};

    &:hover {
        color: ${props => props.primaryText};
    }
`

const FiltersDesktop = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 25px;
    gap: 20px;
    background-color: ${props => props.cardBackground};
    color: ${props => props.secondaryText};
    height: 6em;
    border-top: 1px solid ${props => props.borderColor};
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    font-size: 18px;
    box-shadow: 0px 15px 20px 5px ${props => props.shadowColor};

    @media (max-width: 400px) {
        display: none;
    }
`

const ButtonsDiv = styled.div`
    display: flex;
    gap: 20px;
`

const FilterButton = styled.div`
    cursor: pointer;
    color: ${props => props.filter === props.name && props.brightBlue};
    position: relative;
    z-index: 1;
`

const FiltersMobile = styled.div`
    display: none;

    @media (max-width: 400px) {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 20px;
        background-color: ${props => props.cardBackground};
        color: ${props => props.secondaryText};
        height: 3em;
        border-radius: 5px;
        box-shadow: 0px 0px 20px 10px ${props => props.shadowColor};
    }
`

export { 
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
}