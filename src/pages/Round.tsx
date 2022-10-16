import { onAuthStateChanged } from "firebase/auth"
import { FC, useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { auth, db } from "../firebase"
import {doc, onSnapshot } from 'firebase/firestore'
import '../../styles/oldround.scss'
import '../../styles/round.scss'
import edit from "../utils/edit"

const Round: FC = () => {
    const {roundId} = useParams()

    //Object
    const [round, setRound]: any = useState()
    const [rounds, setRounds] = useState()
    const [objRounds, setObjRounds]: any = useState()
    const [objEmail, setObjEmail] = useState("")

    const [userId, setUserId] = useState("")
    const [userLoaded, setUserLoaded] = useState(false)
    const [roundLoaded, setRoundLoaded] = useState(false)

    const [activeHole, setActiveHole] = useState(0)
    const [score, setScore] = useState(0)
    const [holes, setHoles]: any = useState()

    const [courseInformation, setCourseInformaiton]: any = useState()
    const [courseLoaded, setCourseLoaded] = useState(false)

      useEffect(() => {
        onAuthStateChanged(auth, (currentUser: any) => {
          setUserId(currentUser.uid)
          setUserLoaded(true)
        });

        //Fetch course information
        const url = "https://fpgscore.fredricpersson2.repl.co/info.json";
        const fetchData = async () => {
        try {
            const response = await fetch(url);
            const json = await response.json();
            
            console.log(courseLoaded)
            setCourseInformaiton(json)
            setCourseLoaded(true)
            console.log(json)
        } catch (error) {
            console.log("error", error);
        }
        };
        fetchData();
      }, [])

      useEffect(() => {
        if(userLoaded) {
            return onSnapshot(doc(db, "users", userId), (doc: any) => {
                const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
                setObjRounds(doc.data().rounds)
                setObjEmail(doc.data().email)
                setRounds(doc.data().rounds)
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

      //Change array for activeHole
      function changeArrayAH(rounds: any, change:any) {
        let arrIndex: any
        rounds.map((round: any, index: any) => {
            if(round.roundId == roundId) {
                
                arrIndex = index
            }
            rounds[arrIndex] = {activeHole: activeHole+change, holes:holes, score:score, roundId: roundId}

        })
        return rounds
      }
      //Change array for score
      function changeArrayS(rounds: any, change:any, activeHole: any) {
        let arrIndex: any
        rounds.map((round: any, index: any) => {
            if(round.roundId == roundId) {
                arrIndex = index
            }
        })
        if(arrIndex != undefined) {
            rounds[arrIndex].holes[activeHole-1] = rounds[arrIndex].holes[activeHole-1] + change
        }
        console.log(activeHole)
        return rounds
      }

    return (
        
        <>
        <div className={"score"}>
            {score}
        </div>
        <div className={"activehole"}>Nuvarande hål</div>
        <div className={"activehole-container"}>
            <button onClick={() => {if(activeHole != 1) edit(objEmail, changeArrayAH(rounds, -1), userId)}}><h2>{"<"}</h2></button>
        
                {roundLoaded ? <h1>{activeHole}</h1> : null}

            <button onClick={() => {if(activeHole != 18) {edit(objEmail, changeArrayAH(rounds, 1), userId)}}}><h2>{">"}</h2></button>
        </div>
        <div className={"instructions-container"}>
            <h3>Instruktioner</h3>
            {courseLoaded && roundLoaded ? <>{courseInformation.court[activeHole-1].info}</> : null}
        </div>
        <div className={"slag"}>Slag</div>
        <div className={"activescore-container"}>
            <button onClick={() => {if(activeHole != 1) {
                edit(objEmail, changeArrayS(rounds, -1, activeHole), userId)}}}>-</button>

                {roundLoaded ? <h1>{round.holes[activeHole-1]}</h1> : null}

            <button onClick={() => {if(activeHole != 18) {
                edit(objEmail, changeArrayS(rounds, 1, activeHole), userId)}}}>+</button>
        </div>
        
        <h1 className={"scorekort-titel"}>Scorekort</h1>
        <div className="oldround-scorecard">  
        {roundLoaded && courseLoaded ? round.holes.map((score: any, index: any) => {
            let parName = ""
            if(courseLoaded) {
              const parDifference = score - courseInformation.court[index].par
            
            if(parDifference >= 2) {
              parName = "doublebogey"
            }
            if(parDifference == 1) {
              parName = "bogey"
            }
            if(parDifference == 0) {
              parName = "par"
            }
            if(parDifference == -1) {
              parName = "birdie"
            }
            if(parDifference <= -2) {
              parName = "eagle"
            }
            if(parDifference == -courseInformation.court[index].par) {
              parName = "none"
            }
            }
            return (
              <>
                <div>

                  <div className={"scorecard-holenumber scorecard-box"}><b>{index+1}</b></div>
                  {courseLoaded ? <div className={"scorecard-par scorecard-box"}><h6>{courseInformation.court[index].par}</h6></div> : <></>}
                  <div className={"scorecard-holescore scorecard-box " + parName}><h6>{score}</h6></div>

                </div>
              </>
            )
          }): <></>}
            </div>  
        </>
        )
}

export default Round