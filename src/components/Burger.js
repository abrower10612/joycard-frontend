import React from 'react'
import { useRecoilState } from 'recoil'
import AtomControls from '../atoms/AtomControls'

const Burger = () => {

    const [MenuState, setMenuState] = useRecoilState(AtomControls.MenuState)

    return (
        <div 
            className="burger"
            onClick={() => setMenuState(!MenuState)}
        >
            <div className={MenuState ? "bar1" : undefined}></div>
            <div className={MenuState ? "bar2" : undefined}></div>
            <div className={MenuState ? "bar3" : undefined}></div>
        </div>
    )
}

export default Burger