import { FC, useState } from "react"
import { Link } from "react-router-dom"
import '../../../styles/oldround.scss'

interface props {
  score: number,
  activeHole: number,
  holes: Array<number>,
  roundId: number
}

const OldRound: FC<props> = (props): JSX.Element => {

  const [scoreCardHidden, setScoreCardHidden] = useState(true)

  return (
    <>
      <div className={scoreCardHidden ? "oldround-container scorecard-hidden" : "oldround-container"} onClick={() => setScoreCardHidden(!scoreCardHidden)}>

        <div className={"oldround-quickstats"}>
          <div className={"score"}>
            <h3 className={"quickstats-score"}>{props.score}</h3>
          </div>
          <div>
            <h3 className={"quickstats-playedholes"}>Aktivt hål {props.activeHole}</h3>
          </div>
          <div>
            <img src="https://img.icons8.com/ios-filled/50/FFFFFF/expand-arrow--v1.png"/>
          </div>
        </div>
        <div className="oldround-scorecard">

          {props.holes.map((score, index) => {
            return (
              <>
                <div>

                  <div className={"scorecard-holenumber scorecard-box"}>{index+1}</div>
                  <div className={"scorecard-holescore scorecard-box"}>{score}</div>

                </div>
              </>
            )
          })}

          <Link to={`/round/${props.roundId}`} className={"resumeround"}>Resume Round</Link>

        </div>
      </div>
    </>)
}

export default OldRound