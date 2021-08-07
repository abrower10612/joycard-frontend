import React from 'react';
import Header from '../components/Header';
import IssueGiftCardForm from '../components/IssueGiftCardForm';

const AddFunds = () => {
    return (
        <div className="issue-gift-card-container">
            <Header title="New Gift Card" />
            <IssueGiftCardForm />
        </div>
    )
}

export default AddFunds
