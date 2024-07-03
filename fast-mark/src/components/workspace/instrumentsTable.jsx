import { useRef, useState, useEffect } from "react";
import DownloadResult from "../downloadResult";
import DropBlock from "../dropBlock/dropBlock";
import CreateDynamicBlock from "../workspaceUtils/createDynamicBlock"
import CreateImageBlock from "../workspaceUtils/createImageBlock"
import CreateTextBlock from "../workspaceUtils/createTextBlock"
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import AddTable from "../addTable/addTable";


export default function InstrumentsTable({element, elementsCount, setNewElement, setElementToUp, setElementToDown, updateElement, selectElement, elementsList, downloadResult}) {
    //на будущее, если захочется делать блоки некликабельными
    const [isDisabled, setDisabled] = useState(false)

    function updateContentParams(param) {
        updateElement(element.id, param);
    }

    function elementToUp() {
        setElementToUp(element.id)
    }

    function elementToDown() {
        setElementToDown(element.id)
    }

    return (
        <div style={{display:"flex", flexDirection:"column", alignItems: "flex-start", height: "100%", justifyContent: "center"}}>
            {/* <CreateDynamicBlock newId={elementsCount} setNewElement={setNewElement}></CreateDynamicBlock> */}


            {/* {element !== null ?  */}
            <DropBlock
                style={{marginBottom: "10px"}}
                onUp={elementToUp}
                onDown={elementToDown}
                updateContentParams={updateContentParams}
                parametrs={element.contentStyles}
                type={element.type}
                isDisabled={isDisabled}
                >
            </DropBlock>
            {/* : null} */}
        
            {elementsList}
            
            

            <div style={{ display:"flex", marginTop: "10px", width: "100%", justifyContent: "space-between"}} >
                <div> 
                <ButtonGroup>
                    <CreateImageBlock newId={elementsCount+1} setNewElement={setNewElement}></CreateImageBlock>
                    <CreateTextBlock newId={elementsCount+1} setNewElement={setNewElement}></CreateTextBlock>
                    <AddTable></AddTable>

                </ButtonGroup>
                </div>

            </div>
                <div>
                    <DownloadResult downloadResult={downloadResult} cleanSelectedElement={selectElement}></DownloadResult>
                </div>
        </div>
    )
}