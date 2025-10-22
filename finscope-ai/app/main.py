from fastapi import FastAPI
from app.core.config import settings
from app.routers.educate import router as educate_router

#create the main FastAPI app instance
app = FastAPI(
    title = settings.app_name,
    version = "0.1.0",
    description = "Localized Financial Education API (FinScope AI MVP)"
)

@app.get("/health")
def health_check():
    return {"status": "running", "message": "Service is healthy"}

#Add the educate router
app.include_router(educate_router)