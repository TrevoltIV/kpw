import './fonts.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import GetQuote from './pages/GetQuote'
import Contact from './pages/Contact'
import Reviews from './pages/Reviews'
import NoPage from './pages/NoPage'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'

export default function App() {
  return (
    <div className="KPW_app">
      <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="getquote" element={<GetQuote />} />
        <Route path="contact" element={<Contact />} />
        <Route path="reviews" element={<Reviews />} />
        <Route path="login" element={<Auth />} />
        <Route path="signup" element={<Auth />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
    </div>
  )
}