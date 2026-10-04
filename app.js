/* =====================================================================
   CLEVER CLICKER - APP LOGIC
   (the scenario content lives in js/scenarios/, loaded before this file)

   SECTIONS (search for the number)
     3. APP STATE & SMALL HELPERS
     4. ROUTER (which page shows for which web address)
     5. CLICK & KEYBOARD HANDLING
     6. PAGES (Test, Practice, Learn)
     7. START THE APP
   ===================================================================== */

/* =====================================================================
   3. APP STATE & SMALL HELPERS
   ===================================================================== */

const $ = (selector) => document.querySelector(selector);
const app = $("#app");                         // the <main> area every page is drawn into
const findScenario = (id) => SCENARIOS.find((s) => s.id == id);

let currentScenario = SCENARIOS[0];            // scenario shown on the Test page
let game = null;                               // the round in progress: { s, mode, inspect, found, done }

// Pick a random scenario that is different from the one just shown
function pickRandomScenario() {
  let next;
  do {
    next = SCENARIOS[Math.floor(Math.random() * SCENARIOS.length)];
  } while (next == currentScenario && SCENARIOS.length > 1);
  return next;
}

// The "How to stay safe" checklist (used on the Test result and Learn pages)
function tipsBlock(s) {
  return `<h2>${s.ic} How to stay safe</h2>` +
    s.tips.map((t) => `<div class="tip"><b>✔</b><span>${t}</span></div>`).join("");
}

// The grid of scenario cards (used by the Practice and Learn pickers)
// section = "play" or "learn"
function scenarioCards(section) {
  return `<div class="grid">${SCENARIOS.map((s) => `
    <a class="sc" style="--c:${s.c}" href="#/${section}/${s.id}">
      <span class="ic">${s.ic}</span><b>${s.name}</b><small>${s.tag}</small>
    </a>`).join("")}</div>`;
}

// Lets keyboard users tab to and "press" the clickable parts of a mock-up
function makeKeyboardFriendly() {
  app.querySelectorAll("[data-a],[data-f]").forEach((el) => {
    el.tabIndex = 0;
    el.setAttribute("role", "button");
  });
}


/* =====================================================================
   4. ROUTER  (which page to show, based on the address after the #)
      #/            -> Test page
      #/play        -> Practice picker      #/play/email  -> Practice that scenario
      #/learn       -> Learn picker         #/learn/email -> Guide for that scenario
   ===================================================================== */

function route() {
  const [page, id] = location.hash.slice(2).split("/");
  game = null;
  window.scrollTo(0, 0);

  // Highlight the current link in the top menu
  document.querySelectorAll("nav a").forEach((a) => {
    a.classList.toggle("on", a.id == "n-" + page);
  });

  if (page == "play") showPractice(id);
  else if (page == "learn") showLearn(id);
  else showTest();                              // "" or anything unknown
}
addEventListener("hashchange", route);


/* =====================================================================
   5. CLICK & KEYBOARD HANDLING
      Every clickable part of a mock-up has:
        data-a = an ACTION the person could take (looked up in scenario.acts)
        data-f = a CLUE (looked up in scenario.flags)
   ===================================================================== */

// Pressing Enter or Space on a focused mock-up part counts as a click
app.addEventListener("keydown", (e) => {
  if ((e.key == "Enter" || e.key == " ") && e.target.matches("[data-a],[data-f]")) {
    e.preventDefault();
    e.target.click();
  }
});

app.addEventListener("click", (e) => {
  const target = e.target.closest("[data-a],[data-f]");
  if (!target || !game || game.done) return;

  // Practice mode with "Inspect clues" ON: show what is suspicious
  if (game.inspect) {
    const clueKey = target.dataset.f;
    if (!clueKey) return;
    target.classList.add("hit");
    game.found.add(clueKey);
    $("#why").innerHTML = "🔎 <b>Clue:</b> " + game.s.flags[clueKey];
    $("#cnt").textContent =
      `Clues found: ${game.found.size} of ${Object.keys(game.s.flags).length}`;
    return;
  }

  // Otherwise the person is taking an action
  if (target.dataset.a) handleAction(target.dataset.a);
});

// Shows the result of an action: good/bad message, tips, and next-step buttons
function handleAction(actionKey) {
  const s = game.s;
  const [isSafe, feedback] = s.acts[actionKey];
  const results = $("#res");
  game.done = true;

  // Buttons shown under the result
  let nextButtons;
  if (game.mode == "test") {
    nextButtons = `
      <a class="btn p" href="#/learn/${s.id}">Read the full guide</a>
      <button class="btn" id="again">Try another test</button>
      <a class="btn" href="#/play">Open Practice</a>`;
  } else if (isSafe) {
    nextButtons = `
      <a class="btn p" href="#/learn/${s.id}">Read the full guide</a>
      <a class="btn" href="#/play">Pick another</a>`;
  } else {
    nextButtons = `<button class="btn p" id="retry">Try again</button>`;
  }

  if (game.mode == "test" && !isSafe) {
    // FAILED the homepage test -> "Scroll for more information" + tips
    results.innerHTML = `
      <div class="fb bad"><b>⚠️ This would have been a scam.</b><br>${feedback}</div>
      <button class="scroll" id="sc">Scroll for more information<br>▼</button>
      <div id="more">
        ${tipsBlock(s)}
        <h2>What the scammers hope you'll do</h2>
        <p>${s.how}</p>
        <p class="real"><b>Remember:</b> ${s.real}</p>
        <p style="margin-top:24px">${nextButtons}</p>
      </div>`;
    $("#sc").onclick = () => $("#more").scrollIntoView();
  } else {
    // Passed the test, or any Practice-mode result
    const heading = isSafe
      ? "✅ " + (game.mode == "test" ? "Well done!" : "Correct!")
      : "⚠️ Not safe.";
    results.innerHTML = `
      <div class="fb ${isSafe ? "good" : "bad"}"><b>${heading}</b><br>${feedback}</div>
      <p>${nextButtons}</p>`;
  }

  // Wire up the buttons that were just created
  if ($("#again")) $("#again").onclick = () => { currentScenario = pickRandomScenario(); showTest(); };
  if ($("#retry")) $("#retry").onclick = () => showPractice(s.id);

  results.scrollIntoView({ block: "nearest" });
  $("#res .btn,#sc")?.focus({ preventScroll: true });
}


/* =====================================================================
   6. PAGES
   ===================================================================== */

// ---- TEST PAGE (home): one random scenario, one decision ----
function showTest() {
  const s = currentScenario;
  game = { s, mode: "test", found: new Set() };
  app.innerHTML = `
    <h1>Think you'd spot it?</h1>
    <p class="mute">A message just arrived. Tap what you would <i>really</i> do. Nothing here is real, so nothing can go wrong.</p>
    ${s.html}
    <div id="res"></div>`;
  makeKeyboardFriendly();
}

// ---- PRACTICE PAGE: pick a scenario, hunt for clues, then act ----
function showPractice(id) {
  const s = id && findScenario(id);

  // No scenario chosen yet -> show the picker
  if (!s) {
    app.innerHTML = `
      <h1>Practice</h1>
      <p class="mute">Pick a situation. Switch on <b>Inspect clues</b> to find the warning signs, then switch it off and take action.</p>
      ${scenarioCards("play")}`;
    return;
  }

  game = { s, mode: "play", inspect: false, found: new Set() };
  app.innerHTML = `
    <span class="chip" style="--c:${s.c}">${s.ic} ${s.name}</span>
    <h1>Practice mode</h1>
    <p class="mute">Use the switch to hunt for warning signs. Turn it off to act.</p>
    <button class="btn" id="insp" aria-pressed="false">🔍 Inspect clues: OFF</button>
    <span id="cnt" class="mute" style="font-size:.8rem">Clues found: 0 of ${Object.keys(s.flags).length}</span>
    <div class="why" id="why" aria-live="polite">Tap <b>Inspect clues</b>, then tap anything that looks suspicious.</div>
    <div id="stage">${s.html}</div>
    <div id="res"></div>`;
  makeKeyboardFriendly();

  // The "Inspect clues" ON/OFF switch
  $("#insp").onclick = (e) => {
    game.inspect = !game.inspect;
    e.target.textContent = "🔍 Inspect clues: " + (game.inspect ? "ON" : "OFF");
    e.target.setAttribute("aria-pressed", game.inspect);
    $("#stage").classList.toggle("insp", game.inspect);
    $("#why").innerHTML = game.inspect
      ? "Dashed items hide clues. Tap them."
      : "Now act as you would in real life.";
  };
}

// ---- LEARN PAGES: index of guides, and one deep-dive guide per scenario ----
function showLearn(id) {
  const s = id && findScenario(id);

  // No scenario chosen yet -> show the list of guides
  if (!s) {
    app.innerHTML = `
      <h1>Learn</h1>
      <p class="mute">Deep dives on how each scam works, the traps to watch for, and what to do if you slip.</p>
      ${scenarioCards("learn")}`;
    return;
  }

  app.innerHTML = `
    <span class="chip" style="--c:${s.c}">${s.ic} Guide</span>
    <h1>${s.name}</h1>

    <h2>How it works</h2>
    <p>${s.how}</p>

    <h2>Common traps</h2>
    <div class="grid">
      ${s.traps.map((t) => `<div class="tip" style="display:block"><h3>${t[0]}</h3>${t[1]}</div>`).join("")}
    </div>

    <h2>What the real thing looks like</h2>
    <p class="real">${s.real}</p>

    ${tipsBlock(s)}

    <h2>Already clicked or paid?</h2>
    <p class="mute">Don't be embarrassed. It happens to smart people every day. Act quickly:</p>
    <ol class="steps">${s.after.map((a) => `<li>${a}</li>`).join("")}</ol>

    <p style="margin-top:24px">
      <a class="btn p" href="#/play/${s.id}">Practice this scam</a>
      <a class="btn" href="#/learn">All guides</a>
    </p>
    <p class="fine">Report scams: ReportFraud.ftc.gov · FBI IC3: ic3.gov · AARP Fraud Watch Helpline: 877-908-3360. Check these sites for the latest figures and advice.</p>`;
}


/* =====================================================================
   7. START THE APP
   ===================================================================== */
currentScenario = pickRandomScenario();
route();
