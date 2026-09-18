/**
 * Scoopcast Guess The Frame - Universal Web & Game Analytics Engine
 * Tracks page views, unique sessions, games played, live playtime duration,
 * game modes, trivia accuracy, and forwards events to Vercel Analytics / GA4.
 */

(function(window) {
  'use strict';

  const STORAGE_KEY = 'gtf_analytics_v1';
  const SESSION_KEY = 'gtf_session_id';
  const SESSION_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes

  // Default Stats Schema
  const defaultStats = {
    // Views & Visits
    pageViews: 0,
    uniqueSessions: 0,
    firstVisit: Date.now(),
    lastVisit: Date.now(),
    device: /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop',

    // Playtime (in seconds)
    totalSessionSeconds: 0,
    totalGameplaySeconds: 0,

    // Games Played
    roomsCreated: 0,
    roomsJoined: 0,
    gamesStarted: 0,
    gamesCompleted: 0,
    totalRoundsPlayed: 0,

    // Game Modes
    roundsFrames: 0,
    roundsEyes: 0,
    roundsDialogue: 0,

    // Trivia & Social
    guessesSubmitted: 0,
    guessesCorrect: 0,
    hintsUsed: 0,
    chatMessagesSent: 0,
    sharesClicked: 0,

    // Activity Log (last 20 events)
    recentEvents: []
  };

  // Load or initialize storage
  function loadStats() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        return Object.assign({}, defaultStats, JSON.parse(raw));
      }
    } catch (e) {
      console.warn('[Analytics] Failed to read from localStorage:', e);
    }
    return Object.assign({}, defaultStats);
  }

  function saveStats(stats) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
    } catch (e) {
      console.warn('[Analytics] Failed to save to localStorage:', e);
    }
  }

  let stats = loadStats();
  let sessionStartTime = Date.now();
  let activeGameStartTime = null;
  let isGameActive = false;

  // Session ID & Unique Visit Detection
  function checkSession() {
    try {
      const now = Date.now();
      const lastActive = parseInt(localStorage.getItem('gtf_last_active') || '0', 10);
      let sessionId = sessionStorage.getItem(SESSION_KEY);

      if (!sessionId || (now - lastActive > SESSION_TIMEOUT_MS)) {
        sessionId = 'sess_' + Math.random().toString(36).slice(2, 10) + '_' + now;
        sessionStorage.setItem(SESSION_KEY, sessionId);
        stats.uniqueSessions = (stats.uniqueSessions || 0) + 1;
      }

      localStorage.setItem('gtf_last_active', now.toString());
      stats.lastVisit = now;
      stats.pageViews = (stats.pageViews || 0) + 1;
      saveStats(stats);
    } catch (e) {
      console.warn('[Analytics] Error tracking session:', e);
    }
  }

  // Forward event to external providers (Vercel Analytics & Google Analytics)
  function dispatchExternal(name, data) {
    try {
      // 1. Vercel Analytics custom events
      if (typeof window.va === 'function') {
        window.va('event', { name: name, data: data || {} });
      }
      // 2. Google Analytics 4 custom events
      if (typeof window.gtag === 'function') {
        window.gtag('event', name, data || {});
      }
    } catch (e) {
      // Ignore errors from external telemetry blockers
    }
  }

  // Log an event to in-memory stats and activity feed
  function logEvent(type, detail) {
    stats = loadStats();
    const eventItem = {
      type: type,
      detail: detail || '',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      ts: Date.now()
    };

    if (!Array.isArray(stats.recentEvents)) stats.recentEvents = [];
    stats.recentEvents.unshift(eventItem);
    if (stats.recentEvents.length > 20) stats.recentEvents.length = 20;

    saveStats(stats);
    dispatchExternal(type, { detail: detail });

    // Update UI if modal is currently open
    if (AnalyticsEngine.isModalOpen()) {
      AnalyticsEngine.renderStatsUI();
    }
  }

  // Playtime Timer (Tracks active session and gameplay seconds)
  setInterval(() => {
    if (document.visibilityState === 'visible') {
      stats.totalSessionSeconds = (stats.totalSessionSeconds || 0) + 1;
      if (isGameActive) {
        stats.totalGameplaySeconds = (stats.totalGameplaySeconds || 0) + 1;
      }
      // Persist periodically every 15 seconds
      if (stats.totalSessionSeconds % 15 === 0) {
        saveStats(stats);
      }
      // Update modal live timer if open
      const liveTimerEl = document.getElementById('statCurrentSessionTime');
      if (liveTimerEl) {
        const elapsed = Math.floor((Date.now() - sessionStartTime) / 1000);
        liveTimerEl.textContent = formatDuration(elapsed);
      }
    }
  }, 1000);

  // Format seconds to human readable (e.g., 2h 14m 30s or 04m 12s)
  function formatDuration(sec) {
    if (!sec || sec <= 0) return '0s';
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    if (h > 0) return `${h}h ${m}m ${s}s`;
    if (m > 0) return `${m}m ${s}s`;
    return `${s}s`;
  }

  // Public Analytics Engine API
  const AnalyticsEngine = {
    init() {
      checkSession();
      this.bindUrlQuery();
      console.log('[AnalyticsEngine] Initialized. Page Views:', stats.pageViews, 'Unique Sessions:', stats.uniqueSessions);
    },

    bindUrlQuery() {
      try {
        const params = new URLSearchParams(window.location.search);
        if (params.has('stats') || params.has('analytics')) {
          window.addEventListener('DOMContentLoaded', () => {
            setTimeout(() => this.openModal(), 300);
          });
        }
      } catch (e) {}
    },

    // ── GAME EVENTS ──

    trackRoomCreate(roomCode, settings) {
      stats = loadStats();
      stats.roomsCreated = (stats.roomsCreated || 0) + 1;
      saveStats(stats);
      logEvent('room_created', `Room ${roomCode || '----'}`);
    },

    trackRoomJoin(roomCode) {
      stats = loadStats();
      stats.roomsJoined = (stats.roomsJoined || 0) + 1;
      saveStats(stats);
      logEvent('room_joined', `Room ${roomCode || '----'}`);
    },

    trackGameStart(roomCode, settings) {
      stats = loadStats();
      stats.gamesStarted = (stats.gamesStarted || 0) + 1;
      isGameActive = true;
      activeGameStartTime = Date.now();
      saveStats(stats);
      logEvent('game_started', `Match started in ${roomCode || 'room'}`);
    },

    trackRoundStart(mode, roundIndex) {
      stats = loadStats();
      stats.totalRoundsPlayed = (stats.totalRoundsPlayed || 0) + 1;
      const m = (mode || '').toLowerCase();
      if (m.includes('eye')) {
        stats.roundsEyes = (stats.roundsEyes || 0) + 1;
      } else if (m.includes('dialogue') || m.includes('dialog')) {
        stats.roundsDialogue = (stats.roundsDialogue || 0) + 1;
      } else {
        stats.roundsFrames = (stats.roundsFrames || 0) + 1;
      }
      isGameActive = true;
      saveStats(stats);
      logEvent('round_started', `Round ${roundIndex != null ? roundIndex + 1 : 1} (${mode || 'Frames'})`);
    },

    trackGuess(isCorrect, guessText) {
      stats = loadStats();
      stats.guessesSubmitted = (stats.guessesSubmitted || 0) + 1;
      if (isCorrect) {
        stats.guessesCorrect = (stats.guessesCorrect || 0) + 1;
      }
      saveStats(stats);
      logEvent(isCorrect ? 'guess_correct' : 'guess_submitted', guessText ? `"${guessText.slice(0, 20)}"` : '');
    },

    trackHint() {
      stats = loadStats();
      stats.hintsUsed = (stats.hintsUsed || 0) + 1;
      saveStats(stats);
      logEvent('hint_used', 'Letter hint unlocked');
    },

    trackChatMessage() {
      stats = loadStats();
      stats.chatMessagesSent = (stats.chatMessagesSent || 0) + 1;
      saveStats(stats);
      logEvent('chat_sent', 'In-game chat');
    },

    trackShare(method) {
      stats = loadStats();
      stats.sharesClicked = (stats.sharesClicked || 0) + 1;
      saveStats(stats);
      logEvent('room_shared', method || 'Invite link');
    },

    trackGameOver(winnerName, totalRounds) {
      stats = loadStats();
      stats.gamesCompleted = (stats.gamesCompleted || 0) + 1;
      isGameActive = false;
      saveStats(stats);
      logEvent('game_completed', `Winner: ${winnerName || 'Unknown'} (${totalRounds || 0} rounds)`);
    },

    getStats() {
      return loadStats();
    },

    // ── DASHBOARD MODAL ──

    isModalOpen() {
      const modal = document.getElementById('analyticsModal');
      return modal && modal.classList.contains('active');
    },

    openModal() {
      let modal = document.getElementById('analyticsModal');
      if (!modal) {
        modal = this.createModalElement();
        document.body.appendChild(modal);
      }
      this.renderStatsUI();
      modal.classList.add('active');
    },

    closeModal() {
      const modal = document.getElementById('analyticsModal');
      if (modal) modal.classList.remove('active');
    },

    resetStats() {
      if (confirm('Are you sure you want to reset all tracked analytics for this device?')) {
        stats = Object.assign({}, defaultStats, {
          firstVisit: Date.now(),
          lastVisit: Date.now()
        });
        saveStats(stats);
        this.renderStatsUI();
      }
    },

    copyStats() {
      const currentStats = loadStats();
      navigator.clipboard.writeText(JSON.stringify(currentStats, null, 2))
        .then(() => alert('Analytics JSON copied to clipboard!'))
        .catch(() => alert('Failed to copy analytics data.'));
    },

    createModalElement() {
      const div = document.createElement('div');
      div.id = 'analyticsModal';
      div.className = 'nb-analytics-overlay';
      div.innerHTML = `
        <div class="nb-analytics-card" role="dialog" aria-label="Web & Game Analytics">
          <div class="nb-analytics-header">
            <div class="nb-analytics-title-row">
              <span class="nb-live-dot" title="Live Telemetry Active"></span>
              <span class="nb-analytics-title">SCOOPCAST LIVE ANALYTICS</span>
              <span class="nb-analytics-pill">VERCEL & GA4 READY</span>
            </div>
            <button type="button" class="nb-analytics-close" onclick="AnalyticsEngine.closeModal()" aria-label="Close Analytics">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>

          <div class="nb-analytics-body" id="analyticsBodyContent">
            <!-- Populated dynamically by renderStatsUI() -->
          </div>

          <div class="nb-analytics-footer">
            <button type="button" class="btn-nb-analytics-action" onclick="AnalyticsEngine.copyStats()">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
              Copy Data (JSON)
            </button>
            <button type="button" class="btn-nb-analytics-action btn-danger-nb" onclick="AnalyticsEngine.resetStats()">
              Reset Stats
            </button>
            <button type="button" class="btn-nb-analytics-primary" onclick="AnalyticsEngine.closeModal()">
              Close
            </button>
          </div>
        </div>
      `;
      return div;
    },

    renderStatsUI() {
      const content = document.getElementById('analyticsBodyContent');
      if (!content) return;
      const s = loadStats();

      const totalRounds = (s.roundsFrames || 0) + (s.roundsEyes || 0) + (s.roundsDialogue || 0);
      const framesPct = totalRounds > 0 ? Math.round((s.roundsFrames / totalRounds) * 100) : 0;
      const eyesPct = totalRounds > 0 ? Math.round((s.roundsEyes / totalRounds) * 100) : 0;
      const dialPct = totalRounds > 0 ? Math.round((s.roundsDialogue / totalRounds) * 100) : 0;

      const accuracy = s.guessesSubmitted > 0 ? Math.round((s.guessesCorrect / s.guessesSubmitted) * 100) : 0;
      const avgGameSec = s.gamesCompleted > 0 ? Math.round(s.totalGameplaySeconds / s.gamesCompleted) : (s.gamesStarted > 0 ? Math.round(s.totalGameplaySeconds / s.gamesStarted) : 0);
      const currentSessionSec = Math.floor((Date.now() - sessionStartTime) / 1000);

      content.innerHTML = `
        <!-- 4 Grid Stat Metric Boxes -->
        <div class="nb-analytics-grid">
          
          <!-- Card 1: Traffic & Engagement -->
          <div class="nb-metric-card">
            <div class="nb-metric-label">PAGE VIEWS & SESSIONS</div>
            <div class="nb-metric-value">${s.pageViews || 0}</div>
            <div class="nb-metric-sub">
              <span><strong>${s.uniqueSessions || 0}</strong> Unique Visits</span>
              <span class="nb-metric-badge">${s.device}</span>
            </div>
            <div class="nb-metric-detail">
              Current Session: <strong id="statCurrentSessionTime">${formatDuration(currentSessionSec)}</strong>
            </div>
          </div>

          <!-- Card 2: Games Played -->
          <div class="nb-metric-card">
            <div class="nb-metric-label">GAMES PLAYED</div>
            <div class="nb-metric-value">${s.gamesStarted || 0}</div>
            <div class="nb-metric-sub">
              <span><strong>${s.gamesCompleted || 0}</strong> Matches Finished</span>
              <span><strong>${s.totalRoundsPlayed || 0}</strong> Rounds</span>
            </div>
            <div class="nb-metric-detail">
              Rooms Created: <strong>${s.roomsCreated || 0}</strong> · Joined: <strong>${s.roomsJoined || 0}</strong>
            </div>
          </div>

          <!-- Card 3: Playtime Duration -->
          <div class="nb-metric-card">
            <div class="nb-metric-label">TOTAL PLAYTIME</div>
            <div class="nb-metric-value">${formatDuration(s.totalGameplaySeconds || 0)}</div>
            <div class="nb-metric-sub">
              <span>Site Time: <strong>${formatDuration(s.totalSessionSeconds || 0)}</strong></span>
            </div>
            <div class="nb-metric-detail">
              Avg Match Duration: <strong>${formatDuration(avgGameSec)}</strong>
            </div>
          </div>

          <!-- Card 4: Trivia Performance -->
          <div class="nb-metric-card">
            <div class="nb-metric-label">TRIVIA ACCURACY</div>
            <div class="nb-metric-value">${accuracy}%</div>
            <div class="nb-metric-sub">
              <span><strong>${s.guessesCorrect || 0}</strong> / ${s.guessesSubmitted || 0} Correct</span>
            </div>
            <div class="nb-metric-detail">
              Hints: <strong>${s.hintsUsed || 0}</strong> · Chat Sent: <strong>${s.chatMessagesSent || 0}</strong>
            </div>
          </div>

        </div>

        <!-- Mode Breakdown Section -->
        <div class="nb-analytics-section">
          <div class="nb-analytics-sec-title">GAME MODES PLAYED</div>
          <div class="nb-mode-bars">
            <div class="nb-mode-row">
              <span class="nb-mode-name">Frames</span>
              <div class="nb-progress-track">
                <div class="nb-progress-fill" style="width:${framesPct}%; background:#3B82F6;"></div>
              </div>
              <span class="nb-mode-stat">${s.roundsFrames || 0} (${framesPct}%)</span>
            </div>
            <div class="nb-mode-row">
              <span class="nb-mode-name">Eyes</span>
              <div class="nb-progress-track">
                <div class="nb-progress-fill" style="width:${eyesPct}%; background:#EC4899;"></div>
              </div>
              <span class="nb-mode-stat">${s.roundsEyes || 0} (${eyesPct}%)</span>
            </div>
            <div class="nb-mode-row">
              <span class="nb-mode-name">Dialogue</span>
              <div class="nb-progress-track">
                <div class="nb-progress-fill" style="width:${dialPct}%; background:#10B981;"></div>
              </div>
              <span class="nb-mode-stat">${s.roundsDialogue || 0} (${dialPct}%)</span>
            </div>
          </div>
        </div>

        <!-- Recent Events Activity Feed -->
        <div class="nb-analytics-section">
          <div class="nb-analytics-sec-title">LIVE RECENT EVENTS (${(s.recentEvents || []).length})</div>
          <div class="nb-events-feed">
            ${(s.recentEvents && s.recentEvents.length > 0) ? s.recentEvents.map(e => `
              <div class="nb-event-item">
                <span class="nb-event-badge">${e.type}</span>
                <span class="nb-event-detail">${e.detail || '-'}</span>
                <span class="nb-event-time">${e.time || ''}</span>
              </div>
            `).join('') : '<div class="nb-empty-events">No events recorded yet. Play a round or create a room!</div>'}
          </div>
        </div>
      `;
    }
  };

  // Expose to window
  window.AnalyticsEngine = AnalyticsEngine;

  // Auto-init on script load
  AnalyticsEngine.init();

})(window);
