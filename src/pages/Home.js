import './home.css'
import Header from '../components/Header'
import Welcome from '../components/Welcome'
import BeforeAfter from '../components/BeforeAfter'
import GetAQuote from '../components/GetAQuote'


export default function Home() {
    return (
        <div className="home-wrapper">
            <Header page="home" />
            <div className="home-content">
                <Welcome />
                <BeforeAfter />
                <GetAQuote />
            </div>
        </div>
    )
}