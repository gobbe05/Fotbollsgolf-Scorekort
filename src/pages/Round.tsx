import { onAuthStateChanged } from "firebase/auth"
import { FC, useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { auth, db } from "../firebase"
import {doc, onSnapshot } from 'firebase/firestore'
import edit from "../utils/edit"

const Round: FC = () => {
    const {roundId} = useParams()

    //Object
    const [round, setRound]: any = useState()
    const [objRounds, setObjRounds]: any = useState()
    const [objEmail, setObjEmail] = useState("")

    const [userId, setUserId] = useState("")
    const [userLoaded, setUserLoaded] = useState(false)
    const [roundLoaded, setRoundLoaded] = useState(false)

    const [activeHole, setActiveHole] = useState(0)
    const [score, setScore] = useState(0)
    const [holes, setHoles]: any = useState()

      useEffect(() => {
        onAuthStateChanged(auth, (currentUser: any) => {
          setUserId(currentUser.uid)
          setUserLoaded(true)
        });
      }, [])

      useEffect(() => {
        if(userLoaded) {
            return onSnapshot(doc(db, "users", userId), (doc: any) => {
                const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
                setObjRounds(doc.data().rounds)
                setObjEmail(doc.data().email)
                doc.data().rounds.map((round: any) => {
                    if(round.roundId == roundId) {
                        setRound(round)
                        setActiveHole(round.activeHole)
                        setScore(round.score)
                        setHoles(round.holes)
                        let tempScore: number = 0
                        round.holes.forEach((holeScore:number) => {
                            tempScore += holeScore
                        })
                        setScore(tempScore)
                        setRoundLoaded(true)
                    }
                })
            })

        }
      }, [userLoaded])


    return (
        
        <>
        <div>
            <button onClick={() => {if(activeHole != 1) edit(objEmail, [{activeHole: activeHole-1, holes:holes, score: score, roundId: roundId}], userId)}}>-</button>
        
                {roundLoaded ? <h1>{activeHole}</h1> : null}

            <button onClick={() => {if(activeHole != 18) {edit(objEmail, [{activeHole: activeHole+1, holes:holes, score: score, roundId: roundId}], userId)}}}>+</button>
        </div>
        <div>
            <button onClick={() => {if(activeHole != 1) {
                const tempHoleScore = holes
                tempHoleScore[activeHole-1] = tempHoleScore[activeHole-1] - 1
                edit(objEmail, [{activeHole: activeHole, holes:tempHoleScore, score: score-1, roundId: roundId}], userId)}}}>-</button>

                {roundLoaded ? <h1>{round.holes[activeHole-1]}</h1> : null}

            <button onClick={() => {if(activeHole != 18) {
                const tempHoleScore = holes
                tempHoleScore[activeHole-1] = tempHoleScore[activeHole-1] + 1
                edit(objEmail, [{activeHole: activeHole, holes:tempHoleScore, score: score+1, roundId: roundId}], userId)}}}>+</button>
        </div>
        <div>
            {score}
        </div>

        </>
        )
}

export default Round