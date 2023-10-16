import React, { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './VS.css'; // Import your CSS file for styling

const VoiceSearch = ({ onResult }) => {
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [isListening, setIsListening] = useState(false);

  const toggleListening = () => {
    if (isListening) {
      SpeechRecognition.stopListening();
      setIsListening(false);
      onResult(transcript);
    } else {
      SpeechRecognition.startListening();
      setIsListening(true);
      resetTranscript();
    }
  };

  return (
    <div className='voice'>
      <div className='transc'>
      <div className='transcript'>{transcript}</div>
      </div>
      <div className='voice-icon'>
      <FontAwesomeIcon
          icon={faMicrophone} size='2xl'
          className={`microphone-icon ${isListening ? 'active' : ''}`}
          onClick={toggleListening}
        />
      </div>
       
    </div>
  );
};

export default VoiceSearch;
