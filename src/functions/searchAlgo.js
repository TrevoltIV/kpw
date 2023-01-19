import { collection, query, getDocs } from 'firebase/firestore'
import { db } from '../firebase/config'





// Search algorithm for best matching posts
const searchAlgo = async (input) => {

    let searchResults = []
    let searchWords = input.split(" ")

    // Fetch all posts from database
    const postsRef = collection(db, "posts")
    const q = query(postsRef)
    const querySnapshot = await getDocs(q)
        if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
                let item = doc.data()
                item.score = 0
    
                for (let i = 0; i < searchWords.length; i++) {
                    let searchWord = searchWords[i]
    
                    // Add points to score for each matching word
                    if (item.title.includes(searchWord)) {
                        item.score += 1
                    }
                    if (item.description.includes(searchWord)) {
                        item.score += 0.5
                    }
                    if (item.tags.includes(searchWord)) {
                        item.score += 0.8
                    }
                }

                // Add posts with a score above 0 to results
                if (item.score > 0) {
                    searchResults.push(item)
                }
            })
        } else {
            return false
        }

        // Sort results by highest match score
        searchResults.sort((a, b) => {
            return b.score - a.score
        })
        
        return searchResults
}


export default searchAlgo