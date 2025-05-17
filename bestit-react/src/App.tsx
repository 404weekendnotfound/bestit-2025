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
<<<<<<< HEAD
import Health from './views/Health/Health'
=======
import { useUserData } from './context/UserDataContext'
>>>>>>> 7360784dc7683570458b8e60539dfbd79f6355a3
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
          <li><Link to="/profil">Profil</Link></li>
          <li><Link to="/health">Health</Link></li>
        </ul>
      </nav>
    </div>
  )
}

function App() {
  const { userData } = useUserData();
  return (
    <BrowserRouter>
    {userData ? (
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/linkedin" element={<LinkedInForm />} />
        <Route path="/cv" element={<CvUploader />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/chat" element={<ChatView />} />
        <Route path="/experts" element={<Experts />} />
        <Route path="/experts/:id" element={<SingleExpert />} />
<<<<<<< HEAD
        <Route path="/health" element={<Health />} />
=======
        <Route path="/register" element={<Register />} />
>>>>>>> 7360784dc7683570458b8e60539dfbd79f6355a3
      </Routes>
    ) : (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    )}
    </BrowserRouter>
  )
}





export default App
