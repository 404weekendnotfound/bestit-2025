import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import CvUploader from './components/CvUploader'
import LinkedInForm from './components/LinkedInForm'
import Register from './components/Register/Register'


function Home() {
  return (
    <div>
      <h1>Welcome to BestIT</h1>
      <nav>
        <ul>
          <li><Link to="/linkedin">LinkedIn Form</Link></li>
          <li><Link to="/cv">CV Upload</Link></li>
          <li><Link to="/register">Register</Link></li>
        </ul>
      </nav>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/linkedin" element={<LinkedInForm />} />
        <Route path="/cv" element={<CvUploader />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}





export default App
