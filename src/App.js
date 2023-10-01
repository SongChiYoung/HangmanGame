import React, { useState, useEffect } from 'react';
import './App.css';
import './Utils.js';

const wordsList = ["apple", "banana", "cherry", "date", "elderberry", "fig", "grape", "honeydew", "kiwi", "lemon", 
                   "mango", "nectarine", "orange", "peach", "quince", "raspberry", "strawberry", "tangerine", "ugli", "vanilla",
                   "watermelon", "xigua", "yellowfruit", "zucchini", "blueberry", "coconut", "dragonfruit", "guava", "jackfruit", "lychee"];

function App() {
  const [selectedWord, setSelectedWord] = useState("");
  const [hiddenWord, setHiddenWord] = useState([]);
  const [disabledAlphabets, setDisabledAlphabets] = useState([]);
  const [errorCount, setErrorCount] = useState(0);

  //Initialize random words when component mounts
  useEffect(() => {
    const randomWord = wordsList.random();
    startGame(randomWord);
  }, []);

  const startGame = (word) => {
    setSelectedWord(word);
    setHiddenWord(new Array(word.length).fill("_"));
    setDisabledAlphabets(new Array(0));
    setErrorCount(0);
  };

  const checkAlphabet = (letter) => {
    setDisabledAlphabets(alphas => [...alphas, letter]);
    if (selectedWord.includes(letter)) {
      const newHiddenWord = hiddenWord.map((char, index) => {
        return selectedWord[index] === letter ? letter : char;
      });
      setHiddenWord(newHiddenWord);
    } else {
      setErrorCount(prevCount => prevCount + 1);
    }
  };

  const isGameOver = () => {
    return !hiddenWord.includes("_") || errorCount >= 8;
  };

  const renderButtons = () => {
    return (
        <button onClick={ () => startGame(wordsList.random()) }>
            New Game
        </button>
    )
  };

  const renderAlphabets = () => {
    return "abcdefghijklmnopqrstuvwxyz".split("").map((letter, index) => (
      <button key={index} onClick={() => checkAlphabet(letter)}
        disabled={disabledAlphabets.includes(letter)}
      >
        {letter}
      </button>
    ));
  };

  return (
    <div id="Game">
      <div id="Container">
      <h1 style={{textAlign: "center"}}>Hangman Game</h1>
      <div id="Failures">
        <strong>Failures: {errorCount} / 8</strong>
      </div>
      <div id="HangingMan">
        <svg height="250" width="200">
          {/* Base */}
          <line x1="50" y1="200" x2="150" y2="200" style={{stroke:"#000", strokeWidth:2}} />
          {/* Vertical Pole */}
          <line x1="100" y1="200" x2="100" y2="50" style={{stroke:"#000", strokeWidth:2}} />
          {/* Horizontal Pole */}
          <line x1="100" y1="50" x2="150" y2="50" style={{stroke:"#000", strokeWidth:2}} />
          {/* Rope */}
          <line x1="140" y1="50" x2="140" y2="70" style={{stroke:"#000", strokeWidth:2}} />
          {/* Head */}
          {errorCount > 0 && <circle cx="140" cy="80" r="10" style={{stroke:"#000", strokeWidth:2, fill:"#fff"}} />}
          {/* Body */}
          {errorCount > 1 && <line x1="140" y1="90" x2="140" y2="120" style={{stroke:"#000", strokeWidth:2}} />}
          {/* Left Arm */}
          {errorCount > 2 && <line x1="140" y1="90" x2="120" y2="110" style={{stroke:"#000", strokeWidth:2}} />}
          {/* Right Arm */}
          {errorCount > 3 && <line x1="140" y1="90" x2="160" y2="110" style={{stroke:"#000", strokeWidth:2}} />}
          {/* Left Eye */}
          {errorCount > 4 && <circle cx="137" cy="78" r="1" style={{stroke:"#000", strokeWidth:1, fill:"#000"}} />}
          {/* Right Eye */}
          {errorCount > 5 && <circle cx="143" cy="78" r="1" style={{stroke:"#000", strokeWidth:1, fill:"#000"}} />}
          {/* Left Leg */}
          {errorCount > 6 && <line x1="140" y1="120" x2="120" y2="140" style={{stroke:"#000", strokeWidth:2}} />}
          {/* Right Leg */}
          {errorCount > 7 && <line x1="140" y1="120" x2="160" y2="140" style={{stroke:"#000", strokeWidth:2}} />}
        </svg>
      </div>
      <div id="Alpha">{errorCount <= 7 && hiddenWord.includes("_") && renderAlphabets()}</div>
      <div id="HiddenWord">{hiddenWord.join(" ")}</div>
      <div id="Lose">{errorCount >= 8 ? "You Lose!" : ""}</div>
      <div id="Win">{!hiddenWord.includes("_") ? "You Win!" : ""}</div>
      <div id="StartButton">{renderButtons()}</div>
    </div>
    </div>
  );
};

export default App;

