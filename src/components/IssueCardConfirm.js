import React, { useState } from 'react'
import { useRecoilState } from 'recoil';
import AtomControls from '../atoms/AtomControls';
import { Link } from 'react-router-dom';
import disableScroll from 'disable-scroll';
import Icons from '../images/Icons';

const IssueCardConfirm = () => {
    const [issueCardConfirmState, setIssueCardConfirmState] = useRecoilState(AtomControls.IssueCardConfirmState)
    const [cardAmount, setCardAmount] = useRecoilState(AtomControls.CardAmountState);
    const [cardType, setCardType] = useRecoilState(AtomControls.CardTypeState);
    const [cardNumber, setCardNumber] = useRecoilState(AtomControls.CardNumberState);
    const [digitalType, setDigitalType] = useRecoilState(AtomControls.DigitalTypeState);
    const [digitalInput, setDigitalInput] = useRecoilState(AtomControls.DigitalInputState);
    const [confirmed, setConfirmed] = useRecoilState(AtomControls.CardConfirmedState);

    issueCardConfirmState ? disableScroll.on() : disableScroll.off()

    const clearForm = () => {
        setCardType("physical")
        setDigitalType("mobile");
        setDigitalInput("");
        setCardNumber("");
        setCardAmount("")
    }

    return (
        <>
            <div 
                className={ issueCardConfirmState ? "modal-background" : "hide-modal-background"} 
                onClick={() => setIssueCardConfirmState(!issueCardConfirmState)}
            />
            <div 
                className={ 
                    issueCardConfirmState 
                    ? cardType === "digital"
                        ? "issue-card-confirm digital" 
                        : "issue-card-confirm physical"
                    : "hide-issue-card-confirm"
                }>
                { confirmed ?
                    <div className="success-modal">
                        <Icons.CheckCircleIcon />
                        <div>Success!</div>
                    </div>
                    :
                    <>
                        <div className="confirm-grid">
                            <header style={{ gridArea: "1/1/1/3" }}>Does this all look correct?</header>

                            <label htmlFor="" style={{ gridRow: 1 }}>Card Type</label>
                            <span style={{ gridRow: 1 }}>{cardType.charAt(0).toUpperCase() + cardType.slice(1)}</span>

                            {
                                cardType === "digital" && 
                                <>
                                    <label htmlFor="" style={{ gridRow: 2 }}>Delivery Method</label>
                                    <span style={{ gridRow: 2 }}>{digitalType.charAt(0).toUpperCase() + digitalType.slice(1)}</span>

                                    <label htmlFor="" style={{ gridRow: 3 }}>Delivery Address</label>
                                    <span style={{ gridRow: 3 }}>{digitalInput}</span>
                                </>
                            }

                            <label htmlFor="" style={{ gridRow: 4 }}>Card Number</label>
                            <span style={{ gridRow: 4 }}>{cardNumber}</span>

                            <label htmlFor="" style={{ gridRow: 5 }}>Card Amount</label>
                            <span style={{ gridRow: 5 }}>{`$${parseFloat(cardAmount).toFixed(2)}`}</span>

                        </div>
                        <div className="issue-modal-button-container">
                            <button 
                                className="issue-modal-button"
                                onClick={() => {
                                    setTimeout(() => setConfirmed(!confirmed), 300)
                                    setTimeout(() => {
                                        clearForm()
                                        setIssueCardConfirmState(!issueCardConfirmState)
                                    }, 1000)
                                    setTimeout(() => setConfirmed(false), 1500)
                                }}
                            >Yep, that all looks good!</button>
                            <button 
                                onClick={() => setIssueCardConfirmState(!issueCardConfirmState)}
                                className="issue-modal-button"
                            >Hold on, go back for a sec</button>
                        </div>
                    </>
                }
            </div>
        </>
    )
}

export default IssueCardConfirm