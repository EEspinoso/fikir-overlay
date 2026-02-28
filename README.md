<div align="center">

# 💡 Fikir Overlay

**Real-time idea overlay for live streams**

[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org)
[![Platforms](https://img.shields.io/badge/YouTube_·_Twitch_·_Kick-Chat-8B5CF6?style=flat-square)](#)
[![Languages](https://img.shields.io/badge/10_Languages-UI-ff69b4?style=flat-square)](#-language-support)
[![License](https://img.shields.io/badge/MIT-License-blue?style=flat-square)](#-license)

Viewers submit ideas in chat → you manage them from a control panel → accepted ideas appear as post-it notes on your OBS overlay.

</div>

---

## 📸 Preview

<table>
<tr>
<td width="50%">

**🎛️ Control Panel**
<img src="screenshots/panel.png" alt="Control Panel">

</td>
<td width="50%">

**📊 Dashboard**
<img src="screenshots/dashboard.png" alt="Dashboard">

</td>
</tr>
</table>

---

## ✨ Features

- **Multi-platform** — YouTube, Twitch, and Kick chat support
- **30+ chat triggers** — `/idea`, `/fikir`, `/idée`, `/идея`, `/アイデア` and more
- **10 UI languages** — English, Türkçe, Español, Português, Français, Deutsch, Русский, 日本語, 한국어, 中文
- **OBS overlay** — Draggable, resizable post-it notes with transparent background
- **Status tracking** — Pending → Accepted → In Progress → Completed
- **Dashboard** — Browse past streams, search ideas, view top authors
- **Anti-spam** — Rate limiting (3/min per user) + profanity filter (EN/TR)
- **Persistent storage** — SQLite database for all ideas and sessions

---

## 🚀 Quick Start

> **Requires:** [Node.js](https://nodejs.org) v18+

```bash
git clone https://github.com/EEspinoso/fikir-overlay.git
cd fikir-overlay
npm install
node server.js
```

**Windows shortcut:** Double-click `start.bat` — auto-installs and launches.

Once running, open:

| Page | URL | Purpose |
|------|-----|---------|
| **Panel** | [localhost:3000/panel.html](http://localhost:3000/panel.html) | Manage ideas |
| **Overlay** | [localhost:3000/overlay.html](http://localhost:3000/overlay.html) | OBS source |
| **Dashboard** | [localhost:3000/dashboard.html](http://localhost:3000/dashboard.html) | Stats & history |

---

## 🖥️ OBS Setup

1. In OBS, add a **Browser** source
2. Set URL to `http://localhost:3000/overlay.html`
3. Set size to **1920 × 1080**
4. Paste this **Custom CSS** for transparent background:

```css
body { background-color: rgba(0, 0, 0, 0); margin: 0; overflow: hidden; }
```

5. Done! Accepted ideas will appear as post-it notes on your stream.

> **Tip:** Open the control panel on a second monitor or browser tab while streaming.

---

## 🗣️ Language Support

**UI Languages (panel & dashboard)** — click the selector in the top-right corner:

🇬🇧 English · 🇹🇷 Türkçe · 🇪🇸 Español · 🇧🇷 Português · 🇫🇷 Français · 🇩🇪 Deutsch · 🇷🇺 Русский · 🇯🇵 日本語 · 🇰🇷 한국어 · 🇨🇳 中文

**Chat triggers (30+ languages)** — viewers can type:

`/idea` `/fikir` `/idée` `/ideia` `/idee` `/идея` `/アイデア` `/아이디어` `/创意` `/فكرة` `/fikra` and more...

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Enter` | Accept selected idea |
| `Backspace` | Reject selected idea |
| `↑` `↓` | Navigate between ideas |

---

## 📁 Structure

```
fikir-overlay/
├── server.js           # Express + Socket.IO server
├── start.bat           # Windows one-click launcher
├── lib/
│   ├── db.js           # SQLite database
│   ├── ratelimit.js    # Rate limiter
│   └── profanity.js    # Profanity filter
└── public/
    ├── panel.html      # Control panel
    ├── overlay.html    # OBS overlay
    ├── dashboard.html  # Stats dashboard
    ├── js/i18n.js      # Translation system
    └── css/            # Stylesheets
```

---

## 📋 License

[MIT](LICENSE)

<div align="center">
<br>
<sub>Made with ❤️ for streamers</sub>
</div>
