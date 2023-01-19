import { doc, setDoc, getDoc, collection, where, query, getDocs } from 'firebase/firestore'
import { db, auth, user } from '../firebase/config'
import { useEffect, useState, lazy } from 'react'





// Search algorithm for best matching posts
const searchAlgo = async (input) => {

    let searchResults = []
    let searchWords = searchTerm.split(" ")

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
                if (item.score > 0) {
                    searchResults.push(item)
                }
            })
        } else {
            console.log("No posts matching your search.")
        }

        // Sort results by highest match score
        searchResults.sort((a, b) => {
            return b.score - a.score
        })
        
        displaySearchResults(searchResults)
}


export default searchAlgo