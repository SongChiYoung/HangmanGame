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
        <button id="StartButton" onClick={ () => startGame(wordsList.random()) }>
            New Game
        </button>
    )
  };

  const renderAlphabets = () => {
    return "abcdefghijklmnopqrstuvwxyz".split("").map((letter, index) => (
      <button class="button-alphabet" key={index} onClick={() => checkAlphabet(letter)}
        disabled={disabledAlphabets.includes(letter)}
        style={{visibility: disabledAlphabets.includes(letter) && selectedWord.includes(letter) ? 'hidden' : 'visible'}}
      >
        {letter}
      </button>
    ));
  };

  const renderHangingMan = () => {
    return (
      <svg height="100%" width="100%" viewBox="0 0 250 200">
        {/* Base */}
      <path d="M 50 200 Q 75 190 150 200" style={{stroke:"#000", strokeWidth:4, fill:"none"}} />
      {/* Vertical Pole */}
      {errorCount > 0 && <path d="M 100 200 Q 105 125 100 50" style={{stroke:"#000", strokeWidth:3, fill:"none"}} />}
      {/* Horizontal Pole */}
      {errorCount > 0 && <path d="M 100 50 Q 125 45 150 50" style={{stroke:"#000", strokeWidth:3, fill:"none"}} />}
      {/* Rope */}
      {errorCount > 1 && <path d="M 140 50 Q 142 60 140 70" style={{stroke:"#000", strokeWidth:3, fill:"none"}} />}
      {/* Head */}
      {errorCount > 2 && <circle cx="140" cy="80" r="10" style={{stroke:"#000", strokeWidth:2, fill:"#fff"}} />}
      {/* Arms */}
      {errorCount > 3 && <path d="M 140 90 Q 145 100 160 110" style={{stroke:"#000", strokeWidth:2, fill:"none"}} />}
      {errorCount > 3 && <path d="M 140 90 Q 135 100 120 110" style={{stroke:"#000", strokeWidth:2, fill:"none"}} />}
      {/* Hands */}
      {errorCount > 4 && <circle cx="162" cy="112" r="2" style={{stroke:"#000", strokeWidth:3, fill:"#fff"}} />}
      {errorCount > 4 && <circle cx="118" cy="112" r="2" style={{stroke:"#000", strokeWidth:3, fill:"#fff"}} />}   
      {/* Body */}
      {errorCount > 5 && <path d="M 140 90 Q 140 100 140 120" style={{stroke:"#000", strokeWidth:2, fill:"none"}} />}
      {/* Legs */}
      {errorCount > 6 && <path d="M 140 120 Q 145 130 160 140" style={{stroke:"#000", strokeWidth:2, fill:"none"}} />}
      {errorCount > 6 && <path d="M 140 120 Q 135 130 120 140" style={{stroke:"#000", strokeWidth:2, fill:"none"}} />}
      {/* Feet */}
      {errorCount > 7 && <ellipse cx="162" cy="142" rx="4" ry="2" style={{stroke:"#000", strokeWidth:3, fill:"#fff"}} />}
      {errorCount > 7 && <ellipse cx="118" cy="142" rx="4" ry="2" style={{stroke:"#000", strokeWidth:3, fill:"#fff"}} />}
   
        {/* Eyes */}
        {errorCount > 2 && errorCount <= 7 && (
          <>
            <circle cx="137" cy="78" r="1" style={{fill:"#000"}} />
            <circle cx="143" cy="78" r="1" style={{fill:"#000"}} />
          </>
        )}
        {/* Angry Eyebrows when 5 errors */}
        {errorCount > 4 && errorCount <= 7 && (
          <>
            <line x1="136" y1="76" x2="138" y2="74" style={{stroke:"#000", strokeWidth:1}} />
            <line x1="144" y1="76" x2="142" y2="74" style={{stroke:"#000", strokeWidth:1}} />
          </>
        )}
        {/* Mouth */}
        {errorCount > 2 && errorCount <= 7 && (
          <line x1="137" y1="83" x2="143" y2="83" style={{stroke:"#000", strokeWidth:1}} />
        )}
        {errorCount > 7 && (
          <>
            {/* Eyes turned into X */}
            <line x1="135" y1="76" x2="139" y2="80" style={{stroke:"#000", strokeWidth:1}} />
            <line x1="135" y1="80" x2="139" y2="76" style={{stroke:"#000", strokeWidth:1}} />
            <line x1="141" y1="76" x2="145" y2="80" style={{stroke:"#000", strokeWidth:1}} />
            <line x1="141" y1="80" x2="145" y2="76" style={{stroke:"#000", strokeWidth:1}} />
          </>
        )}
      </svg>
    );
  };
  

  return (
    <div id="Game">
      <div id="Container">
      <h1 style={{textAlign: "center"}}>Hangman Game</h1>
      <div id="Failures">
        <strong>Failures: {errorCount} / 8</strong>
      </div>
      <div id="HangingMan">
        {renderHangingMan()}
      </div>
      <div class="Container">
        <div id="Alpha" style={{pointerEvents: errorCount >= 8 || !hiddenWord.includes("_") ? 'none' : 'auto'}} >
          {renderAlphabets()}
        </div>
      </div>
      <div id="HiddenWord">{hiddenWord.join(" ")}</div>
      <div class="result">
        <div id="Lose">{errorCount >= 8 ? "You Lose!" : ""}</div>
        <div id="Win">{!hiddenWord.includes("_") ? "You Win!" : ""}</div>
      </div>
      <div class="Container">{renderButtons()}</div>
    </div>
    </div>
  );
};

export default App;

