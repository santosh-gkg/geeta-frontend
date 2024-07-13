// groq.js

// Define the base URL of your FastAPI server
import axios from 'axios';

// Function to send a query to the FastAPI server and get a response
async function runChat(messages,message) {
      const newArray = messages.map((message,index) => ({
      role: message.role,
      content: message.content
  }));

  newArray.push({ role: 'user', content: message });
  const chat_response = await axios.post('https://api.sgkg.tech/geeta/', {messages:newArray});

  console.log(chat_response.data.response);
  console.log(chat_response);
  return chat_response.data.response;
  
}

export default runChat;
