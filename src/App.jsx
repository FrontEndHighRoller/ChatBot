import { useEffect, useState } from 'react';
import { ChatInput } from './components/ChatInput';
import ChatMessages from './components/ChatMessages';
import {Chatbot} from "supersimpledev";
import dayjs from "dayjs";
import './App.css'

function App() {
        const [chatMessages, setChatMessages] = useState(JSON.parse(localStorage.getItem("messages")) || [{
          message: 'hello chatbot',
          sender: 'user',
          id: 'id1',
          time: "1766352781110"
        }, {
          message: 'Hello! How can I help you?',
          sender: 'robot',
          id: 'id2',
          time: "1766352781120"
         
        }, {
          message: 'can you get me todays date?',
          sender: 'user',
          id: 'id3',
          time: "1766352790000"
        }, {
          message: 'Today is September 27',
          sender: 'robot',
          id: 'id4',
          time: "1766352790010"
        }]);

        // const [chatMessages, setChatMessages] = array;
        // const chatMessages = array[0];
        // const setChatMessages = array[1];
        
        useEffect(() => {
          Chatbot.addResponses(
            {
              "goodbye": "Goodbye. Have a great day!",
              "give me a unique id": function() {
                return `Sure! Here is a unique ID: ${crypto.randomUUID()}`;
              }
            }
          )
        }, [])

        useEffect(() => {
          localStorage.setItem("messages", JSON.stringify(chatMessages))
        }, [chatMessages])
        
        const time = dayjs().valueOf()
        console.log(time)
        console.log(dayjs(time).format("h:mma"))
        console.log(dayjs(time).format("HH:mm"))

        return (
          <div className="app-container">
            <ChatMessages
              chatMessages={chatMessages}
            />
            <ChatInput
              chatMessages={chatMessages}
              setChatMessages={setChatMessages}
            />
          </div>
        );
      }

export default App
