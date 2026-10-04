/* =====================================================================
   SCENARIO: Fake virus warning
   - data-a="x" in the html = an action  -> needs an "x" entry in acts
   - data-f="x" in the html = a clue     -> needs an "x" entry in flags
   ===================================================================== */
SCENARIOS.push({
  id: "popup",          // short name used in the web address (#/learn/popup)
  ic: "🖥️",             // emoji icon
  c: "var(--ink)",          // accent color for this scenario's cards and shadows
  name: "Fake virus warning",
  tag: "A loud pop-up says your computer is infected",   // one-line description on the cards

  // ---- THE MOCK-UP (what the person sees and taps) ----
  // data-a="x"  = something they can DO   (needs a matching entry in acts below)
  // data-f="x"  = a CLUE to find          (needs a matching entry in flags below)
  html: `
      <div class="dev" style="--c:var(--ink)">
        <div class="bar"><span data-f="url">🔓 microsoft-support-alert.xyz</span></div>
        <div class="pop"><span class="x" data-a="fx">✕</span>
          <h3>⚠️ VIRUS DETECTED</h3>
          <p data-f="lock">Your computer is LOCKED. Do not close this window or all files will be deleted!</p>
          <p data-f="timer">Time left: <b>04:59</b></p>
          <div class="tools">
            <button data-a="call" data-f="num">📞 Call 1-800-555-0199</button>
            <button data-a="scan">Scan now</button>
          </div>
        </div>
        <div class="tools" style="padding-top:14px">
          <button data-a="close">Close this tab (Ctrl+W)</button>
          <button data-a="ask">Ask family for help</button>
        </div>
      </div>
  `,

  // ---- CLUES shown when "Inspect clues" is ON in Practice mode ----
  flags: {
    url: "The web address has nothing to do with Microsoft. It ends in .xyz.",
    lock: "Websites cannot lock your computer. It is only a web page trying to scare you.",
    timer: "A countdown is pressure, nothing more.",
    num: "Real warnings from Windows or Apple never include a phone number.",
  },

  // ---- ACTIONS: [0 = unsafe or 1 = safe, feedback message] ----
  acts: {
    fx: [0, "The ✕ is part of the trick. Clicking it can open more pop-ups. Close the whole tab or browser instead."],
    call: [0, "You'd reach scammers who ask to 'fix' it by taking control of your computer, then charge you."],
    scan: [0, "The button can download real harmful software."],
    close: [1, "Correct! It is only a web page. If it won't close, restart the browser or turn the computer off and on."],
    ask: [1, "Smart. Asking someone you trust is always a good move. Neither of you should call that number."],
  },

  // ---- GUIDE PAGE (Learn) CONTENT ----
  how: "A pop-up copies the look of a security alert, sometimes with a loud sound and a countdown. Calling the number leads to a 'technician' who asks to take over your computer, shows fake 'proof' of viruses, and charges for a pointless repair, or empties your accounts.",

  traps: [   // [title, description]
    ["Remote access", "'Please install this so I can help.' It gives them full control of your files and bank logins."],
    ["Fake refunds", "'Overpaid' you by mistake and asks you to send money back."],
    ["Cold calls", "Real tech companies never phone you about viruses."],
    ["Fake close buttons", "The ✕ or 'Cancel' can do the opposite of what it says."],
  ],

  real: "Genuine security software warnings appear from the program you installed, never in a web page, and never ask you to phone a stranger.",

  tips: [
    "Never call numbers shown in pop-ups.",
    "Close the browser or switch the computer off to escape.",
    "Never let a caller control your computer.",
    "Only trust software you installed yourself.",
    "Keep a trusted tech helper's number near your computer.",
  ],

  after: [   // "Already clicked or paid?" steps
    "Turn off wifi right away.",
    "Change passwords from a different, safe device.",
    "Call your bank if you shared payment details and ask a trusted repair shop to check the machine.",
  ],
});
