import '../styles/header.scss'
import OldRound from '../components/landingpage/oldround'

export default function Landingpage() {
  const oldRounds = [
    {
      score: 20,
      totalHoles: 9,
      playedHoles: 5,
      holes: [2,2,2,2,2]
    }
  ]

  return (
    <>
      <div>

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