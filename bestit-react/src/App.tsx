import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CvUploader from './components/CvUploader'
import LinkedInForm from './components/LinkedInForm'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <LinkedInForm />
    </>
  )
}

export default App
