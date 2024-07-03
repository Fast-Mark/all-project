import { Button, ButtonGroup } from "@mui/material"
import { useRef } from "react"


export default function TransformImage({updateContentParams, isDisabled}) {
    const transformingRef = useRef(0)

    function handleClick() {
        updateContentParams({transform: `rotate(${transformingRef.current}deg)`})
        transformingRef.current += 90
    }

    return (
        <ButtonGroup color="primary" style={{width:"100%"}} disabled={isDisabled}>
            <Button onClick={handleClick}>развернуть</Button>
        </ButtonGroup>
    )
}