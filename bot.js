const { Client, GatewayIntentBits, Events } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMembers,
  ],
});

// ─── CONFIG ───────────────────────────────────────────────────────────────────
// Map each VC channel ID to its notification text channel ID
const VC_TO_TEXT = {
  "VC_CHANNEL_ID_1": "TEXT_CHANNEL_ID_1",
  "VC_CHANNEL_ID_2": "TEXT_CHANNEL_ID_2",
  "VC_CHANNEL_ID_3": "TEXT_CHANNEL_ID_3",
};
// ──────────────────────────────────────────────────────────────────────────────

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Logged in as ${readyClient.user.tag}`);
});

client.on(Events.VoiceStateUpdate, async (oldState, newState) => {
  const joinedChannel = !oldState.channelId && newState.channelId;
  const switchedChannel = oldState.channelId && newState.channelId && oldState.channelId !== newState.channelId;
  const leftChannel = oldState.channelId && !newState.channelId;

  if (!joinedChannel && !switchedChannel && !leftChannel) return;

  const relevantVcId = newState.channelId || oldState.channelId;
  if (!VC_TO_TEXT[relevantVcId]) return;

  const member = newState.member;
  const voiceChannel = newState.channel;
  const channel = voiceChannel ?? oldState.channel;
  const action = leftChannel ? "left" : joinedChannel ? "joined" : "switched to";

  try {
    const textChannel = await client.channels.fetch(VC_TO_TEXT[relevantVcId]);
    if (!textChannel?.isTextBased()) return;
    await textChannel.send(`**${member.displayName}** ${action} **${channel.name}** VC`);
  } catch (err) {
    console.error("Failed to send notification:", err);
  }
});

client.login(process.env.DISCORD_TOKEN);