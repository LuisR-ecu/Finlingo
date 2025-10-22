from typing import Literal

# Core template for financial Lessons.
# Use {placeholders} to fill in dynamically using Python's .format() method.
lesson_template = """\
Hi {name}, let's talk about {topic} in {region} ({language}).

🌍 Why this matters in your region:
• In {region}, people often deal with {local_context}.
• Common pitfalls include: {pitfalls}

📘 Quick Explanation:
{explainer}

💰 Real-Life Examples (in {currency}):
{examples}

✅ Recommended next steps:
1. {step1}
2. {step2}
3. {step3}

You're taking a smart step toward financial confidence. Keep going, you've got this!
"""

# If multiple template formats in the future ("youth", "professional", etc.)
# switch between them using this type.
TemplateType = Literal["baseline"]

def render_lesson(**kwargs) -> str:
    """
    Renders the lesson by filling in the placeholders in lesson_template.
    This function is the single point that controls output formatting.
    If we integrate GPT later, we can replace this single function.
    """
    return lesson_template.format(**kwargs)