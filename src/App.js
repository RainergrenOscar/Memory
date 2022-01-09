import { useState,useEffect } from 'react'; //importing useState Hook
import './App.css';
import SingleCard from './components/SingleCard';

const cardImages = [ // adding all images
  { "src": "/img/kanye-west-1.jpeg" },
  { "src": "/img/kanye-west-2.jpeg" },
  { "src": "/img/kanye-west-3.png" },
  { "src": "/img/kanye-west-4.jpeg" },
  { "src": "/img/kanye-west-5.jpeg" },
  { "src": "/img/kanye-west-6.jpeg" },
  
]

function App() {
  const [cards, setCards] = useState([])                 //using useState hook
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)

  const shuffleCards = () => {                           //creating function that shuffling cards
    const shuffledCards = [...cardImages, ...cardImages] //using spread operator to create new array with previous cardImages array twice.
    .sort(() => Math.random() - 0.5)                     // using the .sort method to the array with Math.random to create different outcome everytime
      .map((card) => ({ ...card, id: Math.random() }))   //creating a new array with the .map method with different id everytime
    
    setCards(shuffledCards)                              // using the setCard useState hook, pass in the shufflecards function into setCards.
    setTurns(0)
  }

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      if (choiceOne.src === choiceTwo.src) {
        console.log("MATCH")
        resetTurn()
      } else {
        console.log("NO MATCH")
        resetTurn()
      }
    }
  }, [choiceOne, choiceTwo])
  
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
  }


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
          />
        ))}
      </div>
    </div>
    
  );
}

export default App;
