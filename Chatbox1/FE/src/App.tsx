import { useEffect, useRef, useState } from "react"

const App = () => {
  const [messages,setMessages]=useState(["joined"]);
  const wsRef=useRef(null);
  const inputRef=useRef(null);

  const sendMessage=()=>{
    const message=inputRef.current?.value;
    wsRef.current?.send(JSON.stringify({
      type:"chat",
      payload:{
        message:message
      }
    }))
  }
  useEffect(()=>{
    const ws=new WebSocket("ws://localhost:8080")
    wsRef.current=ws;
    ws.onmessage=(e)=>{
      setMessages(m => [...m,e.data])
    }

    ws.onopen=()=>{
      ws.send(JSON.stringify({
        type:"join",
        payload:{
          roomId:"red"
        }
      }))
    }
  },[])
  return (
    <section className="h-screen bg-black flex flex-col justify-between">
       <div className="mt-8 flex flex-col w-40">
        {messages.map(message=> <span className="bg-white text-grey-500 rounded-lg p-2 m-4 text-center">{message}</span>)}
       </div>
       <div className=" flex bg-white w-full rounded ">
        <input type="text" className="text flex-1 p-4 " ref={inputRef}/>
        <button onClick={sendMessage} className="bg-purple-600 text-white p-4 rounded">Send</button>
       </div>
    </section>
  )
}

export default App
