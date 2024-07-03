import { dynamicBlockType } from "../../const/blockTypes";
import { centerPosition } from "../../const/positionTypes";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function CreateDynamicBlock({newId, setNewElement}) {
    function addNewElement() {
        let newItem = {
        id: newId,
        content: "",
        contentStyles: {...centerPosition, width: "100%", height: "100%"},
        type: dynamicBlockType,
        }
    
        setNewElement(newItem)
    }


    return (
        <div className="workspace__create-dynamic-block">
            <Autocomplete
            // options={dynamicKeys}
            // sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="имя столбца" />}
            />
        </div>
    )
}