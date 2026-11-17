"use strict";

/* Health and Longevity Plan — offline PWA. Content ported from the plan Page. */

const KEYS = {
  gym: "hp-gym",
  checks: "hp-checks",
  weight: "hp-weight-kg",
  start: "hp-sleep-start",
};

const DEFAULTS = {
  gym: "real",
  weightKg: 80,
  sleepStart: "2026-11-18",
};

const CITE = {
  "Mandsager 2018": "https://doi.org/10.1001/jamanetworkopen.2018.3605",
  "Momma 2022": "https://doi.org/10.1136/bjsports-2021-105061",
  "Leong 2015": "https://doi.org/10.1016/S0140-6736(14)62000-6",
  "Milanović 2015": "https://doi.org/10.1007/s40279-015-0365-0",
  "Helgerud 2007": "https://doi.org/10.1249/mss.0b013e3180304570",
  "Bull 2020": "https://doi.org/10.1136/bjsports-2020-102955",
  "Tanaka 2001": "https://doi.org/10.1016/S0735-1097(00)01054-8",
  "Afonso 2021": "https://doi.org/10.3390/healthcare9040427",
  "Windred 2024": "https://doi.org/10.1093/sleep/zsad253",
  "Wright 2013": "https://doi.org/10.1016/j.cub.2013.06.039",
  "Drake 2013": "https://doi.org/10.5664/jcsm.3170",
  "Ebrahim 2013": "https://doi.org/10.1111/acer.12006",
  "Pietilä 2018": "https://mental.jmir.org/2018/1/e23",
  "Stutz 2019": "https://doi.org/10.1007/s40279-018-1015-0",
  "Roenneberg 2012": "https://doi.org/10.1016/j.cub.2012.03.038",
  "Edinger 2021": "https://doi.org/10.5664/jcsm.8986",
  "Watson 2015": "https://doi.org/10.5664/jcsm.4758",
  "Burgess 2010": "https://pmc.ncbi.nlm.nih.gov/articles/PMC2928909/",
  "Auger 2015": "https://doi.org/10.5664/jcsm.5100",
  "Erland 2017": "https://doi.org/10.5664/jcsm.6462",
  "Mah 2021": "https://doi.org/10.1186/s12906-021-03297-z",
  "NIAAA": "https://www.niaaa.nih.gov/alcohol-health/overview-alcohol-consumption/moderate-binge-drinking",
  "GBD 2020": "https://doi.org/10.1016/S0140-6736(22)00847-9",
  "Topiwala 2022": "https://doi.org/10.1038/s41467-022-28735-5",
  "Whelton 2018": "https://doi.org/10.1161/HYP.0000000000000065",
  "Poole 2017": "https://doi.org/10.1136/bmj.j5024",
  "Kreider 2017": "https://doi.org/10.1186/s12970-017-0173-z",
  "Avgerinos 2018": "https://doi.org/10.1016/j.exger.2018.04.013",
  "Morton 2018": "https://doi.org/10.1136/bjsports-2017-097608",
  "VITAL vitamin D": "https://doi.org/10.1056/NEJMoa1809944",
  "VITAL omega-3": "https://doi.org/10.1056/NEJMoa1811403",
  "Demay 2024": "https://academic.oup.com/jcem/article/109/8/1907/7685305",
  "USPSTF 2022": "https://doi.org/10.1001/jama.2022.8970",
  "Ristow 2009": "https://doi.org/10.1073/pnas.0903485106",
  "Kronenberg 2022": "https://doi.org/10.1093/eurheartj/ehac361",
  "Kaminsky 2015": "https://pmc.ncbi.nlm.nih.gov/articles/PMC4919021/",
  "Zhang 2016": "https://www.cmaj.ca/content/188/3/E53",
  "Dodds 2014": "https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0113637",
  "Yang 2019": "https://doi.org/10.1001/jamanetworkopen.2018.8341",
  "de Brito 2012": "https://doi.org/10.1177/2047487312471759",
  "Laukkanen 2015": "https://doi.org/10.1001/jamainternmed.2014.8187",
  "Garolla 2013": "https://doi.org/10.1093/humrep/det020",
  "Sawka 2007": "https://doi.org/10.1249/mss.0b013e31802ca597",
  "Paluch 2022": "https://www.thelancet.com/journals/lanpub/article/PIIS2468-2667(21)00302-9/fulltext",
  "Ekelund 2016": "https://doi.org/10.1016/S0140-6736(16)30370-1",
  "Green 2011": "https://doi.org/10.1200/JCO.2010.28.7078",
  "Worthington 2019": "https://doi.org/10.1002/14651858.CD012018.pub2",
  "Holt-Lunstad 2010": "https://doi.org/10.1371/journal.pmed.1000316",
};

const SOURCES = [
  { title: "Cardiorespiratory fitness and long-term mortality (Mandsager 2018)", site: "JAMA Network Open", href: CITE["Mandsager 2018"] },
  { title: "Muscle-strengthening activities and mortality (Momma 2022)", site: "BJSM", href: CITE["Momma 2022"] },
  { title: "Grip strength and mortality, PURE study (Leong 2015)", site: "Lancet", href: CITE["Leong 2015"] },
  { title: "HIIT vs continuous training for VO2max (Milanović 2015)", site: "Sports Medicine", href: CITE["Milanović 2015"] },
  { title: "4×4 intervals improve VO2max (Helgerud 2007)", site: "Med Sci Sports Exerc", href: CITE["Helgerud 2007"] },
  { title: "WHO 2020 physical activity guidelines (Bull 2020)", site: "BJSM", href: CITE["Bull 2020"] },
  { title: "Age-predicted max heart rate (Tanaka 2001)", site: "JACC", href: CITE["Tanaka 2001"] },
  { title: "Strength training vs stretching for range of motion (Afonso 2021)", site: "Healthcare", href: CITE["Afonso 2021"] },
  { title: "Sleep regularity and mortality (Windred 2024)", site: "Sleep", href: CITE["Windred 2024"] },
  { title: "Natural light and the circadian clock (Wright 2013)", site: "Current Biology", href: CITE["Wright 2013"] },
  { title: "Caffeine 0, 3 or 6 hours before bed (Drake 2013)", site: "J Clin Sleep Med", href: CITE["Drake 2013"] },
  { title: "Alcohol and sleep (Ebrahim 2013)", site: "Alcohol Clin Exp Res", href: CITE["Ebrahim 2013"] },
  { title: "Alcohol and overnight recovery (Pietilä 2018)", site: "JMIR Mental Health", href: CITE["Pietilä 2018"] },
  { title: "Evening exercise and sleep (Stutz 2019)", site: "Sports Medicine", href: CITE["Stutz 2019"] },
  { title: "Social jetlag and obesity (Roenneberg 2012)", site: "Current Biology", href: CITE["Roenneberg 2012"] },
  { title: "Behavioral treatments for insomnia guideline (Edinger 2021)", site: "J Clin Sleep Med", href: CITE["Edinger 2021"] },
  { title: "Recommended sleep for adults (Watson 2015)", site: "J Clin Sleep Med", href: CITE["Watson 2015"] },
  { title: "Melatonin 0.5 mg vs 3 mg phase response (Burgess 2010)", site: "J Clin Endocrinol Metab", href: CITE["Burgess 2010"] },
  { title: "Circadian sleep disorder treatment guideline (Auger 2015)", site: "J Clin Sleep Med", href: CITE["Auger 2015"] },
  { title: "Melatonin label accuracy (Erland 2017)", site: "J Clin Sleep Med", href: CITE["Erland 2017"] },
  { title: "Magnesium for insomnia review (Mah 2021)", site: "BMC Complement Med Ther", href: CITE["Mah 2021"] },
  { title: "Binge drinking definition", site: "NIAAA", href: CITE.NIAAA },
  { title: "Alcohol risks by age, GBD 2020", site: "Lancet", href: CITE["GBD 2020"] },
  { title: "Alcohol and brain volume (Topiwala 2022)", site: "Nature Communications", href: CITE["Topiwala 2022"] },
  { title: "Blood pressure guideline (Whelton 2018)", site: "Hypertension", href: CITE["Whelton 2018"] },
  { title: "Coffee and health umbrella review (Poole 2017)", site: "BMJ", href: CITE["Poole 2017"] },
  { title: "Creatine position stand (Kreider 2017)", site: "JISSN", href: CITE["Kreider 2017"] },
  { title: "Creatine and cognition review (Avgerinos 2018)", site: "Exp Gerontology", href: CITE["Avgerinos 2018"] },
  { title: "Protein intake meta-analysis (Morton 2018)", site: "BJSM", href: CITE["Morton 2018"] },
  { title: "VITAL vitamin D trial (Manson 2019)", site: "NEJM", href: CITE["VITAL vitamin D"] },
  { title: "VITAL omega-3 trial (Manson 2019)", site: "NEJM", href: CITE["VITAL omega-3"] },
  { title: "Vitamin D guideline (Demay 2024)", site: "Endocrine Society", href: CITE["Demay 2024"] },
  { title: "Multivitamins recommendation (USPSTF 2022)", site: "JAMA", href: CITE["USPSTF 2022"] },
  { title: "Antioxidants blunt exercise benefits (Ristow 2009)", site: "PNAS", href: CITE["Ristow 2009"] },
  { title: "Lp(a) consensus statement (Kronenberg 2022)", site: "European Heart Journal", href: CITE["Kronenberg 2022"] },
  { title: "FRIEND VO2max reference standards (Kaminsky 2015)", site: "Mayo Clinic Proceedings", href: CITE["Kaminsky 2015"] },
  { title: "Resting heart rate and mortality (Zhang 2016)", site: "CMAJ", href: CITE["Zhang 2016"] },
  { title: "Grip strength norms (Dodds 2014)", site: "PLOS One", href: CITE["Dodds 2014"] },
  { title: "Push-up capacity and heart events (Yang 2019)", site: "JAMA Network Open", href: CITE["Yang 2019"] },
  { title: "Sit-to-rise test and mortality (de Brito 2012)", site: "Eur J Prev Cardiol", href: CITE["de Brito 2012"] },
  { title: "Sauna bathing and mortality (Laukkanen 2015)", site: "JAMA Internal Medicine", href: CITE["Laukkanen 2015"] },
  { title: "Sauna and sperm production (Garolla 2013)", site: "Human Reproduction", href: CITE["Garolla 2013"] },
  { title: "Fluid replacement position stand (Sawka 2007)", site: "Med Sci Sports Exerc", href: CITE["Sawka 2007"] },
  { title: "Daily steps and mortality (Paluch 2022)", site: "Lancet Public Health", href: CITE["Paluch 2022"] },
  { title: "Sitting, activity and mortality (Ekelund 2016)", site: "Lancet", href: CITE["Ekelund 2016"] },
  { title: "Sunscreen and melanoma trial (Green 2011)", site: "J Clin Oncol", href: CITE["Green 2011"] },
  { title: "Interdental cleaning review (Worthington 2019)", site: "Cochrane", href: CITE["Worthington 2019"] },
  { title: "Social relationships and mortality (Holt-Lunstad 2010)", site: "PLOS Medicine", href: CITE["Holt-Lunstad 2010"] },
];

const WORKOUTS = {
  real: {
    A: [
      ["Trap-bar deadlift", "3 × 5", "RPE 7–8, rest 2–3 min"],
      ["Dumbbell bench press", "3 × 8–10", "RPE 7–8, rest 2 min"],
      ["Lat pulldown (cable)", "3 × 10–12", "RPE 8, rest 90 s"],
      ["Bulgarian split squat", "2 × 8 / leg", "RPE 7–8, rest 90 s"],
      ["Cable face pull", "2 × 15", "RPE 8, rest 60 s"],
      ["Pallof press (cable)", "2 × 10 / side", "Slow, 2 s hold"],
    ],
    B: [
      ["Back squat or goblet squat", "3 × 6–8", "RPE 7–8, rest 2–3 min"],
      ["Seated cable row", "3 × 10–12", "RPE 8, rest 90 s"],
      ["Standing dumbbell overhead press", "3 × 8–10", "RPE 7–8, rest 2 min"],
      ["Romanian deadlift", "3 × 8", "RPE 7–8, rest 2 min"],
      ["Push-ups", "2 × max minus 2", "Stop 2 reps short of failure"],
      ["Dead hang", "3 × max", "Rest 60 s, log best time"],
    ],
    C: [
      ["Leg press or front-foot-elevated split squat", "3 × 10", "RPE 8, rest 2 min"],
      ["Pull-ups (assisted if needed)", "3 × max minus 2", "Rest 2 min"],
      ["Incline dumbbell press", "3 × 10", "RPE 8, rest 90 s"],
      ["Hip thrust or cable pull-through", "3 × 12", "RPE 8, rest 90 s"],
      ["Single-arm cable row", "2 × 12 / side", "RPE 8, rest 60 s"],
      ["Farmer carry", "3 × 40 m", "Heavy, tall posture"],
    ],
  },
  apt: {
    A: [
      ["Dumbbell goblet squat (or heaviest DB, 3 s lower)", "3 × 8–12", "RPE 7–8, rest 2 min"],
      ["Push-ups (feet elevated when easy)", "3 × max minus 2", "Rest 90 s"],
      ["Cable lat pulldown or band pulldown", "3 × 10–12", "RPE 8, rest 90 s"],
      ["Bulgarian split squat with DBs", "2 × 10 / leg", "RPE 8, rest 90 s"],
      ["Cable face pull", "2 × 15", "RPE 8, rest 60 s"],
      ["Pallof press (cable)", "2 × 10 / side", "Slow, 2 s hold"],
    ],
    B: [
      ["Cable or DB Romanian deadlift", "3 × 10", "RPE 8, rest 2 min"],
      ["Seated or standing cable row", "3 × 10–12", "RPE 8, rest 90 s"],
      ["DB overhead press", "3 × 8–10", "RPE 7–8, rest 2 min"],
      ["Reverse lunge with DBs", "3 × 8 / leg", "RPE 8, rest 90 s"],
      ["Cable chest press or fly", "2 × 12", "RPE 8, rest 60 s"],
      ["Dead hang (pull-up bar or doorframe bar)", "3 × max", "Rest 60 s, log best time"],
    ],
    C: [
      ["Step-ups onto a bench with DBs", "3 × 10 / leg", "RPE 8, rest 90 s"],
      ["Pull-ups or inverted rows", "3 × max minus 2", "Rest 2 min"],
      ["Incline DB press", "3 × 10", "RPE 8, rest 90 s"],
      ["Single-leg hip thrust or cable pull-through", "3 × 12", "RPE 8, rest 90 s"],
      ["Single-arm cable row", "2 × 12 / side", "RPE 8, rest 60 s"],
      ["Suitcase carry (one heavy DB)", "3 × 40 m / side", "Don't lean"],
    ],
  },
};

const WEEK_PLAN = [
  { dow: 1, day: "Mon", name: "Strength A + mobility", time: "60 min", kind: "strength", letter: "A" },
  { dow: 2, day: "Tue", name: "Zone 2 cardio (bike, incline walk, rower)", time: "40–45 min", kind: "zone2", place: "any" },
  { dow: 3, day: "Wed", name: "Strength B + mobility", time: "60 min", kind: "strength", letter: "B" },
  { dow: 4, day: "Thu", name: "Intervals: Norwegian 4×4", time: "35 min", kind: "intervals" },
  { dow: 5, day: "Fri", name: "Strength C + mobility", time: "60 min", kind: "strength", letter: "C" },
  { dow: 6, day: "Sat", name: "Zone 2, outdoors in the morning (hike, ride, ruck walk)", time: "45–60 min", kind: "zone2", place: "outdoor" },
  { dow: 0, day: "Sun", name: "Rest: long easy walk + mobility", time: "30–45 min", kind: "rest" },
];

const MOBILITY = [
  ["Cat-cow", "10 slow reps", "Spine warm-up"],
  ["World's greatest stretch", "5 / side", "Hips, hamstrings, upper back"],
  ["90/90 hip switches", "8 / side", "Hip rotation for squats and lunges"],
  ["Deep squat hold (hold a post)", "60 s", "Ankles and hips"],
  ["Couch stretch", "60 s / side", "Hip flexors tight from sitting"],
  ["Thoracic open book", "8 / side", "Upper-back rotation, shoulder health"],
  ["Doorway pec stretch", "45 s / side", "Chest, posture after pressing"],
  ["Seated hamstring stretch", "45 s / side", "Hinge range"],
  ["Slow breathing on your back", "1–2 min, 4 s in, 6 s out", "Downshift for sleep"],
];

const SLEEP_PHASES = [
  { from: 1, to: 2, alarm: "8:30 AM", lights: "12:30 AM, only if sleepy", lightsShort: "12:30 AM", training: "Late morning or afternoon" },
  { from: 3, to: 4, alarm: "8:00 AM", lights: "12:00 AM", lightsShort: "12:00 AM", training: "Late morning or afternoon" },
  { from: 5, to: 6, alarm: "7:30 AM", lights: "11:30 PM", lightsShort: "11:30 PM", training: "Morning Zone 2 outdoors if possible" },
  { from: 7, to: 8, alarm: "7:00 AM", lights: "11:15 PM", lightsShort: "11:15 PM", training: "Any time before 7 PM" },
  { from: 9, to: 14, alarm: "7:00 AM", lights: "11:00 PM", lightsShort: "11:00 PM", training: "Any time before 7 PM; intervals before 6 PM" },
];

const PROGRESSION = [
  ["1–2 (learn)", "2 sets each, RPE 6–7, learn form", "2 × 30–40 min", "3 × 3 min"],
  ["3–6 (build)", "3 sets, RPE 7–8, add weight by the rule", "2 × 40–45 min", "4 × 3 min, then 4 × 4"],
  ["7 (deload)", "Half the sets, same weights", "2 × 30 min", "Skip or 2 × 4 min"],
  ["8–11 (push)", "3 sets, main lifts to RPE 8–9", "2 × 45–60 min", "4 × 4, more output each week"],
  ["12 (retest)", "Light week, retest benchmarks", "2 × 30 min", "Retest instead"],
];

const TABS = ["today", "sleep", "week", "guide"];

function esc(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function cite(name) {
  const href = CITE[name];
  if (!href) return esc(name);
  return `<a href="${esc(href)}" target="_blank" rel="noopener noreferrer">${esc(name)}</a>`;
}

function parseISODate(iso) {
  const parts = String(iso).split("-").map(Number);
  return new Date(parts[0], parts[1] - 1, parts[2]);
}

function toISODate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function todayISO() {
  return toISODate(new Date());
}

function formatLongDate(date) {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

function dayDiff(startISO, endISO) {
  const ms = parseISODate(endISO) - parseISODate(startISO);
  return Math.round(ms / 86400000);
}

function proteinGrams(kg) {
  // Plan: 1.6 g/kg; at 80 kg "about 130 g" (128 rounded to nearest 5).
  return Math.round((kg * 1.6) / 5) * 5;
}

function lbFromKg(kg) {
  return Math.round(kg * 2.20462);
}

function parseTimeLabel(label) {
  const match = String(label).trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (!match) return null;
  let hour = Number(match[1]) % 12;
  if (match[3].toUpperCase() === "PM") hour += 12;
  return { h: hour, min: Number(match[2]) };
}

function formatTime(t) {
  const ampm = t.h >= 12 ? "PM" : "AM";
  const hour = t.h % 12 || 12;
  return `${hour}:${String(t.min).padStart(2, "0")} ${ampm}`;
}

function minusHours(t, hours) {
  let total = t.h * 60 + t.min - hours * 60;
  total = ((total % (24 * 60)) + 24 * 60) % (24 * 60);
  return { h: Math.floor(total / 60), min: total % 60 };
}

function caffeineCutoff(lightsShort) {
  const t = parseTimeLabel(lightsShort);
  if (!t) return null;
  return formatTime(minusHours(t, 9));
}

function melatoninTime(day) {
  if (day >= 1 && day <= 4) return "7:30 PM";
  if (day >= 5 && day <= 8) return "7:00 PM";
  if (day >= 9 && day <= 14) return "6:30 PM";
  return null;
}

function phaseForDay(day) {
  return SLEEP_PHASES.find((p) => day >= p.from && day <= p.to) || null;
}

function badge(label, kind) {
  const cls = kind || String(label).toLowerCase().split(/\s+/)[0];
  return `<span class="badge ${esc(cls)}">${esc(label)}</span>`;
}

function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (raw == null) return fallback;
    return JSON.parse(raw);
  } catch (err) {
    return fallback;
  }
}

function saveJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    /* private mode or full storage — fail quietly */
  }
}

function loadState() {
  let gym = localStorage.getItem(KEYS.gym);
  if (gym !== "real" && gym !== "apt") gym = DEFAULTS.gym;
  let weightKg = Number(localStorage.getItem(KEYS.weight));
  if (!Number.isFinite(weightKg) || weightKg < 40 || weightKg > 250) weightKg = DEFAULTS.weightKg;
  let sleepStart = localStorage.getItem(KEYS.start) || DEFAULTS.sleepStart;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(sleepStart)) sleepStart = DEFAULTS.sleepStart;
  return {
    gym,
    weightKg,
    sleepStart,
    checks: loadJSON(KEYS.checks, {}),
    tab: "today",
  };
}

const state = loadState();

function persistGym() { localStorage.setItem(KEYS.gym, state.gym); }
function persistWeight() { localStorage.setItem(KEYS.weight, String(state.weightKg)); }
function persistStart() { localStorage.setItem(KEYS.start, state.sleepStart); }
function persistChecks() { saveJSON(KEYS.checks, state.checks); }

function todayChecks() {
  const iso = todayISO();
  if (!state.checks[iso]) state.checks[iso] = {};
  return state.checks[iso];
}

function sessionForDate(date) {
  const dow = date.getDay();
  return WEEK_PLAN.find((row) => row.dow === dow);
}

function sleepContext(iso) {
  const day = dayDiff(state.sleepStart, iso) + 1;
  if (day < 1) {
    return { status: "before", day, start: state.sleepStart };
  }
  if (day > 14) {
    return {
      status: "after",
      day,
      alarm: "7:00 AM",
      lights: "11:00 PM",
      lightsShort: "11:00 PM",
      caffeine: caffeineCutoff("11:00 PM"),
      training: "Any time before 7 PM; intervals before 6 PM",
    };
  }
  const phase = phaseForDay(day);
  return {
    status: "active",
    day,
    alarm: phase.alarm,
    lights: phase.lights,
    lightsShort: phase.lightsShort,
    caffeine: caffeineCutoff(phase.lightsShort),
    training: phase.training,
    melatonin: melatoninTime(day),
  };
}

function gymToggle() {
  return `<div class="seg" role="group" aria-label="Gym type">
    <button type="button" data-gym="real" aria-pressed="${state.gym === "real"}">Real gym</button>
    <button type="button" data-gym="apt" aria-pressed="${state.gym === "apt"}">Apartment gym</button>
  </div>`;
}

function exerciseList(rows) {
  return `<div class="ex-list">${rows.map((row) => `
    <div class="ex">
      <div class="ex-name">${esc(row[0])}</div>
      <div class="ex-meta">${esc(row[1])} · ${esc(row[2])}</div>
    </div>`).join("")}</div>`;
}

function strengthBlock(letter, opts) {
  const heading = opts && opts.heading;
  const rows = WORKOUTS[state.gym][letter];
  const dayName = letter === "A" ? "Monday" : letter === "B" ? "Wednesday" : "Friday";
  return `${heading ? `<h3 class="kicker">Strength ${letter} (${dayName})</h3>` : ""}
    <div class="card">${exerciseList(rows)}</div>`;
}

function strengthNotes() {
  return `<div class="card">
    <div class="props">
      <div><div class="prop-label">Warm-up (6 min)</div><div class="prop-value">3 min easy bike or row, then 10 bodyweight squats, 10 band pull-aparts, and 2 lighter ramp-up sets of the first lift</div></div>
      <div><div class="prop-label">RPE</div><div class="prop-value">How hard a set felt out of 10. RPE 8 means you had 2 good reps left. Most sets stop there, not at failure.</div></div>
      <div><div class="prop-label">Progression</div><div class="prop-value">Double progression: when every set hits the top of the rep range at RPE 8 or easier, add 2.5–5% weight next time and drop back to the bottom of the range</div></div>
      <div><div class="prop-label">Session length</div><div class="prop-value">About 45 min of lifting plus warm-up. Superset the last two exercises if you're short on time.</div></div>
      <div><div class="prop-label">Optional finisher</div><div class="prop-value">Keep your end-of-workout StairMaster, but only 8–10 easy minutes on strength days so it doesn't eat into Thursday's intervals</div></div>
    </div>
  </div>
  <p class="meta">Each day covers a squat or lunge, a hinge, a push, a pull, and carries or core, which is everything the strength-mortality research measures. Your cable work stays as accessories. The apartment version swaps barbell lifts for slower dumbbell and cable versions, which work fine until your dumbbells get too light; that's usually the point to join a real gym.</p>`;
}

function zone2Details(session) {
  const duration = session.place === "outdoor" ? "45–60 min" : "40–45 min";
  const outdoor = session.place === "outdoor"
    ? `<p class="meta" style="margin-top:10px">October to April is prime outdoor season. Do Saturday Zone 2 outside: hikes, rides, long walks. May to September: outdoors only before about 7 AM, or move cardio indoors.</p>`
    : "";
  return `<div class="card">
    <div class="props">
      <div><div class="prop-label">Duration today</div><div class="prop-value">${esc(duration)}. Sessions start at 30–40 min and build to 45–60 min. Go longer first, then add watts or speed at the same heart rate.</div></div>
      <div><div class="prop-label">Talk test</div><div class="prop-value">You can speak in full sentences but wouldn't want to sing. If you can only get out a few words, slow down.</div></div>
      <div><div class="prop-label">Heart-rate estimate</div><div class="prop-value">About 125–145 bpm (65–75% of an estimated max of 192 bpm, ${cite("Tanaka 2001")}: 208 − 0.7 × age). Trust the talk test over the number. The MAF formula (180 − age = 157 bpm) is a ceiling, not a target; for someone with weak cardio it's often above true Zone 2.</div></div>
      <div><div class="prop-label">Options</div><div class="prop-value">Incline treadmill walk (10–12% grade, 3.0–3.5 mph), bike, rower, elliptical, slow StairMaster, hiking, swimming</div></div>
    </div>
    ${outdoor}
  </div>`;
}

function intervalDetails() {
  const steps = [
    ["Norwegian 4×4, 35 min", "Best on a bike, rower, StairMaster, or a steep incline walk. No running needed."],
    ["Warm up 8–10 min", "Easy, building to Zone 2 by the end"],
    ["4 min hard", "85–95% of max HR (about 165–180 bpm), RPE 8–9. You can say only a few words. HR takes 1–2 min to climb, so judge by the last 2 minutes."],
    ["3 min easy", "Keep moving at an easy pace, about 70% of max"],
    ["Repeat 4 times total", "Start with 3 rounds of 3 min in weeks 1–2, then 4 × 4 from week 4"],
    ["Cool down 5 min", "Easy, until breathing settles"],
  ];
  return `<div class="card">
    <ol class="steps">${steps.map(([t, d]) => `<li><div class="step-title">${esc(t)}</div><div class="step-detail">${esc(d)}</div></li>`).join("")}</ol>
    <p class="meta" style="margin-top:10px">Progress intervals by more output in the same 4 minutes, not by more rounds. Finish the 4×4 at least 2 hours before bed, and before 6 PM during the sleep reset. If you've slept under 6 hours, swap intervals for Zone 2.</p>
  </div>`;
}

function mobilityCard() {
  return `<h2 class="kicker">Daily mobility · 12 min</h2>
    <div class="card">${exerciseList(MOBILITY)}</div>
    <p class="meta">Honest grade: Weak for longevity. No study shows stretching makes you live longer. A meta-analysis of 11 trials found strength training improves range of motion about as much as stretching does (${cite("Afonso 2021")}), so your lifting already covers part of this. The routine earns its place for three reasons: it keeps the range your lifts need, it undoes desk sitting, and done at night it's a cue to wind down.</p>`;
}

function tableWrap(headers, rows, currentIndex) {
  const head = headers.map((h) => `<th>${esc(h)}</th>`).join("");
  const body = rows.map((row, i) => {
    const cls = i === currentIndex ? " class=\"current\"" : "";
    const cells = row.map((cell) => `<td>${typeof cell === "string" ? esc(cell) : cell}</td>`).join("");
    return `<tr${cls}>${cells}</tr>`;
  }).join("");
  return `<div class="table-wrap"><table><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table></div>`;
}

function checklistCard(session, sleep) {
  const items = [
    { id: "workout", label: "Workout", note: session.name },
    { id: "steps", label: "8,000+ steps", note: "Target 8,000–10,000" },
    { id: "wake", label: "Wake on time", note: sleep.alarm ? "Target " + sleep.alarm : "Fixed wake time, within 30 min" },
    { id: "light", label: "Morning outdoor light", note: "10–30 min within an hour of waking, no sunglasses" },
    { id: "caffeine", label: "Caffeine cutoff", note: sleep.caffeine ? "Last caffeine by " + sleep.caffeine + " (9 hours before lights out)" : "None within 8–10 hours of bed" },
    { id: "mobility", label: "12-min mobility", note: "Evening, as a wind-down" },
    { id: "lights", label: "Lights out", note: sleep.lightsShort ? "Target " + sleep.lights + ", only if sleepy" : "Get in bed only when sleepy" },
    { id: "creatine", label: "Creatine", note: "3–5 g, any time" },
    { id: "water", label: "Water / hydration", note: "Especially after sauna or in the heat" },
  ];
  const checks = todayChecks();
  const done = items.filter((item) => checks[item.id]).length;
  const rows = items.map((item) => {
    const on = !!checks[item.id];
    return `<label class="check">
      <input type="checkbox" data-check="${esc(item.id)}" ${on ? "checked" : ""}>
      <span class="box" aria-hidden="true"></span>
      <span class="check-body"><span class="check-text">${esc(item.label)}</span><span class="check-note">${esc(item.note)}</span></span>
    </label>`;
  }).join("");
  return `<h2 class="kicker">Daily checklist</h2>
    <p class="progress">${done} of ${items.length} done today</p>
    <div class="card"><div class="check-list">${rows}</div></div>`;
}

function renderToday() {
  const now = new Date();
  const session = sessionForDate(now);
  const sleep = sleepContext(todayISO());
  let body = "";
  if (session.kind === "strength") {
    body = `${gymToggle()}
      <div class="card">
        <div class="prop-label">Warm-up · 6 min</div>
        <div class="prop-value">3 min easy bike or row, then 10 bodyweight squats, 10 band pull-aparts, and 2 lighter ramp-up sets of the first lift</div>
      </div>
      ${strengthBlock(session.letter)}
      <p class="meta">Optional finisher: 8–10 easy minutes on the StairMaster, not a long grind. Most sets stop at RPE 8 (about 2 reps left).</p>`;
  } else if (session.kind === "zone2") {
    body = zone2Details(session);
  } else if (session.kind === "intervals") {
    body = intervalDetails();
  } else {
    body = `<div class="card"><p>A long, easy walk plus the 12-minute mobility routine. Keep it easy. This is a rest day from lifting and intervals.</p></div>`;
  }

  let sleepCard = "";
  if (sleep.status === "before") {
    const start = parseISODate(state.sleepStart);
    sleepCard = `<div class="callout info"><div class="lead-line">Sleep reset starts ${esc(formatLongDate(start))}</div><p>Until then, the plan's default assumption is sleep of about 1:00–9:30 AM. You can change the start date in Settings.</p></div>`;
  } else if (sleep.status === "active") {
    sleepCard = `<div class="card sleep-hero">
      <div class="day-num">Sleep reset · day ${sleep.day} of 14</div>
      <div class="times">
        <div><div class="t-label">Alarm</div><div class="t-val">${esc(sleep.alarm)}</div></div>
        <div><div class="t-label">Lights out</div><div class="t-val">${esc(sleep.lightsShort)}</div></div>
      </div>
      <p class="meta" style="margin-top:12px">Outside within an hour of the alarm. Caffeine cutoff ${esc(sleep.caffeine)}. ${sleep.melatonin ? "If you use melatonin, take 0.5 mg at " + esc(sleep.melatonin) + "." : ""} Training: ${esc(sleep.training)}.</p>
    </div>`;
  } else {
    sleepCard = `<div class="callout info"><div class="lead-line">Sleep reset complete</div><p>Hold a 7:00 AM wake and about 11:00 PM lights out. Keep weekend wake time within 30–60 minutes of that. Caffeine cutoff around ${esc(sleep.caffeine)}.</p></div>`;
  }

  return `
    <p class="kicker">Today</p>
    <h2 class="lead">${esc(session.name)}</h2>
    <p class="sublead">${esc(session.time)} · no day runs past an hour</p>
    ${body}
    ${mobilityCard()}
    ${sleepCard}
    ${checklistCard(session, sleep)}
    <p class="fine">This is general guidance, not medical advice. Check with a doctor before starting if you have a heart, lung or kidney condition, or any symptoms during exercise.</p>`;
}

function renderSleep() {
  const sleep = sleepContext(todayISO());
  const currentIndex = SLEEP_PHASES.findIndex((p) => sleep.status === "active" && sleep.day >= p.from && sleep.day <= p.to);
  const rows = SLEEP_PHASES.map((p) => [
    p.from === p.to ? "Day " + p.from : "Days " + p.from + "–" + p.to,
    p.alarm,
    p.lights,
    p.training,
  ]);

  let hero = "";
  if (sleep.status === "before") {
    const start = parseISODate(state.sleepStart);
    const days = -sleep.day + 1;
    const when = days === 1 ? "Tomorrow." : "In " + days + " days.";
    hero = `<div class="callout info"><div class="lead-line">Starts ${esc(formatLongDate(start))}</div><p>${when} The table below assumes current sleep of about 1:00–9:30 AM. Change the start date in Settings if you begin on a different day.</p></div>`;
  } else if (sleep.status === "active") {
    hero = `<div class="card sleep-hero">
      <div class="day-num">Day ${sleep.day} of 14</div>
      <div class="times">
        <div><div class="t-label">Alarm</div><div class="t-val">${esc(sleep.alarm)}</div></div>
        <div><div class="t-label">Lights out</div><div class="t-val">${esc(sleep.lightsShort)}</div></div>
      </div>
      <p class="meta" style="margin-top:12px">Caffeine cutoff ${esc(sleep.caffeine)} (9 hours before lights out). ${sleep.melatonin ? "Optional melatonin: 0.5 mg at " + esc(sleep.melatonin) + "." : ""} ${esc(sleep.training)}.</p>
    </div>`;
  } else {
    hero = `<div class="callout info"><div class="lead-line">Reset complete — hold the schedule</div><p>Alarm 7:00 AM every day, lights out about 11:00 PM, caffeine cutoff around ${esc(sleep.caffeine)}. Weekend wake time within 30–60 minutes of 7:00 AM.</p></div>`;
  }

  const rules = [
    ["Fixed wake time", "Same time 7 days a week, within 30 min on weekends. Target 7:00 AM.", "Regular sleep timing predicted mortality better than sleep length in 60,977 people (" + cite("Windred 2024") + ")", "Strong"],
    ["Morning outdoor light", "10–30 min outside within 30–60 min of waking, no sunglasses. Walk, coffee on the balcony, or Saturday's Zone 2.", "A week of natural light shifted people's clocks about 2 hours earlier (" + cite("Wright 2013") + "). Phoenix sunrise is about 7:00 AM in late November.", "Strong"],
    ["Shift bedtime in small steps", "Move bedtime 15–30 min earlier every 2 days. Get in bed only when sleepy.", "The clock can only move about 30–60 min a day; big jumps cause lying awake", "Moderate"],
    ["Dim the evening", "Overhead lights off and lamps on 1–2 hours before bed. Night mode on screens, and the phone charges outside the bedroom.", "Bright evening light delays the clock. The screen-light effect itself is modest; the scrolling is the bigger problem.", "Moderate"],
    ["Caffeine cutoff", "None within 8–10 hours of bed. For an 11 PM bedtime, last caffeine by 1–2 PM, pre-workout included. During the reset, cut off 9 hours before lights out.", "400 mg taken 6 hours before bed still cut sleep by about 41 min (" + cite("Drake 2013") + ")", "Strong"],
    ["Alcohol timing", "Last drink 3+ hours before bed, and follow the weekend cut-back plan in the Guide.", "Alcohol speeds falling asleep but breaks up the second half of the night and cuts REM (" + cite("Ebrahim 2013") + "). Recovery measures dropped with every dose (" + cite("Pietilä 2018") + ").", "Strong"],
    ["Exercise timing", "Train morning to early evening. Finish the 4×4 at least 2 hours before bed.", "Evening exercise is fine except vigorous work ending within an hour of bed (" + cite("Stutz 2019") + "). Morning activity outdoors also adds light.", "Moderate"],
    ["Cool, dark, quiet room", "Set the AC to 65–68°F at night, blackout curtains or a sleep mask, and white noise if needed", "Body temperature has to drop to fall asleep; mostly lab evidence", "Moderate"],
    ["Limit weekend drift", "Weekend wake time within 1 hour of weekdays, ideally 30 min", "Sleeping in on weekends acts like flying across time zones every weekend; social jet lag is linked to higher odds of being overweight (" + cite("Roenneberg 2012") + ")", "Moderate"],
    ["Naps", "20 min max, before 3 PM. None during the first week of the reset if you can manage it.", "Long or late naps reduce how sleepy you are at bedtime", "Moderate"],
    ["Awake in bed", "If you've been awake about 20 minutes, get up, sit in dim light with something boring, and go back when sleepy. Bed is only for sleep and sex.", "Stimulus control, a core piece of CBT-I, is recommended by the sleep medicine academy (" + cite("Edinger 2021") + ")", "Strong"],
    ["Duration", "7–9 hours of sleep, so 8–8.5 hours in bed", "Adult consensus is 7+ hours (" + cite("Watson 2015") + ")", "Strong"],
  ];

  return `
    <p class="kicker">Sleep reset</p>
    <h2 class="lead">Anchor the morning</h2>
    <p class="sublead">Going to bed later and sleeping in later is a body clock that has drifted later. The fix is a fixed wake time and morning light, not forcing an early bedtime.</p>
    <div class="callout info"><div class="lead-line">What's going on</div><p>Morning light and a fixed wake time pull the clock earlier, and bedtime follows on its own within a week or two.</p></div>
    ${hero}
    <h2 class="kicker">14-day schedule</h2>
    <div class="card">${tableWrap(["Days", "Alarm", "Lights out", "Training slot"], rows, currentIndex)}</div>
    <p class="meta">This assumes you're now sleeping about 1:00 to 9:30 AM; start the alarm 30–60 min earlier than your current wake-up and step down from there. Start date is ${esc(state.sleepStart)} (change it in Settings). Every day: outside within an hour of the alarm, caffeine cut off 9 hours before lights out, lamps only 90 minutes before bed, mobility as the last thing before bed. If you use melatonin, take 0.5 mg at 7:30 PM on days 1–4, 7:00 PM on days 5–8 and 6:30 PM on days 9–14, then stop. The two weekends in the window are the hard part: same alarm, and if you drink, follow the cut-back rules.</p>
    <p class="meta" style="margin-top:8px">How it fits with training: the reset runs alongside weeks 1–2 of training, which are already the easy weeks. Do the 4×4 before 6 PM. Saturday morning's outdoor Zone 2 doubles as your weekend light anchor and a reason not to stay out late Friday. If you've slept under 6 hours, swap that day's intervals for Zone 2.</p>
    <h2 class="kicker">The rules</h2>
    <div class="card stack">${rules.map((r) => `
      <div class="stack-item">
        <div class="row-title">${esc(r[0])} ${badge(r[3], r[3].toLowerCase())}</div>
        <div class="row-detail">${esc(r[1])}</div>
        <div class="row-detail">${r[2]}</div>
      </div>`).join("")}</div>
    <h2 class="kicker">Melatonin and magnesium</h2>
    <div class="card stack">
      <div class="stack-item">
        <div class="row-title">Melatonin: useful as a clock shifter, not a sleeping pill ${badge("Moderate", "moderate")}</div>
        <div class="row-detail">0.5 mg taken in the early evening (about 5 hours before your current bedtime) moves the clock earlier about as much as 3 mg does (${cite("Burgess 2010")}). Sleep doctors support timed melatonin for a delayed clock, though the recommendation is weak (${cite("Auger 2015")}). Use it only during the 14-day reset, then stop. US bottles often don't match the label (one analysis found −83% to +478% of the stated dose, ${cite("Erland 2017")}), so buy one that's USP-verified, or split a 1 mg tablet.</div>
      </div>
      <div class="stack-item">
        <div class="row-title">Magnesium: optional, weak evidence ${badge("Weak", "weak")}</div>
        <div class="row-detail">A review of 3 small trials in older adults found people fell asleep about 17 minutes faster, with low-quality evidence (${cite("Mah 2021")}). It's cheap and safe; if you want it, 200–350 mg magnesium glycinate in the evening. Don't expect much.</div>
      </div>
    </div>
    <p class="meta">See a doctor if you snore loudly or wake up gasping, feel sleepy during the day despite 8 hours in bed, or still have trouble sleeping after 3 months. That last one calls for CBT-I, which beats sleep pills over the long run.</p>`;
}

function renderWeek() {
  const dow = new Date().getDay();
  const weekRows = WEEK_PLAN.map((row) => [row.day, row.name, row.time]);
  const current = WEEK_PLAN.findIndex((row) => row.dow === dow);
  const weekly = [
    ["Strength sessions", "3"],
    ["Zone 2 sessions", "2 (90+ min total)"],
    ["4×4 interval session", "1"],
    ["Mobility", "7 days, 12 min"],
    ["Steps", "8,000+ on 6 of 7 days"],
    ["Wake time", "Within 30 min of 7:00 AM every day"],
    ["Morning outdoor light", "7 days"],
    ["Sleep", "7+ hours on 6 of 7 nights"],
    ["Alcohol", "1 night max, 4 drinks max"],
    ["Creatine", "7 days"],
    ["Protein", "About " + proteinGrams(state.weightKg) + " g a day (1.6 g/kg at " + state.weightKg + " kg; adjust in Settings)"],
    ["Sauna (if you joined a gym)", "2–4 sessions"],
    ["Log", "Morning resting HR and main lift weights"],
  ];
  const firstWeeks = [
    ["Day 1: set up", "Set a 7-day alarm per the reset table, order creatine (and 0.5 mg melatonin if you want it), and book a physical with the bloodwork in the Guide."],
    ["Day 1–3: baseline tests", "Resting HR, push-ups, dead hang, waist, BP if you have a cuff, watch VO2max. Write them down."],
    ["Week 1 training", "Mon A, Tue Zone 2 30 min, Wed B, Thu 3 × 3 min intervals, Fri C, Sat Zone 2 40 min outdoors, Sun walk. 2 sets per lift at RPE 6–7."],
    ["Week 2 training", "Same layout. Zone 2 up to 40 min, intervals still 3 × 3 min, strength still 2 sets but slightly heavier."],
    ["Every day", "Morning light, caffeine cutoff, 12-min mobility before bed, 8,000+ steps"],
    ["Weekend", "One drinking night, max 4 drinks, same alarm both days"],
    ["Gym", "Tour 1–2 nearby gyms with a sauna in week 2, and decide by week 3"],
  ];
  return `
    <p class="kicker">The week</p>
    <h2 class="lead">The plan in one look</h2>
    <p class="sublead">About 5–6 hours a week, and no day runs past an hour. Strength days can move around, but keep at least one day between them, and don't put intervals the day before Strength A's deadlifts.</p>
    <div class="card">${tableWrap(["Day", "Session", "Time"], weekRows, current)}</div>
    <h2 class="kicker">Strength days</h2>
    ${gymToggle()}
    ${strengthBlock("A", { heading: true })}
    ${strengthBlock("B", { heading: true })}
    ${strengthBlock("C", { heading: true })}
    ${strengthNotes()}
    <h2 class="kicker">12-week progression</h2>
    <div class="card">${tableWrap(["Weeks", "Strength", "Zone 2", "Intervals"], PROGRESSION)}</div>
    <p class="meta">After week 12, repeat the cycle with new exercise variations. If you miss a week, restart at the last week you finished rather than skipping ahead.</p>
    <h2 class="kicker">First 2 weeks</h2>
    <div class="card"><ol class="steps">${firstWeeks.map(([t, d]) => `<li><div class="step-title">${esc(t)}</div><div class="step-detail">${esc(d)}</div></li>`).join("")}</ol></div>
    <h2 class="kicker">Weekly checklist</h2>
    <div class="card">${tableWrap(["Item", "Weekly target"], weekly)}</div>`;
}

function renderGuide() {
  const protein = proteinGrams(state.weightKg);
  const acc = (title, inner) =>
    `<details class="acc"><summary class="acc-btn">${esc(title)}</summary><div class="acc-body">${inner}</div></details>`;

  const why = [
    ["Cardio fitness (VO2max)", "In 122,007 treadmill tests, the least fit had about 5× the death risk of the most fit, a gap bigger than smoking or diabetes (" + cite("Mandsager 2018") + "). Observational, but very consistent.", "Strong"],
    ["Strength training", "30–60 min a week is linked to 10–20% lower death risk, with no clear extra benefit past that (" + cite("Momma 2022") + "). Grip strength predicts mortality across 17 countries (" + cite("Leong 2015") + ").", "Strong"],
    ["Intervals vs steady cardio", "Intervals raise VO2max more per minute than steady cardio (" + cite("Milanović 2015") + "). The 4×4 protocol raised VO2max about 7% in 8 weeks, more than steady work (" + cite("Helgerud 2007") + ").", "Strong"],
    ["Zone 2 volume", "Builds the aerobic base and adds weekly minutes without wrecking recovery. Claims that Zone 2 is uniquely magic for mitochondria go past the human data.", "Moderate"],
    ["Guidelines", "WHO: 150–300 min moderate or 75–150 min vigorous a week, plus 2+ strength days (" + cite("Bull 2020") + "). This plan sits above the top of that range.", "Strong"],
  ];
  const whyInner = `<div class="stack">${why.map((r) => `
    <div class="stack-item">
      <div class="row-title">${esc(r[0])} ${badge(r[2], r[2].toLowerCase())}</div>
      <div class="row-detail">${r[1]}</div>
    </div>`).join("")}</div>
    <p class="meta" style="margin-top:12px">So the answer to “HIIT or what” is both: one hard session raises your ceiling, two easy sessions build the base and recovery. The current routine this plan was built for is strength-heavy with almost no cardio, and cardio fitness is the single biggest gap for longevity.</p>`;

  const cardioInner = `<div class="props">
      <div><div class="prop-label">Your estimated max HR</div><div class="prop-value">192 bpm (${cite("Tanaka 2001")}: 208 − 0.7 × age). It's an estimate, so trust the talk test over the number.</div></div>
      <div><div class="prop-label">Zone 2 heart rate</div><div class="prop-value">About 125–145 bpm (65–75% of max), as a starting estimate</div></div>
      <div><div class="prop-label">Zone 2 talk test</div><div class="prop-value">You can speak in full sentences but wouldn't want to sing. If you can only get out a few words, slow down.</div></div>
      <div><div class="prop-label">MAF formula note</div><div class="prop-value">180 − age gives 157 bpm. Treat that as a ceiling, not a target; for someone with weak cardio it's often above true Zone 2.</div></div>
      <div><div class="prop-label">Zone 2 options</div><div class="prop-value">Incline treadmill walk (10–12% grade, 3.0–3.5 mph), bike, rower, elliptical, slow StairMaster, hiking, swimming</div></div>
    </div>
    <p class="meta" style="margin-top:12px">Zone 2 sessions start at 30–40 min and build to 45–60 min. Progress Zone 2 by going longer first, then by more watts or speed at the same heart rate. The Thursday 4×4 is on the Week and Today tabs. Progress intervals by more output in the same 4 minutes, not by more rounds.</p>`;

  const alcoholFacts = [
    ["Binge drinking for men means 5+ drinks in about 2 hours", "<a href=\"" + esc(CITE.NIAAA) + "\" target=\"_blank\" rel=\"noopener noreferrer\">NIAAA definition</a>"],
    ["For ages 15–39, alcohol carries health risks with no health benefit; the lowest-risk amount is zero or close to it", cite("GBD 2020") + ", Lancet 2022"],
    ["Even 1–2 drinks a day is linked to smaller brain volume", cite("Topiwala 2022") + ", 36,678 adults"],
    ["Overnight recovery fell about 9%, 24% and 39% after low, moderate and high doses", cite("Pietilä 2018")],
  ];
  const alcoholSteps = [
    ["One drinking night per weekend", "Pick Friday or Saturday, not both. Saturday morning Zone 2 makes Friday the natural night off."],
    ["Cap at 3–4 drinks, decided before you go out", "That keeps you under the binge line. Log every drink in your phone as it happens."],
    ["Eat first, then one water or soda water between every drink", "Slows absorption and the pace"],
    ["No shots, no doubles", "They're how a night of 4 turns into 8"],
    ["Last drink 3 hours before bed", "Protects the second half of the night, and alarm time doesn't change"],
    ["Have a default swap", "Non-alcoholic beer or soda water with lime. A line ready: “I'm training tomorrow morning.”"],
    ["No sauna, no hard training while still drinking or hung over", "Dehydration plus heat is a real risk; do Zone 2 the next day instead of intervals"],
    ["Check in after 4 weeks", "If the cap keeps slipping, try 2 alcohol-free weekends a month and see how sleep and resting HR respond"],
  ];
  const alcoholInner = `<div class="stack">${alcoholFacts.map((r) => `
    <div class="stack-item"><div class="row-title">${esc(r[0])}</div><div class="row-detail">${r[1]}</div></div>`).join("")}</div>
    <ol class="steps" style="margin-top:12px">${alcoholSteps.map(([t, d]) => `<li><div class="step-title">${esc(t)}</div><div class="step-detail">${esc(d)}</div></li>`).join("")}</ol>`;

  const organs = [
    ["Heart and blood vessels", "Cardio fitness, strength training, blood pressure under 120/80 (" + cite("Whelton 2018") + "), low ApoB, knowing your Lp(a), sleep regularity", "Nicotine in any form, untreated high BP, heavy drinking, steroids"],
    ["Lungs", "Cardio training improves how well your body uses the air you breathe. Move cardio indoors on high-ozone or dust days (check AirNow).", "Smoking, vaping and hookah. Vaping still delivers nicotine and airway irritants."],
    ["Liver", "Keep waist size down (fatty liver tracks belly fat), limit alcohol, regular exercise. Coffee is linked to lower liver disease risk (" + cite("Poole 2017") + ").", "Binge drinking, acetaminophen (Tylenol) with alcohol, “detox” products, and high-dose herbal or bodybuilding supplements, a leading cause of supplement liver injury"],
    ["Kidneys", "Blood pressure control, hydration in the heat, normal protein intake (fine for healthy kidneys)", "Regular ibuprofen or naproxen, especially when dehydrated after hard exercise in heat. Use them occasionally, not daily."],
    ["Brain and nerves", "Exercise, 7–9 hours of regular sleep, social connection, a helmet on bikes and scooters, hearing protection at concerts", "Alcohol (dose-linked brain shrinkage, " + cite("Topiwala 2022") + "), head impacts, chronic short sleep"],
  ];
  const organInner = `<div class="stack">${organs.map((r) => `
    <div class="stack-item">
      <div class="row-title">${esc(r[0])}</div>
      <div class="row-detail"><strong>What actually helps.</strong> ${r[1]}</div>
      <div class="row-detail"><strong>What to avoid.</strong> ${r[2]}</div>
    </div>`).join("")}</div>
    <p class="meta" style="margin-top:12px">At 23, the biggest real risks to your life are injuries, not disease: car crashes, alcohol and drugs. Seatbelt, no phone while driving, never drive after drinking, and never take pills you didn't get from a pharmacy. These matter more right now than any supplement.</p>`;

  const supps = [
    ["Creatine monohydrate", "3–5 g daily, any time", "Take it", "take", "The best-studied supplement for strength and muscle (" + cite("Kreider 2017") + "). Possible small memory benefits (" + cite("Avgerinos 2018") + "). It raises blood creatinine, so tell your doctor before labs."],
    ["Protein (food first)", "1.6 g/kg a day; at " + state.weightKg + " kg that's about " + protein + " g", "Take it", "take", "Muscle gains plateau around 1.6 g/kg (" + cite("Morton 2018") + "). Whey is just convenient food. Change weight in Settings to update the gram target."],
    ["Vitamin D", "Only 600–1,000 IU, and only if you get little sun", "Situational", "situational", "Big trial: no heart or cancer benefit in healthy adults (" + cite("VITAL vitamin D") + "). The 2024 Endocrine Society guideline says healthy adults under 75 don't need testing or more than the daily allowance (" + cite("Demay 2024") + "). Phoenix sun covers most people."],
    ["Omega-3 (fish oil)", "Eat fatty fish twice a week; otherwise 1 g EPA + DHA", "Situational", "situational", "VITAL found no overall heart benefit in healthy adults (" + cite("VITAL omega-3") + "). Food first."],
    ["Melatonin", "0.5 mg, early evening, 14 days", "Situational", "situational", "Only for the sleep reset, timed as on the Sleep reset tab"],
    ["Magnesium glycinate", "200–350 mg", "Optional", "optional", "Weak sleep evidence; safe"],
    ["Multivitamin", "None", "Skip", "skip", "US Preventive Services Task Force: not enough evidence of benefit (" + cite("USPSTF 2022") + "). Your diet is fine."],
    ["NAD+, NMN", "None", "Skip (hype)", "hype", "No human data showing better health or longer life"],
    ["Liver detox, milk thistle", "None", "Skip (hype)", "hype", "Your liver detoxes itself; less alcohol is the real detox"],
    ["High-dose vitamin C and E", "None", "Skip", "skip", "Can blunt the benefits of exercise (" + cite("Ristow 2009") + ")"],
    ["Test boosters, BCAAs, greens powders", "None", "Skip", "skip", "No meaningful benefit if you eat enough protein and vegetables"],
  ];
  const suppInner = `<div class="stack">${supps.map((r) => `
    <div class="stack-item">
      <div class="row-title">${esc(r[0])} ${badge(r[2], r[3])}</div>
      <div class="row-detail">${esc(r[1])}</div>
      <div class="row-detail">${r[4]}</div>
    </div>`).join("")}</div>
    <p class="meta" style="margin-top:12px">Buy only third-party tested products (NSF Certified for Sport or USP Verified). Supplements aren't checked by the FDA before sale.</p>`;

  const labs = [
    ["Blood pressure (office + home cuff)", "Target under 120/80", "Yearly, or monthly at home"],
    ["Lipid panel + ApoB", "ApoB counts the particles that cause plaque; better than LDL alone", "Every 1–3 years"],
    ["Lp(a)", "Mostly genetic heart risk; European consensus says measure once in life (" + cite("Kronenberg 2022") + ")", "Once"],
    ["HbA1c (or fasting glucose)", "Blood sugar over 3 months", "Every 1–3 years"],
    ["CMP", "Liver enzymes (ALT, AST) and kidney function (creatinine, eGFR)", "Every 1–3 years"],
    ["CBC", "Blood counts, anemia", "Every 1–3 years"],
    ["Vitamin D", "Optional; the 2024 guideline advises against routine testing, so only if your doctor sees a reason", "Only if indicated"],
  ];
  const labInner = `<div class="stack">${labs.map((r) => `
    <div class="stack-item">
      <div class="row-title">${esc(r[0])}</div>
      <div class="row-detail">${r[1]}</div>
      <div class="row-detail">${esc(r[2])}</div>
    </div>`).join("")}</div>
    <p class="meta" style="margin-top:12px">Most of these are covered at a free yearly preventive visit under most insurance; ApoB and Lp(a) may need to be asked for by name. Tell the doctor you take creatine and train hard, since both can nudge creatinine and liver enzymes. Get checked before starting if you've ever had chest pain or fainting during exercise, or a family member died suddenly of a heart problem young.</p>`;

  const benches = [
    ["VO2max", "Watch estimate, or a Concept2 2,000 m row and its calculator", "46.5 (50th percentile, FRIEND)", "55+, aim for 59 (90th percentile)"],
    ["Resting heart rate", "Morning, before getting up, 3-day average", "60–75 bpm", "Under 60 bpm"],
    ["Grip strength", "Hand dynamometer, best of 3 per hand", "Peak median 51 kg (" + cite("Dodds 2014") + ")", "55+ kg"],
    ["Push-ups", "Max in one set, chest to fist height", "Varies widely", "40+ (" + cite("Yang 2019") + ")"],
    ["Dead hang", "Max time, overhand grip", "No good published norms", "90+ s (coaching benchmark)"],
    ["Sit-to-rise", "Sit on the floor and stand with no hands, score out of 10 (" + cite("de Brito 2012") + ")", "Studied in older adults", "10/10"],
    ["Waist", "Tape at belly button, relaxed", "Varies", "Under half your height"],
    ["Blood pressure", "Home cuff, seated 5 min, 2 readings", "Varies", "Under 120/80"],
  ];
  const benchInner = `<div class="stack">${benches.map((r) => `
    <div class="stack-item">
      <div class="row-title">${esc(r[0])}</div>
      <div class="row-detail"><strong>How.</strong> ${r[1]}</div>
      <div class="row-detail"><strong>Typical man, 20s.</strong> ${r[2]}</div>
      <div class="row-detail"><strong>Your target.</strong> ${r[3]}</div>
    </div>`).join("")}</div>
    <p class="meta" style="margin-top:12px">Test in week 1 and week 12. Each 10 bpm rise in resting heart rate is linked to 9% higher death risk (${cite("Zhang 2016")}), so it's a cheap, useful trend line. Most watch VO2max estimates are off by a few points, so watch the trend more than the number. The FRIEND reference is ${cite("Kaminsky 2015")}. The push-up result comes from middle-aged firefighters, where 40+ push-ups went with far fewer heart events; it's a useful target, not a diagnosis.</p>`;

  const gymInner = `<p>Join a real gym if one is within about 10 minutes and you'll use it 4+ times a week. The rower, bikes and heavier weights make the intervals and strength progression much easier, and the sauna is a nice extra. The apartment version works for months, but you'll outgrow light dumbbells.</p>
    <div class="props" style="margin-top:12px">
      <div><div class="prop-label">Sauna protocol</div><div class="prop-value">2–4 times a week, 15–20 min at 176–194°F (80–90°C), after training</div></div>
      <div><div class="prop-label">Hydration</div><div class="prop-value">Drink 16–24 oz of water with electrolytes after; get out right away if dizzy</div></div>
      <div><div class="prop-label">Never</div><div class="prop-value">After drinking, while hung over, or right after a long outdoor session in summer heat</div></div>
      <div><div class="prop-label">Fertility note</div><div class="prop-value">Twice-weekly sauna lowered sperm count in a small study; it fully recovered within 6 months of stopping (${cite("Garolla 2013")}). Pause it if you're trying for kids.</div></div>
      <div><div class="prop-label">Evidence grade</div><div class="prop-value">Moderate to weak. Finnish men who used a sauna 4–7 times a week had 40% lower death risk than once-a-week users (${cite("Laukkanen 2015")}), but that's middle-aged Finns in an observational study, and healthier people may simply sauna more.</div></div>
    </div>`;

  const heat = [
    ["October to April", "Prime outdoor season. Do Saturday Zone 2 outside: hikes, rides, long walks."],
    ["May to September", "Outdoors only before about 7 AM, or move cardio indoors. Skip intervals outside."],
    ["Hydration", "Drink 16 oz about 2 hours before. For sessions over an hour, add electrolytes. Weigh yourself before and after, and drink about 20–24 oz for every pound lost (" + cite("Sawka 2007") + ")."],
    ["Heat illness signs", "Headache, nausea, dizziness, goosebumps in heat, or stopping sweating: stop, get into shade or AC, cool down. Confusion means call 911."],
    ["Higher-risk days", "After drinking, after poor sleep, or when ill. Go indoors on those days."],
  ];
  const heatInner = `<div class="stack">${heat.map((r) => `
    <div class="stack-item"><div class="row-title">${esc(r[0])}</div><div class="row-detail">${r[1]}</div></div>`).join("")}</div>`;

  const habits = [
    ["Steps", "8,000–10,000 a day", "Death risk kept falling up to that range in adults under 60 (" + cite("Paluch 2022") + ")"],
    ["Break up sitting", "Stand or walk 2–3 min every 30–60 min", "60–75 min of daily moderate activity offset the risk of long sitting (" + cite("Ekelund 2016") + ")"],
    ["Sunscreen", "SPF 30+ on face, neck and arms daily; hat outdoors", "Daily sunscreen cut melanoma about in half in a randomized trial (" + cite("Green 2011") + "). Arizona UV is intense year-round."],
    ["Floss or water flosser", "Daily, plus 2 dental cleanings a year", "Small reduction in gum disease, low-certainty evidence (" + cite("Worthington 2019") + ")"],
    ["Social connection", "Regular plans with friends; train with someone", "Strong social ties were linked to 50% higher odds of survival (" + cite("Holt-Lunstad 2010") + ")"],
    ["Stress", "The 2 min of slow breathing in mobility, and Zone 2 outdoors", "Low cost, and it supports sleep"],
    ["Yearly physical", "Book one now, then every year", "Catches high BP and cholesterol early"],
  ];
  const habitInner = `<div class="stack">${habits.map((r) => `
    <div class="stack-item">
      <div class="row-title">${esc(r[0])}</div>
      <div class="row-detail"><strong>Target.</strong> ${esc(r[1])}</div>
      <div class="row-detail">${r[2]}</div>
    </div>`).join("")}</div>`;

  const sourceInner = `<ol class="source-list">${SOURCES.map((s) => `
    <li><a href="${esc(s.href)}" target="_blank" rel="noopener noreferrer">${esc(s.title)}</a><span class="site">${esc(s.site)}</span></li>`).join("")}</ol>`;

  return `
    <p class="kicker">Guide</p>
    <h2 class="lead">What the research supports</h2>
    <p class="sublead">Each call is graded Strong, Moderate, Weak or Hype. Lift 3 days a week, do 2 easy cardio sessions and 1 hard interval session, all without running. Add 12 minutes of mobility a day, 8,000–10,000 steps, a fixed 7:00 AM wake-up, and at most one drinking night per weekend. Take creatine, eat your protein, and get one baseline physical with bloodwork.</p>
    ${acc("Why this mix", whyInner)}
    ${acc("Cardio zones", cardioInner)}
    ${acc("Alcohol: weekend cut-back plan", alcoholInner)}
    ${acc("Organ by organ", organInner)}
    ${acc("Supplements", suppInner)}
    ${acc("Baseline physical and bloodwork", labInner)}
    ${acc("Benchmarks to track", benchInner)}
    ${acc("Gym and sauna", gymInner)}
    ${acc("Phoenix heat safety", heatInner)}
    ${acc("Other high-leverage habits", habitInner)}
    ${acc("Sources", sourceInner)}
    <p class="fine">This is general guidance, not medical advice. Check with a doctor before starting if you have a heart, lung or kidney condition, or any symptoms during exercise.</p>`;
}

function render() {
  const root = document.getElementById("app");
  const dateEl = document.getElementById("header-date");
  if (dateEl) dateEl.textContent = formatLongDate(new Date());
  const tab = state.tab;
  if (tab === "sleep") root.innerHTML = renderSleep();
  else if (tab === "week") root.innerHTML = renderWeek();
  else if (tab === "guide") root.innerHTML = renderGuide();
  else root.innerHTML = renderToday();
  document.querySelectorAll(".tabbar .tab").forEach((btn) => {
    btn.setAttribute("aria-current", btn.getAttribute("data-tab") === tab ? "page" : "false");
  });
}

function setTab(tab) {
  if (!TABS.includes(tab)) tab = "today";
  state.tab = tab;
  if (location.hash !== "#" + tab) {
    history.replaceState(null, "", "#" + tab);
  }
  render();
  window.scrollTo(0, 0);
}

function openSettings() {
  const overlay = document.getElementById("settings-overlay");
  const weight = document.getElementById("weight-input");
  const start = document.getElementById("start-input");
  weight.value = String(state.weightKg);
  start.value = state.sleepStart;
  updateProteinHint();
  overlay.hidden = false;
  weight.focus();
}

function closeSettings() {
  document.getElementById("settings-overlay").hidden = true;
}

function updateProteinHint() {
  const value = Number(document.getElementById("weight-input").value);
  const hint = document.getElementById("protein-hint");
  if (!Number.isFinite(value) || value <= 0) {
    hint.textContent = "Enter weight in kilograms to see the protein target.";
    return;
  }
  hint.textContent = lbFromKg(value) + " lb · protein target about " + proteinGrams(value) + " g a day (1.6 g/kg). The plan used 80 kg (about 175 lb) as a starting assumption.";
}

function saveSettings(event) {
  event.preventDefault();
  const weight = Number(document.getElementById("weight-input").value);
  const start = document.getElementById("start-input").value;
  if (Number.isFinite(weight) && weight >= 40 && weight <= 250) {
    state.weightKg = Math.round(weight * 10) / 10;
    persistWeight();
  }
  if (/^\d{4}-\d{2}-\d{2}$/.test(start)) {
    state.sleepStart = start;
    persistStart();
  }
  closeSettings();
  render();
}

function onAppClick(event) {
  const gymBtn = event.target.closest("[data-gym]");
  if (gymBtn) {
    state.gym = gymBtn.getAttribute("data-gym") === "apt" ? "apt" : "real";
    persistGym();
    render();
    return;
  }
  const check = event.target.closest("input[data-check]");
  if (check) {
    const id = check.getAttribute("data-check");
    const checks = todayChecks();
    checks[id] = check.checked;
    persistChecks();
    const card = check.closest(".check-list");
    const progress = document.querySelector(".progress");
    if (progress && card) {
      const boxes = card.querySelectorAll("input[data-check]");
      const done = Array.from(boxes).filter((el) => el.checked).length;
      progress.textContent = done + " of " + boxes.length + " done today";
    }
  }
}

function init() {
  const hash = (location.hash || "").replace("#", "");
  state.tab = TABS.includes(hash) ? hash : "today";
  render();

  document.querySelector(".tabbar").addEventListener("click", (event) => {
    const btn = event.target.closest("[data-tab]");
    if (btn) setTab(btn.getAttribute("data-tab"));
  });
  document.getElementById("app").addEventListener("click", onAppClick);
  document.getElementById("app").addEventListener("change", onAppClick);
  document.getElementById("settings-btn").addEventListener("click", openSettings);
  document.getElementById("settings-form").addEventListener("submit", saveSettings);
  document.getElementById("weight-input").addEventListener("input", updateProteinHint);
  document.getElementById("settings-overlay").addEventListener("click", (event) => {
    if (event.target.id === "settings-overlay") closeSettings();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeSettings();
  });
  window.addEventListener("hashchange", () => {
    const next = (location.hash || "").replace("#", "");
    if (TABS.includes(next) && next !== state.tab) setTab(next);
  });

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
