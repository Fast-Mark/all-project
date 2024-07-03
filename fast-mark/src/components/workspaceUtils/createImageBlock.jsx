import { useRef } from "react";
import { imageBlockType } from "../../const/blockTypes"
import { centerPosition } from "../../const/positionTypes";
import ImageUpload from "../imageUpload";
import { Button, styled } from "@mui/material";

export default function CreateImageBlock({newId, setNewElement}) {
    const countImages = useRef(1)
    
    function addNewElement(url) {
        let newItem = {
        id: newId,
        content: url,
        contentStyles: {...centerPosition, width: "100%", height: "100%"},
        type: imageBlockType,
        description: `image ${countImages.current}`,
        }
    
        setNewElement(newItem)
        countImages.current += 1
    }

    function handleImageLoad(event) {
        const file = event.target.files[0]
        // проверка на наличие файла вообще
        if (!file.type) {
            return
        }

        addNewElement(URL.createObjectURL(file))
    }

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
      });

    return (
        <Button
        component="label"
        role={undefined}
            tabIndex={-1}          
        >
          upload image
          <input hidden accept="image/*" type="file" onChange={handleImageLoad}/>
          <VisuallyHiddenInput type="file" />
        </Button>
    )
  }