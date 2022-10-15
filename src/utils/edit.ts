import {db} from '../firebase'
import { doc, setDoc } from "firebase/firestore"; 


export default async (email: string, rounds: any, userId: string) => {
    const docRef = doc(db, "users", userId)
    const payload = {
        email: email,
        rounds: rounds,
        userId: userId
    }
    console.log(payload)
    setDoc(docRef, payload)
}
