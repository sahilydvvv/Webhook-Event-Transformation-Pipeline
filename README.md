# Webhook-Event-Transformation-Pipeline

![GitHub stars](https://img.shields.io/github/stars/sahilydvvv/Webhook-Event-Transformation-Pipeline?style=for-the-badge&logo=github) ![GitHub forks](https://img.shields.io/github/forks/sahilydvvv/Webhook-Event-Transformation-Pipeline?style=for-the-badge&logo=github) ![GitHub issues](https://img.shields.io/github/issues/sahilydvvv/Webhook-Event-Transformation-Pipeline?style=for-the-badge&logo=github) ![Last commit](https://img.shields.io/github/last-commit/sahilydvvv/Webhook-Event-Transformation-Pipeline?style=for-the-badge&logo=github) ![npm version](https://img.shields.io/npm/v/backend?style=for-the-badge&logo=npm&logoColor=white) ![npm downloads](https://img.shields.io/npm/dm/backend?style=for-the-badge&logo=npm&logoColor=white) ![License](https://img.shields.io/badge/license-ISC-green?style=for-the-badge)

## 📑 Table of Contents

- [Description](#description)
- [Screenshots](#screenshots)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Quick Start](#quick-start)
- [Key Dependencies](#key-dependencies)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Development Setup](#development-setup)
- [Contributors](#contributors)
- [Contributing](#contributing)
- [License](#license)

## 📝 Description

Webhook-Event-Transformation-Pipeline — a backend api built with Express.js, JavaScript, MongoDB, Vite.

## 📸 Screenshots

![hero](https://raw.githubusercontent.com/sahilydvvv/Webhook-Event-Transformation-Pipeline/main/frontend/src/assets/hero.png)

## 🛠️ Tech Stack

![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white) ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white) ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

**Notable libraries:** Mongoose

## 🏗️ Architecture

A high-level view of how the main pieces fit together:

```mermaid
flowchart TD
    User["👤 User / Browser"]
    API["⚙️ Express API"]
    User --> API
    DB[("🗄️ MongoDB")]
    API --> DB
```

## ⚡ Quick Start

```bash

# 1. Clone the repository
git clone https://github.com/sahilydvvv/Webhook-Event-Transformation-Pipeline.git

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run start
```

## 📦 Key Dependencies

```
bcryptjs: ^2.4.3
body-parser: ^1.20.2
cookie-parser: ^1.4.6
cors: ^2.8.5
dotenv: ^16.0.3
express: ^5.2.1
jsonwebtoken: ^9.0.0
mongoose: ^7.0.0
nodemon: ^3.1.11
```

## 🚀 Available Scripts

- **start** — `npm run start`
- **dev** — `npm run dev`

## 📁 Project Structure

```
.
├── backend
│   ├── config
│   │   └── db.js
│   ├── controller
│   │   ├── auth.controller.js
│   │   ├── createEvent.controller.js
│   │   ├── getEvents.controller.js
│   │   ├── razorpay.controller.js
│   │   ├── rule.controller.js
│   │   └── webhook.controller.js
│   ├── middleware
│   │   └── auth.middleware.js
│   ├── model
│   │   ├── Rule.js
│   │   ├── User.js
│   │   └── Webhook.js
│   ├── package.json
│   ├── routes
│   │   ├── events.route.js
│   │   ├── razorpay.route.js
│   │   ├── rule.route.js
│   │   ├── user.route.js
│   │   └── webhook.route.js
│   ├── server.js
│   ├── services
│   │   ├── normalizers
│   │   │   ├── githubNormalizer.service.js
│   │   │   └── razorpayNormalizer.service.js
│   │   ├── router.service.js
│   │   ├── slack.service.js
│   │   └── transformers
│   │       ├── github.transformer.js
│   │       └── razorpay.transformer.js
│   ├── test.txt
│   └── util
│       └── token.js
└── frontend
    ├── eslint.config.js
    ├── index.html
    ├── package.json
    ├── public
    │   ├── favicon.svg
    │   └── icons.svg
    ├── src
    │   ├── App.jsx
    │   ├── assets
    │   │   ├── hero.png
    │   │   ├── react.svg
    │   │   └── vite.svg
    │   ├── context
    │   │   └── AuthContext.jsx
    │   ├── index.css
    │   ├── layout
    │   │   └── AppLayout.jsx
    │   ├── main.jsx
    │   ├── pages
    │   │   ├── Dashboard.jsx
    │   │   ├── Events.jsx
    │   │   ├── Login.jsx
    │   │   ├── Rules.jsx
    │   │   └── Signup.jsx
    │   └── services
    │       ├── authService.js
    │       ├── eventService.js
    │       └── ruleService.js
    └── vite.config.js
```

## 🛠️ Development Setup

### Node.js / JavaScript
1. Install Node.js (v18+ recommended)
2. Install dependencies: `npm install` (or `yarn` / `pnpm install` / `bun install`)
3. Start the dev server: see the **Quick Start** above

## 👥 Contributors

Thanks to everyone who has contributed to this project:

<p align="left">
<a href="https://github.com/sahilydvvv" title="sahilydvvv"><img src="https://avatars.githubusercontent.com/u/162436892?v=4&s=64" width="64" height="64" alt="sahilydvvv" style="border-radius:50%" /></a>
<a href="https://github.com/RamSharma22" title="RamSharma22"><img src="https://avatars.githubusercontent.com/u/165033519?v=4&s=64" width="64" height="64" alt="RamSharma22" style="border-radius:50%" /></a>
<a href="https://github.com/PUNIT-CS23" title="PUNIT-CS23"><img src="https://avatars.githubusercontent.com/u/158075685?v=4&s=64" width="64" height="64" alt="PUNIT-CS23" style="border-radius:50%" /></a>
<a href="https://github.com/Raghu64-code" title="Raghu64-code"><img src="https://avatars.githubusercontent.com/u/192698403?v=4&s=64" width="64" height="64" alt="Raghu64-code" style="border-radius:50%" /></a>
<a href="https://github.com/rajasisodia" title="rajasisodia"><img src="https://avatars.githubusercontent.com/u/216892596?v=4&s=64" width="64" height="64" alt="rajasisodia" style="border-radius:50%" /></a>
</p>

[See the full list of contributors →](https://github.com/sahilydvvv/Webhook-Event-Transformation-Pipeline/graphs/contributors)

## 👥 Contributing

Contributions are welcome! Here's the standard flow:

1. **Fork** the repository
2. **Clone** your fork: `git clone https://github.com/sahilydvvv/Webhook-Event-Transformation-Pipeline.git`
3. **Branch**: `git checkout -b feature/your-feature`
4. **Commit**: `git commit -m 'feat: add some feature'`
5. **Push**: `git push origin feature/your-feature`
6. **Open** a pull request

Please follow the existing code style and include tests for new behavior where applicable.

## 📜 License

This project is licensed under the **ISC** License.

---

<div align="center">

[![Made with ReadmeBuddy](https://img.shields.io/badge/Made%20with-ReadmeBuddy-8B5CFF?style=for-the-badge&logo=markdown&logoColor=white)](https://readmebuddy.com)

<sub>Generate beautiful READMEs in seconds → <a href="https://readmebuddy.com">readmebuddy.com</a></sub>

</div>
