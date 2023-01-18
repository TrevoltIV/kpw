import './nopage.css'
import { lazy } from 'react'
const Header = lazy(() => import('../components/Header'))


export default function NoPage() {
    return (
        <div className="nopage-wrapper">
            <Header page="nopage" />
            <div className="nopage-content">
                <h1 className="nopage-heading">404: Page Not Found</h1>
            </div>
        </div>
    )
}