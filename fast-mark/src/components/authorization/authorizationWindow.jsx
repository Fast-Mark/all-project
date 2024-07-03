import { useState } from "react"
import axios from 'axios'
import {baseURL} from '../../const/endpoints'
import Button from "@mui/material/Button";
import {Alert, Container, Snackbar, Typography} from "@mui/material";
import TextField from "@mui/material/TextField";
// import {checkAuthToken} from "../../checkAuthorization.js";


const loginPageType = "login"
const createUserPageType = "createUser"

export default function AuthorizationWindow({switchNextPage}) {
    const [currentPage, setCurrentPage] = useState(loginPageType)


    return (
        <>
            {currentPage === loginPageType?

                <LoginPage setCurrentPage={setCurrentPage} switchNextPage={switchNextPage}></LoginPage>
            :

                <SignUpPage setCurrentPage={setCurrentPage} switchNextPage={switchNextPage}></SignUpPage>

            }
        </>
    )
}

function LoginPage({setCurrentPage, switchNextPage}) {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false)

    function handleLogin() {
        const response = axios.post(`${baseURL}/token`, {
            username: name,
            password: password
          }, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            }
          })
          .then(function (response) {
            localStorage.token = response.data.access_token;
            console.log(response.headers.get('Authorization'))
            switchNextPage()
          })
          .catch(function (error) {
            setError(true)
            console.log(error);
          })
          console.log(response)
    }

    return(
    <Container maxWidth="xs">
      <Typography variant="h4" align="center" gutterBottom>
        Вход
      </Typography>
      <form noValidate autoComplete="off">
        <TextField
          fullWidth
          id="name"
          label="Имя"
          variant="outlined"
          margin="normal"
          onChange={(event) => {setName(event.target.value)}}
        />
        <TextField
          fullWidth
          id="password"
          label="Пароль"
          type="password"
          variant="outlined"
          margin="normal"
          onChange={(event) => {setPassword(event.target.value)}}
        />
        <Button variant="contained" onClick={handleLogin} color="primary" fullWidth>
            Войти в аккаунт
        </Button>
      </form>

        <Snackbar open={error} autoHideDuration={6000} onClose={() => {setError(false)}}>
            <Alert onClose={() => {setError(false)}} severity="error">
                Неверный логин или пароль!
            </Alert>
        </Snackbar>

        <Button variant="outlined" onClick={() => {setCurrentPage(createUserPageType)}} color="primary" fullWidth>
            Зарегистрироваться
        </Button>   
    </Container>
    
    )
}

function SignUpPage({setCurrentPage, switchNextPage}) {
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [secondPassword, setSecondPassword] = useState('')
  const [name, setName] = useState('')
    const [error, setError] = useState(false)

  function handleSignUp() {

    axios.get(`${baseURL}/create-user?username=${name}&email=${email}&password=${password}`)
    .then(function (response) {
        // TODO: в беке нужно будет сделать проверку на сушествовавший логин
      switchNextPage()
    })
    .catch(function (error) {
        setError(true)
    })
  }

 return (
    <Container maxWidth="xs">
      <Typography variant="h4" align="center" gutterBottom>
        Регистрация
      </Typography>
      <form noValidate autoComplete="off">
        <TextField
          fullWidth
          id="name"
          label="Имя"
          variant="outlined"
          margin="normal"
          onChange={(event) => {setName(event.target.value)}}
        />
        <TextField
          fullWidth
          id="email"
          label="Почта"
          variant="outlined"
          margin="normal"
          onChange={(event) => {setEmail(event.target.value)}}
        />
        <TextField
          fullWidth
          id="password"
          label="Пароль"
          type="password"
          variant="outlined"
          margin="normal"
          onChange={(event) => {setPassword(event.target.value)}}
        />
        {/* <TextField
          fullWidth
          id="confirmPassword"
          label="Подтвердите пароль"
          type="password"
          variant="outlined"
          margin="normal"
          onChange={(event) => {setSecondPassword(event.target.value)}}
        /> */}
        <Button variant="contained" color="primary" fullWidth onClick={handleSignUp}>
          Зарегистрироваться
        </Button>
      </form>
        <Snackbar open={error} autoHideDuration={6000} onClose={() => {setError(false)}}>
            <Alert onClose={() => {setError(false)}} severity="error">
                Пользователь с таким логином уже существует!
            </Alert>
        </Snackbar>

        <Button variant="outlined" onClick={() => {setCurrentPage(loginPageType)}} color="primary" fullWidth>
              Войти в аккаунт
        </Button>
    </Container>
 )
}