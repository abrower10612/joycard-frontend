import { atom } from 'recoil';

const CardTypeState = atom({
    key: 'CardTypeState',
    default: "physical"
});

export default CardTypeState;