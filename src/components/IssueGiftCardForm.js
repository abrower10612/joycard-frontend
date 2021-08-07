import React, { useState } from 'react'
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

    
    const [inputValue, setInputValue] = useState("");
    const handleDigitalInput = e => setInputValue(e.target.value);
    const resetDigitalInput = () => setInputValue("");

    const [numberValue, setNumberValue] = useState("");
    const handleNumberInput = e => setNumberValue(e.target.value);
    const resetNumberInput = () => setNumberValue("");

    const handleAmountInput = e => setCardAmount(e.target.value);
    const resetAmountInput = () => setCardAmount("");

    const options = [
        {
            value: "mobile",
            label: "Mobile"
        },
        {
            value: "email",
            label: "Email"
        }
    ]

    //TODO: Need to move these controls into a separate file?
    const styles = {
        control: styles => ({ 
            ...styles, 
            backgroundColor: 'none',
            border: 'none',
            borderBottom: 'solid 1px gray',
            borderRadius: 0,
            width: '190px',
            fontSize: '1.5rem',
            boxShadow: 'none',
            cursor: 'pointer',
            
            // **LARGE VIEWPORT** //
            '@media(min-width: 800px)': {
                ...styles, 
                backgroundColor: 'none',
                border: 'none',
                borderBottom: 'solid 1px gray',
                width: '200px',
                borderRadius: 'none',
                fontSize: '1.75rem',
                boxShadow: 'none',
                height: 'inherit',
                paddingRight: '20px',
                cursor: 'pointer'
            },
        })
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
                                { digitalInput.length === 10
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
                                    value={inputValue}
                                    onChange={e => {
                                        handleDigitalInput(e)
                                        setDigitalInput(e.target.value)
                                    }}
                                />
                            </div>
                        :
                            <div>
                                { digitalInput.includes('@' && '.')
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
                                    }}
                                />
                            </div>
                        }
                    </div>
                }

                <div className="last-details">Now, just the card details...</div>
                <div className="cardNumber">
                    { cardNumber.length >= 4
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
                            setCardNumber(e.target.value)
                        }}
                    />
                </div>

                <div className="cardAmount">
                    { cardAmount.length > 0 && parseInt(cardAmount) >= 5 && parseInt(cardAmount) <= 1000
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
                            setCardAmount(e.target.value)
                        }}
                    />
                </div>

                <div 
                    className="button-container"
                >
                    <span 
                        className="submit-button"
                        onClick={() => setIssueCardConfirmState(!issueCardConfirmState)}
                    >Issue Gift Card</span>
                </div>
            </div>
            <IssueCardConfirm />
        </>
    )
}

export default IssueGiftCardForm
