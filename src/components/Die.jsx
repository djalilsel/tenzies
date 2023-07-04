import React, { useState } from 'react'

import './Die.css'

export default function Die(props){
    

    return(
        <div 
            className={ props.isHeld ? 'held--die die' : 'free--die die'}
            onClick={props.holdDice}
        >
            {props.value}
        </div>
    )
}