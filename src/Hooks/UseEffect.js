import React,{useState, useEffect} from 'react'

const UseEffect = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [name, setName] = useState("")
    //on every render
    useEffect(()=>{
        window.addEventListener("resize", updateWindowWidth)
        console.log("I re-rendered")
    })
    //on first render only/Mount only! - ComponentDidMount
    useEffect(()=>{
        console.log("I have mounted")

    },[])
    //On first render + whenever dependancy changes! ComponentDidUpdate
    useEffect(()=>{
        console.log(`The name changed : ${name}`)

    },[name])
    useEffect(()=>{
        window.addEventListener("resize", updateWindowWidth)
        return ()=>{
            //when component unmounts this cleanup code runs
            window.removeEventListener('resize', updateWindowWidth)
        }
    },[])
    const updateWindowWidth = () => {
        setWindowWidth(window.innerWidth);
    }
  return (
    <div>
        <h1>The useEffect Hook</h1>
        <h2>The window width is : {windowWidth}</h2>
        <label>Enter something to see the change</label><br/>
        <input value={name} onChange={(e)=>setName(e.target.value) } placeholder="Enter a Name"/>
    </div>
  )
}

export default UseEffect