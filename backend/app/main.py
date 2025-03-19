from fastapi import FastAPI
from .routes import router

app = FastAPI(title="18+ Video Download Backend")

app.include_router(router)