from fastapi.routing import APIRouter
from fastapi.responses import JSONResponse
from fastapi.requests import Request

auth = APIRouter()

@auth.get('/login')
async def login(request: Request):
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