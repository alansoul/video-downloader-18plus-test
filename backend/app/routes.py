from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer
from .utils import download_video

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

async def get_current_user(token: str = Depends(oauth2_scheme)):
    if token != "premium_token":
        raise HTTPException(status_code=401, detail="Invalid token")
    return {"user": "premium_user"}

@router.get("/download")
async def download(url: str, user: dict = Depends(get_current_user)):
    try:
        video_url = download_video(url)
        return {"download_url": video_url}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))