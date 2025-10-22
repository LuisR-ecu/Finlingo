def get_local_data(topic: str):
    """
    Returns localization data for the United States.
    This is a simplified rule_based system that can be extended with more topics.
    """
    if topic == "credit score":
        return {
            "region": "United States",
            "language": "English",
            "currency": "USD",
            "local_context": "credit cards, loan approvals, and interest rates tied to FICO scored",
            "pitfalls": "missing payments, high credit utilization, closing old accounts",
            "examples": "- Paying off a $500 credit card balance\n- Taking a $2000 car loan\n- Improving from 650 to 720 credit score can save thousands in interest over time",
            "step1": "Check your credit report for free using trusted services",
            "step2": "Pay at least the minimum balance on all loans",
            "step3": "Keep credit utilization below 30%",
        }
    
    # Default fallback (any other topics)
        return {
        "region": "United States",
        "language": "English",
        "currency": "USD",
        "local_context": "basic banking and personal finance principles apply",
        "pitfalls": "ignoring credit reports, overspending, not saving",
        "explainer": " Financial literacy helps individuals make better money decisions and plan for the future.",
        "examples": "- Saving $100/month\n- Opening a retirement account\n- Avoiding unnecessary debt",
        "step1": "Track your expenses",
        "step2": "Build an emergency fund",
        "step3": "Invest early for retirement"
    }