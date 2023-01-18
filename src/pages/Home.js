import './home.css'
import { doc, setDoc, getDoc, collection, where, query, getDocs } from 'firebase/firestore'
import { db, auth, user } from '../firebase/config'
import axios from 'axios'
import { useEffect, useState, lazy } from 'react'
const GetAQuote = lazy(() => import('../components/home-page/GetAQuote'))
const BeforeAfter = lazy(() => import('../components/home-page/BeforeAfter'))
const Welcome = lazy(() => import('../components/home-page/Welcome'))
const Header = lazy(() => import('../components/Header'))


export default function Home() {
    let currentDate = new Date().toISOString().slice(0, 10)
    const [loaded, setLoaded] = useState(false)
    const [visits, setVisits] = useState(null)
    const [userIP, setUserIP] = useState(null)
    const [userData , setUserData] = useState(null)


    // Fetch user's IP address and add to state
    const fetchIP = async () => {
        const res = await axios.get('https://geolocation-db.com/json/')
        setUserIP(res.data.IPv4)
    }

    // Call fetchIP() on page load
    useEffect(() => {
        if (!loaded) {
            fetchIP()
            .then(() => {
                checkUserIP()
            })
        }
    })

    // Check if user's IP address is in Firestore and add if not
    const checkUserIP = async() => {
        const visitorIPRef = collection(db, "visitors")
        const q = query(visitorIPRef, where("ip", "==", userIP))
        const querySnapshot = await getDocs(q)
        if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
                setUserData(doc.data())
            })
        } else {
            const newVisitorIPRef = doc(db, "visitors", userIP)
            await setDoc(newVisitorIPRef, {
                ip: userIP,
                firstVisit: currentDate,
                lastVisit: currentDate,
                visits: 1,
            })
        }
    }

    // Update user's visit data in firestore if they are already logged
    if (userData !== null) {
        const updateVisitor = async () => {
            const oldVisitorIPRef = doc(db, "visitors", userIP)
            await setDoc(oldVisitorIPRef, {
                ip: userData.ip,
                firstVisit: userData.firstVisit,
                lastVisit: currentDate,
                visits: userData.visits + 1,
            })
        }
        updateVisitor()
    }


    // Fetch site visits from Firestore
    const fetchVisits = async () => {
        const visitsRef = doc(db, "traffic", "site-visits")
        const docSnap = await getDoc(visitsRef)
        if (docSnap.exists()) {
            setVisits(docSnap.data())
            setLoaded(true)
        }
    }

    // Update site visits in Firestore
    const updateVisits = async () => {
        const visitsRef2 = doc(db, "traffic", "site-visits")
        await setDoc(visitsRef2, {
            total: visits.total + 1,
        })
        setVisits(null)
    }

    // Call fetchVisits() on page load
    useEffect(() => {
        if (!loaded) {
            fetchVisits()
        }
    }, [loaded])

    // Call updateVisits() when visits are fetched
    useEffect(() => {
        if (visits !== null) {
            updateVisits()
        }
    }, [visits, updateVisits])


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