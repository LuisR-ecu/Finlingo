from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from typing import Literal
from app.core.localize import get_localization, RegionCode
from app.core.templates import render_lesson

#Create routter with version prefix
routher = APIRouter(prefix = "/v1", tags = ["education"])

#define what the user sends in a request
class EducateRequest(BaseModel):
    name: str = Field(min_length = 1, description = "User's name for personalization")
    region: RegionCode = Field(description = "Region code: US, IN, KE")
    topic: str = Field(min_length = 2, description = "Financial topic, e.g. 'credit score', 'savings', 'fixed deposit'")
    
#define the structure of what we send back
class EducateResponse(BaseModel):
    lesson: str
    
@router.post("/educate", response_model = EducateResponse)
def educate_user(payload: EducateRequest) -> EducateResponse:
    """
    Generates a localized financial education lesson based on user region and topic.
    """
    
    #Get localization data for the user's region
    loc_data = get_localization(payload.region, payload.topic)
    
    #Build the final lesson by merging user name with the localization data
    lesson_text = render_lesson(
        name = payload.name,
        region = loc_data["region"],
        language = loc_data["language"],
        currency = loc_data["currency"],
        topic = loc_data["topic"],
        local_context = loc_data["local_context"],
        pitfalls = loc_data["pitfalls"],
        explainer = loc_data["explainer"],
        examples = loc_data["examples"],
        step1 = loc_data["step1"],
        step2 = loc_data["step2"],
        step3 = loc_data["step3"]
    )
    
    return EducateResponse(lesson = lesson_text)