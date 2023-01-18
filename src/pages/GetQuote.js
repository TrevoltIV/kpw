import './getquote.css'
import { lazy } from 'react'
const Header = lazy(() => import('../components/Header'))


export default function Home() {
    return (
        <div>
            <Header page="getquote" />
            <h1>Get a Quote Page</h1>
        </div>
    )
}