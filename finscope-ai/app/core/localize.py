from typing import Literal
from app.locales import us, ke
import importlib
india = importlib.import_module("app.locales.in")

# Define what region codes we currently support
RegionCode = Literal["US", "IN", "KE"]

def get_localization(region: RegionCode, topic: str) -> dict:
    """
    Given the region and the financial topic,
    this function routes to the correct country's rules.
    
    It returns a dictionary that will be passed directly
    into our template renderer.
    """
    
    if region == "US":
        return us.get_local_data(topic)
    elif region == "IN":
        return india.get_local_data(topic)
    elif region == "KE":
        return ke.get_local_data(topic)
    else:
        # fallback (should never happen with correct validation)
        return us.get_local_data(topic)