import { FC, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import '../../../styles/oldround.scss'

interface props {
  score: number,
  activeHole: number,
  holes: Array<number>,
  roundId: string
}

const OldRound: FC<props> = (props): JSX.Element => {

  const [scoreCardHidden, setScoreCardHidden] = useState(true)

  const [courseInformation, setCourseInformation]: any = useState()
  const [courseLoaded, setCourseLoaded] = useState(false)

  //Fetch course information
  //Fetch course information
  useEffect(() => {
    const url = "https://fpgscore.fredricpersson2.repl.co/info.json";
      const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setCourseInformation(json)
        setCourseLoaded(true)
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, [])

  //Create function that returns classname on difference between par and score

  //Show par

  //Set up color for score

  //style to make clearer

  return (
    <>
      <div className={scoreCardHidden ? "oldround-container scorecard-hidden" : "oldround-container"} onClick={() => setScoreCardHidden(!scoreCardHidden)}>

        <div className={"oldround-quickstats"}>
          <div className={"oldround-score"}>
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
          })}

          <Link to={`/round/${props.roundId}`} className={"resumeround"}>Återuppta runda</Link>

        </div>
      </div>
    </>)
}

export default OldRound