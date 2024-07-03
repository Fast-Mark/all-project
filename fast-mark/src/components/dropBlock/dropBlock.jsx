import ChooseAligment from "./elementUtils/chooseAligment";
import ChooseLayoutButton from "./elementUtils/chooseLayoutButton";
import ChooseFont from "./elementUtils/chooseFont";
import ChooseFontSize from "./elementUtils/chooseFontSize";
import { imageBlockType, textBlockType } from "../../const/blockTypes";
import TransformImage from "./elementUtils/transformImage";
import ChooseFontStyle from "./elementUtils/chooseFontFormat";
import ChooseColor from "./elementUtils/chooseColor";


export default function DropBlock({parametrs, type, blockPosition, isDisabled, updateContentParams, onUp, onDown}){
    const startTextFormat = {fontWeight: parametrs.fontWeight, fontStyle: parametrs.fontStyle, textDecoration: parametrs.textDecoration}

    function updateAligment(newAlignment) {
        if (newAlignment ==="right"){
            updateContentParams({display:"block", marginRight: "0",  marginLeft: "auto", textAlign: "right"})
        } else if (newAlignment === "left") {
            updateContentParams({display:"block", marginLeft: "0", marginRight: "auto", textAlign: "left"})
        } else if (newAlignment ==="center") {
            updateContentParams({display:"block", marginLeft: "auto", marginRight: "auto", textAlign: "center"})
        }
    }

    function chooseAligment() {
        if (parametrs.marginLeft === "0" & parametrs.marginRight === "auto"  ) {
            return "left"
        } else if (parametrs.marginLeft === "auto" & parametrs.marginRight === "0") {
            return "right"
        } else if (parametrs.marginLeft === "auto" & parametrs.marginRight === "auto" ) {
            return "center"
        }
    } 

    function updateColor(newColor) {
        updateContentParams({color: newColor})
    }
    
    if (type === textBlockType) {
        return(
            <div className="drop-block" style={blockPosition}>
                <div style={{marginTop: "10px", marginBottom: "10px"}}><ChooseFont startFont={parametrs.fontFamily} updateContentParams={updateContentParams} isDisabled={isDisabled}></ChooseFont></div>
                <div style={{marginTop: "10px", marginBottom: "10px"}}><ChooseFontSize startFont={parametrs.fontSize} updateContentParams={updateContentParams} isDisabled={isDisabled}></ChooseFontSize> </div>
                <div style={{marginTop: "10px", marginBottom: "10px"}}><ChooseAligment setElementPosition={updateAligment} startPosition={chooseAligment} isDisabled={isDisabled}></ChooseAligment></div>
                <div style={{marginTop: "10px", marginBottom: "10px"}}><ChooseFontStyle updateTextFormant={updateContentParams} startTextFormat={startTextFormat} isDisabled={isDisabled}></ChooseFontStyle></div>
                <div style={{marginTop: "10px", marginBottom: "10px"}}><ChooseColor color={parametrs.color} setColor={updateColor} isDisabled={isDisabled}></ChooseColor> </div>
                <div style={{marginTop: "10px", marginBottom: "10px"}}><ChooseLayoutButton onUp={onUp} onDown={onDown} isDisabled={isDisabled}></ChooseLayoutButton> </div>
            </div>
        )
    } else if (type === imageBlockType) {
        return (
            <div className="drop-block" style={blockPosition} >
                <div><ChooseLayoutButton onUp={onUp} onDown={onDown}></ChooseLayoutButton> </div>
                <div><TransformImage updateContentParams={updateContentParams}></TransformImage></div>
            </div>
        )
    }
}