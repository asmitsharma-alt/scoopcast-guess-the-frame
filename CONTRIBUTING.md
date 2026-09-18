# Contributing to Scoopcast: Guess The Frame 🎬

First off, thank you for considering contributing to **Scoopcast: Guess The Frame**! Open source thrives when developers, designers, and film enthusiasts collaborate together.

## 🚀 How to Contribute

### 1. Adding New Movie Frames or Quotes
We welcome new high-quality movie frames, memorable quotes, and celebrity eye crops!
1. Save high-resolution frames in `.webp` format under `GUESSTHEFRAME/` with naming format: `Title (Year).webp` (e.g., `Inception (2010).webp`).
2. Add the metadata entry to the frame catalog in `guess-the-frame-colyseus/src/data/catalog.ts` and `desktop/index.html` / `android/js/gameClient.js`.
3. Verify that the answer string matches the canonical title.

### 2. Code Contributions & Bug Fixes
1. Fork the repo and create your branch from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. Make your improvements. Ensure clean, accessible, and responsive code.
3. Test locally across desktop and mobile screens.
4. Run the automated test suite:
   ```bash
   node test_cross_platform_live.js
   ```
5. Commit your changes with clear, descriptive messages:
   ```bash
   git commit -m "feat(mobile): add haptic vibration on hint unlock"
   ```
6. Push to your fork and submit a Pull Request!

## 📋 Code of Conduct
Please be respectful, collaborative, and constructive in all discussions, issues, and code reviews. We want this project to be a welcoming environment for developers of all skill levels.
