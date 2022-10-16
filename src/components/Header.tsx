import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../../styles/header.scss'

export default function Header() {
  const [sideMenuHide, setSideMenuHide] = useState(true)

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
        <div onClick={() => setSideMenuHide(!sideMenuHide)} className={"sidemenu-hamburger-container"}>

          <div className={"header-hamburger-bun"}></div>
          <div className={"header-hamburger-meat"}></div>
          <div className={"header-hamburger-bun"}></div>

        </div>

      </div>


    </>
  )
}