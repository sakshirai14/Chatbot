import { motion } from 'framer-motion'
import React from 'react'
import { RiRobot2Line } from 'react-icons/ri'

const ChatBotButton = ({ setIsChatBoxOpen, chatBotRef }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      className='fixed bottom-6 right-6 p-2 bg-blue-600 w-14 h-14 flex items-center justify-center rounded-full shadow-lg cursor-pointer'
      onClick={() => setIsChatBoxOpen(true)}
      // ref={chatBotRef}
    >
      {<RiRobot2Line className='text-white text-2xl' />}
    </motion.div>
  )
}

export default ChatBotButton
