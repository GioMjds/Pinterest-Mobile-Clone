from fastapi.routing import APIRouter
from fastapi.responses import JSONResponse
from fastapi.requests import Request

auth = APIRouter()

@auth.get('/login')
async def login(req: Request):
    try:
        return JSONResponse(
            content={"message": "Sample FastAPI endpoint is working!"},
            status_code=200
        )
    except Exception as e:
        return JSONResponse(
            content={"error": str(e)},
            status_code=500
        )

@auth.post('/logout')
async def logout(req: Request):
    try:
        response = JSONResponse(
            content={"message": "Logout successfully!"},
            status_code=200
        )

        response.delete_cookie(key='access_token')
        response.delete_cookie(key='refresh_token')

        return response
    except Exception as e:
        return JSONResponse(
            content={"error": str(e)},
            status_code=500
        )

@auth.post('/register')
async def register(req: Request):
    try:
        data = await req.json()
        
        email = data.get("email")
        password = data.get("password")
        confirmPassword = data.get("confirmPassword")

        if not email or not password or not confirmPassword:
            return JSONResponse(
                content={"error": "Email, password, and confirmPassword are required."},
                status_code=400
            )

        if password != confirmPassword:
            return JSONResponse(
                content={"error": "Password and confirmPassword do not match."},
                status_code=400
            )

        return JSONResponse(
            content={"message": f"Registered {email}"},
            status_code=200
        )
    except Exception as e:
        return JSONResponse(
            content={"error": str(e)},
            status_code=500
        )