const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');

function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;
  
    addMessage('user', message);
  
    fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer my open api key'
      },
      body: JSON.stringify({
        prompt: message,
        max_tokens: 50
      })
    })
    .then(response => response.json())
    .then(data => {
      const botMessage = data.choices[0].text.trim();
      addMessage('bot', botMessage);
    })
    .catch(error => {
      console.error('Error:', error);
      addMessage('bot', 'An error occurred. Please try again later.');
    });
  
    userInput.value = '';
  }
  function addMessage(sender, message) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message', sender);
  messageElement.textContent = message;
  chatBox.appendChild(messageElement);
}


  
