import React, { useContext,useEffect,useRef } from 'react';
import './Main.css';
import { assets } from '../../assets/assets';
import { Context } from '../../config/context';

const Main = () => {
    const { input, setInput, currentChat, chats, sendMessage } = useContext(Context);
    const handleCardClick = (text) => {
        setInput(text);
    };
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            sendMessage(input);
        }
    };
    const resultRef = useRef(null);

    const currentChatMessages = chats.find(chat => chat.id === currentChat)?.messages || [];
    useEffect(() => {
        if (resultRef.current) {
            resultRef.current.scrollTop = resultRef.current.scrollHeight;
        }
    }, [currentChatMessages]);
    
    return (
        <div className='main'>
            <div className="nav">
                <p>Bhagavad Gita Chatbot</p>
                <img src={assets.bg_icon} alt="" />
            </div>
            <div className="main-container">
                        
                {!(currentChatMessages.length) ? 
                <>
                <div className="greet">
                        <p className=""><span>Hare Krishna</span></p>
                        <p>How can I serve you today?</p>
                    </div>
                    <div className="cards">
                        <div onClick={() => handleCardClick("What is soul?")} className="card">
                            <p>What is soul?</p>
                            <img src={assets.question_mark_icon} alt="" />
                        </div>
                        <div onClick={() => handleCardClick("what are the main teachings given by krishna to arjuna?")} className="card">
                            <p>what are the main teachings given by krishna to arjuna?</p>
                            <img src={assets.glowing_bulb_icon} alt="" />
                        </div>
                        <div onClick={() => handleCardClick("How to deal with my anger?")} className="card">
                            <p>How to deal with my anger?</p>
                            <img src={assets.brain_icon} alt="" />
                        </div>
                        <div onClick={() => handleCardClick("How to come out of depression?")} className="card">
                            <p>How to come out of depression?</p>
                            <img src={assets.bulb_icon} alt="" />
                </div>
            </div>
            
            </>:
                <div ref={resultRef} className="result">
                    {currentChatMessages.map((message, index) => (
                        <div key={index} className={message.role === 'user' ? 'result-title' : 'result-data'}  dangerouslySetInnerHTML={{__html:message.content}}>
                            
                            
                        </div>
                    ))}
                </div>

                }
                
                <div className="main-bottom">
                    <div className="search-box">
                        <input
                            id="input-box"
                            onChange={(e) => setInput(e.target.value)}
                            value={input}
                            type="text"
                            placeholder="Hare Krishna, How can I serve you?"
                            onKeyDown={handleKeyPress}
                        />
                        <div>
                            <img id='send' onClick={() => sendMessage(input)} src={assets.send_icon} alt="" />
                        </div>
                    </div>
                    <p className="bottom-info">
                        Chant Hare Krishna And Be Happy
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Main;
