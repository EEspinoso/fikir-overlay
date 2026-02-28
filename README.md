<div align="center">

# 💡 Fikir Overlay System

### Multi-Platform Live Stream Idea Overlay

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![YouTube](https://img.shields.io/badge/YouTube-Chat-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](#)
[![Twitch](https://img.shields.io/badge/Twitch-Chat-9146FF?style=for-the-badge&logo=twitch&logoColor=white)](#)
[![Kick](https://img.shields.io/badge/Kick-Chat-53FC18?style=for-the-badge&logo=kick&logoColor=black)](#)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](#)

**Viewers submit ideas in chat → Streamer manages them → Post-it overlay in OBS**

*Supports 30+ languages including `/idea`, `/fikir`, `/idée`, `/идея`, `/アイデア` and more!*

---

</div>

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🌍 **30+ Language Triggers** | `/idea`, `/fikir`, `/idée`, `/идея`, `/アイデア`, `/아이디어`... |
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
<summary><b>🖥️ OBS Overlay</b> — Post-it notes with drag, resize & status badges</summary>
<br>
<img src="screenshots/overlay.png" alt="OBS Overlay" width="100%">
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

## 🔗 Pages

| Page | URL | Description |
|------|-----|-------------|
| 🎛️ **Panel** | `localhost:3000/panel.html` | Accept/reject ideas, manage status |
| 🖥️ **Overlay** | `localhost:3000/overlay.html` | Add as OBS Browser Source |
| 📊 **Dashboard** | `localhost:3000/dashboard.html` | Past streams & statistics |

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
