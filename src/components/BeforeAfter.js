import './beforeafter.css'
import BeforeImage from '../images/before.jpg'
import AfterImage from '../images/after.jpg'


export default function BeforeAfter() {
    return (
        <div className="before-after-wrapper">
            <div className="before-after">
                <div className="before-after-item">
                    <h5 className="before-after-label">Before</h5>
                    <img className="before-after-img" src={BeforeImage} alt="After image" />
                </div>
                <div className="before-after-item">
                    <h5 className="before-after-label">After</h5>
                    <img className="before-after-img" src={AfterImage} alt="After image" />
                </div>
            </div>
        </div>
    )
}