import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import CvUploader from './components/CvUploader'
import LinkedInForm from './components/LinkedInForm'
import Login from './views/Login/Login'
import Register from './components/Register/Register'
import Dashboard from './views/Dashboard/Dashboard'
import Profil from './views/Profil/Profil'
import ChatView from './views/Chat/ChatView'
import Experts from './views/Experts/Experts'
import SingleExpert from './views/SingleExpert/SingleExpert'
function Home() {
  return (
    <div>
      <h1>Welcome to BestIT</h1>
      <nav>
        <ul>
          <li><Link to="/linkedin">LinkedIn Form</Link></li>
          <li><Link to="/cv">CV Upload</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/experts">Experts</Link></li>
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
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/chat" element={<ChatView />} />
        <Route path="/experts" element={<Experts />} />
        <Route path="/experts/:id" element={<SingleExpert />} />
      </Routes>
    </BrowserRouter>
  )
}





export default App
