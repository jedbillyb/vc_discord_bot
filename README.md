# Discord VC Notification Bot

Sends a message to a text channel every time someone joins, leaves, or switches voice channels. Supports mapping up to 3 VCs to 3 separate text channels.

---

## Setup

### 1. Create a Discord Application & Bot
1. Go to https://discord.com/developers/applications
2. Click **New Application** → give it a name → **Create**
3. Go to the **Bot** tab → click **Add Bot**
4. Under **Token**, click **Reset Token** and copy it — you'll need this

### 2. Enable Required Intents
Still on the **Bot** tab, scroll down to **Privileged Gateway Intents** and enable:
-  **Server Members Intent**
-  **Voice States** (this should be on by default via bot permissions)

### 3. Invite the Bot to Your Server
1. Go to **OAuth2 → URL Generator**
2. Check scopes: `bot`
3. Check bot permissions: `View Channels`, `Send Messages`, `Read Message History`
4. Copy the generated URL, open it, and invite the bot to your server

### 4. Configure Channel IDs
1. In Discord, go to **User Settings → Advanced** and enable **Developer Mode**
2. Right-click a VC → **Copy Channel ID**, do the same for its paired text channel
3. Repeat for all 3 pairs and fill them into `bot.js`:

```js
const VC_TO_TEXT = {
  "VC_CHANNEL_ID_1": "TEXT_CHANNEL_ID_1",
  "VC_CHANNEL_ID_2": "TEXT_CHANNEL_ID_2",
  "VC_CHANNEL_ID_3": "TEXT_CHANNEL_ID_3",
};
```

### 5. Install & Run

```bash
npm install
DISCORD_TOKEN=your_token_here node bot.js
```

#### Running with PM2 (recommended — survives reboots)
```bash
sudo npm install -g pm2
DISCORD_TOKEN=your_token_here pm2 start bot.js --name discord-vc-bot
pm2 save
pm2 startup  # run the command it prints
```

---

## Example Notifications
```
Alex joined General VC
Sam left Gaming VC
Jordan switched to Study VC
```

---

## Useful PM2 Commands
```bash
pm2 logs discord-vc-bot      # view live logs
pm2 status                   # check if running
pm2 restart discord-vc-bot   # restart the bot
pm2 stop discord-vc-bot      # stop the bot
```

---

## Notes
- Only VCs listed in `VC_TO_TEXT` will trigger notifications — others are ignored
- The bot detects **joins**, **leaves**, and **channel switches**
- Never commit your bot token to version control — use a `.env` file for production