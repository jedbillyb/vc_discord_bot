const { Client, GatewayIntentBits, Events } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMembers,
  ],
});

// ─── CONFIG ───────────────────────────────────────────────────────────────────
// The ID of the text channel where join notifications will be sent.
// Right-click a channel in Discord → "Copy Channel ID" (Developer Mode must be on).
const NOTIFICATION_CHANNEL_ID = "YOUR_TEXT_CHANNEL_ID_HERE";
// ──────────────────────────────────────────────────────────────────────────────

client.once(Events.ClientReady, (readyClient) => {
  console.log(`✅ Logged in as ${readyClient.user.tag}`);
});

client.on(Events.VoiceStateUpdate, async (oldState, newState) => {
  const joinedChannel = !oldState.channelId && newState.channelId;
  const switchedChannel =
    oldState.channelId &&
    newState.channelId &&
    oldState.channelId !== newState.channelId;

  if (!joinedChannel && !switchedChannel) return; // left or no change

  const member = newState.member;
  const voiceChannel = newState.channel;

  try {
    const textChannel = await client.channels.fetch(NOTIFICATION_CHANNEL_ID);
    if (!textChannel?.isTextBased()) return;

    const action = joinedChannel ? "joined" : "switched to";
    await textChannel.send(
      `🎙️ **${member.displayName}** ${action} **${voiceChannel.name}**`
    );
  } catch (err) {
    console.error("Failed to send notification:", err);
  }
});

client.login(process.env.DISCORD_TOKEN);