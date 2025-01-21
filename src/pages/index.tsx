import { useState, useEffect } from 'react';
import styles from '../styles/index.module.css';
import Link from 'next/link';

const ChatApp = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    //fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch('/api/messages');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    }
  };

  const sendMessage = async () => {
    //const url = 'http://localhost:8000/chat';
    const url = 'http://18.225.54.164:8000/chat';
    if (inputValue.trim()) {
      try {
        const resp = await fetch(url , {method : 'POST' , 
                                        //mode: 'cors', 
                                        headers: {
                                                    'Content-Type': 'application/json',
                                                  },
                                        body: JSON.stringify({ message: inputValue })}
                                        );
        const json = await resp.json();
        console.log('resp', json)
        let new_messages = messages.slice();
        let message_user = {
            message : inputValue,
            role : 'user',
            show_bt : false,
        }
        let show_bt = json.intent.label === 'ask_for_eligibility';
        let message = json.message;
        if(show_bt) {
            message = message + ' However, you can check your eligibility for a loan here.';
        }
        let message_bot = {
            message : message,
            role : 'bot',
            show_bt : show_bt,
        }
        new_messages.push(message_user);
        new_messages.push(message_bot);
        setMessages(new_messages)
        setInputValue('');
      } catch (error) {
        console.error('Failed to send message:', error);
      }
    }
  };

  let messages_disp = messages.map((message,index) => {
    let class_n = message.role === 'user' ? styles.message_user : styles.message_bot;
    //console.log('class_n',message.role === 'user' ? 'user':'bot')
    return (
        <div key={index} className={class_n}>
            {message.role} : {message.message}
            {message.show_bt &&  
                <Link href="/form">
                    <button>Check eligibility</button>
                </Link>
            }
            
        </div>
    );
  });

  return (
    <div className={styles.container}>
      <h1>CHAT-BOT</h1>
      <div className={styles.messages}>
        {messages_disp}
      </div>
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
//return (
//    <div className="chat-container">
//      <header className="chat-header">
//        <h1>Chat</h1>
//      </header>
//      <div className="chat-messages">
//        {messages.map((message, index) => (
//          <div key={index} className="message">
//            {message}
//          </div>
//        ))}
//      </div>
//      <form className="chat-input">
//        <input
//          type="text"
//          value={inputValue}
//          onChange={(e) => setInputValue(e.target.value)}
//          placeholder="Type a message..."
//          required
//        />
//        <button type="submit">Send</button>
//      </form>
//    </div>
//  );
};

export default ChatApp;
