# Discord VC Join Notification Bot

Sends a message to a text channel every time someone joins (or switches to) a voice channel.

---

## Setup

### 1. Create a Discord Application & Bot
1. Go to https://discord.com/developers/applications
2. Click **New Application** → give it a name → **Create**
3. Go to the **Bot** tab → click **Add Bot**
4. Under **Token**, click **Reset Token** and copy it — you'll need this

### 2. Enable Required Intents
Still on the **Bot** tab, scroll down to **Privileged Gateway Intents** and enable:
- ✅ **Server Members Intent**
- ✅ **Voice States** (this should be on by default via bot permissions)

### 3. Invite the Bot to Your Server
1. Go to **OAuth2 → URL Generator**
2. Check scopes: `bot`
3. Check bot permissions: `View Channels`, `Send Messages`, `Read Message History`
4. Copy the generated URL, open it, and invite the bot to your server

### 4. Get Your Notification Channel ID
1. In Discord, go to **User Settings → Advanced** and enable **Developer Mode**
2. Right-click the text channel where you want notifications → **Copy Channel ID**
3. Paste it into `bot.js` where it says `YOUR_TEXT_CHANNEL_ID_HERE`

### 5. Install & Run

```bash
npm install
DISCORD_TOKEN=your_token_here node bot.js
```

Or on Windows:
```cmd
set DISCORD_TOKEN=your_token_here
node bot.js
```

---

## Example Notification
```
🎙️ Alex joined General
🎙️ Sam switched to Gaming
```

---

## Notes
- The bot also detects **channel switches** (someone moves from one VC to another)
- To disable switch notifications, remove the `switchedChannel` condition in `bot.js`
- Never commit your bot token to version control — use a `.env` file for production