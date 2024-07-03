import {useEffect, useState} from 'react';
import Workspace from './components/workspace/workspace'
import StartWindow from './components/startWindow/startWindow';
import { ResultWindowType, StartWindowType, WorkWindowType, AuthorizationWindowType } from './const/windowTypes';
import {ThemeProvider, createTheme, Alert, Snackbar} from '@mui/material';
import AuthorizationWindow from "./components/authorization/authorizationWindow";
// import {checkAuthToken} from "./checkAuthorization.js";
import axios from "axios";
import {baseURL} from "./const/endpoints.js";

const App = () => {
  const [isAuthorizationRequired, setAuthorizationRequired] = useState(true)
  const [currentWindowType, setWindowType] = useState(StartWindowType)
  const [imageURL, setImageURL] = useState("")
  const [isSuccesAuth, setSuccessAuth] = useState(false)

  useEffect(() => {
        // ВОзможно эта штука работает очень медленно, но зато точно проверяет валидность токена
        const fetchAuth = async () => {
                const response = await axios.post(`${baseURL}/verify-user`, {},
                {
                    headers: {
                        'accept': 'application/json',
                        'Authorization': `Bearer ${localStorage.token}`,
                    },
                })
        }
        fetchAuth()
            .then(() => setAuthorizationRequired(false))
  }, []);

  const theme = createTheme({
    typography: {
      fontFamily:
        "Onest",
    },
  })

  function successAuthorization() {
    setAuthorizationRequired(false)
    setSuccessAuth(true)
  }

  if (isAuthorizationRequired) {
    return (

      <ThemeProvider theme={theme}>
        <AuthorizationWindow switchNextPage={() => {successAuthorization()}}></AuthorizationWindow>
      </ThemeProvider>

    );
  } else if (currentWindowType === StartWindowType) {
    return (

      <ThemeProvider theme={theme}>
        <StartWindow setWindowType={setWindowType} setImageURL={setImageURL}></StartWindow>
           <Snackbar open={isSuccesAuth} autoHideDuration={6000} onClose={() => {setSuccessAuth(false)}}>
            <Alert  onClose={() => {setSuccessAuth(false)}} severity="success">
                Вы успешно авторизовались!
            </Alert>
        </Snackbar>
      </ThemeProvider>

    );
  } else if (currentWindowType === WorkWindowType) {
    return (
      <ThemeProvider theme={theme}>
        <Workspace backgroundURL={imageURL}></Workspace>
      </ThemeProvider>
    );
  } else if (currentWindowType === ResultWindowType) {
    return (
      <div>

      </div>
    );
  }
};

export default App;

