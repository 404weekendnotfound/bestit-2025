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
import { useUserData } from './context/UserDataContext'
import VideoRoom from './views/VideoRoom/VideoRoom'


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
        <Route path="/register" element={<Register />} />
        <Route path="/video/:id" element={<VideoRoom />} />
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
