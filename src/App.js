import './fonts.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { lazy } from 'react'
const Home = lazy(() => import('./pages/Home'))
const GetQuote = lazy(() => import('./pages/GetQuote'))
const Contact = lazy(() => import('./pages/Contact'))
const Reviews = lazy(() => import('./pages/Reviews'))
const NoPage = lazy(() => import('./pages/NoPage'))
const Auth = lazy(() => import('./pages/Auth'))
const Dashboard = lazy(() => import('./pages/Dashboard'))


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