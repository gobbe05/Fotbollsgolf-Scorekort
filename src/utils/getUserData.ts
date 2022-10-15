import {db} from '../firebase'
import { collection, DocumentData, doc, getDoc} from 'firebase/firestore'

export default async (userId: string) => {
    const docRef = doc(db, "users", userId)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
        
        return docSnap.data()
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
}
