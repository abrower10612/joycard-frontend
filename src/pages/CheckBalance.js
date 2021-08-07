import React from 'react'
import Header from '../components/Header'
import yay from '../images/yay.gif';

const AddFunds = () => {
    return (
        <div className="check-balance-container">
            <Header title="Check Balance" />
            <img src={yay} alt="" 
                style={{
                    display: 'block',
                    margin: '20px auto'
                }}
            />
        </div>
    )
}

export default AddFunds
