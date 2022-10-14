import {useState, FC} from 'react'
import '../../styles/round.scss'

interface props {
    activeHole: number,
    currentHoleScore: number,
    currentHoleInfo: string
}

const ActiveHole: FC<props> = (props): JSX.Element => {
    const [activeHole, setActiveHole] = useState(props.activeHole)
    const [currentHoleScore, setCurrentHoleScore] = useState(props.currentHoleScore)
    return (

        <div className={"activehole-information"}>
           <h1 className={"currenthole"}>{activeHole}</h1>

           <div>
            <button onClick={() => {if (currentHoleScore != 0) {setCurrentHoleScore(currentHoleScore - 1)}}}>-</button>
                <h1>{currentHoleScore}</h1>
            <button onClick={() => setCurrentHoleScore(currentHoleScore + 1)}>+</button>
           </div>

           <h1>Info</h1>
           <p>{props.currentHoleInfo}</p>

        </div>

    )
}

export default ActiveHole