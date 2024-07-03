import { useRef, useState } from "react"
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import TextFormatIcon from '@mui/icons-material/TextFormat';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import { ToggleButton, ToggleButtonGroup } from "@mui/material";


export default function ChooseFontStyle({updateTextFormant, startTextFormat, isDisabled}){
  const [formats, setFormats] = useState(() => [startTextFormat.fontStyle, startTextFormat.fontWeight, startTextFormat.textDecoration]);
  const isBold = useRef(false)
  const isItalic = useRef(false)
  const isUnderlined= useRef(false)

   function setBoldFormat(){
      if (isBold === undefined || isBold === "normal"){
        updateTextFormant({fontWeight:"bold"})
        isBold.current = true
        return
      }
      updateTextFormant({fontWeight:"normal"})
      isBold.current = false
    }

    function setItalicFormat(){
      if (!isItalic.current){
        updateTextFormant({fontStyle:"italic"})
        isItalic.current = true
        return
      }
      updateTextFormant({fontStyle:"normal"})
      isItalic.current = false
    }

    function setUnderlineFormat(){
      if (!isUnderlined.current){
        updateTextFormant({textDecoration:"underline"})
        isUnderlined.current = true
        return
      }
      updateTextFormant({textDecoration:"none"})
      isUnderlined.current = false
    }

    const handleFormat = (event, newFormats) => {
      setFormats(newFormats);
    };

  return (
      <ToggleButtonGroup
        value={formats}
        onChange={handleFormat}
        aria-label="text formatting"
        disabled={isDisabled}
      >
        <ToggleButton value="bold" onClick={setBoldFormat} aria-label="bold">
          <FormatBoldIcon />
        </ToggleButton>
        <ToggleButton value="underline" onClick={setUnderlineFormat} aria-label="underline">
            <TextFormatIcon />
        </ToggleButton>
        <ToggleButton value="italic" onClick={setItalicFormat} aria-label="italic">
          <FormatItalicIcon />
        </ToggleButton>
      </ToggleButtonGroup>
    )
}