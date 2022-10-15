import { onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'
import '../../styles/header.scss'
import '../../styles/landingpage.scss'
import {auth} from '../firebase'
import OldRound from '../components/Home/oldround'
import getUserData from '../utils/getUserData'

export default function Landingpage() {
  const [oldRounds, setOldRounds] = useState([{score: 0,activeHole: 0, holes:[], roundId: 0}])
  const [loaded, setLoaded] = useState(false)
  const [user, setUser] = useState()
  const [userLoaded, setUserLoaded] = useState(false)
  const [userId, setUserId] = useState("")
  const getData: any = async () => {
    const data: any = await getUserData(userId)
    setOldRounds(data.rounds)
    setLoaded(true)
  }
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser: any) => {
      setUser(currentUser);
      setUserId(currentUser.uid)
      setUserLoaded(true)
    });
  }, [])
  useEffect(() => {
    if(userLoaded) {
      getData()
    }
  }, [userLoaded])
  
  return (
    <>
      <div>
        <div>
            <div className={"playnewround"}>
              <img src="https://img.icons8.com/sf-regular-filled/96/FFFFFF/play.png"/>
              <h3>Starta ny runda</h3>
          </div>
        </div>

        <h3>Gamla rundor</h3>

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