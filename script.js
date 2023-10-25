const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");

const createChatLi = (message, className) => {
  const chatLi = document.createElement("li");
  chatLi.classList.add("chat", `${className}`);
  let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
  chatLi.innerHTML = chatContent;
  chatLi.querySelector("p").textContent = message;
  return chatLi;
}

const generateResponse = () => {
  const userMessage = chatInput.value.trim().toLowerCase(); // Get user entered message and convert to lowercase

  let botResponse;
  if (userMessage.includes("hello")) {
    botResponse = "Hello!";
  } else {
    botResponse = "I'm not sure how to respond to that.";
  }

  // Clear the input textarea and set its height to default
  chatInput.value = "";
  chatInput.style.height = "38px";

  // Append the user's message to the chatbox
  chatbox.appendChild(createChatLi(userMessage, "outgoing"));
  chatbox.scrollTo(0, chatbox.scrollHeight);

  // Display the bot's response after a delay
  setTimeout(() => {
    const incomingChatLi = createChatLi(botResponse, "incoming");
    chatbox.appendChild(incomingChatLi);
    chatbox.scrollTo(0, chatbox.scrollHeight);
  }, 600);
}

chatInput.addEventListener("keydown", (e) => {
  // If Enter key is pressed without Shift key, handle the chat
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    generateResponse();
  }
});

sendChatBtn.addEventListener("click", generateResponse);
closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
