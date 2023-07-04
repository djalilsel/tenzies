import { useEffect, useState } from 'react'
import Die from './components/Die'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'
import { useWindowSize } from 'react-use'
import './App.css'

function App() {
  
  const { width, height } = useWindowSize()

  const [dice, setDice] = useState(allNewDice())
  const [Tenzies, setTenzies] = useState(false)

  useEffect( () => {
    let holdCounter = 0;
    let winningNumber = dice[0].value
      dice.map(face => {
        if(face.isHeld === true){
          holdCounter++
        }
        if(face.value !== winningNumber){
          winningNumber = -1
        }
        
      })
      if(holdCounter === 10 && winningNumber === dice[0].value){
        setTenzies(true)  
        console.log("yay you won")
      }
    }
  ,[dice])

  function holdDice(id){
      setDice(prevDice => 
        
        prevDice.map(face => {
          if(face.id === id){
            return {...face, isHeld: !face.isHeld}
          
          }
          else{
            return (face)
          }
        })
        
      )
  }

  const diceElements = dice.map((face) =>  (
      
      <Die 
        value={face.value}
        key={face.id}
        holdDice={() => Tenzies? null : holdDice(face.id)}
        isHeld={face.isHeld}
        
      />
  ))
  
  
  function allNewDice(prevDice) {
    
    if(!prevDice){
      const randNums = []
      for(let i = 0; i < 10; i++){
          randNums[i]  = { 
            value: Math.floor(Math.random() * 6 + 1),
            isHeld: false,
            id: nanoid()
          }
      }
      
      return randNums
    }
    else{
       const newDice = prevDice.map(face => {
        if(face.isHeld == true){
          return face
        }
        else{
          return (
            {
              value: Math.floor(Math.random() * 6 + 1),
              isHeld: false,
              id: nanoid()
            }
          )
        }
      })
      return newDice
    }

  }

  return (
    <main>
      <h1>Tenzies</h1>
      <p>Roll until all dice are the same. Click <br></br>each die to freeze it at its current value <br></br> between rolls.</p>
      <div className='die--container'>
        {diceElements}
      </div>
      {Tenzies && 
      <Confetti 
        width={width - 50}
        height={height - 50}
      />}
      <button onClick={() => { 
        if(Tenzies){
          setDice(null)
          setTenzies(false)
        }
        setDice(prevDice => allNewDice(prevDice))}} >
        {Tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  )
}

export default App


// Trash
