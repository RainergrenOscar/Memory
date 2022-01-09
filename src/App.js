import { useState } from 'react'; //importing useState Hook
import './App.css';
import SingleCard from './components/SingleCard';

const cardImages = [ // adding all images
  { "src": "/img/helmet-1.png" },
  { "src": "/img/potion-1.png" },
  { "src": "/img/ring-1.png" },
  { "src": "/img/scroll-1.png" },
  { "src": "/img/shield-1.png" },
  { "src": "/img/sword-1.png" }
]

function App() {
  const [cards, setCards] = useState([])                 //using useState hook
  const [turns, setTurns] = useState(0)

  const shuffleCards = () => {                           //creating function that shuffling cards
    const shuffledCards = [...cardImages, ...cardImages] //using spread operator to create new array with previous cardImages array twice.
    .sort(() => Math.random() - 0.5)                     // using the .sort method to the array with Math.random to create different outcome everytime
      .map((card) => ({ ...card, id: Math.random() }))   //creating a new array with the .map method with different id everytime
    
    setCards(shuffledCards)                              // using the setCard useState hook, pass in the shufflecards function into setCards.
    setTurns(0)
  }

  console.log(cards, turns)
  return (
    <div className="App">
      <h1>MAGIC MEMORY</h1>
      <button onClick={shuffleCards}>Start New Game</button>
      <div className="card-grid">
        {cards.map(card => (
          <SingleCard key={card.id} card={card}/>
        ))}
      </div>
    </div>
    
  );
}

export default App;
