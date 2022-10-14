import '../../styles/header.scss'
import '../../styles/landingpage.scss'
import OldRound from '../../components/home/oldround'

export default function Landingpage() {
  const oldRounds = [
    {
      score: 20,
      playedHoles: 5,
      holes: [2,2,2,2,2]
    },
    {
      score: 20,
      playedHoles: 5,
      holes: [2,2,2,2,2]
    }
  ]

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

        {
          oldRounds.map((round) => {
            return (
              <>
                <OldRound {...round} />
              </>
            )
          })
        }

      </div>
    </>
  )
}