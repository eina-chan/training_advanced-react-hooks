// useContext: simple Counter
// http://localhost:3000/isolated/exercise/03.js

import * as React from 'react'

//#region Can be moved to separate module for reuse
const Context = React.createContext()

function CountProvider(props) {
  const [count, setCount] = React.useState(0)
  const value = [count, setCount]
  return <Context.Provider value={value} {...props} />
}

// Custom Hook
const useCount = () => {
  const context = React.useContext(Context)
  if (!context) {
    throw new Error(`useCount must be used within the CountProvider`)
  }
  return context
}
//#endregion

function CountDisplay() {
  // 🐨 get the count from useContext with the CountContext
  const [count] = useCount()
  return <div>{`The current count is ${count}`}</div>
}

function Counter() {
  // 🐨 get the setCount from useContext with the CountContext
  const [, setCount] = useCount()
  const increment = () => setCount(c => c + 1)
  return <button onClick={increment}>Increment count</button>
}

function App() {
  return (
    <div>
      <CountProvider>
        <CountDisplay />
        <Counter />
      </CountProvider>
    </div>
  )
}

export default App
