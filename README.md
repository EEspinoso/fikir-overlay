# 💡 Fikir Overlay System v2

Multi-platform live stream idea overlay system for **YouTube**, **Twitch**, and **Kick**.

Viewers can submit ideas in chat using trigger commands in **30+ languages** (`/idea`, `/fikir`, `/idée`, `/идея`, `/アイデア`...) and streamers can manage them through a control panel.

## ✨ Features

- 🌍 **Multi-Language Triggers** — 30+ languages supported
- 📺 **Multi-Platform** — YouTube, Twitch, Kick chat support
- 💾 **SQLite Database** — Persistent storage for all ideas and sessions
- ⏱️ **Rate Limiting** — Max 3 ideas per user per minute
- 🚫 **Profanity Filter** — English + Turkish bad word filtering
- 📋 **Idea Status Tracking** — Pending → Accepted → In Progress → Completed
- 📊 **Web Dashboard** — Browse past streams, stats, search, and filter
- 🎨 **OBS Overlay** — Post-it style notes with drag, resize, and animations

## 🚀 Getting Started

1. Install **[Node.js](https://nodejs.org)** (v18+)
2. Double-click **`start.bat`** — it auto-installs and launches!

Dependencies are installed automatically on first run.

## 🔗 Pages

| Page | URL |
|------|-----|
| **Panel** (manage ideas) | http://localhost:3000/panel.html |
| **Overlay** (OBS source) | http://localhost:3000/overlay.html |
| **Dashboard** (history) | http://localhost:3000/dashboard.html |

## 📺 Chat Commands

Viewers type in chat:
```
/idea Add a survival mode
/fikir Yeni bir battle royale modu
/idée Ajouter un mode survie
/идея Новый режим выживания
```

## 🎯 Keyboard Shortcuts (Panel)

| Key | Action |
|-----|--------|
| `Enter` | Accept selected idea |
| `Backspace` | Reject selected idea |
| `↑ ↓` | Navigate between ideas |

## 📁 Project Structure

```
├── server.js           # Main server
├── lib/
│   ├── db.js           # SQLite database
│   ├── ratelimit.js    # Rate limiter
│   └── profanity.js    # Profanity filter
├── public/
│   ├── css/            # Stylesheets
│   ├── overlay.html    # OBS overlay
│   ├── panel.html      # Control panel
│   └── dashboard.html  # History & stats
└── start.bat           # One-click launcher
```

## 📋 License

MIT
