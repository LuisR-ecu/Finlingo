# Environment Variables Setup

## Required API Keys

### 1. OpenAI API Key (REQUIRED - Chat Won't Work Without This!)

**Get your API key:**
1. Go to https://platform.openai.com/api-keys
2. Sign up or log in
3. Click "Create new secret key"
4. Copy the key (starts with `sk-proj-` or `sk-`)

**Add to project:**
Create a file named `.env.local` in the project root:

```bash
OPENAI_API_KEY=sk-proj-YOUR-ACTUAL-KEY-HERE
```

**Cost:** GPT-4o-mini is very cheap (~$0.0015 per conversation)
- Input: $0.15 per 1M tokens
- Output: $0.60 per 1M tokens

---

## Optional: Web Search API (For Real Financial Information)

### Option 1: Tavily (Recommended)
Best for financial information retrieval

**Get your API key:**
1. Go to https://tavily.com
2. Sign up for free
3. Get 500 free searches/month
4. Copy your API key

**Add to .env.local:**
```bash
TAVILY_API_KEY=tvly-YOUR-KEY-HERE
```

### Option 2: Perplexity API
Alternative search provider

**Get your API key:**
1. Go to https://www.perplexity.ai/
2. Sign up and get API access
3. Copy your API key

**Add to .env.local:**
```bash
PERPLEXITY_API_KEY=pplx-YOUR-KEY-HERE
```

---

## Optional: Cloudflare AutoRAG (For Government Documents)

For retrieving official financial literacy documents

**Setup:**
1. Sign up at https://cloudflare.com
2. Go to Workers AI
3. Set up AutoRAG
4. Upload government PDFs (Japan FSA, Taiwan FSC, Hong Kong SFC documents)
5. Get your credentials

**Add to .env.local:**
```bash
CLOUDFLARE_ACCOUNT_ID=your-account-id
CLOUDFLARE_API_KEY=your-api-key
CLOUDFLARE_AUTORAG_ENDPOINT=your-endpoint
```

---

## Complete .env.local Example

Create this file in your project root:

```bash
# Required
OPENAI_API_KEY=sk-proj-abc123...

# Optional - Add these as you implement them
# TAVILY_API_KEY=tvly-xyz789...
# CLOUDFLARE_ACCOUNT_ID=123456
# CLOUDFLARE_API_KEY=abc123
```

---

## Security Notes

⚠️ **IMPORTANT:**
- Never commit `.env.local` to git (already in .gitignore)
- Never share your API keys publicly
- Rotate keys if accidentally exposed
- Use environment variables in Vercel for production

---

## Vercel Deployment

When deploying to Vercel:
1. Go to your project dashboard
2. Settings → Environment Variables
3. Add each variable (name and value)
4. Redeploy your app

---

## Testing Your Setup

After adding `OPENAI_API_KEY`:

```bash
npm run dev
```

Then:
1. Complete onboarding
2. Go to chat
3. Type a message
4. You should get AI responses!

If it doesn't work, check:
- `.env.local` is in the project root
- Key is correct (no extra spaces)
- You've restarted the dev server after adding the key

