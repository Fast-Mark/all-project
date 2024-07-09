import {useEffect, useRef, useState} from "react"
import { WorkWindowType } from "../../const/windowTypes"
import ImageUpload from "../imageUpload"
import {Typography, Icon, Container, Grid, Input, Alert, Snackbar} from "@mui/material"
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {styled} from "@mui/material/styles";
import axios from "axios";
import {baseURL} from "../../const/endpoints.js";



export default function StartWindow({setImageURL, setWindowType}) {
    const [userWarning, setWarning] = useState("")
    const [openAlert, setOpenAlert] = useState(false)
    const [projectName, setProjectName] = useState("")
    const [isRequest, setIsRequest] = useState(false)
    const [imageUploaderColor, setImageUploaderColor] = useState("secondary")
    const [tableUploaderColor, setTableUploaderColor] = useState("secondary")

    const isTableUploaded = useRef(false)
    const isImageUploaded = useRef(false)
    const table = useRef(null)
    const image = useRef(null)

    useEffect(() => {
    //     TODO: отправлять все запросы здесь
        if (isRequest == false) {
            return
        }

        axios.post(`${baseURL}/upload-image`, {
            'file': image,
            'project_name': projectName,
        }, {
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${localStorage.token}`,
            },
        }).catch((e) => {
            console.log(e)
        }).then((response) => {
            console.log("YEEE")
        })

        axios.post(`${baseURL}/upload-table`, {
            'file': table,
            'project_name': projectName,
        }, {
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${localStorage.token}`,
            },
        }).catch((e) => {
            console.log(e)
        }).then((response) => {
            console.log("YEEE")
        })
    }, [isRequest]);

    function onUploadImage(event) {
        if (! event.target.files) {
            return;
        }

        const extension = event.target.files[0].name.split(".")[1];
        console.log(extension)
        if (extension !== 'img' || extension !== 'jpeg' || extension !== 'png') {
            setImageUploaderColor("error")
            setWarning(
                "Неподдерживаемый тип файла для изображения!"
            )
            setOpenAlert(true)
            return;
        }
        image.current = event.target.files[0]

        setImageURL(URL.createObjectURL(image.current))
        isImageUploaded.current = true
        setImageUploaderColor("success")

    }

    function onUploadTable(event) {
        if (! event.target.files) {
            return;
        }

        const extension = event.target.files[0].name.split(".")[1];
        console.log(extension)
        if (extension !== 'xlsx') {
            setWarning(
                "Неподдерживаемый тип файла для изображения!"
            )
            setOpenAlert(true)
            setTableUploaderColor("error")
            return;
        }

        isTableUploaded.current = true
        table.current = event.target.files[0]
        setTableUploaderColor("success")
    }

    function onHandleStartProject() {
        if (!isImageUploaded || !isTableUploaded || projectName=="") {
            return
        }

        // TODO: сделать так, чтобы после нажатия на кнопку нельзя было изменять имя проекта
        // TODO: сделть обработку нажатия enter

        console.log("start project")
        localStorage.setItem("project-name", projectName)
        setIsRequest(true)
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
        <>
            <Container sx={{ mt: "6rem"}}>
                <Grid 
                    container 
                    spacing={4}
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                >

                <Grid item>
                    <div>
                    <Typography
                        variant="h2"
                        component="span"
                        sx={{ flexGrow: 1 }}
                    >
                    Fast Mark
                    </Typography>
                    </div>
                </Grid>
                    
                <Grid item>
                    <div>
                    <Typography
                        variant="h4"
                        component="span"
                        sx={{ flexGrow: 1 }}
                    >
                    This is the simple editor for your documents with your exel base.
                    </Typography>
                    </div>
                </Grid>
                    
                <Grid item>
                    <div style={{display: "flex", flexDirection: "column"}}>

                        <Button
                            component="label"
                            role={undefined}
                            variant="contained"
                            color={imageUploaderColor}
                            tabIndex={-1}
                            startIcon={<CloudUploadIcon/>}
                        >
                            Upload image
                            <input hidden accept="*" type="file" onChange={onUploadImage}/>
                            <VisuallyHiddenInput type="file"/>
                        </Button>

                        <Button
                            component="label"
                            role={undefined}
                            variant="contained"
                            color={tableUploaderColor}
                            tabIndex={-1}
                            startIcon={<CloudUploadIcon/>}
                        >
                            Upload table
                            <input hidden accept="*" type="file" onChange={onUploadTable}/>
                            <VisuallyHiddenInput type="file"/>
                        </Button>
                    </div>
                </Grid>


                    <Grid item>
                        <div>
                            {/*    TODO: нужно сделать
                     1 - сохранение названия проекта в localStorage
                     2 - понять как отправлять остальные запросы на сервер
                     3 - сделать возможность загружать проект
                     */}
                        <form noValidate autoComplete={"off"}>
                            <TextField onChange={(event) => {setProjectName(event.target.value)}} id="standard-basic" label="project name" variant={"standard"}/>
                        </form>
                    </div>
                </Grid>

                <Grid item>
                    <Button onClick={onHandleStartProject} variant={"outlined"} color={"primary"}>
                        start
                    </Button>
                </Grid>
                </Grid>
            </Container>
            <Snackbar open={openAlert} autoHideDuration={6000} onClose={() => {setError(false)}}>
                <Alert onClose={() => {setError(false)}} severity="error">
                    {userWarning}
                </Alert>
            </Snackbar>
        </>
    )
}

