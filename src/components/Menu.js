import React from 'react'
import { useRecoilState } from 'recoil';
import AtomControls from '../atoms/AtomControls';
import MenuData from '../data/MenuData';
import { NavLink } from 'react-router-dom';
import logo from '../images/joycard-logo.png'
import disableScroll from 'disable-scroll';

const Menu = () => {
    const [MenuState, setMenuState] = useRecoilState(AtomControls.MenuState);
    const [cardType, setCardType] = useRecoilState(AtomControls.CardTypeState);
    const [digitalType, setDigitalType] = useRecoilState(AtomControls.DigitalTypeState);
    const [digitalInput, setDigitalInput] = useRecoilState(AtomControls.DigitalInputState);
    const [cardNumber, setCardNumber] = useRecoilState(AtomControls.CardNumberState);
    const [cardAmount, setCardAmount] = useRecoilState(AtomControls.CardAmountState);

    MenuState ? disableScroll.on() : disableScroll.off()

    const clearForm = () => (
        setCardType("physical"),
        setDigitalType("mobile"),
        setDigitalInput(""),
        setCardNumber(""),
        setCardAmount("")
    )
    
    return (
        <div className={ MenuState ? "show-menu" : "hide-menu"}>
            <img src={logo} alt="Joycard logo" />
            <div className="menu-items">
                {MenuData.map((item, index) => {
                    return (
                        <NavLink
                            key={index}
                            onClick={() => {
                                setMenuState(!MenuState)
                                { item.title === "Issue Gift Card" && clearForm() }
                            }}
                            to={item.path}
                            activeClassName="active-page"
                        >
                            <div>{item.icon}</div>
                            <div>{item.title}</div>
                        </NavLink>
                    )
                })}
            </div>
        </div>
    )
}

export default Menu
