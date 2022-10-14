import ActiveHole from '../../components/round/ActiveHole'
import '../../styles/round.scss'
import { useState, useEffect, FC } from 'react'


const activeRound =
    {
      score: 20,
      activeHole: 5,
      holes: [2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0]
    }

const Round: FC = (): JSX.Element => {
    const [activeHole, setActiveHole] = useState(activeRound.activeHole)
    const [ActiveHoleObj, setActiveHoleObj] = useState({
        activeHole: 0,
        currentHoleScore: 0,
        currentHoleInfo: ""
    })
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        console.log("Effect ran")
        fetch("https://fpgscore.fredricpersson2.repl.co/info.json")
            .then(res => res.json())
            .then(data => {
                const currentHole = activeHole
                setActiveHoleObj({
                    activeHole: currentHole,
                    currentHoleScore: activeRound.holes[currentHole],
                    currentHoleInfo: data.court[currentHole].info
                })})
            .then(()=> {
                
            })
        console.log(loaded)
    }, [activeHole])

    
    const left = "<"
    const right = ">"
    return (
        <>
        <div className={"activehole-container"}>
            <button className={"incrementhole-button"} onClick={() => setActiveHole(activeHole-1)}>{left}</button>
            <ActiveHole {...ActiveHoleObj} />
            <button className={"incrementhole-button"} onClick={() => setActiveHole(activeHole+1)}>{right}</button>
        </div>
        
        
        </>
    )
}

export default Round