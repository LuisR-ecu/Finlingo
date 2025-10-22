#import BaseModel from pydantic to define configuration models
from pydantic import BaseModel
from pydantic import Field
import os

#Load environment variables from a .env file if it exists
from dotenv import load_dotenv
load_dotenv()

class Settings(BaseModel):
    """
    Application configuration settings.
    Using a Pydantic model gives us validation, defaults, and IDE autocompletion.
    """
    app_name: str = Field("Finscope AI", description="The name that appears in docs and metadata")
    default_language: str = Field("en", description="Default language if user doesn't specify one")
    
    #Optional future setting for API key (not required but ready to support)
    openai_api_key: str | None = Field(
        default=os.getenv("OPENAI_API_KEY"),
        description="LLM key, if using AI in later stages"
    )
    
# Create a single instance of Settings that the rest of the app can import
settings = Settings()