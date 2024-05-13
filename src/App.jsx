import { useState, useEffect, useRef } from 'react'
import './App.css'
import data from './data'
function App() {
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(data[index]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [optionSelected, setOptionSelected] = useState(false);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [result, setResult] = useState(false);
  const [score, setScore] = useState(0)
  console.log(question)
 
  const handleNextQuestion = () => {
    if (index < data.length - 1) {
      setIndex(index + 1);
      setQuestion(data[index + 1]); 
    } else {
      setResult(true);
    }
    setSelectedAnswer(null);
    setOptionSelected(false);
    setShowCorrectAnswer(false); 
  };

  const reset = () => {
    setIndex(0);
    setQuestion(data[0]);
    setSelectedAnswer(null);
    setOptionSelected(false);
    setShowCorrectAnswer(false); 
    setScore(0)
    setResult(false)
  }
  
  const handleOptionClick = (selectedOption, correctAnswer) => {
    setSelectedAnswer(selectedOption);
    setOptionSelected(true);
    if (selectedOption === correctAnswer) {
      setShowCorrectAnswer(true);
      setScore(score + 1);
    }
  };

   
  
  // Function to check if the selected answer is correct
  const checkAnswer = (option, correctAnswer) => {
   
      if (option === selectedAnswer && option === correctAnswer) {
        return 'cursor-pointer py-3 px-2 my-2 border-2 rounded-lg  bg-green-300 border-green-400 text-green-600'
      } else if (option === selectedAnswer && option !== correctAnswer)  {
       return 'cursor-pointer py-3 px-2 my-2 border-2 rounded-lg bg-red-300 border-red-400 text-red-500 ';
      } else if (option === correctAnswer && showCorrectAnswer) {
        return 'cursor-pointer py-3 px-2 my-2 border-2 rounded-lg  bg-green-300 border-green-400 text-green-600';
      }
      return 'cursor-pointer py-3 px-2 my-2 border rounded-lg border-neutral-800';
    }
  

   return (
    <>
      <div className="h-screen flex flex-col justify-center items-center bg-neutral-800 text-neutral-500 font-mono  ">
        <h1 className="text-3xl mb-8 pb-2 text-neutral-200 border-b-4 ">Quiz Challenge</h1>
        {result ?
         <div className="box-shadow flex flex-col justify-center items-center w-1/3 h-1/3 bg-zinc-200 p-8 border-zinc-600 rounded-xl font-bold "> Result 
          <div className="text-2xl p-8" >You Scored {score} out of {data.length}</div>
          <button onClick={reset} className="box-shadow-btn m-auto  px-5 py-2 bg-neutral-800 text-neutral-200 border rounded-lg  text-center text-xl">Reset</button> </div>:
        <>
        <div className="box-shadow w-1/3 h-3/4 bg-zinc-200 p-4 relative border-zinc-600 rounded-xl">
        <h3 className="text-2xl my-5" >{index + 1}. {question.question} </h3>
        <ul className="text-xl">
          {question.options.map((option, optionIndex) => (
            <li
              key={optionIndex}
              onClick={() => !optionSelected && handleOptionClick(option,  question.correctAnswer)}
              className={optionSelected ? checkAnswer(option, question.correctAnswer) : 'cursor-pointer py-3 px-2 my-2 border rounded-lg border-neutral-800'}
            >
              {option}
            </li>
          ))}
        </ul>
       <button 
        onClick= {handleNextQuestion}
        disabled={!optionSelected}
        className={`box-shadow-btn m-auto px-10 py-4 bg-neutral-800 text-neutral-200 border rounded-lg text-center text-xl ${!optionSelected ? 'opacity-50 cursor-not-allowed' : ''} ${optionSelected ? 'cursor-pointer' : ''}`}
        style={{ position: 'absolute', left: '50%', bottom: '10%', transform: 'translateX(-50%)' }}>Next</button>
        <p className="absolute inset-x-0 bottom-5 text-center text-lg ">{index+1} out of {data.length} Questions</p>
        </div> </>}
        
        
      </div>
    </>
  )
}

export default App
