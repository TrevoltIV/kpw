import './contact.css'
import { setDefaultEventParameters } from 'firebase/analytics'
import { useState, lazy } from 'react'
const Loading = lazy(() => import('../components/animations/Loading'))
const Header = lazy(() => import('../components/Header'))


export default function Home() {
    const [test, setTest] = useState(false)
    return (
        <div>
            <Header page="contact" />
            <h1>Contact Page</h1>
            <div className="cube-wrapper">
                <div class="cube">
                    <div class="front"></div>
                    <div class="back"></div>
                    <div class="right"></div>
                    <div class="left"></div>
                    <div class="top"></div>
                    <div class="bottom"></div>
                </div>
            </div>
            <Loading />
        </div>
    )
}