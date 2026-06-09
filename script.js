/* ============================================================
   MISSION READINESS — script.js
   Mt. Vernon High School | Algebra 1 Prototype
   ============================================================
   HOW TO EDIT DATA:
   All sample data is in the DATA section below (clearly marked).
   Teachers can change names, percentages, missions, badges, etc.
   without touching any other code.
   ============================================================ */


/* ============================================================
   ██████  DATA — EDIT THIS SECTION
   ============================================================ */

// ── Student Profile ──────────────────────────────────────────
const STUDENT = {
  name:    "Demo Student",
  avatar:  "🧑‍💻",
  course:  "Algebra 1",
  unit:    "Systems of Equations",
  xp:      1340,
  level:   7,
  readinessPct: 78,   // Overall readiness 0–100

  // Boss Battle (next assessment)
  bossName:    "Systems Quiz",
  bossDate:    "Thursday, June 12",
  bossPct:     78,    // Readiness for this specific assessment
  bossTip:     "💡 Focus on Elimination and Word Problems to boost your battle readiness before Thursday!",

  // Summary stats for the dashboard chips
  stats: [
    { label: "Missions Done",   value: "6" },
    { label: "Skills Mastered", value: "2" },
    { label: "Badges Earned",   value: "3" },
    { label: "Streak",          value: "4🔥" },
  ]
};


// ── Skill Tree ───────────────────────────────────────────────
// status: "mastered" | "almost" | "needs"
const SKILLS = [
  { icon: "📈", name: "Graphing Systems",       pct: 91, status: "mastered" },
  { icon: "🔄", name: "Substitution",           pct: 82, status: "mastered" },
  { icon: "➕", name: "Elimination",            pct: 58, status: "almost"   },
  { icon: "📝", name: "Word Problems",          pct: 44, status: "needs"    },
  { icon: "🔍", name: "Interpreting Solutions", pct: 70, status: "almost"   },
];


// ── Missions ─────────────────────────────────────────────────
// status: "completed" | "available" | "locked"
const MISSIONS = [
  {
    icon:    "✅",
    name:    "Complete 5 substitution problems",
    xp:      150,
    boost:   "+8% Substitution",
    status:  "completed",
  },
  {
    icon:    "✅",
    name:    "Review graphing systems mini-lesson",
    xp:      100,
    boost:   "+6% Graphing",
    status:  "completed",
  },
  {
    icon:    "⚔️",
    name:    "Fix 3 missed exit ticket questions",
    xp:      200,
    boost:   "+10% Readiness",
    status:  "available",
  },
  {
    icon:    "🎬",
    name:    "Watch mini-lesson on Elimination",
    xp:      120,
    boost:   "+7% Elimination",
    status:  "available",
  },
  {
    icon:    "📚",
    name:    "Complete SAT-style systems question set",
    xp:      300,
    boost:   "+12% SAT Readiness",
    status:  "available",
  },
  {
    icon:    "🧩",
    name:    "Word Problem challenge pack (5 questions)",
    xp:      250,
    boost:   "+15% Word Problems",
    status:  "locked",
  },
  {
    icon:    "🏆",
    name:    "Boss Battle Practice Test",
    xp:      500,
    boost:   "+20% Readiness",
    status:  "locked",
  },
];


// ── Badges ───────────────────────────────────────────────────
// earned: true = unlocked, false = locked
const BADGES = [
  {
    emoji:  "🗺️",
    name:   "Graphing Guardian",
    desc:   "Master Graphing Systems with 85%+",
    earned: true,
  },
  {
    emoji:  "🔁",
    name:   "Substitution Specialist",
    desc:   "Master Substitution with 80%+",
    earned: true,
  },
  {
    emoji:  "➕",
    name:   "Elimination Apprentice",
    desc:   "Reach 60% on Elimination",
    earned: false,
  },
  {
    emoji:  "📖",
    name:   "Word Problem Warrior",
    desc:   "Reach 75% on Word Problems",
    earned: false,
  },
  {
    emoji:  "🐉",
    name:   "Boss Ready",
    desc:   "Achieve 90%+ overall readiness before a Boss Battle",
    earned: false,
  },
  {
    emoji:  "⚡",
    name:   "Mission Streak",
    desc:   "Complete missions 4 days in a row",
    earned: true,
  },
];


// ── Big Test Readiness ────────────────────────────────────────
// Three sets: unit, sat, ilearn
// Each skill: { name, pct, status }
const BIG_TEST = {
  unit: {
    title:    "📝 Unit Test Readiness",
    subtitle: "Algebra 1 — Systems of Equations",
    skills: [
      { icon: "📈", name: "Graphing Systems",       pct: 91, status: "mastered" },
      { icon: "🔄", name: "Substitution",           pct: 82, status: "mastered" },
      { icon: "➕", name: "Elimination",            pct: 58, status: "almost"   },
      { icon: "📝", name: "Word Problems",          pct: 44, status: "needs"    },
      { icon: "🔍", name: "Interpreting Solutions", pct: 70, status: "almost"   },
    ],
  },
  sat: {
    title:    "🎓 SAT Readiness",
    subtitle: "Algebra 1 — College-Ready Skills",
    skills: [
      { icon: "📐", name: "Linear Equations",  pct: 84, status: "mastered" },
      { icon: "🔗", name: "Systems",           pct: 72, status: "almost"   },
      { icon: "📊", name: "Functions",         pct: 65, status: "almost"   },
      { icon: "💥", name: "Exponents",         pct: 50, status: "needs"    },
      { icon: "🌊", name: "Quadratics",        pct: 38, status: "needs"    },
    ],
  },
  ilearn: {
    title:    "🏫 ILEARN Readiness",
    subtitle: "Indiana Academic Standards — Algebra 1",
    skills: [
      { icon: "📐", name: "Linear Relationships", pct: 88, status: "mastered" },
      { icon: "🔗", name: "Systems of Equations", pct: 72, status: "almost"   },
      { icon: "📊", name: "Functions & Notation",  pct: 61, status: "almost"   },
      { icon: "💥", name: "Polynomial Expressions",pct: 47, status: "needs"    },
      { icon: "📏", name: "Data Analysis",         pct: 75, status: "almost"   },
    ],
  },
};


// ── Unit Boss Battle Hero Card ────────────────────────────────
// Edit this object to change the boss battle card on the dashboard.
const BOSS_BATTLE = {
  unit:           "Unit 5",           // Unit label shown in the title
  name:           "Boss Battle",      // Name shown after the unit label
  date:           "2026-06-12",       // ISO date string — used for countdown
  dateDisplay:    "June 12",          // Human-readable date shown on card
  currentPct:     78,                 // Student's current readiness (0–100)
  targetPct:      85,                 // Target readiness to feel "ready"
  // Confidence thresholds (auto-calculated — you only need to edit these if you
  // want to change what counts as Ready / Almost Ready / Needs Training):
  readyThreshold:  85,                // >= this → 🟢 Ready
  almostThreshold: 70,                // >= this → 🟡 Almost Ready  (below → 🔴)
};

// ── Recommended Next Mission ──────────────────────────────────
// Points to the first "available" mission automatically (see renderDashboard),
// but you can override here with a specific mission name if you prefer:
const NEXT_MISSION_OVERRIDE = null; // set to null for auto, or a string name


// ── Teacher Class Data ────────────────────────────────────────
// 6 fake students — change names, readiness, weakest skill, etc.
const CLASS_DATA = [
  {
    name:           "Alex Rivera",
    readiness:      91,
    weakest:        "Word Problems",
    intervention:   "Word Problem challenge pack",
    goal:           "Boss Ready badge",
  },
  {
    name:           "Jordan Lee",
    readiness:      78,
    weakest:        "Elimination",
    intervention:   "Elimination mini-lesson + practice",
    goal:           "Elimination Apprentice badge",
  },
  {
    name:           "Morgan Chen",
    readiness:      63,
    weakest:        "Interpreting Solutions",
    intervention:   "Exit ticket corrections + re-quiz",
    goal:           "Reach 75% readiness",
  },
  {
    name:           "Taylor Patel",
    readiness:      55,
    weakest:        "Substitution",
    intervention:   "Substitution scaffolded practice",
    goal:           "Reach 70% readiness",
  },
  {
    name:           "Sam Nguyen",
    readiness:      87,
    weakest:        "Word Problems",
    intervention:   "SAT-style word problem set",
    goal:           "Boss Ready badge",
  },
  {
    name:           "Casey Williams",
    readiness:      42,
    weakest:        "Elimination",
    intervention:   "Small group reteach — Elimination",
    goal:           "Reach 60% readiness",
  },
];

// Class average per skill (for teacher skill bars section)
const CLASS_SKILL_AVERAGES = [
  { icon: "📈", name: "Graphing Systems",       pct: 82, status: "mastered" },
  { icon: "🔄", name: "Substitution",           pct: 74, status: "almost"   },
  { icon: "➕", name: "Elimination",            pct: 55, status: "needs"    },
  { icon: "📝", name: "Word Problems",          pct: 48, status: "needs"    },
  { icon: "🔍", name: "Interpreting Solutions", pct: 65, status: "almost"   },
];


/* ============================================================
   END OF DATA SECTION — No need to edit below this line
   unless you want to change app behavior.
   ============================================================ */


/* ============================================================
   HELPERS
   ============================================================ */

/**
 * Returns a CSS class based on a percentage.
 * Used for progress bar color and status badges.
 */
function statusClass(pct) {
  if (pct >= 80) return "mastered";
  if (pct >= 60) return "almost";
  return "needs";
}

/**
 * Returns a readable status label for a given percentage.
 */
function statusLabel(pct) {
  if (pct >= 80) return "Mastered";
  if (pct >= 60) return "Almost Ready";
  return "Needs Training";
}

/**
 * Returns the CSS class for a readiness pill in the teacher table.
 */
function pillClass(pct) {
  if (pct >= 80) return "pill-green";
  if (pct >= 60) return "pill-yellow";
  return "pill-red";
}

/**
 * Animates a meter bar to a given percentage.
 * Runs on the next tick so CSS transitions fire.
 */
function animateBar(el, pct) {
  setTimeout(() => { el.style.width = pct + "%"; }, 50);
}

/**
 * Builds an individual skill row (used in skill tree, big test, class averages).
 */
function buildSkillItem(skill) {
  const sc   = statusClass(skill.pct);
  const sl   = statusLabel(skill.pct);
  const div  = document.createElement("div");
  div.className = "skill-item";
  div.innerHTML = `
    <div class="skill-header">
      <span class="skill-name">${skill.icon || "🔷"} ${skill.name}</span>
      <span class="skill-pct">${skill.pct}%</span>
      <span class="skill-status-badge status-${sc}">${sl}</span>
    </div>
    <div class="skill-bar-wrap">
      <div class="skill-bar-track">
        <div class="skill-bar-fill meter-fill ${sc}" data-pct="${skill.pct}"></div>
      </div>
    </div>`;
  return div;
}


/* ============================================================
   RENDER: UNIT BOSS BATTLE HERO CARD
   ============================================================ */
function renderBossBattleHero() {
  const bb = BOSS_BATTLE;

  // -- Title
  document.getElementById("bh-title").textContent   = bb.unit + " " + bb.name;
  document.getElementById("bh-date").textContent    = "📅 " + bb.dateDisplay;

  // -- Countdown (days until boss battle from today)
  const today      = new Date();
  today.setHours(0, 0, 0, 0);
  const battleDate = new Date(bb.date + "T00:00:00");
  const msPerDay   = 1000 * 60 * 60 * 24;
  const daysLeft   = Math.ceil((battleDate - today) / msPerDay);
  const daysEl     = document.getElementById("bh-days");
  if (daysLeft > 0) {
    daysEl.textContent = daysLeft;
  } else if (daysLeft === 0) {
    daysEl.textContent = "TODAY";
    daysEl.style.fontSize = "1.4rem";
  } else {
    daysEl.textContent = "DONE";
    daysEl.style.fontSize = "1.4rem";
  }

  // -- Confidence level (auto-calculated from currentPct vs thresholds)
  const confEl = document.getElementById("bh-confidence");
  if (bb.currentPct >= bb.readyThreshold) {
    confEl.textContent  = "🟢 Ready — You're prepared for battle!";
    confEl.className    = "bh-confidence bh-conf-ready";
  } else if (bb.currentPct >= bb.almostThreshold) {
    confEl.textContent  = "🟡 Almost Ready — Keep training!";
    confEl.className    = "bh-confidence bh-conf-almost";
  } else {
    confEl.textContent  = "🔴 Needs More Training — Let's get to work!";
    confEl.className    = "bh-confidence bh-conf-needs";
  }

  // -- Current readiness bar
  document.getElementById("bh-current-pct").textContent = bb.currentPct + "%";
  const currentBar = document.getElementById("bh-current-bar");
  setTimeout(() => { currentBar.style.width = bb.currentPct + "%"; }, 100);

  // -- Target marker position (positioned as % of track width)
  const marker = document.getElementById("bh-target-marker");
  setTimeout(() => { marker.style.left = "calc(" + bb.targetPct + "% - 1.5px)"; }, 100);
  document.getElementById("bh-target-label").textContent = "🎯 Target: " + bb.targetPct + "%";

  // -- Recommended Training: pick bottom 3 skills sorted by pct ascending
  // Only includes skills that haven't been mastered (below targetPct)
  const trainingSkills = [...SKILLS]
    .filter(s => s.pct < bb.targetPct)   // only skills below target
    .sort((a, b) => a.pct - b.pct)       // weakest first
    .slice(0, 3);                         // top 3 to work on

  // If all skills are above target, show top 3 lowest anyway
  const displaySkills = trainingSkills.length > 0
    ? trainingSkills
    : [...SKILLS].sort((a, b) => a.pct - b.pct).slice(0, 3);

  const trainingList = document.getElementById("bh-training-list");
  trainingList.innerHTML = "";
  displaySkills.forEach((skill, i) => {
    const sc   = statusClass(skill.pct);
    const item = document.createElement("div");
    item.className = "bh-train-item";
    item.innerHTML = `
      <div class="bh-train-rank">${i + 1}</div>
      <div class="bh-train-info">
        <div class="bh-train-name">${skill.icon} ${skill.name}</div>
        <div class="bh-train-meta">${skill.pct}% mastery · ${statusLabel(skill.pct)}</div>
      </div>
      <div class="bh-train-bar-wrap">
        <div class="bh-train-track">
          <div class="bh-train-fill meter-fill ${sc}" data-pct="${skill.pct}"></div>
        </div>
      </div>`;
    trainingList.appendChild(item);
  });

  // Animate training mini-bars
  setTimeout(() => {
    trainingList.querySelectorAll(".bh-train-fill[data-pct]").forEach(el => {
      el.style.width = el.getAttribute("data-pct") + "%";
    });
  }, 200);
}


/* ============================================================
   RENDER: STUDENT DASHBOARD
   ============================================================ */
function renderDashboard() {
  // -- Student identity
  document.getElementById("student-name").textContent   = STUDENT.name;
  document.getElementById("student-meta").textContent   =
    `${STUDENT.course}  ·  ${STUDENT.unit}`;
  document.getElementById("student-avatar").textContent = STUDENT.avatar;
  document.getElementById("student-xp").textContent     = STUDENT.xp.toLocaleString();
  document.getElementById("student-level").textContent  = STUDENT.level;

  // -- Readiness meter
  const rPct   = STUDENT.readinessPct;
  const rBar   = document.getElementById("readiness-bar");
  const rClass = statusClass(rPct);
  document.getElementById("readiness-pct").textContent = rPct + "%";
  rBar.classList.add(rClass);
  animateBar(rBar, rPct);
  document.getElementById("readiness-label").textContent =
    rClass === "mastered" ? "🏆 Boss Ready!"
    : rClass === "almost"  ? "⚡ Almost Ready — keep training!"
    : "⚠️ Needs More Training";

  // -- Boss battle
  document.getElementById("boss-name").textContent = "🐉 " + STUDENT.bossName;
  document.getElementById("boss-date").textContent = "📅 " + STUDENT.bossDate;
  document.getElementById("boss-tip").textContent  = STUDENT.bossTip;
  const bBar = document.getElementById("boss-bar");
  bBar.classList.add(statusClass(STUDENT.bossPct));
  animateBar(bBar, STUDENT.bossPct);

  // -- Recommended next mission (first available, or override)
  const nextMissionEl = document.getElementById("next-mission-inner");
  let nextMission = null;
  if (NEXT_MISSION_OVERRIDE) {
    nextMission = MISSIONS.find(m => m.name === NEXT_MISSION_OVERRIDE);
  }
  if (!nextMission) {
    nextMission = MISSIONS.find(m => m.status === "available");
  }
  if (nextMission) {
    nextMissionEl.innerHTML = `
      <span class="mission-icon-big">${nextMission.icon}</span>
      <div class="mission-text-block">
        <div class="mission-text-name">${nextMission.name}</div>
        <div class="mission-text-meta">⚡ +${nextMission.xp} XP &nbsp;|&nbsp; ${nextMission.boost}</div>
      </div>`;
  } else {
    nextMissionEl.innerHTML = `<span style="color:var(--green)">🏆 All missions complete! Check back for new ones.</span>`;
  }

  // -- Stat chips
  const statRow = document.getElementById("stat-row");
  statRow.innerHTML = "";
  STUDENT.stats.forEach(s => {
    const chip = document.createElement("div");
    chip.className = "stat-chip";
    chip.innerHTML = `
      <span class="stat-chip-value">${s.value}</span>
      <span class="stat-chip-label">${s.label}</span>`;
    statRow.appendChild(chip);
  });
}


/* ============================================================
   RENDER: SKILL TREE
   ============================================================ */
function renderSkillTree() {
  document.getElementById("skill-unit-name").textContent = STUDENT.unit;
  const list = document.getElementById("skill-list");
  list.innerHTML = "";
  SKILLS.forEach(skill => {
    list.appendChild(buildSkillItem(skill));
  });
  // Animate bars
  animateSkillBars(list);
}


/* ============================================================
   RENDER: MISSIONS
   ============================================================ */
function renderMissions() {
  const list = document.getElementById("mission-list");
  list.innerHTML = "";

  MISSIONS.forEach(m => {
    const div = document.createElement("div");
    div.className = `mission-item ${m.status}`;

    let tagsHTML = "";
    if (m.status === "completed") {
      tagsHTML = `<span class="mission-tag tag-done">✅ Completed</span>
                  <span class="mission-tag tag-xp">+${m.xp} XP earned</span>`;
    } else if (m.status === "locked") {
      tagsHTML = `<span class="mission-tag tag-locked">🔒 Locked</span>
                  <span class="mission-tag tag-xp">+${m.xp} XP</span>
                  <span class="mission-tag tag-boost">${m.boost}</span>`;
    } else {
      tagsHTML = `<span class="mission-tag tag-xp">+${m.xp} XP</span>
                  <span class="mission-tag tag-boost">${m.boost}</span>`;
    }

    div.innerHTML = `
      <span class="mission-icon">${m.icon}</span>
      <div class="mission-body">
        <div class="mission-name">${m.name}</div>
        <div class="mission-tags">${tagsHTML}</div>
      </div>`;
    list.appendChild(div);
  });
}


/* ============================================================
   RENDER: BADGES
   ============================================================ */
function renderBadges() {
  const grid = document.getElementById("badge-grid");
  grid.innerHTML = "";
  BADGES.forEach(b => {
    const div = document.createElement("div");
    div.className = `badge-item ${b.earned ? "earned" : "locked"}`;
    div.innerHTML = `
      <span class="badge-emoji">${b.emoji}</span>
      <div class="badge-name">${b.name}</div>
      <div class="badge-desc">${b.desc}</div>
      ${b.earned ? '<span class="badge-earned-tag">EARNED</span>' : '<span style="font-size:0.7rem;color:#666;margin-top:6px;display:block">🔒 Locked</span>'}`;
    grid.appendChild(div);
  });
}


/* ============================================================
   RENDER: BIG TEST READINESS
   ============================================================ */
let currentTest = "unit";

function renderBigTest(type) {
  currentTest = type;
  const data = BIG_TEST[type];

  document.getElementById("bigtest-title").textContent    = data.title;
  document.getElementById("bigtest-subtitle").textContent = data.subtitle;

  const list = document.getElementById("bigtest-list");
  list.innerHTML = "";
  data.skills.forEach(skill => {
    list.appendChild(buildSkillItem(skill));
  });
  animateSkillBars(list);

  // Update button states
  ["unit","sat","ilearn"].forEach(t => {
    const btn = document.getElementById("tbtn-" + t);
    if (btn) btn.classList.toggle("active", t === type);
  });
}


/* ============================================================
   RENDER: TEACHER DASHBOARD
   ============================================================ */
function renderTeacher() {
  // Class table
  const tbody = document.getElementById("class-table-body");
  tbody.innerHTML = "";
  CLASS_DATA.forEach(s => {
    const tr  = document.createElement("tr");
    const pc  = pillClass(s.readiness);
    tr.innerHTML = `
      <td><strong>${s.name}</strong></td>
      <td><span class="readiness-pill ${pc}">${s.readiness}%</span></td>
      <td>${s.weakest}</td>
      <td><span class="intervention-chip">${s.intervention}</span></td>
      <td>${s.goal}</td>`;
    tbody.appendChild(tr);
  });

  // Class average skill bars
  const bars = document.getElementById("class-skill-bars");
  bars.innerHTML = "";
  CLASS_SKILL_AVERAGES.forEach(skill => {
    bars.appendChild(buildSkillItem(skill));
  });
  animateSkillBars(bars);
}


/* ============================================================
   UTILITY: Animate all skill bar fills inside a container
   ============================================================ */
function animateSkillBars(container) {
  setTimeout(() => {
    container.querySelectorAll(".skill-bar-fill[data-pct]").forEach(el => {
      el.style.width = el.getAttribute("data-pct") + "%";
    });
  }, 80);
}


/* ============================================================
   NAV: SWITCH BETWEEN STUDENT AND TEACHER VIEWS
   ============================================================ */
function switchView(view) {
  document.getElementById("student-view").classList.toggle("active-view", view === "student");
  document.getElementById("teacher-view").classList.toggle("active-view", view === "teacher");
  document.getElementById("btn-student").classList.toggle("active", view === "student");
  document.getElementById("btn-teacher").classList.toggle("active", view === "teacher");
}


/* ============================================================
   NAV: SWITCH BETWEEN STUDENT TABS
   ============================================================ */
function switchTab(tab) {
  // Hide all tabs and remove active from all buttons
  document.querySelectorAll(".tab-content").forEach(el => el.classList.remove("active-tab"));
  document.querySelectorAll(".tab-btn").forEach(el => el.classList.remove("active"));

  // Show target tab
  document.getElementById("tab-" + tab).classList.add("active-tab");

  // Find and activate the button that triggered this tab
  document.querySelectorAll(".tab-btn").forEach(btn => {
    if (btn.getAttribute("onclick") === `switchTab('${tab}')`) {
      btn.classList.add("active");
    }
  });

  // Lazy-render tabs that need bar animations on first open
  if (tab === "skilltree") renderSkillTree();
  if (tab === "bigtest")   renderBigTest(currentTest);
}


/* ============================================================
   NAV: SWITCH BIG TEST TYPE
   ============================================================ */
function switchTest(type) {
  renderBigTest(type);
}


/* ============================================================
   INIT — Run on page load
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  renderBossBattleHero(); // Unit Boss Battle hero card (top of dashboard)
  renderDashboard();      // Student dashboard (default view)
  renderMissions();    // Missions tab (pre-rendered)
  renderBadges();      // Badges tab (pre-rendered)
  renderTeacher();     // Teacher dashboard (hidden until toggled)
  renderBigTest("unit"); // Big test (default: unit test)
  renderSkillTree();   // Skill tree
});
