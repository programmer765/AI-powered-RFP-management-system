import { ArrowRight } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'


const ChatBox = () => {
  const [message, setMessage] = useState<string>('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      console.log('Sending message:', message)
      setMessage('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
    }
  }, [message])

  return (
    <div className='w-full flex flex-col items-center'>
      <div className='h-1/2 flex flex-col justify-center'>
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-200">Start Ordering...</h2>
      </div>
      <div className="w-full max-w-3xl mx-auto p-4">
        <form onSubmit={handleSubmit} className="relative">
          <div className="flex items-end bg-white border border-gray-300 rounded-3xl shadow-lg overflow-hidden focus-within:border-gray-400 transition-colors">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="What do you want to order?"
              rows={1}
              className="flex-1 px-4 py-3 pr-12 resize-none outline-none max-h-52 overflow-y-auto min-h-12"
            />
            <button
              type="submit"
              disabled={!message.trim()}
              className={`absolute right-3 bottom-2 p-2 rounded-lg transition-all ${
                message.trim()
                  ? 'bg-black text-white hover:bg-gray-800'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ChatBox