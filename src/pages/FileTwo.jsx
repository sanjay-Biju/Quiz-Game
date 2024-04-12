import './FileTwo.css';
import axios from 'axios'
import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap'

const FileTwo = () => {
    const [datas, setDatas] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const ApiFetch = () => {
        axios.get('https://opentdb.com/api.php?amount=10&category=27&difficulty=easy&type=multiple')
            .then((response) => {
                const results = response.data.results;
                let Arrdata = [];

                results.forEach((item, key) => {
                    const options = [item.correct_answer, ...item.incorrect_answers];
                    shuffleArray(options);
                    const correctAnswerIndex = options.findIndex(option => option === item.correct_answer);
                    Arrdata.push({
                        questionNumber: key + 1,
                        question: item.question,
                        options: options,
                        correctAnswerIndex: correctAnswerIndex
                    });
                });
                setDatas(Arrdata);
            });
    }

    useEffect(() => {
        ApiFetch();
    }, []);

    const evaluateAnswer = (selectedOpt, correctAnswerIndex) => {
        if (selectedOpt === correctAnswerIndex) {
            return 'correct';
        } else {
            return 'incorrect';
        }
    }

    const handleOptionClick = (selectedOpt, correctAnswerIndex) => {
        const evaluation = evaluateAnswer(selectedOpt, correctAnswerIndex);
        setSelectedOption(evaluation);
        // Move to the next question
        setTimeout(() => {
            setSelectedOption(null);
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }, 1000); // Adjust delay as needed
    }

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    return (
        <>
            <div className='mainboxx'>
                <div className='Question-box'>
                    <div className='q-head'><h1>Quiz Time..!</h1> </div>
                    {datas.length > 0 && currentQuestionIndex < datas.length && (
                        <div key={currentQuestionIndex}>
                            <div className='question-part'><h4> {datas[currentQuestionIndex].questionNumber}.  {datas[currentQuestionIndex].question}</h4></div>
                            {datas[currentQuestionIndex].options.map((opt, key) => (
                                <button   
                                    key={key}
                                    className='options-part'
                                    style={{
                                        color: 'black',
                                        // backgroundColor: selectedOption === 'correct' && key === datas[currentQuestionIndex].correctAnswerIndex ? 'green' : selectedOption === 'incorrect' && key === datas[currentQuestionIndex].correctAnswerIndex ? 'green' : 'red'
                                        backgroundColor: selectedOption === 'correct' && key === datas[currentQuestionIndex].correctAnswerIndex ? 'green' : selectedOption === 'incorrect' && key ===   datas[currentQuestionIndex].correctAnswerIndex ? 'green' :''
                                    }}
                                    disabled={selectedOption !== null}
                                    onClick={() => handleOptionClick(key, datas[currentQuestionIndex].correctAnswerIndex)}
                                >
                                    <h5>{opt}</h5>
                                </button>
                            ))}
                        </div>
                    )}
                    {currentQuestionIndex >= datas.length && <div style={{display:'flex',justifyContent:'center',fontFamily:'cursive'}}><h1>All questions answered </h1></div>}
                </div>
            </div>
        </>
    )
}

export default FileTwo;
