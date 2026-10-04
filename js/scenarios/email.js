/* =====================================================================
   SCENARIO: Phishing email
   - data-a="x" in the html = an action  -> needs an "x" entry in acts
   - data-f="x" in the html = a clue     -> needs an "x" entry in flags
   ===================================================================== */
SCENARIOS.push({
  id: "email",          // short name used in the web address (#/learn/email)
  ic: "📧",             // emoji icon
  c: "var(--ink)",          // accent color for this scenario's cards and shadows
  name: "Phishing email",
  tag: "A 'company' email demands you act fast",   // one-line description on the cards

  // ---- THE MOCK-UP (what the person sees and taps) ----
  // data-a="x"  = something they can DO   (needs a matching entry in acts below)
  // data-f="x"  = a CLUE to find          (needs a matching entry in flags below)
  html: `
      <div class="dev" style="--c:var(--ink)">
        <div class="bar">📥 Inbox <b>1 new</b></div>
        <div class="body">
          <h3>Action required: your account is limited</h3>
          <p class="mute" style="font-size:.8rem"><span data-f="sender"><b>PayPal Service</b> &lt;support@paypa1-secure.com&gt;</span></p>
          <p data-f="greet">Dear customer,</p>
          <p data-f="urg">We noticed unusual activity. Your account will be <b>closed within 24 hours</b> unless you confirm your details.</p><span class="lnk" data-a="link" data-f="url">Restore my account</span><br>
          <span class="att" data-a="att" data-f="att">📎 Invoice_4471.pdf.zip</span>
        </div>
        <div class="tools">
          <button data-a="rep">↩ Reply</button>
          <button data-a="del">🗑 Delete</button>
          <button data-a="rpt">🚩 Report phishing</button>
        </div>
      </div>
  `,

  // ---- CLUES shown when "Inspect clues" is ON in Practice mode ----
  flags: {
    sender: "Look closely: 'paypa1' ends with the number 1, not the letter L. Look-alike addresses are a favourite trick.",
    greet: "Real companies use your name. 'Dear customer' means the same email went to thousands of people.",
    urg: "Deadlines and threats are built to make you panic and skip thinking.",
    url: "Buttons hide the real destination. On a computer, hover to preview it; on a phone, press and hold. This one leads to a fake login page.",
    att: "You never ordered anything, and a .zip is a common way to hide harmful software.",
  },

  // ---- ACTIONS: [0 = unsafe or 1 = safe, feedback message] ----
  acts: {
    link: [0, "That button leads to a fake login page that copies whatever you type. Real companies let you simply open their app or type their address yourself."],
    att: [0, "Opening unexpected attachments can install software that spies on you or locks your files."],
    rep: [0, "Replying tells the scammer your address is real and active, so expect more."],
    del: [1, "Safe choice! Even better: report it first so your email provider can block it for others."],
    rpt: [1, "Excellent! Reporting protects you and everyone else. You can then delete it."],
  },

  // ---- GUIDE PAGE (Learn) CONTENT ----
  how: "Scammers copy a company's logo and tone, then send thousands of emails at once. A few people always click. The link opens a copy of the real login page. Whatever you type goes straight to the thief, who then logs in to your real account.",

  traps: [   // [title, description]
    ["Look-alike addresses", "paypa1.com, amaz0n-support.net, or a long address that merely contains the real name. Check the part just before '.com'."],
    ["Fear and deadlines", "'Closed in 24 hours', 'unauthorized login', 'payment failed'. Real problems can wait until you check them yourself."],
    ["Fake invoices", "A surprise bill makes you click or call to dispute it. The call or link is the trap."],
    ["Safe-looking attachments", "Files ending in .zip, .exe or even PDFs from strangers can carry harmful software."],
  ],

  real: "Real companies address you by name, never ask for your password by email, and are fine if you ignore the message and sign in using their app or by typing their website yourself.",

  tips: [
    "Never tap links in unexpected messages. Open the app or type the website yourself.",
    "Check the sender address, not just the display name.",
    "Don't open attachments you didn't expect, even from people you know. Their account may be hacked.",
    "Turn on two-step verification for email and banking.",
    "When in doubt, forward it to a family member before acting.",
  ],

  after: [   // "Already clicked or paid?" steps
    "Change that account's password right away (and anywhere you reused it).",
    "Call your bank if you typed card or bank details.",
    "Run your computer's built-in security scan, and report the email.",
  ],
});
