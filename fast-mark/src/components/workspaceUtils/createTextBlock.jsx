import { Button } from "@mui/material"
import { centerPosition } from "../../const/positionTypes";
import { textBlockType } from "../../const/blockTypes";


export default function CreateTextBlock({newId, setNewElement}){

    function addNewTextElement() {
        let newItem = {
        id: newId,
        content: `element${newId}`,
        contentStyles: {...centerPosition, textAlign:"center", fontFamily:"arial", fontSize:'14px',color:"#000000"},
        blockStyle: {left: 0, top: 0, width: "100px",  height: "100px"},
        type: textBlockType,
        description: `element${newId}`
        }
    
        setNewElement(newItem)
    }

    return (
        // TODO: сделать красиво с MUI
        <Button onClick={addNewTextElement}>add text</Button>
    )
  }