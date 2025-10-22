def get_local_data(topic: str):
    """
    Returns localization data for India.
    """
    
    if topic == "fixed deposit" or topic == "savings":
        return {
            "region": "India",
            "language": "English/ Hindi",
            "currency": "INR",
            "local_context": "UPI payments, fixed deposits, and increasing digital banking adoption",
            "pitfalls": "locking all funds in long-term FDs without liquidity",
            "explainer": "Fixed Deposits (FDs) offer secure returns, but it's important to maintain liquid savings for emergencies.",
            "examples": "- Creating a ₹5,000 emergency fund\n- Laddering FDs with different maturities\n- Using UPI for instant transfers",
            "step1": "Start an emergency savings account",
            "step2": "Automate ₹500 weekly into savings",
            "step3": "Invest in a short-term FD to earn interest"
        }
        
    # Default fallback
    return {
        "region": "India",
        "language": "English / Hindi",
        "currency": "INR",
        "local_context": "growing interest in mutual funds and SIPs",
        "pitfalls": "not diversifying investments, ignoring inflation",
        "explainer": "Systematic Investment Plans (SIPs) help build long-term wealth through compounding.",
        "examples": "- Investing ₹1000/month in SIP\n- Avoiding high-interest personal loans\n- Tracking UPI spending",
        "step1": "Start a SIP plan",
        "step2": "Review your monthly expenses",
        "step3": "Set a savings goal"
    }