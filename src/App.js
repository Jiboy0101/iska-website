import React, { useState, useEffect } from 'react';
import { dbRef, get } from './firebase';
import VoiceSearch from './components/VoiceSearch';
import { faPaperPlane, faKeyboard, faMicrophone, faCircleQuestion, faBars, faHome, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './App.css';
import iska from './components/iska-logo.png';
import "@fontsource/krona-one"; // Defaults to weight 400

function App() {
  const [command, setCommand] = useState('');
  const [response, setResponse] = useState('');
  const [spokenResponse, setSpokenResponse] = useState('');
  const [isVoiceSearch, setIsVoiceSearch] = useState(true); // Set initial state to true for VoiceSearch
  const [hasSpokenResponse, setHasSpokenResponse] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  // State to control the visibility of the question list
  const [showQuestions, setShowQuestions] = useState(false);
  const [isQuestionIcon, setIsQuestionIcon] = useState(true);

  // Function for toggleQuestions button event
  const toggleQuestions = () => {
    setShowQuestions(!showQuestions); // Toggle the visibility of question list
    setIsQuestionIcon(!isQuestionIcon);
  };

  const handleAskQuestion = (query) => {
    if (isSpeaking) {
      // Wait for the current speech to finish before processing a new request
      return;
    }

    get(dbRef).then((snapshot) => {
      const data = snapshot.val();
      if (data && data.commands) {
        const inputWords = query.toLowerCase().split(' ');
        const matchingCommands = [];

        for (const commandKey in data.commands) {
          if (data.commands.hasOwnProperty(commandKey)) {
            const commandWords = commandKey.toLowerCase().split(' ');

            const isMatch = commandWords.every((word) =>
              inputWords.includes(word)
            );

            if (isMatch) {
              matchingCommands.push(data.commands[commandKey]);
            }
          }
        }

        if (matchingCommands.length > 0) {
          const commandData = matchingCommands[0]; // Assuming there's only one matching command

          // Set the response text based on the database value
          setResponse(commandData.response);

          // Set the spoken response and initiate speech
          const speakText = commandData.speakText || commandData.response;
          setSpokenResponse(speakText);

          speakResponse(speakText);

          // Set hasSpokenResponse to true to prevent repeating the speech
          setHasSpokenResponse(true);
        } else {
          setResponse('Command not found');

          speakResponse("I'm sorry, but I couldn't find a matching command.");

          // Set the error message and spoken text for "Command not found"

          // Speak the spoken response only if it's a new response and hasn't been spoken before
          if (!hasSpokenResponse) {
            speakResponse(spokenResponse);
            setHasSpokenResponse(true);
          }
        }
      }
    });
  };

  const speakResponse = (text) => {
    const speechSynthesis = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);

    setIsSpeaking(true);

    utterance.onend = () => {
      setIsSpeaking(false);
    };

    speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    // Automatically reset the spoken response state when the command changes
    setHasSpokenResponse(false);
  }, [command]);

  const toggleVoiceSearch = () => {
    setIsVoiceSearch(!isVoiceSearch);
    setCommand('');
    setResponse('');
    setSpokenResponse(''); // Reset the spoken response
    setHasSpokenResponse(false);
  };

  return (
    <div className="App">

      <header className='head'>
        <div className='left-container'>
          <FontAwesomeIcon className='menu' icon={faBars} size='2xl'/>
          <FontAwesomeIcon className='home' icon={faHome} size='xl'/>
        </div>
       
        <img src={iska} alt="PUP Logo" className="logo" />
        <FontAwesomeIcon className='question' icon={isQuestionIcon ? faCircleQuestion : faTimes} size='2xl' onClick={toggleQuestions}/>
      </header>

      {showQuestions && (
        <div className="Q-list">
          <h6 className='note'>Try to ask these suggestions (Note: This list is not clickable)</h6>
          <p>- What are the available programs</p>
          <p>- Tell me about PUP</p>
          <p>- How to enroll</p>
          <p>- How to add subjects</p>
          <p>- How to change subjects</p>
          <p>- How to become an academic achiever</p>
          <p>- How to apply for graduation</p>
          <p>- Where is the Nantes Building</p>
          <p>- Where is the Admission Office</p>
          <p>- Show university map</p>
          <p>- What can you do</p>
        </div>
      )}

      <div className='logo-name'>
        <h1>IS<span>KA</span></h1>
        <p className='desc'>Hi, I'm ISKA, a Virtual Tour and Assistant here at PUP Lopez Branch</p>
      </div>

      <div className='display-text'>
      <div className='response'>
        {/* Format and display response text as new lines */}
        {response.split('\n').map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>
      </div>
     
      <div className='bottom'>
      <div className='switch-button'>
  {isVoiceSearch ? (
    <FontAwesomeIcon className='keyboard' icon={faKeyboard} size='xl' onClick={toggleVoiceSearch} />
  ) : null}
</div>


  <div className='input'>
    {isVoiceSearch ? (
      <VoiceSearch onResult={handleAskQuestion} />
    ) : (

      <div className='m'>
        <FontAwesomeIcon className='mic' icon={faMicrophone} size='2xl' onClick={toggleVoiceSearch}/>
        
        <input
          type="text"
          placeholder="Enter your command"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
        />
        
        {!isVoiceSearch && (
          <FontAwesomeIcon className='send' icon={faPaperPlane} size='2xl' onClick={() => handleAskQuestion(command)} />
        )}
      </div>
    )}
  </div>
  <div className='hide'>
    <h6>1</h6>
  </div>
</div>



    </div>
  );
}

export default App;
