/* =====================================================================
   SCENARIO: Grandchild in trouble
   - data-a="x" in the html = an action  -> needs an "x" entry in acts
   - data-f="x" in the html = a clue     -> needs an "x" entry in flags
   ===================================================================== */
SCENARIOS.push({
  id: "call",          // short name used in the web address (#/learn/call)
  ic: "📞",             // emoji icon
  c: "var(--mute)",          // accent color for this scenario's cards and shadows
  name: "Grandchild in trouble",
  tag: "A caller who sounds like family begs for money",   // one-line description on the cards

  // ---- THE MOCK-UP (what the person sees and taps) ----
  // data-a="x"  = something they can DO   (needs a matching entry in acts below)
  // data-f="x"  = a CLUE to find          (needs a matching entry in flags below)
  html: `
      <div class="dev" style="--c:var(--mute)">
        <div class="call">
          <p class="mute" style="color:var(--bg)">Incoming call · <span data-f="num">Unknown number</span></p>
          <p data-f="voice">"Grandma, it's me! I had a car accident and I'm in jail. Please <span data-f="sec">don't tell Mom and Dad</span>."</p>
          <p data-f="pay">"I need $3,000 today. A man will come to collect it, or you can buy gift cards."</p>
          <div class="tools">
            <button data-a="send">💸 Send the money</button>
            <button data-a="stay">Stay on the line to hear more</button>
            <button data-a="word">Ask for our family safe word</button>
            <button data-a="hang">Hang up, call my grandchild's real number</button>
          </div>
        </div>
      </div>
  `,

  // ---- CLUES shown when "Inspect clues" is ON in Practice mode ----
  flags: {
    num: "An unknown number. Scammers often say 'my phone broke' or 'I'm using a friend's'.",
    voice: "Voices can be copied by computers from short online clips. A familiar voice is not proof.",
    sec: "Secrecy stops you from checking. It is the biggest red flag.",
    pay: "Cash couriers, gift cards, wire transfers and crypto can't be traced or refunded.",
  },

  // ---- ACTIONS: [0 = unsafe or 1 = safe, feedback message] ----
  acts: {
    send: [0, "Money sent this way is almost never recovered. Real emergencies can wait two minutes for a call-back."],
    stay: [0, "Scammers keep you talking so you cannot think or call anyone. Hang up and check."],
    word: [1, "Good thinking! If they can't answer, hang up and call the person on the number you already have."],
    hang: [1, "Exactly right. Hanging up feels rude, but it is the safest move. Then call your grandchild or a parent."],
  },

  // ---- GUIDE PAGE (Learn) CONTENT ----
  how: "Scammers search social media for family names, then call pretending to be a grandchild in an emergency. A second voice may pose as a lawyer or police officer. They push urgency and secrecy so you act before talking to anyone.",

  traps: [   // [title, description]
    ["Cloned voices", "Short clips from social media can be turned into a convincing copy."],
    ["Secrecy", "'Please don't tell Mom.' This keeps family from stopping the scam."],
    ["Odd payments", "Gift cards, couriers, wire transfers or crypto."],
    ["Fake officials", "A 'lawyer' or 'bail officer' takes over to add pressure."],
  ],

  real: "Real lawyers, courts and police never demand gift cards or cash couriers, and a real grandchild will understand you calling back.",

  tips: [
    "Agree on a family safe word and keep it private.",
    "Hang up and call back on a number you already trust.",
    "Never send gift cards or cash to a caller.",
    "Talk to another family member before paying anything.",
    "Tighten social media privacy to limit what scammers can learn.",
  ],

  after: [   // "Already clicked or paid?" steps
    "Call your bank immediately and ask about stopping the transfer.",
    "Report it to the FTC and your local police.",
    "Tell your family so they can warn others. Shame is the scammer's friend.",
  ],
});
