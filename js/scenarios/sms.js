/* =====================================================================
   SCENARIO: Text message scam
   - data-a="x" in the html = an action  -> needs an "x" entry in acts
   - data-f="x" in the html = a clue     -> needs an "x" entry in flags
   ===================================================================== */
SCENARIOS.push({
  id: "sms",          // short name used in the web address (#/learn/sms)
  ic: "💬",             // emoji icon
  c: "var(--mute)",          // accent color for this scenario's cards and shadows
  name: "Text message scam",
  tag: "A text says your parcel or account has a problem",   // one-line description on the cards

  // ---- THE MOCK-UP (what the person sees and taps) ----
  // data-a="x"  = something they can DO   (needs a matching entry in acts below)
  // data-f="x"  = a CLUE to find          (needs a matching entry in flags below)
  html: `
      <div class="dev" style="--c:var(--mute)">
        <div class="bar">💬 Messages · <span data-f="num">+1 (347) 555-0188</span><b>now</b></div>
        <div class="body">
          <div class="sms"><span data-f="urg">USPS: Your package is on hold.</span> <span data-f="exp">Pay a $1.99 redelivery fee today</span> or it will be returned: <u data-a="link" data-f="url">usps-redelivery-pay.top/id7</u></div>
        </div>
        <div class="tools">
          <button data-a="stop">Reply STOP</button>
          <button data-a="call">📞 Call this number</button>
          <button data-a="blk">🚫 Report junk &amp; block</button>
          <button data-a="off">🔎 Check usps.com myself</button>
        </div>
      </div>
  `,

  // ---- CLUES shown when "Inspect clues" is ON in Practice mode ----
  flags: {
    num: "A random personal-looking number. Delivery companies use short codes or official lines.",
    urg: "Pretending to be a well-known brand, with a deadline, is the standard recipe.",
    exp: "A tiny fee is a hook: the real goal is to steal your card details.",
    url: "The address ends in .top, not usps.com. Official services use their own website.",
  },

  // ---- ACTIONS: [0 = unsafe or 1 = safe, feedback message] ----
  acts: {
    link: [0, "The page would ask for your card number and 'fee', then use your details for real purchases."],
    stop: [0, "Replying, even STOP, confirms your number works. Don't reply to unknown senders."],
    call: [0, "Calling a number from a suspicious text can connect you to the scammers."],
    blk: [1, "Great! Reporting (forward to 7726) and blocking helps stop them."],
    off: [1, "Perfect. If there is really a parcel, the official site will show it, no link needed."],
  },

  // ---- GUIDE PAGE (Learn) CONTENT ----
  how: "Criminals text millions of random numbers about deliveries, tolls, banks or prizes. The message looks small and routine, so people tap before thinking. The page behind the link collects your card, bank login or personal details.",

  traps: [   // [title, description]
    ["Small fees", "$1.99 sounds harmless but gives them your full card details."],
    ["Wrong-number openers", "'Hi, is this Anna?' starts a chat that slowly leads to romance or investment scams."],
    ["Bank alerts", "A text claiming 'suspicious login' with a link. Banks don't send log-in links."],
    ["Prizes and refunds", "Winning something you never entered, or an unexpected refund."],
  ],

  real: "Genuine companies don't text you links to pay small fees. If you are expecting a parcel, track it in the official app or website.",

  tips: [
    "Don't tap links from unknown numbers, even if the logo looks real.",
    "Don't reply, not even 'STOP'.",
    "Forward scam texts to 7726 (SPAM), then block and delete.",
    "Track parcels and bank issues by opening the official app yourself.",
    "Never give codes sent to your phone to anyone who asks.",
  ],

  after: [   // "Already clicked or paid?" steps
    "Call your card company and ask to freeze or replace the card.",
    "Change passwords for any account you typed in.",
    "Watch statements for the next few weeks.",
  ],
});
