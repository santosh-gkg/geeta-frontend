import React, { useContext, useState } from 'react';
import './Sidebar.css';
import { assets } from '../../assets/assets';
import { Context } from '../../config/context';
import {Popup} from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const Sidebar = () => {
    const [extended, setExtended] = useState(false);
    const { chats, startNewChat, loadChat, deleteChat} = useContext(Context);
    const handleDelete = (chatId) => {
        // if (window.confirm('Are you sure you want to delete this chat?')) {
        //     deleteChat(chatId);
        // }
        deleteChat(chatId);
    };
    
    return (
        <div className="sidebar">
            <div className="top">
                <img onClick={() => setExtended(prev => !prev)} className='menu' src={assets.menu_icon} alt="" />
                <div onClick={startNewChat} className="new-chat">
                    <img src={assets.plus_icon} alt="" className="" />
                    {extended ? <p>New Chat</p> : null}
                </div>
                {extended ?
                    <div className="recent">
                        <p className="recent-title">Recent Chats</p>
                        {chats.map(chat => (
                            <div key={chat.id} onClick={() => loadChat(chat.id)} className="recent-entry">

                                <img src={assets.message_icon} alt="" />
                                {(!chat.messages.length) ? 
                                <p>New Chat</p> : <p>{chat.messages[0].content.slice(0,18)+'...'}</p>
                            

                                }
                                
                                <img onClick={() => handleDelete(chat.id)} src={assets.delete_icon} alt="delete" />
                            </div>
                        ))}
                    </div>
                    : null
                }
            </div>
            <div className="bottom">
                <div className="bottom-item recent-entry">
                    <img src={assets.question_icon} alt="" />
                    {extended ? <p className="">Help</p> : null}
                </div>
                {/* <div className="bottom-item recent-entry">
                    <img src={assets.history_icon} alt="" />
                    {extended ? <p className="">Activity</p> : null}
                </div> */}
                <div className="bottom-item recent-entry">
                    <img src={assets.setting_icon} alt="" />
                    {extended ? <p className="">Settings</p> : null}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
