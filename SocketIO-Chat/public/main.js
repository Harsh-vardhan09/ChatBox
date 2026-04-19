const socket = io();
const clientsTotal = document.getElementById("clients-total");
const messageContainer = document.getElementById("message-container");
const nameInput = document.getElementById("name-input");
const messageForm = document.getElementById("message-form");
const messageInput = document.getElementById("message-input");

const messageTone=new Audio('whatsapp_pc.mp3')

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  sendMessage();
});
// console.dir(messageContainer.innerHTML)

socket.on("clients-total", (data) => {
  clientsTotal.innerText = `Total Clients: ${data}`;
});

const sendMessage = () => {
//   console.log(messageInput.value);
const value = messageInput.value.trim();
if (value.length === 0) return

if(messageInput.value==="") return ;
  const data = {
    name: nameInput.value,
    message: messageInput.value,
    dateTime: new Date(),
  };
  socket.emit("message", data);
  addMessage(true,data)
//   console.dir(messageContainer.innerHTML)
};

socket.on("chat", (data) => {
  console.log(data);
  messageTone.play();
  addMessage(false,data)
});

function addMessage(isOwnMessage, data) {
  const element = `<li class="${isOwnMessage?'message-right':'message-left'}">
        <p class="message">
            ${data.message}
            <span>${data.name}&#9679;${moment(data.dateTime).fromNow()}</span>
        </p>
    </li>`
    // console.log(data)
    messageContainer.innerHTML+=element
    messageInput.value=''
    scrollToBottom()
    clearFeedback()
}

function scrollToBottom(){
    messageContainer.scrollTo(0,messageContainer.scrollHeight)
}

messageInput.addEventListener('focus',(e)=>{
  socket.emit('feedback',{
    feedback:`✍️${nameInput.value} is typing a message`
  })
})

messageInput.addEventListener('keypress',(e)=>{
    socket.emit('feedback',{
        feedback:`✍️${nameInput.value} is typing a message`
  })
})

messageInput.addEventListener('blur',(e)=>{
    socket.emit('feedback',{
        feedback:''
  })
})

socket.on('feedback',(data)=>{
    clearFeedback()
    const element=`
    <li class='message-feedback'>
        <p class="feedback" id="feedback">${data.feedback}</p>
    </li>`
    messageContainer.innerHTML+=element
})

function clearFeedback(){
    document.querySelectorAll('li.message-feedback').forEach(e=>{
        e.parentNode.removeChild(e)
    })
}