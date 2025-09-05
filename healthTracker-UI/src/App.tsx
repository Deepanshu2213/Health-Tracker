import { useState } from 'react'

import './App.css'

function App() {
  const [count, setCount] = useState<number>(0)

  return (
    <div className='flex flex-col justify-center items-center'>
    <h1>{count}</h1>
    <button className="border-b" onClick={() => {setCount(prev => prev+1)}}>Test</button>
    </div>
  )
}

export default App
