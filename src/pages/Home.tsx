import { onAuthStateChanged } from 'firebase/auth'
import { useEffect, useId, useState } from 'react'
import '../../styles/header.scss'
import '../../styles/landingpage.scss'
import edit from '../utils/edit'
import { auth } from '../firebase'
import OldRound from '../components/Home/oldround'
import { Navigate } from 'react-router-dom'
import getUserData from '../utils/getUserData'

export default function Landingpage() {
  const [oldRounds, setOldRounds] = useState([{ score: 0, activeHole: 0, holes: [0], roundId: "" }])
  const [loaded, setLoaded] = useState(false)
  const [user, setUser] = useState()
  const [userLoaded, setUserLoaded] = useState(false)
  const [userNotLoggedIn, setUserNotLoggedIn] = useState(false)
  const [userId, setUserId] = useState("")
  const [email, setEmail] = useState("")
  const [newRound, setNewRound]: any = useState()

  const getData: any = async () => {
    const data: any = await getUserData(userId)
    setOldRounds(data.rounds)
    setEmail(data.email)
    setLoaded(true)
  }
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser: any) => {
      if (currentUser == undefined) {
        setUserNotLoggedIn(true)
      }
      else {
        setUser(currentUser);
        setUserId(currentUser.uid)
        setUserLoaded(true)
      }
      
    });
  }, [])
  useEffect(() => {
    if (userLoaded) {
      getData()
    }
  }, [userLoaded])


  if (userNotLoggedIn) {
    return <Navigate to={"/login"} />
  } 

  const createNewRound = () => {
    const newRoundId = userId + oldRounds.length
    let tempRounds = oldRounds
    tempRounds.push({score: 0, activeHole: 1, holes: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], roundId: newRoundId})
    edit(email, tempRounds, userId)
    setTimeout(() => {
      setNewRound(newRoundId) 
    }, 1000)
  }

  return (
    <>
      {newRound ? <Navigate to={`/round/${newRound}`} /> : <></>}
      <div>
        <div>
          <div className={"playnewround"} onClick={createNewRound}>
            <img src="https://img.icons8.com/sf-regular-filled/96/FFFFFF/play.png" />
            <h3>Starta ny runda</h3>
          </div>
        </div>

        <h3 className={"gamla-rundor"}>Gamla rundor</h3>

        {loaded ? <div>
          {
            oldRounds.map((round) => {
              return (
                <>
                  <OldRound {...round} />
                </>
              )
            })
          }
        </div> : <></>}

      </div>
    </>
  )
}