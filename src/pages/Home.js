import './home.css'
import Header from '../components/Header'
import Welcome from '../components/home-page/Welcome'
import BeforeAfter from '../components/home-page/BeforeAfter'
import GetAQuote from '../components/home-page/GetAQuote'


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