    import { useState } from 'react';
    import { Chatbot } from "supersimpledev";
    import "./ChatInput.css"
    import dayjs from 'dayjs';
    
    
    export function ChatInput({ chatMessages, setChatMessages }) {
        const [inputText, setInputText] = useState('');

        function saveInputText(event) {
          setInputText(event.target.value);
        }

        function sendMessage() {
          const newChatMessages = [
            ...chatMessages,
            {
              message: inputText,
              sender: 'user',
              id: crypto.randomUUID(),
              time: dayjs().valueOf()
            }
          ];

          setChatMessages(newChatMessages);

          const response = Chatbot.getResponse(inputText);
          setChatMessages([
            ...newChatMessages,
            {
              message: response,
              sender: 'robot',
              id: crypto.randomUUID(),
              time: dayjs().valueOf()
            }
          ]);

          setInputText('');
        }

        function clearMessage() {
          setChatMessages([])
        }

        return (
          <div className="chat-input-container">
            <input
              placeholder="Send a message to Chatbot"
              size="30"
              onChange={saveInputText}
              value={inputText}
              className="chat-input"
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  sendMessage()
                } else if (e.key === "Escape"){
                  setInputText("")
                } }}
              
            />
            <button
              onClick={sendMessage}
              className="send-button"
            >Send</button>

            <button 
            onClick={clearMessage}
            className="clear-button">
              Clear
            </button>
          </div>
        );
      }