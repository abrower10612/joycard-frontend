import React, { useState, useEffect } from 'react'
import { useRecoilState } from 'recoil';
import AtomControls from '../atoms/AtomControls';
import Icons from '../images/Icons';
import { TextField, InputAdornment } from '@material-ui/core';
import randomstring from 'randomstring';
import IssueCardConfirm from './IssueCardConfirm';

const IssueGiftCardForm = () => {
    const [cardType, setCardType] = useRecoilState(AtomControls.CardTypeState);
    const [digitalType, setDigitalType] = useRecoilState(AtomControls.DigitalTypeState)
    const [digitalInput, setDigitalInput] = useRecoilState(AtomControls.DigitalInputState)
    const [cardNumber, setCardNumber] = useRecoilState(AtomControls.CardNumberState);
    const [cardAmount, setCardAmount] = useRecoilState(AtomControls.CardAmountState);
    const [issueCardConfirmState, setIssueCardConfirmState] = useRecoilState(AtomControls.IssueCardConfirmState);
    const [confirmed, setConfirmed] = useRecoilState(AtomControls.CardConfirmedState);

    const [invalidMobile, setInvalidMobile] = useState(false);
    const [invalidEmail, setInvalidEmail] = useState(false);
    const [invalidNumber, setInvalidNumber] = useState(false);
    const [invalidAmount, setInvalidAmount] = useState(false);
    
    const [inputValue, setInputValue] = useState("");
    const handleDigitalInput = e => setInputValue(e.target.value);
    const resetDigitalInput = () => setInputValue("");
    useEffect(() => confirmed && resetDigitalInput());

    const [numberValue, setNumberValue] = useState("");
    const handleNumberInput = e => setNumberValue(e.target.value);
    const resetNumberInput = () => setNumberValue("");

    const handleAmountInput = e => setCardAmount(e.target.value);
    const resetAmountInput = () => setCardAmount("");

    const checkInputs = () => {
        if (cardType === "digital" && digitalType === "mobile" && digitalInput.length !== 10) {
            return (
                setInvalidMobile(true),
                console.log("digital mobile input error")
            )
        }
        setInvalidMobile(false)

        if (cardType === "digital" && digitalType === "email" && !digitalInput.includes('@' && '.')) {
            return (
                console.log("digital email input error"),
                setInvalidEmail(true)
            )
        }
        setInvalidEmail(false)

        if (cardNumber.length < 4 || cardNumber.length > 16) {
            return (
                setInvalidNumber(true),
                console.log("card number error")
            )
        }
        setInvalidNumber(false)

        if (parseInt(cardAmount) < 5 || cardAmount.length < 1 || cardAmount.length > 4) {
            return (
                console.log("card amount input error"),
                setInvalidAmount(true)
            )
        }
        setInvalidNumber(false)

        return (
            setInvalidMobile(false),
            setInvalidEmail(false),
            setInvalidNumber(false),
            setInvalidAmount(false),
            setIssueCardConfirmState(!issueCardConfirmState)
        )
    }

    return (
        <>
            <div className="issue-container">
                <h1>Issue Gift Card</h1>
                <div className="cardType-container">
                    <span>What kind of card?</span>
                    <div className="cardType">
                        {cardType === "physical" 
                            ? <Icons.CheckCircleIcon className="icon valid-input" /> 
                            : <Icons.RadioButtonUncheckedIcon 
                                className="icon unselected-option" 
                                onClick={() => {
                                    setCardType("physical")
                                    setCardNumber("")
                                }}
                            />
                        }
                        <label>Physical</label>
                    </div>
                    <div className="cardType">
                        {cardType === "digital" 
                            ? <Icons.CheckCircleIcon className="icon valid-input" /> 
                            : <Icons.RadioButtonUncheckedIcon 
                                className="icon unselected-option" 
                                onClick={() => {
                                    setCardType("digital")
                                    setCardNumber(randomstring.generate({
                                        length: 16,
                                        charset: "numeric"
                                    }))
                                    resetNumberInput()
                                }}
                            />
                        }
                        <label>Digital</label>
                    </div>
                </div>

                {cardType === "digital" && 
                    <div className="digitalInputs-container">
                        <span>How should we send the card?</span>

                        <div className="deliveryType">
                            {digitalType === "mobile" 
                                ? <Icons.CheckCircleIcon className="icon valid-input"/> 
                                : <Icons.RadioButtonUncheckedIcon 
                                    className="icon unselected-option" 
                                    onClick={() => {
                                        setDigitalType("mobile")
                                        console.log(digitalInput)
                                        setDigitalInput("")
                                        resetDigitalInput()
                                    }}
                                />
                            }
                            <label>Text</label>
                        </div>

                        <div className="deliveryType">
                            {digitalType === "email" 
                                ? <Icons.CheckCircleIcon className="icon valid-input"/> 
                                : <Icons.RadioButtonUncheckedIcon 
                                    className="icon unselected-option" 
                                    onClick={() => {
                                        setDigitalType("email")
                                        console.log(digitalInput)
                                        setDigitalInput("")
                                        resetDigitalInput()
                                    }}
                                />
                            }
                            <label>Email</label>
                        </div>

                        {digitalType === "mobile" 
                        ?
                            <div>
                                {invalidMobile
                                ? 
                                <div className="mobile-icon">
                                    <Icons.ErrorOutlineIcon className="icon invalid-input"/>
                                </div>
                                : digitalInput.length === 10
                                ?
                                <div className="mobile-icon ">
                                    <Icons.CheckCircleIcon className="icon valid-input" />
                                </div>
                                :
                                <div className="mobile-icon">
                                    <Icons.CheckCircleIcon
                                        className="icon"
                                        style={{
                                            color: '#bababa'
                                        }}
                                    />
                                </div>
                                }
                                <TextField 
                                    type="tel"
                                    label="Mobile Number"
                                    inputProps={{ maxLength: 10 }}
                                    // helperText={invalidMobile ? "10-digit mobile number required" : "Required"}
                                    // FormHelperTextProps={invalidMobile ? { className: "invalid-input"} : {className: "helperText"}}
                                    value={inputValue}
                                    onChange={e => {
                                        handleDigitalInput(e)
                                        setDigitalInput(e.target.value)
                                        e.target.value.length === 10 && setInvalidMobile(false)
                                    }}
                                />
                            </div>
                        :
                            <div>
                                {invalidEmail 
                                ? 
                                <div className="mobile-icon">
                                    <Icons.ErrorOutlineIcon className="icon invalid-input"/>
                                </div>
                                : digitalInput.includes('@' && '.')
                                ?
                                <div className="mobile-icon">
                                    <Icons.CheckCircleIcon className="icon valid-input"/>
                                </div>
                                :
                                <div className="mobile-icon">
                                    <Icons.CheckCircleIcon 
                                        className="icon"
                                        className="icon"
                                        style={{
                                            color: '#bababa'
                                        }}
                                    />
                                </div>
                                }
                                <TextField 
                                    type="string"
                                    label="Email Address"
                                    defaultValue=""
                                    value={inputValue}
                                    onChange={e => {
                                        handleDigitalInput(e)
                                        setDigitalInput(e.target.value)
                                        e.target.value.includes('@' && '.') && setInvalidEmail(false)
                                    }}
                                />
                            </div>
                        }
                    </div>
                }

                <div className="last-details">Now, just the card details...</div>
                <div className="cardNumber">
                    {invalidNumber
                    ? 
                    <div className="mobile-icon">
                        <Icons.ErrorOutlineIcon className="icon invalid-input"/>
                    </div>
                    : cardNumber.length >= 4
                    ?
                    <div className="mobile-icon">
                        <Icons.CheckCircleIcon className="icon valid-input"/>
                    </div>
                    :
                    <div className="mobile-icon">
                        <Icons.CheckCircleIcon 
                            className="icon"
                            style={{
                                color: '#bababa'
                            }}
                        />
                    </div>
                    }
                    <TextField 
                        type="string"
                        label="Card Number"
                        helperText={cardType === "physical" ? "Between 4 and 16 characters" : "Auto-generated for digital cards"}
                        value={cardType === "digital" ? cardNumber : numberValue}
                        InputProps={cardType === "digital" && {
                            readOnly: true,
                            startAdornment: <InputAdornment position="start"></InputAdornment>
                        }}
                        onInput = {e => {
                            e.target.value.length === 0
                            ?
                            e.target.value = ""
                            :
                            e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 16)
                        }}
                        onChange={e => {
                            setCardNumber(e.target.value)
                            handleNumberInput(e)
                            e.target.value.length >= 4 && e.target.value.length <= 16 && setInvalidNumber(false)
                        }}
                    />
                </div>

                <div className="cardAmount">
                    {invalidAmount ?
                    <div className="mobile-icon">
                        <Icons.ErrorOutlineIcon className="icon invalid-input"/>
                    </div>
                    : cardAmount.length > 0 
                    && parseInt(cardAmount) >= 5 
                    && parseInt(cardAmount) <= 1000
                    ?
                    <div className="mobile-icon">
                        <Icons.CheckCircleIcon 
                            className="icon valid-input"
                        />
                    </div>
                    :
                    <div className="mobile-icon">
                        <Icons.CheckCircleIcon 
                            className="icon"
                            style={{
                                color: '#bababa'
                            }}
                        />
                    </div>
                    }
                    <TextField 
                        type="string"
                        label="Card Amount"
                        helperText="Between $5 and $1000"
                        value={cardAmount}
                        maxLength={4}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        }}                      
                        onInput = {e => {
                            e.target.value.length === 0 
                            ?
                            e.target.value = ""
                            :
                            e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 4)
                        }}
                        onChange={e => {
                            setCardAmount(e.target.value)
                            handleAmountInput(e)
                            parseInt(e.target.value) >= 5
                            && parseInt(e.target.value) <= 1000
                            && e.target.value.length > 0 
                            && e.target.value.length <= 4 
                            && setInvalidAmount(false)
                        }}
                    />
                </div>

                <div 
                    className="button-container"
                >
                    <span 
                        className="submit-button"
                        onClick={() => {
                            checkInputs()
                        }}
                    >Issue Gift Card</span>
                </div>
            </div>
            <IssueCardConfirm />
        </>
    )
}

export default IssueGiftCardForm
