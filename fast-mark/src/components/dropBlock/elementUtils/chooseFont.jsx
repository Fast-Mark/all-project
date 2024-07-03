import { useTheme } from "@mui/material";
import { useState } from "react"
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import Onest from '../../../assets/fonts/OnestRegular1602-hint.ttf';

const fonts = [
    'Arial',
    'Times New Roman',
    'Verdana',
    'Georgia',
    'Tahoma',
    'Trebuchet MS',
    'Garamond',
    'Courier New',
    'Roboto',
]

  

export default function ChooseFont({startFont, updateContentParams, isDisabled}) {
    const [currentFont, setCurrentFont] = useState(startFont)

    function handleChange(event) {
        setCurrentFont(event.target.value)
        updateContentParams({fontFamily: event.target.value})
    }

    return (
        <FormControl style={{width:"100%"}} disabled={isDisabled}>
            <InputLabel >{startFont}</InputLabel>
            <Select
            value={""}
            label={currentFont}
            onChange={(event) => {handleChange(event)}}
            inputProps={{ 'aria-label': 'Without label' }}
            >
            
            {fonts.map((font, i) => {
                return (<MenuItem key={i} value={font} > {font} </MenuItem>)
            })}

            </Select>
        </FormControl>
    )
}