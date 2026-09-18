# 🎬 Scoopcast: Guess The Frame — Colyseus Multiplayer Server

Production-ready, authoritative WebSocket game server for **[Guess The Frame](https://www.scoopcast-live.in/)**, powered by **[Colyseus](https://colyseus.io/)**, **TypeScript**, and **Express**.

---

## ⚡ Features & Game Rules

- **100% Game Rule Preservation**:
  - **Scoring**: 1st correct guess = **10 pts**, 2nd = **7 pts**, 3rd = **5 pts** (up to 3 winners per round).
  - **Hint System**: Requesting a hint deducts **-2 pts** from player's score and generates a private masked string (e.g. `M _ _ _ _ N`), delivered solely to the requester socket.
  - **Game Categories**: Frame trivia (`frames`), Dialogue quotes (`dialogue`), Celebrity eyes (`eyes`), and sudden-death Tie Breakers (`tie_breaker`).
  - **Authoritative Clock**: 1-second synchronization tick; 20-second safety auto-advance after round answer reveals.
- **Anti-Cheat by Design**:
  - Movie titles, quotes, and celebrity names are held **privately in server memory** during active play.
  - Answer strings are strictly blanked (`""`) until `phase === 'round_reveal'`.
  - Guesses are validated server-side using an exact port of `FuzzyMatcher` (Levenshtein distance, roman numerals, diacritics, and subtitles).
- **Anti-Spoiler Shield**:
  - Live chat messages containing the answer or partial spoilers are filtered and rejected before broadcasting.
- **Host Resilience & Mobile Reconnects**:
  - 20-second reconnection window (`allowReconnection`) for phone locks and network switches.
  - Automatic Host Migration if the room creator permanently leaves.
- **Uptime Monitoring**:
  - Pre-configured `/health` and `/ping` endpoints.
  - Built-in `@colyseus/monitor` web dashboard at `/colyseus`.

---

## 📦 Project Structure

```
guess-the-frame-colyseus/
├── src/
│   ├── index.ts                # Express + Colyseus WebSocket Server Entrypoint
│   ├── config/
│   │   └── gameConfig.ts       # Round durations, scoring points, and constants
│   ├── data/
│   │   └── catalog.ts          # Server-held movie frames, dialogues, and tie-breakers
│   ├── rooms/
│   │   ├── TriviaRoom.ts       # Authoritative state machine, timer, and events
│   │   └── schema/
│   │       └── GameState.ts    # Synchronized Colyseus State Schema
│   └── utils/
│       ├── fuzzyMatcher.ts     # Levenshtein distance, normalizer, and spoiler shield
│       └── hintGenerator.ts    # Masked hint generator
├── tests/
│   ├── fuzzyMatcher.test.ts    # Unit tests for fuzzy matching & typo tolerance
│   ├── hintGenerator.test.ts   # Unit tests for character masking
│   ├── triviaRoom.test.ts      # E2E multi-client integration test
│   └── runAllTests.ts          # Test suite runner
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🚀 Quick Start (Local Development)

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Self-Verification Test Suite
```bash
npx ts-node tests/runAllTests.ts
```

### 3. Build & Run Local Server
```bash
npm run build
npm start
```
* HTTP/WebSocket: `http://localhost:2567`
* Colyseus Monitor: `http://localhost:2567/colyseus`
* Health Endpoint: `http://localhost:2567/health`
