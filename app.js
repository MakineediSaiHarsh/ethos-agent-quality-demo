"use strict";
const state = { agent: "dana", step: 0, danaVerified: false, marcusPaid: false, priyaGraduated: false };
const order = ["dana", "priya", "marcus", "leo"];
const steps = ["Situation", "Decision", "Next steps"];
const panel = document.getElementById("case-panel");
const liveStatus = document.getElementById("live-status");
let dialogOpener = null;

const agents = {
  dana: {
    name: "Dana", role: "Established agent", avatar: "D",
    title: "A sudden drop after two strong years.",
    story: "Her customers stop paying around the time of an Ethos billing incident. It may be the platform’s mistake.",
    note: "Check the cause before changing her terms.",
    appealKind: "data",
    appealText: "Please check which of my policies were affected by the billing error and correct the related charges."
  },
  priya: {
    name: "Priya", role: "New agent", avatar: "P",
    title: "An early warning. Very little history.",
    story: "She joined six weeks ago. Two of her first three policies have lapsed, and she has asked for training.",
    note: "Act early, while giving a new agent a fair chance.",
    appealKind: "data",
    appealText: "Please check the payment records before the early lapses affect my quality assessment."
  },
  marcus: {
    name: "Marcus", role: "Summit team manager", avatar: "M",
    title: "A productive manager who owes money.",
    story: "His own policies lapse often, and his unpaid debt is growing. His team may leave if he does.",
    note: "Debt needs action now. His quality tier needs its own evidence.",
    appealKind: "repayment",
    appealText: "My repayment has been made. Please check the balance and review the debt-related funding restriction."
  },
  leo: {
    name: "Leo", role: "High-volume agent", avatar: "L",
    title: "A new policy. Another upfront payment.",
    story: "Customers cancel and buy another policy from him, earning him a fresh advance. He says the coverage is better.",
    note: "Allow legitimate coverage changes without restarting the advance.",
    appealKind: "judgment",
    appealText: "This replacement benefits the customer. Please review that evidence separately from the no-new-advance rule."
  }
};

function view() {
  const a = agents[state.agent];
  if (state.agent === "dana") {
    const v = state.danaVerified;
    return { ...a,
      metrics: [["Track record", "2 years", ""], ["Still paying at day 90", v ? "94.1%" : "80%", "Illustrative cohort"], ["Possible cause", v ? "Confirmed error" : "Billing error", ""]],
      decisionTitle: v ? "Keep nine months. Correct the record." : "Keep normal terms while checking.",
      decision: v ? "Exclude the verified Ethos failures and reverse related chargebacks." : "A possible Ethos error needs verification before a downgrade.",
      term: "9", termCaption: "months of advance", word: false, tone: "",
      next: [
        [v ? "Billing evidence confirmed." : "Verify which policies Ethos affected.", v],
        [v ? "Affected policies and chargebacks corrected." : "Correct the payment record and related chargebacks.", v],
        ["Continue normal reviews of the remaining book.", false]
      ],
      takeaway: "Ethos owns the consequences of its billing failures.",
      detailTitle: "Could Dana earn more than nine months?",
      detail: "Yes. A ten-month reward requires top-quartile 90-day and first-year results across two quarterly reviews, consistent repayments and no malicious conduct. One corrected set of policies is not enough."
    };
  }
  if (state.agent === "priya") {
    const g = state.priyaGraduated;
    return { ...a,
      title: g ? "Enough history. Baseline quality." : a.title,
      story: g ? "In this future example, she has completed coaching and 20 policies now have baseline 90-day results." : a.story,
      note: g ? "She graduates to uncapped nine-month advances." : a.note,
      metrics: g
        ? [["Observed policies", "20", "Illustrative future"], ["90-day result", "Baseline met", ""], ["New-agent cap", "Removed", ""]]
        : [["On the platform", "6 weeks", ""], ["Early lapses", "2 of 3", ""], ["90-day history", "Not ready", ""]],
      decisionTitle: g ? "Graduate to uncapped nine-month advances." : "Keep her selling, with a mentor.",
      decision: g ? "Her 20 policies meet baseline 90-day results. Remove the $5,000 new-agent cap." : "Nine-month advances within the cap. Above it, commission arrives as customers pay.",
      term: g ? "9" : "$5,000",
      termCaption: g ? "months, with no new-agent cap" : "cap on outstanding unearned advances",
      word: false, tone: "",
      next: [
        [g ? "Mentor checks completed in this future example." : "Mentor checks her next five applications.", g],
        ["20 policies have baseline 90-day results.", g],
        ["Graduate to uncapped nine-month advances.", g]
      ],
      takeaway: g ? "She has earned her way out of the new-agent cap." : "Coaching now, with a clear way out of the cap.",
      detailTitle: "How does she graduate?",
      detail: "Once 20 policies have baseline 90-day results, remove the $5,000 new-agent cap and pay uncapped nine-month advances. Low-volume agents can appeal for individual review. The separate ten-month reward needs top-quartile 90-day and first-year results across two quarterly reviews, consistent repayments and no malicious conduct."
    };
  }
  if (state.agent === "marcus") {
    const p = state.marcusPaid;
    return { ...a,
      metrics: [["Unpaid balance", p ? "$0" : "$4,200", "Illustrative balance"], ["Quality tier", "Unconfirmed", ""], ["His team", "Separate review", ""]],
      decisionTitle: p ? "Debt cleared. Quality still needs review." : "Freeze new advances.",
      decision: p ? "Repayment removes the debt block. Advance terms still depend on quality." : "Repay from his personal sales commissions and manager team commissions.",
      term: p ? "Review" : "Frozen", termCaption: p ? "before advances resume" : "new commission advances", word: true, tone: p ? "" : "amber",
      next: [
        [p ? "Repayment obligations satisfied." : "Repay from personal sales and manager team commissions.", p],
        ["Establish a quality tier from eligible policies.", false],
        ["Earn restoration through the standard checks.", false]
      ],
      takeaway: p ? "Repayment resolves debt; it does not prove policy quality." : "A manager’s influence cannot become a debt exemption.",
      detailTitle: "Why keep Marcus active?",
      detail: "His personal sales commissions and manager team commissions fund the repayment plan. Selling can continue while advances are frozen. Assess team members individually and offer compliant agents a way to stay. His quality tier still needs enough payment history; repayment alone does not establish it."
    };
  }
  return { ...a,
    metrics: [["Customer", "Same person", ""], ["Replacement window", "12 months", "Proposed pilot rule"], ["Intent", "Needs review", ""]],
    decisionTitle: "No repeat advance.",
    decision: "Coverage changes remain available. Commission is earned as customers pay.",
    term: "No fresh", termCaption: "advance on this replacement", word: true, tone: "amber",
    next: [
      ["Check the documented benefit to the customer.", false],
      ["Reconcile the prior unearned advance.", false],
      ["Resolve the conduct review with a human decision.", false]
    ],
    takeaway: "Replacing a policy does not restart its financing.",
    detailTitle: "What if the replacement is legitimate?",
    detail: "It can proceed, but earns no fresh advance within the 12-month window. Quality Operations reviews customer benefit and intent. Terminate only if deliberate commission abuse is confirmed, after human review. Send suspected fraud concerns to Legal."
  };
}

function metricsHTML(a) {
  return '<div class="evidence-grid">' + a.metrics.map(m =>
    '<div class="evidence-metric"><span class="metric-label">' + m[0] + '</span><div class="metric-value' + (m[1].length > 11 ? ' text-value' : '') + '">' + m[1] + '</div>' + (m[2] ? '<p class="metric-caption">' + m[2] + '</p>' : '') + '</div>'
  ).join("") + '</div>';
}

function experimentHTML() {
  if (state.agent === "dana") {
    const v = state.danaVerified;
    return '<div class="experiment"><div class="experiment-top"><div><p class="experiment-label">TRY CHANGING ONE FACT</p><h4>What if Ethos caused six of the eight failures?</h4></div><button id="dana-change" class="button button-outline mini-button" data-action="dana-toggle" aria-pressed="' + v + '">' + (v ? 'Undo' : 'Confirm error') + '</button></div>' +
      (v ? '<div class="experiment-result" role="status"><span class="change-number"><small>80%</small>94.1%</span><span><strong>Corrected payment rate.</strong><br>Nine-month terms stay. Related chargebacks are reversed.</span></div>' : '') +
      '</div><details class="disclosure"><summary>See the calculation</summary><p>In this illustration, 32 of 40 policies are still paying: <strong>80%</strong>. Excluding six verified Ethos failures leaves 32 of 34: <strong>94.1%</strong>. The other two failures still count. The illustrative peer median is 92%.</p></details>';
  }
  if (state.agent === "marcus") {
    const p = state.marcusPaid;
    return '<div class="experiment"><div class="experiment-top"><div><p class="experiment-label">TRY CHANGING ONE FACT</p><h4>What if Marcus settles his unpaid balance?</h4></div><button id="marcus-change" class="button button-outline mini-button" data-action="marcus-toggle" aria-pressed="' + p + '">' + (p ? 'Undo' : 'Record repayment') + '</button></div>' +
      (p ? '<div class="experiment-result" role="status"><span class="change-number">$0</span><span><strong>Debt block cleared.</strong><br>This does not automatically restore nine months.</span></div>' : '') + '</div>';
  }
  if (state.agent === "priya") {
    const g = state.priyaGraduated;
    return '<div class="experiment"><div class="experiment-top"><div><p class="experiment-label">TRY A FUTURE OUTCOME</p><h4>What if 20 policies meet baseline 90-day results?</h4></div><button id="priya-change" class="button button-outline mini-button" data-action="priya-toggle" aria-pressed="' + g + '">' + (g ? 'Undo' : 'Show graduation') + '</button></div>' +
      (g ? '<div class="experiment-result" role="status"><span class="change-number">9 months</span><span><strong>Uncapped advances.</strong><br>The $5,000 new-agent cap is removed.</span></div>' : '') +
      '</div><details class="disclosure"><summary>What happens before she qualifies?</summary><p>Keep the cap, review her next five applications with a mentor and start the Ethos training plan. Check need, affordability and payment timing. Three policies are too few for a reliable quality verdict.</p></details>';
  }
  return '<details class="disclosure"><summary>Does this mean Leo is terminated?</summary><p>No. Review customer benefit and intent, including sampled customer checks. Allow appropriate coverage changes, but terminate only if deliberate commission abuse is confirmed. Any termination requires human review.</p></details>';
}

function stageHTML(a) {
  if (state.step === 0) return '<h3 id="stage-title" tabindex="-1">' + a.title + '</h3><p class="stage-description">' + a.story + '</p>' + metricsHTML(a) + '<p class="context-note">' + a.note + '</p>';
  if (state.step === 1) return '<div class="decision-card ' + a.tone + '"><div><h3 id="stage-title" tabindex="-1">' + a.decisionTitle + '</h3><p>' + a.decision + '</p></div><div class="term-tag"><strong class="' + (a.word ? 'word' : '') + '">' + a.term + '</strong><span>' + a.termCaption + '</span></div></div>' + experimentHTML();
  return '<h3 id="stage-title" tabindex="-1">A clear next step for ' + a.name + '.</h3><ol class="recovery-list">' + a.next.map(item =>
    '<li class="recovery-item' + (item[1] ? ' is-done' : '') + '"><span class="recovery-icon" aria-hidden="true">' + (item[1] ? '✓' : '·') + '</span><strong>' + item[0] + '</strong></li>'
  ).join("") + '</ol><p class="takeaway">' + a.takeaway + '</p><details class="disclosure"><summary>' + a.detailTitle + '</summary><p>' + a.detail + '</p></details><div class="appeal-invitation"><p>Something looks wrong?</p><button class="text-button" data-action="appeal">Try an appeal <span aria-hidden="true">↗</span></button></div>';
}

function render(options = {}) {
  const a = view();
  const nextAgent = order[(order.indexOf(state.agent) + 1) % order.length];
  const end = state.agent === "leo" && state.step === 2;
  panel.innerHTML = '<header class="case-header"><div class="case-heading-row"><div class="case-title-group"><span class="avatar avatar-' + state.agent + '" aria-hidden="true">' + a.avatar + '</span><div><p class="case-role">' + a.role + '</p><h2 id="case-name">' + a.name + '</h2></div></div><span class="case-count">Case ' + (order.indexOf(state.agent) + 1) + ' of 4</span></div><nav class="step-nav" aria-label="Walkthrough steps">' +
    steps.map((label, i) => '<button class="step-button' + (state.step === i ? ' is-active' : i < state.step ? ' is-done' : '') + '" data-step="' + i + '"' + (state.step === i ? ' aria-current="step"' : '') + '><span aria-hidden="true">' + (i < state.step ? '✓' : i + 1) + '</span>' + label + '</button>').join("") +
    '</nav></header><div class="stage-content">' + stageHTML(a) + '</div><footer class="stage-footer"><div class="footer-left">' +
    (state.step ? '<button class="text-button back-button" data-action="back">← Back</button>' : '<span class="footer-step">Step 1 of 3</span>') +
    '</div><button class="button button-primary" data-action="' + (end ? 'rules' : state.step === 2 ? 'next-agent' : 'next') + '">' +
    (end ? 'See the program rules' : state.step === 2 ? 'Explore ' + agents[nextAgent].name : state.step === 0 ? 'See the decision' : 'See next steps') + '<span aria-hidden="true">→</span></button></footer>';
  document.querySelectorAll("[data-agent]").forEach(b => {
    const active = b.dataset.agent === state.agent;
    b.classList.toggle("is-selected", active);
    b.setAttribute("aria-pressed", String(active));
  });
  document.title = a.name + " · " + steps[state.step] + " · Ethos Agent Quality";
  if (options.focus) panel.querySelector(options.focus)?.focus({ preventScroll: true });
  if (options.announce) liveStatus.textContent = a.name + ". Step " + (state.step + 1) + ": " + steps[state.step] + ". " + (state.step === 1 ? a.decisionTitle : "");
}

function selectAgent(id, scroll = false) {
  if (!agents[id]) return;
  state.agent = id;
  state.step = 0;
  render({ announce: true });
  if (location.hash !== "#" + id) history.replaceState(null, "", "#" + id);
  if (scroll && matchMedia("(max-width: 740px)").matches) scrollToPanel();
}
function scrollToPanel() {
  panel.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "start" });
}
function changeStep(step, fromTab = false) {
  state.step = Math.max(0, Math.min(2, step));
  render({ announce: true, focus: fromTab ? '[data-step="' + state.step + '"]' : '#stage-title' });
}

function openDialog(id, opener) {
  dialogOpener = opener;
  if (id === "appeal-dialog") renderAppealForm();
  document.getElementById(id).showModal();
}
function renderAppealForm() {
  const a = agents[state.agent];
  document.getElementById("appeal-content").innerHTML =
    '<p class="form-intro">Here is a sample appeal from <strong>' + a.name + '</strong>. Edit it, or continue to see who reviews it.</p>' +
    '<form id="appeal-form" class="appeal-form"><label for="appeal-kind" class="field-label">What needs checking?</label><select id="appeal-kind"><option value="data">Billing or payment records</option><option value="repayment">A repayment or balance</option><option value="judgment">The decision or conduct judgment</option></select><label for="appeal-reason" class="field-label">The agent’s explanation</label><textarea id="appeal-reason" required minlength="10" maxlength="800"></textarea><p class="form-note">Illustration only. Nothing is sent or saved.</p><div class="form-actions"><button type="button" class="button button-light" data-close="appeal-dialog">Cancel</button><button type="submit" class="button button-primary">See the review <span aria-hidden="true">→</span></button></div></form>';
  document.getElementById("appeal-kind").value = a.appealKind;
  document.getElementById("appeal-reason").value = a.appealText;
}
function renderAppealResult(kind) {
  const factual = kind !== "judgment";
  const canCorrect = state.agent === "dana" && kind === "data" && !state.danaVerified;
  document.getElementById("appeal-content").innerHTML =
    '<div class="review-summary" tabindex="-1"><strong>Everyone sees the corrected decision.</strong><p>This is a preview, not a submitted appeal.</p></div><ol class="review-path"><li><span>1</span><strong>Service checks the records.</strong>A trained representative verifies payment, billing or repayment facts.</li><li><span>2</span><strong>' + (factual ? 'Correct the record and rerun the rules.' : 'Quality Operations reviews the judgment.') + '</strong>' +
    (factual ? 'Correct factual errors. Ambiguous cases go to Quality Operations.' : 'An independent reviewer checks the context and customer evidence.') +
    '</li><li><span>3</span><strong>Explain the outcome to the agent.</strong>Show the current terms, what changed and the next step.</li></ol><details class="disclosure"><summary>What about fraud or existing limits?</summary><p>Existing exposure limits remain in place during review. Quality Operations sends suspected fraud concerns to Legal. Suspicion alone does not justify termination; a human reviews that decision. Apply verified corrections to other affected agents too.</p></details><div class="form-actions"><button class="button button-light" data-action="appeal-edit">Back</button>' +
    (canCorrect ? '<button class="button button-primary" data-action="appeal-correct">Apply verified correction <span aria-hidden="true">→</span></button>' : '<button class="button button-primary" data-close="appeal-dialog">Return to ' + agents[state.agent].name + ' <span aria-hidden="true">→</span></button>') + '</div>';
  document.querySelector(".review-summary").focus();
}

document.addEventListener("click", event => {
  const agentButton = event.target.closest("[data-agent]");
  if (agentButton) { selectAgent(agentButton.dataset.agent, true); return; }
  const stepButton = event.target.closest("[data-step]");
  if (stepButton) { changeStep(Number(stepButton.dataset.step), true); return; }
  const close = event.target.closest("[data-close]");
  if (close) { document.getElementById(close.dataset.close).close(); return; }
  const button = event.target.closest("[data-action]");
  if (!button) return;
  switch (button.dataset.action) {
    case "next": changeStep(state.step + 1); break;
    case "back": changeStep(state.step - 1); break;
    case "next-agent": selectAgent(order[(order.indexOf(state.agent) + 1) % order.length], true); panel.focus({ preventScroll: true }); break;
    case "dana-toggle": state.danaVerified = !state.danaVerified; render({ announce: true, focus: "#dana-change" }); break;
    case "marcus-toggle": state.marcusPaid = !state.marcusPaid; render({ announce: true, focus: "#marcus-change" }); break;
    case "priya-toggle": state.priyaGraduated = !state.priyaGraduated; render({ announce: true, focus: "#priya-change" }); break;
    case "rules": openDialog("rules-dialog", button); break;
    case "appeal": openDialog("appeal-dialog", button); break;
    case "appeal-edit": renderAppealForm(); document.getElementById("appeal-kind").focus(); break;
    case "appeal-correct":
      state.danaVerified = true;
      state.step = 1;
      render({ announce: true });
      document.getElementById("appeal-dialog").close();
      break;
    case "reset":
      state.danaVerified = false;
      state.marcusPaid = false;
      state.priyaGraduated = false;
      selectAgent("dana");
      liveStatus.textContent = "Walkthrough reset. Start with Dana.";
      break;
  }
});

document.addEventListener("submit", event => {
  if (event.target.id !== "appeal-form") return;
  event.preventDefault();
  if (event.target.reportValidity()) renderAppealResult(document.getElementById("appeal-kind").value);
});

document.querySelectorAll("dialog").forEach(d => {
  d.addEventListener("keydown", event => {
    if (event.key !== "Tab") return;
    const controls = [...d.querySelectorAll('button:not([disabled]),a[href],input:not([disabled]),select:not([disabled]),textarea:not([disabled]),summary,[tabindex="0"]')].filter(el => el.getClientRects().length);
    const first = controls[0], last = controls[controls.length - 1];
    if (!first) { event.preventDefault(); return; }
    if (event.shiftKey && (document.activeElement === first || !d.contains(document.activeElement))) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });
  d.addEventListener("click", event => {
    if (event.target !== d) return;
    const r = d.getBoundingClientRect();
    if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) d.close();
  });
  d.addEventListener("close", () => {
    if (dialogOpener?.isConnected) dialogOpener.focus({ preventScroll: true });
    else panel.querySelector("#stage-title")?.focus({ preventScroll: true });
    dialogOpener = null;
  });
});
window.addEventListener("hashchange", () => {
  const id = location.hash.slice(1).toLowerCase();
  if (agents[id]) selectAgent(id);
});
const initial = location.hash.slice(1).toLowerCase();
if (agents[initial]) state.agent = initial;
render();
