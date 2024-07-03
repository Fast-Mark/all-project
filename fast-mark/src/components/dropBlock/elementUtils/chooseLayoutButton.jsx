import { Button, ButtonGroup } from "@mui/material";


export default function ChooseLayoutButton({onUp, onDown, isDisabled}) {
    // const [toUpLoyout, choosLayout] = useState(false)
    return (
        <ButtonGroup style={{width:"100%"}} color="primary" disabled={isDisabled}>
            <Button style={{width:"100%"}} onClick={onUp}>up</Button>
            <Button style={{width:"100%"}} onClick={onDown}>down</Button>
        </ButtonGroup>
    )
}