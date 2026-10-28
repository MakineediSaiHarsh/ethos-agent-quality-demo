# Ethos Agent Quality Program — GitHub Pages package

A browser-only guided walkthrough built with HTML, CSS and JavaScript.
There are no dependencies, build steps, API keys, accounts or live payments.

## Open it

Open index.html in a modern browser. You can also serve this folder with any
static web server. All CSS, JavaScript and icons are local.

## Publish on GitHub Pages

1. Extract the ZIP on your computer.
2. Create a public GitHub repository, for example "ethos-agent-quality".
3. Choose Add file > Upload files. Upload the CONTENTS of the extracted folder,
   not the ZIP and not an enclosing folder. index.html must appear at the root
   of the repository alongside app.js, styles.css, favicon.svg and .nojekyll.
4. Commit the uploaded files to the main branch.
5. Open Settings > Pages. Under Build and deployment, set:
   - Source: Deploy from a branch
   - Branch: main
   - Folder: / (root)
   Then choose Save.
6. Wait for GitHub Pages to finish publishing. Settings > Pages will show the
   live URL. Open it and try Dana's correction, Priya's graduation and the appeal.
7. Add that live URL to the submission as "Optional interactive prototype".

The URL normally has this form:
https://YOUR-USERNAME.github.io/YOUR-REPOSITORY-NAME/

All asset paths are relative, so this package works under a repository path
as well as at the root of a site. There is no install or build command.

The empty .nojekyll file is included to publish the files directly.
If it does not appear after browser upload, create a new empty file named
.nojekyll at the repository root using Add file > Create new file.

For an existing repository, replace the website files at its selected Pages
publishing source. These instructions use the main branch and root folder.

Official GitHub instructions:
https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site

## Suggested submission link

Optional interactive prototype — four agent decisions, recovery and appeals

The two-page memo remains the complete submission. Add a small hyperlink beside
"To Ethos leadership" once the public deployment URL is available.
Check the link in a signed-out browser before sending the submission.

## Explore the prototype

Start with Dana. Follow Situation, Decision and Next steps. Confirm the billing error to see the result change, then explore Priya, Marcus and Leo. Calculations and detailed criteria are available on request; the main view shows one step at a time.

## What the prototype demonstrates

- Priya: early coaching, a new-agent funding cap, and graduation to uncapped nine-month advances
  once 20 policies have baseline 90-day results.
- Marcus: freeze new advances immediately. Repay from his personal sales
  commissions and manager team commissions. Repayment alone does not establish
  policy quality or automatically award nine months of advance.
- Dana: verify the billing incident, remove the affected policies from the
  eligible cohort, reverse related charges and preserve normal terms.
- Leo: no new advance on a same-customer replacement within 12 months. Legitimate
  coverage changes remain possible. Confirmed deliberate abuse needs a human
  termination decision.
- Appeals: a trained service representative checks facts, Quality Operations
  handles contested judgments, Finance reconciles balances and suspected fraud
  concerns go to Legal.
- Program rules: peer-relative tiers, a separately earned ten-month reward,
  sample checks, quarterly restoration, no malicious conduct for the reward,
  and product-matched rolling 90-day persistency.
- Checkout: require a payday-aligned billing date and show an automated
  coverage-to-income affordability warning before a high-ratio application is submitted.

## Facts and illustrations

The rules and decisions follow the final submission provided on 29 October 2026.
The four agents and their circumstances come from the supplied case.
Priya’s graduation is a simulated future result, not a claim that she already qualifies.
The $4,200 Marcus balance and Dana cohort (40 policies, 32 still paying, six
verified billing failures, 92% peer median) are illustrative.
Dana's corrected result is 32 / 34 = 94.1%. These figures are not Ethos data.

All thresholds, terms and windows describe the proposed program, not a claim
about Ethos's actual operations. The interface deliberately does not infer a
quality tier for Marcus or Priya from insufficient information.

## Behaviour

Scenario state lasts only for the current page session. Refresh or Reset walkthrough
restores the examples. The hash allows direct links such as #dana and #marcus.
The appeal is a simulation; it sends and stores no information.

## Files

- index.html — structure and accessible dialogs
- styles.css — responsive styles, keyboard focus and reduced-motion support
- app.js — scenario state, decisions, interactions and appeal walkthrough
- favicon.svg — local icon
- .nojekyll — serve this as a plain static website
