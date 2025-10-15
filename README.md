<img width="2000" height="500" alt="Banner" src="https://github.com/user-attachments/assets/7088f6ef-c2ce-405e-8507-c0a6159b9f26" />

<p align="center">
    <!-- Discord Badge -->
    <a href="https://discord.justus0405.com/"><img src="https://img.shields.io/discord/1370519315400495234?logo=Discord&colorA=FFFFFF&colorB=000000&style=for-the-badge"></a>
    <!-- Forks Badge -->
    <a href="https://github.com/Justus0405/Redacted-Bot/forks"><img src="https://img.shields.io/github/forks/Justus0405/Redacted-Bot?colorA=FFFFFF&colorB=000000&style=for-the-badge"></a>
    <!-- Stars Badge -->
    <a href="https://github.com/Justus0405/Redacted-Bot/stargazers"><img src="https://img.shields.io/github/stars/Justus0405/Redacted-Bot?colorA=FFFFFF&colorB=000000&style=for-the-badge"></a>
    <!-- Last Commit Badge -->
    <a href="https://github.com/Justus0405/Redacted-Bot/commits/main/"><img src="https://img.shields.io/github/last-commit/Justus0405/Redacted-Bot?logo=github&colorA=FFFFFF&colorB=000000&style=for-the-badge"></a>
</p>

<h1 align="center">Installation (Official)</h1>

<p align="center">
Add the Official Bot to your Server
<a href="https://discord.com/oauth2/authorize?client_id=1422527616081989633">using this link!</a>
</p><br><br><br><br><br><br><br><br><br><br>

<img width="2000" height="500" alt="Banner_About" src="https://github.com/user-attachments/assets/66af1f4f-0a9c-4897-a554-958d9f84fda1" />

#

Redacted-Bot is a Discord.js bot that helps keep your server safe and friendly.
Once added to your server, you can run `/setup LOGCHANNEL` to start. The bot will analyze every message with an algorithm that gives a toxicity score from 0 to 100.

You can configure the bot to take action (like delete or mute) when the score passes a set threshold.

Simple to use, fully customizable, and built to make moderation easier.

> [!CAUTION]
> This bot is in the early stages of development so expect things to break regularly!
> Currently, only the /setup command works.
> For now, the bot ignores all users with roles higher than its own and deletes messages with a toxicity score of 90 or above.
> This behavior will be configurable in future updates.

<img width="2000" height="500" alt="Banner_TODO" src="https://github.com/user-attachments/assets/01a74a21-402d-435f-ab2f-7fe15dc23173" />

#

- [x] Code refactor v1
- [x] Help command
- [x] Setup command
- [ ] Statistics command
- [ ] Whitelist commands
- [ ] Hierarchy commands
- [ ] Warning commands
- [ ] Punishment commands
- [ ] SQLite Database code for settings
- [ ] Seperate Agent API
- [ ] Code refactor v2

<img width="2000" height="500" alt="Banner_Commands" src="https://github.com/user-attachments/assets/4de30540-f07b-44b3-ab53-c7245ab2ac1e" />

#

1. `/help` — Get information about </Redacted> and its features
2. `/setup` - Get started by selecting a log channel
3. `/statistics` - Get information about </Redacted> servers

<br>

4. `/whitelist` `list` - Show all whitelisted words
5. `/whitelist` `add` - Add a word to the whitelist
6. `/whitelist` `remove` - Remove a word from the whitelist

<br>

7. `/hierarchy` `true` - Ignore users above </Redacted>
8. `/hierarchy` `false` - Include users above </Redacted>

<br>

9. `/warnings` `true` - Send a log message
10. `/warnings` `false` - Dont send a log message

<br>

11. `/punishment` `delete` - Delete message
12. `/punishment` `mute` - Mute user
13. `/punishment` `both` - Delete message and mute user

<img width="2000" height="500" alt="Banner_Self-Hosting" src="https://github.com/user-attachments/assets/b4fcaebe-41ea-46aa-8b9f-0f7213999fe8" />

#

### Run Dependencies

```plaintext
docker
docker-compose
docker-buildx
```

### Installation Steps

1. Clone the repository:

```shell
git https://github.com/Justus0405/Redacted-Bot.git
```

2. Navigate to the directory:

```shell
cd Redacted-Bot
```

3. Create a .env file from .env.example:

```shell
nano .env
```

4. Build an run with docker:

```shell
docker-compose up -d --build
```

#

<p align="center">
	Copyright &copy; 2025-present <a href="https://github.com/Justus0405" target="_blank">Justus0405</a>
</p>

<p align="center">
	<a href="https://github.com/Justus0405/Redacted-Bot/blob/main/LICENSE"><img src="https://img.shields.io/github/license/Justus0405/Redacted-Bot?logo=Github&colorA=FFFFFF&colorB=000000&style=for-the-badge"></a>
</p>
