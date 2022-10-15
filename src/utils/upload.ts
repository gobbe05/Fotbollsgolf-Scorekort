import {db} from '../firebase'
import { doc, setDoc } from "firebase/firestore"; 


export default async (email: string, userId: string) => {
    try {
        const docRef = await setDoc(doc(db, 'users', userId), {
            userId: userId,
            email: email,
            rounds: [
                {
                    score: 0,
                    activeHole: 1,
                    holes: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    roundId: userId+0
                }
            ]
            
        })
        console.log("Added document")
    }catch (e) {
        console.error("Error adding document: ", e);
      }
}
