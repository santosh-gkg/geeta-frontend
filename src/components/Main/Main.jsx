import React, { useContext,useEffect,useRef, useState } from 'react';
import './Main.css';
import { assets } from '../../assets/assets';
import { Context } from '../../config/context';
import { marked } from 'marked';
import remarkGfm from 'remark-gfm';

const Main = () => {
    const { input, setInput, currentChat, chats, sendMessage, startNewChat,mobile,setMobile,extended,setExtended} = useContext(Context);
    const handleCardClick = (text) => {
        setInput(text);
    };
    const isMobileDevice = () => {
        return /Mobi|Android/i.test(window.navigator.userAgent);
      };
    
      useEffect(() => {
        // Set the mobile state based on the device type
        setExtended(isMobileDevice());
        setMobile(isMobileDevice());
    
        // You can set other state variables based on the device type
      }, [setExtended,setMobile]);
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            sendMessage(input);
        }
    };
    const resultRef = useRef(null);
    const getHtmlContent = (message) => {
        // Use marked to convert Markdown to HTML
        return marked(message, {
          gfm: true, // Enable GitHub-flavored markdown
          breaks: true // Convert line breaks to <br>
        });
      };

    const currentChatMessages = chats.find(chat => chat.id === currentChat)?.messages || [];
    useEffect(() => {
        if (resultRef.current) {
            resultRef.current.scrollTop = resultRef.current.scrollHeight;
        }
    }, [currentChatMessages]);
    
    return (
        <div className='main'>
            <div className="nav">
            <button type="button" onClick={() => setMobile(prev => !prev)} className="sidebar-button"><span ></span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" >
                    <path fill="currentColor" fillRule="evenodd" d="M3 8a1 1 0 0 1 1-1h16a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1m0 8a1 1 0 0 1 1-1h10a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1" clipRule="evenodd">
                        
                    </path>
                </svg>
            </button>
                <p>Bhagavad Gita Chatbot</p>
                <div onClick={startNewChat} className="new-chat">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24" ><path d="M15.673 3.913a3.121 3.121 0 1 1 4.414 4.414l-5.937 5.937a5 5 0 0 1-2.828 1.415l-2.18.31a1 1 0 0 1-1.132-1.13l.311-2.18A5 5 0 0 1 9.736 9.85zm3 1.414a1.12 1.12 0 0 0-1.586 0l-5.937 5.937a3 3 0 0 0-.849 1.697l-.123.86.86-.122a3 3 0 0 0 1.698-.849l5.937-5.937a1.12 1.12 0 0 0 0-1.586M11 4A1 1 0 0 1 10 5c-.998 0-1.702.008-2.253.06-.54.052-.862.141-1.109.267a3 3 0 0 0-1.311 1.311c-.134.263-.226.611-.276 1.216C5.001 8.471 5 9.264 5 10.4v3.2c0 1.137 0 1.929.051 2.546.05.605.142.953.276 1.216a3 3 0 0 0 1.311 1.311c.263.134.611.226 1.216.276.617.05 1.41.051 2.546.051h3.2c1.137 0 1.929 0 2.546-.051.605-.05.953-.142 1.216-.276a3 3 0 0 0 1.311-1.311c.126-.247.215-.569.266-1.108.053-.552.06-1.256.06-2.255a1 1 0 1 1 2 .002c0 .978-.006 1.78-.069 2.442-.064.673-.192 1.27-.475 1.827a5 5 0 0 1-2.185 2.185c-.592.302-1.232.428-1.961.487C15.6 21 14.727 21 13.643 21h-3.286c-1.084 0-1.958 0-2.666-.058-.728-.06-1.369-.185-1.96-.487a5 5 0 0 1-2.186-2.185c-.302-.592-.428-1.233-.487-1.961C3 15.6 3 14.727 3 13.643v-3.286c0-1.084 0-1.958.058-2.666.06-.729.185-1.369.487-1.961A5 5 0 0 1 5.73 3.545c.556-.284 1.154-.411 1.827-.475C8.22 3.007 9.021 3 10 3A1 1 0 0 1 11 4"></path></svg>
                </div>
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
                        
                        <div key={index} className={message.role === 'user' ? 'result-title' : 'result-data'}  dangerouslySetInnerHTML={{__html:getHtmlContent(message.content)}}>
                             
                            
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
