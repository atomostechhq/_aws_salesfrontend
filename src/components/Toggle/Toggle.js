import { useState, useEffect } from "react";
import { ToggleOuter, ToggleButton } from "./Toggle.style"


const Toggle = ({disabled, defaultChecked}) => {
    const [toggleOn, setToggleOn] = useState(false);
    
    useEffect(() => {
        if(defaultChecked){
            setToggleOn(true);
        }
    }, [])
    
    const toggleController = () => {
        setToggleOn(!toggleOn)
    }

    return(
        <ToggleOuter pointerEvents = {disabled ? "none": "all"} opacity = {disabled ? "0.5" : "1"} bg = {toggleOn ? "#1765DC" : "#e0e0e0"} onClick={() => toggleController()}>
            <ToggleButton left = {toggleOn ? "20px" : "4px"}></ToggleButton>
        </ToggleOuter>
    )
}

export default Toggle