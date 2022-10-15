import '../../styles/header.scss'

export default function Header() {
  return (
    <>

      <header className={"header-container"}>

        <div><h3>Vilshärads Fotbollsgolf</h3></div>
        <div className={"header-hamburger-container"}>

          <div className={"header-hamburger-bun"}></div>
          <div className={"header-hamburger-meat"}></div>
          <div className={"header-hamburger-bun"}></div>

        </div>

      </header>

    </>
  )
}