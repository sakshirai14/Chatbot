import React, { useEffect, useRef } from 'react'

import { LuSend } from 'react-icons/lu'
import { RxCross2 } from 'react-icons/rx'
import '../../Styles/ChatBox.css'
import typingLoader from '../../assets/TypingLaoder.gif'
import { motion } from 'framer-motion'
import { RiRobot2Line } from 'react-icons/ri'
import { GoArrowUp } from 'react-icons/go'

const ChatBox = ({
  messages,
  isTyping,
  input,
  setInput,
  sendMessage,
  displayGreeting,
  setIsChatBoxOpen,
  chatBoxRef,
  chatBoxInputRef,
}) => {
  // this code is for handling the scrolling of page as per the messages addition
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 35,
      }}
      className='w-[30vw] h-[85vh] overflow-hidden bg-gradient-to-b from-blue-900/60 to-blue-950/60 rounded-xl text-white shadow-lg flex flex-col relative z-40 backdrop-blur-2xl border border-blue-900 origin-bottom-right'
      ref={chatBoxRef}
    >
      <RxCross2
        className='absolute top-5 right-5 cursor-pointer text-xl z-40'
        onClick={() => setIsChatBoxOpen(false)}
      />

      {displayGreeting ? (
        <div className='flex flex-col items-center flex-1 text-center space-y-1 h-[90%]'>
          <div className='flex flex-col justify-center items-center space-x-2 w-full px-10 py-5'>
            <div className='flex justify-center items-center space-x-2 border-b w-full py-2 border-slate-300/40'>
              <RiRobot2Line className='text-xl' />
              <span className='text-lg'>MPC Chatbot</span>
            </div>

            <div className='flex flex-col text-2xl py-10'>
              <span>Hello!</span>
              <span>How can I assist you today</span>
            </div>

            <div className='text-start w-full flex flex-col space-y-2'>
              <span className=''>Pick a prompt to get started with!</span>
              {/* 200001002 */}
              <div className='text-sm flex flex-col space-y-5'>
                <div
                  className='bg-white/10 px-5 py-2 flex items-center justify-between cursor-pointer hover:bg-white/20 duration-150'
                  onClick={() => {
                    setInput('What is MPC?')
                    sendMessage('What is MPC?')
                    setTimeout(() => {
                      messagesEndRef.current?.scrollIntoView({
                        behavior: 'smooth',
                      })
                    }, 100)
                  }}
                >
                  <span>What is MPC?</span>
                  <GoArrowUp />
                </div>

                <div
                  className='bg-white/10 px-5 py-2 flex items-center justify-between cursor-pointer hover:bg-white/20 duration-150'
                  onClick={() => {
                    setInput('Give me the total number of members in Team MPC?')
                    sendMessage(
                      'Give me the total number of members in Team MPC?'
                    )
                    setTimeout(() => {
                      messagesEndRef.current?.scrollIntoView({
                        behavior: 'smooth',
                      })
                    }, 100)
                  }}
                >
                  <span>Give me the total number of members in Team MPC?</span>
                  <GoArrowUp />
                </div>
                <div
                  className='bg-white/10 px-5 py-2 flex items-center justify-between cursor-pointer hover:bg-white/20 duration-150'
                  onClick={() => {
                    setInput('Who are the leads of Team MPC?')
                    sendMessage('Who are the leads of Team MPC?')
                    setTimeout(() => {
                      messagesEndRef.current?.scrollIntoView({
                        behavior: 'smooth',
                      })
                    }, 100)
                  }}
                >
                  <span>Who are the leads of Team MPC?</span>
                  <GoArrowUp />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='flex flex-col flex-1 overflow-y-auto h-[90%]'>
          <div className='bg-gradient-to-b bg-transparent text-center text-lg font-semibold border-b border-gray-600 flex flex-col items-center z-30 bg-red py-2'>
            <div className='text-2xl'>🤖</div>
            <div className='text-2xl'>MPC Chatbot</div>
          </div>

          <div className='pb-15 overflow-y-scroll h-full chatbot-scrollbar'>
            <div className='flex-1 space-y-2 p-4'>
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`p-3 rounded-lg max-w-[85%] text-white relative ${
                      msg.sender === 'user'
                        ? 'bg-[#2A1A7E] bg-opacity-80 pr-12'
                        : 'bg-[#435bb4] bg-opacity-80 pl-10'
                    }`}
                  >
                    <span>{msg.text}</span>
                    {msg.sender === 'user' && (
                      <div className='absolute bottom-1 right-1 w-5 h-5 bg-white text-black flex items-center justify-center rounded-md text-xs'>
                        👤
                      </div>
                    )}
                    {msg.sender === 'bot' && (
                      <div className='absolute bottom-1 left-1 w-5 h-5 bg-white text-black flex items-center justify-center rounded-md text-xs'>
                        🤖
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className='flex justify-start'>
                  <img src={typingLoader} alt='typingLoader' className='w-9' />
                </div>
              )}
              {/* Empty div to maintain scroll position */}
              <div ref={messagesEndRef} />
            </div>
          </div>
        </div>
      )}

      <div className='w-full px-4 pb-4 h-[10%]'>
        <div className='w-full h-px bg-white bg-opacity-20 mb-2'></div>
        <div className='flex items-center space-x-4'>
          <input
            type='text'
            value={input}
            ref={chatBoxInputRef}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Type your message'
            className='flex-1 bg-[#1E3A8A] bg-opacity-20 text-white px-4 py-2 outline-none placeholder-white/70 w-[80%] h-10 rounded-lg border border-transparent focus:border-blue-300 disabled:placeholder-white/40 disabled:cursor-not-allowed'
            onKeyDown={(e) => {
              if (e.key === 'Enter' && input.trim() !== '') {
                sendMessage()
                setTimeout(() => {
                  messagesEndRef.current?.scrollIntoView({
                    behavior: 'smooth',
                  })
                }, 100)
              }
            }}
            disabled={isTyping}
            minLength={2}
            required
          />
          <button
            className='bg-white p-2 w-10 h-10 flex justify-center items-center shadow-md rounded-lg cursor-pointer disabled:bg-white/50 hover:bg-white/90 duration-150'
            onClick={() => {
              sendMessage()
              setTimeout(() => {
                messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
              }, 100)
            }}
            disabled={isTyping}
          >
            <LuSend className='text-blue-700' />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default ChatBox
