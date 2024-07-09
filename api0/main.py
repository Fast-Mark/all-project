import logging
import os
from datetime import timedelta
from typing import Annotated

from fastapi import Depends, FastAPI, HTTPException, UploadFile, Response, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm
from starlette.responses import FileResponse, HTMLResponse
from starlette.responses import RedirectResponse

from api0.src.autorize import ACCESS_TOKEN_EXPIRE_MINUTES, authenticate_user, create_access_token, create_new_user, \
    get_current_active_user
from api0.src.const import BASE_PATH
from api0.src.create_diploma.TableManager import print_excel_rows
from api0.src.create_diploma.save_files import save_uploaded_file, save_image
from api0.src.modules import Token, User, ElementsList

app = FastAPI()
origins = [
    "http://localhost:5173",
    "http://localhost:5173/main-app"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get('/')
async def create_app(current_user: Annotated[User, Depends(get_current_active_user)]):
    # TODO: сделать редирект на стороне пользователя... А как сохранять jwt токен между страницами??? - просто передавать из "авторизован"
    # идея такая: я создам еще одну страницу, на которой будет проверяться авторизован пользователь или нет. Если да, то дам возможность
    if current_user.email is None:
        return FileResponse(os.path.join(BASE_PATH, ".venv/src/workspace/index.html"), media_type="text/html")
    else:
        return RedirectResponse(url="/authorization")


@app.get('/list-results')
async def read_start_page():
    pass


@app.get('/workspace')
async def read_start_page(
        current_user: Annotated[User, Depends(get_current_active_user)],
        request: Request,
        response: Response,
):
    logger = logging.getLogger("uvicorn.info")
    logger.info(request.cookies.get("Authorization"))
    if current_user.email is None:
        return RedirectResponse(url="/authorization")

    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": current_user.username}, expires_delta=access_token_expires
    )

    response.set_cookie(key="jwt", value=f'bearer {access_token}', httponly=False)
    return HTMLResponse("src/workspace/index.html", media_type="text/html")


#  Эта функция просто возвращает страницу входа
@app.get('/authorization')
async def give_authorize_page():
    return FileResponse("src/authorization/index.html", media_type="text/html")


# @app.get('/{static}')
# async def give_other_statics(static: str):
#     logger = logging.getLogger("uvicorn.info")
#     logger.info(static + " sssss")
#     if static is None:
#         return FileResponse("src/authorization/index.html", media_type="text/html")
#     return FileResponse(path=f"src//{static}")


@app.get('/create-user')
async def create_user(username: str, email: str, password: str):
    create_new_user(username, password, email)
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": username}, expires_delta=access_token_expires
    )
    return Token(access_token=access_token, token_type="bearer")


@app.post("/verify-user")
async def verify_token(current_user: Annotated[User, Depends(get_current_active_user)]):
    return current_user


@app.post("/token")
async def login_for_access_token(
        form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
        response: Response
) -> Token:
    """
    Проверяет валидность пользователя
    :param form_data: логин и пароль пользователя
    :return: токен
    """
    user = authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=401,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    response.set_cookie(key="Authorization", value=f'bearer {access_token}', httponly=False,
                        domain="http://localhost:5173/")
    return Token(access_token=access_token, token_type="bearer")


# TODO: сохранять таблицу и шрифт.
@app.post('/upload-table')
async def upload_table(
        current_user: Annotated[User, Depends(get_current_active_user)], file: UploadFile, project_name: str
):
    """Получает таблицу (пока только excel) с элементами от клиента"""
    result = await save_uploaded_file(current_user.username, project_name, file)
    return result


@app.post('/upload-image')
async def upload_image(
        current_user: Annotated[User, Depends(get_current_active_user)], file: UploadFile, project_name: str
):
    result = await save_image(current_user.username, project_name, file)
    return result


@app.post('/create-result')
async def create_result(
        username, elements: ElementsList, project_name: str
):
    # TODO: сохранять ElementsList в бд
    # logger = logging.getLogger("uvicorn.info")
    # logger.warning(0, "AAAAAAAAAAAAAAAA")
    result = await print_excel_rows(username, project_name, elements)
    return result


@app.get('/download-result')
async def download_result(
        current_user: Annotated[User, Depends(get_current_active_user)], project_name: str, index: int
):
    # result = await
    return

# TODO: в будущем нужно будет сохранять названия существующих проектов пользователя
# @app.get('')
# async def create_result(current_user: Annotated[User, Depends(get_current_active_user)], json: ElementWrapper, background: UploadFile, project_name: str):
#     pass
