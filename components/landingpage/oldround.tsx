import { FC, useState } from "react"
import '../../styles/oldround.scss'

interface props {
  score: number,
  playedHoles: number,
  holes: Array<number>
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
            <h3 className={"quickstats-playedholes"}>Played holes {props.playedHoles}</h3>
          </div>
        </div>
        <div className="oldround-scorecard">

          {props.holes.map((score, index) => {
            return (
              <>
                <div>

                  <div className={"scorecard-holenumber scorecard-box"}>{index}</div>
                  <div className={"scorecard-holescore scorecard-box"}>{score}</div>

                </div>
              </>
            )
          })}

        </div>
      </div>
    </>)
}

export default OldRound