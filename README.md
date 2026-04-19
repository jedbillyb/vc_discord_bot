<div align="center">

# vc-discord-notification-bot

**Discord notifications for voice channel joins, leaves, and switches.**

[![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](./LICENSE)
[![Node](https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=node.js)](https://nodejs.org)
[![discord.js](https://img.shields.io/badge/discord.js-v14-5865F2?style=flat-square&logo=discord)](https://discord.js.org)

</div>

---

A lightweight Discord bot that sends a message to a text channel whenever someone joins, leaves, or switches voice channels. Supports mapping up to 3 VCs to 3 separate text channels.

---

## Setup

### 1. Create a Discord Application & Bot

1. Go to [discord.com/developers/applications](https://discord.com/developers/applications)
2. Click **New Application** → name it → **Create**
3. Go to the **Bot** tab → **Add Bot**
4. Under **Token**, click **Reset Token** and copy it — you'll need this later

### 2. Enable Required Intents

Still on the **Bot** tab, scroll to **Privileged Gateway Intents** and enable:

- ✅ Server Members Intent
- ✅ Voice States

### 3. Invite the Bot

1. Go to **OAuth2** → **URL Generator**
2. Select scope: `bot`
3. Select permissions: `View Channels`, `Send Messages`, `Read Message History`
4. Copy the generated URL, open it, and invite the bot to your server

### 4. Configure Channel IDs

1. In Discord, go to **User Settings** → **Advanced** → enable **Developer Mode**
2. Right-click a VC → **Copy Channel ID**, then do the same for its paired text channel
3. Fill in your pairs in `bot.js`:

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

---

## Running with PM2 (recommended)

PM2 keeps the bot alive across reboots:

```bash
sudo npm install -g pm2
DISCORD_TOKEN=your_token_here pm2 start bot.js --name discord-vc-bot
pm2 save
pm2 startup  # run the command it prints
```

**Useful PM2 commands:**

```bash
pm2 logs discord-vc-bot      # live logs
pm2 status                   # check running state
pm2 restart discord-vc-bot   # restart
pm2 stop discord-vc-bot      # stop
```

---

## Example Notifications

```
Alex joined General VC
Sam left Gaming VC
Jordan switched to Study VC
```

---

## Notes

- Only VCs listed in `VC_TO_TEXT` trigger notifications — all others are ignored
- The bot detects joins, leaves, and channel switches
- Never commit your bot token — use a `.env` file or environment variable in production

---

## License

MIT — see [LICENSE](LICENSE) for details.

---

<div align="center">
<sub>MIT © <a href="https://github.com/jedbillyb">jedbillyb</a> · Made with ❤️</sub>
</div>
