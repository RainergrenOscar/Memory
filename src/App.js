import { useState,useEffect } from 'react'; //importing useState Hook
import './App.css';
import SingleCard from './components/SingleCard';

const cardImages = [ // adding all images
  { "src": "/img/kanye-west-1.jpeg", matched: false },
  { "src": "/img/kanye-west-2.jpeg",matched: false},
  { "src": "/img/kanye-west-3.png", matched: false },
  { "src": "/img/kanye-west-4.jpeg", matched: false },
  { "src": "/img/kanye-west-5.jpeg", matched: false },
  { "src": "/img/kanye-west-6.jpeg", matched: false},
  
]

function App() {
  const [cards, setCards] = useState([])                 //using useState hook
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  const shuffleCards = () => {                           //creating function that shuffling cards
    const shuffledCards = [...cardImages, ...cardImages] //using spread operator to create new array with previous cardImages array twice.
    .sort(() => Math.random() - 0.5)                     // using the .sort method to the array with Math.random to create different outcome everytime
      .map((card) => ({ ...card, id: Math.random() }))   //creating a new array with the .map method with different id everytime
    
    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)                              // using the setCard useState hook, pass in the shufflecards function into setCards.
    setTurns(0)
  }

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  useEffect(() => { //comparing cards
    if (choiceOne && choiceTwo) {
      setDisabled(true)
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return {...card, matched: true}
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {
        setTimeout(() => resetTurn(), 750)
      }
    }
  }, [choiceOne, choiceTwo])



  console.log(cards)
  
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  useEffect(() => {
    shuffleCards()
  },[])

  return (
    <div className="App">
      <h1>KANYE MEMORY</h1>
      <button onClick={shuffleCards}>Start New Game</button>
      <div className="card-grid">
        {cards.map(card => (                            
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched} 
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns : {turns}</p>
    </div>
    
  );
}

export default App;
