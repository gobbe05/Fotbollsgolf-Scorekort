import { onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../../styles/header.scss'
import { auth } from '../firebase'

export default function Header() {
  const [sideMenuHide, setSideMenuHide] = useState(true)

  const [username, setUsername] = useState()

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser: any) => {
        if(currentUser == undefined) {
          setUsername("guest")
        } else {
            setUsername(currentUser.email);
        }
      });

      
}, [])
  
  return (
    <>

      <header className={"header-container"}>

        <Link to={"/"} ><div><h3>Vilshärads Fotbollsgolf</h3></div></Link>
        <div onClick={() => setSideMenuHide(!sideMenuHide)} className={"header-hamburger-container"}>

          <div className={"header-hamburger-bun"}></div>
          <div className={"header-hamburger-meat"}></div>
          <div className={"header-hamburger-bun"}></div>

        </div>

      </header>

      <div className={sideMenuHide ? "sidemenu hide" : "sidemenu"}>
        <div className={"sidemenu-top"}>
        <div onClick={() => setSideMenuHide(!sideMenuHide)} className={"sidemenu-hamburger-container"}>

        <div className={"header-hamburger-bun"}></div>
            <div className={"header-hamburger-meat"}></div>
          <div className={"header-hamburger-bun"}></div>

      </div>

<h3 className={"username"}>{username}</h3>
        </div>

        <div className='listitems'>
          {username == undefined ? <><Link to={"/login"}><h3>Login</h3></Link><Link to={"/signup"}><h3>Skapa konto</h3></Link></> : <h3 onClick={() => {auth.signOut(); setSideMenuHide(false)}}>Logga ut</h3>}
          <h3>Leaderbord</h3>
        </div>

      </div>


    </>
  )
}