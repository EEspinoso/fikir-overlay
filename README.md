<div align="center">

# 💡 Fikir Overlay System

### Multi-Platform Live Stream Idea Overlay

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![YouTube](https://img.shields.io/badge/YouTube-Chat-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](#)
[![Twitch](https://img.shields.io/badge/Twitch-Chat-9146FF?style=for-the-badge&logo=twitch&logoColor=white)](#)
[![Kick](https://img.shields.io/badge/Kick-Chat-53FC18?style=for-the-badge&logo=kick&logoColor=black)](#)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](#)
[![Languages](https://img.shields.io/badge/UI_Languages-10-ff69b4?style=for-the-badge)](#-language-support)

**Viewers submit ideas in chat → Streamer manages them → Post-it overlay in OBS**

*Supports 30+ chat trigger languages and 10 UI languages!*

---

</div>

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🌍 **30+ Chat Triggers** | `/idea`, `/fikir`, `/idée`, `/идея`, `/アイデア`, `/아이디어`... |
| 🗣️ **10 UI Languages** | English, Türkçe, Español, Português, Français, Deutsch, Русский, 日本語, 한국어, 中文 |
| 📺 **Multi-Platform** | YouTube, Twitch, and Kick chat support |
| 💾 **SQLite Database** | Persistent storage for ideas & session history |
| ⏱️ **Rate Limiting** | Max 3 ideas per user per minute (anti-spam) |
| 🚫 **Profanity Filter** | English + Turkish bad word filtering |
| 📋 **Status Tracking** | Pending → Accepted → In Progress → Completed |
| 📊 **Web Dashboard** | Browse past streams, stats, search & filter |
| 🎨 **OBS Overlay** | Draggable, resizable post-it notes with animations |

## 📸 Screenshots

<details>
<summary><b>🎛️ Control Panel</b> — Manage ideas with platform tabs & status controls</summary>
<br>
<img src="screenshots/panel.png" alt="Control Panel" width="100%">
</details>

<details>
<summary><b>📊 Dashboard</b> — Past streams, statistics & search</summary>
<br>
<img src="screenshots/dashboard.png" alt="Dashboard" width="100%">
</details>

## 🚀 Getting Started

> **Prerequisites:** [Node.js](https://nodejs.org) v18 or higher

```bash
git clone https://github.com/EEspinoso/fikir-overlay.git
cd fikir-overlay
```

**Windows:** Double-click `start.bat` — it auto-installs and launches!

**Manual:**
```bash
npm install
node server.js
```

## 🖥️ OBS Setup Guide

Follow these steps to add the idea overlay to your stream:

### Step 1: Start the Server

Double-click `start.bat` or run `node server.js`. You'll see:
```
Panel:     http://localhost:3000/panel.html
Overlay:   http://localhost:3000/overlay.html
Dashboard: http://localhost:3000/dashboard.html
```

### Step 2: Add Overlay to OBS

1. Open **OBS Studio**
2. In your Scene, click **+** under Sources → **Browser**
3. Name it `Fikir Overlay` → click **OK**
4. Set these properties:

| Property | Value |
|----------|-------|
| **URL** | `http://localhost:3000/overlay.html` |
| **Width** | `1920` |
| **Height** | `1080` |
| **Custom CSS** | *(see below)* |

5. Paste this in the **Custom CSS** field to make the background transparent:
```css
body { background-color: rgba(0, 0, 0, 0); margin: 0px auto; overflow: hidden; }
```

6. Click **OK** — the overlay will appear with a transparent background!

### Step 3: Connect to Chat

1. Open the **Control Panel**: `http://localhost:3000/panel.html`
2. Choose your platform tab (YouTube / Twitch / Kick)
3. Enter your channel info and click **Connect**
4. Ideas from chat will appear in the panel — accept or reject them!

### Step 4: Manage Ideas

- Accepted ideas appear as **post-it notes** on the overlay
- Use **In Progress** / **Completed** buttons to track status
- Post-its are **draggable** and **resizable** in the overlay
- Right-click a post-it to remove it from the board

> 💡 **Tip:** Open the panel in a separate browser window or on a second monitor while streaming!

## 🗣️ Language Support

### UI Languages (10)

The control panel and dashboard support **10 languages** with a built-in selector:

| | Language | | Language |
|--|---------|--|---------|
| 🇬🇧 | English | 🇩🇪 | Deutsch |
| 🇹🇷 | Türkçe | 🇷🇺 | Русский |
| 🇪🇸 | Español | 🇯🇵 | 日本語 |
| 🇧🇷 | Português | 🇰🇷 | 한국어 |
| 🇫🇷 | Français | 🇨🇳 | 中文 |

Click the **language button** in the top-right corner of the Panel or Dashboard to switch. Your preference is saved automatically.

### Chat Trigger Languages (30+)

Viewers can submit ideas in any of these languages:

```
/idea    /fikir    /idée     /ideia    /идея
/idee    /アイデア   /아이디어   /创意     /fikri
/فكرة    /ایده     /fikra    /ý tưởng  /ideya  ...and more!
```

## 📺 How It Works

```
Viewer types in chat:  /idea Add a battle royale mode
                           ↓
     ┌─────────────────────────────────────┐
     │  Rate Limit ✓  Profanity Filter ✓   │
     │  Duplicate Check ✓  Save to DB ✓    │
     └─────────────────────────────────────┘
                           ↓
  ┌──────────┐    ┌──────────────┐    ┌─────────────┐
  │  Panel   │ ←→ │   Server     │ ←→ │  Overlay    │
  │ Accept ✅│    │  Socket.IO   │    │  Post-it 📌 │
  │ Reject ❌│    │              │    │             │
  └──────────┘    └──────────────┘    └─────────────┘
```

## 🔗 Pages

| Page | URL | Description |
|------|-----|-------------|
| 🎛️ **Panel** | `localhost:3000/panel.html` | Accept/reject ideas, manage status |
| 🖥️ **Overlay** | `localhost:3000/overlay.html` | Add as OBS Browser Source |
| 📊 **Dashboard** | `localhost:3000/dashboard.html` | Past streams & statistics |

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Enter` | Accept selected idea |
| `Backspace` | Reject selected idea |
| `↑` `↓` | Navigate between ideas |

## 📁 Project Structure

```
fikir-overlay/
├── server.js              # Express + Socket.IO server
├── lib/
│   ├── db.js              # SQLite database module
│   ├── ratelimit.js       # Sliding window rate limiter
│   └── profanity.js       # EN + TR profanity filter
├── public/
│   ├── js/i18n.js         # 10-language translation system
│   ├── css/               # Stylesheets
│   ├── panel.html         # Streamer control panel
│   ├── overlay.html       # OBS browser source
│   └── dashboard.html     # History & statistics
├── start.bat              # One-click Windows launcher
└── package.json
```

## 🤝 Contributing

Pull requests are welcome! Feel free to open an issue for bugs or feature requests.

## 📋 License

This project is licensed under the [MIT License](LICENSE).

---

<div align="center">

**Made with ❤️ for streamers**

</div>
