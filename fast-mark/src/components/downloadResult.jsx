import { Button } from "@mui/material";
import html2canvas from "html2canvas";

export default function DownloadResult({cleanSelectedElement, downloadResult}) {

    function createScreenshot() {
        html2canvas(document.querySelector("#redactor")).then(canvas => {
            const link = document.createElement('a');
            link.download = 'result.png'; // Имя файла
            link.href = canvas.toDataURL(); // Преобразуем canvas в Data URL
            link.click();
          });
    }

    function handleClick(event) {
        cleanSelectedElement("workspace")
        setTimeout(createScreenshot, 500)
        downloadResult()
    } 

    return (
        <Button
            onClick={handleClick}
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            fullWidth
            style={{width:"23rem", marginTop:"5px"}}
        >
            download
        </Button>
    )
}