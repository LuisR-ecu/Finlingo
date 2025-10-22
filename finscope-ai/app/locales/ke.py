def get_local_data(topic: str):
    """
    Returns localization data for Kenya.
    """

    if topic == "mobile money" or topic == "mpesa":
        return {
            "region": "Kenya",
            "language": "English / Swahili",
            "currency": "KES",
            "local_context": "heavy use of mobile money (M-Pesa) for daily transactions",
            "pitfalls": "high-interest mobile loans, overspending on airtime/data",
            "explainer": "Mobile money enables safe transfers and savings, but careful budgeting is essential.",
            "examples": "- Saving KSh 200 weekly via M-Pesa\n- Tracking spending with mobile wallet statements\n- Avoiding impulsive credit loans",
            "step1": "Activate mobile savings feature",
            "step2": "Track airtime/data usage weekly",
            "step3": "Create a mini emergency fund"
        }

    # Default fallback
    return {
        "region": "Kenya",
        "language": "English / Swahili",
        "currency": "KES",
        "local_context": "growing access to mobile-based investment platforms",
        "pitfalls": "taking quick loans for non-essential spending",
        "explainer": "Even small, regular savings can build long-term resilience.",
        "examples": "- Saving KSh 50 per day\n- Using mobile apps to track goals\n- Avoiding repeated loan rollovers",
        "step1": "Set a mobile savings goal",
        "step2": "Monitor spending categories",
        "step3": "Avoid unnecessary lending apps"
    }