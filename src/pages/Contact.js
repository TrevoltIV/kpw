import './contact.css'
import Header from '../components/Header'
import Loading from '../components/animations/Loading'
import { setDefaultEventParameters } from 'firebase/analytics'
import { useState } from 'react'


export default function Home() {
    const [test, setTest] = useState(false)
    return (
        <div>
            <Header page="contact" />
            <h1>Contact Page</h1>
            {test ? <Loading /> : null}
            <button onClick={() => setTest(!test)}>Off/On</button>
        </div>
    )
}