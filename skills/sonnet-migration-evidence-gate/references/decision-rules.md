# Decision rules

## Comparability ledger

Use one row per factor:

| Factor | Baseline | Candidate | Comparable? | Evidence class | Effect on confidence |
|---|---|---|---|---|---|

Check prompt and case identity, model settings or effort, tool versions and permissions, retry policy, timeout, region, timestamp window, and scoring rubric when supplied. Missing factors are unknown, not automatically mismatched.

## Quality gates

For group g:

- baseline rate = baseline passes / paired runs;
- candidate rate = candidate passes / paired runs;
- change in percentage points = candidate rate − baseline rate;
- floor margin = candidate rate − required floor.

Use exact counts beside rounded rates. Evaluate critical floors before any aggregate.

A candidate with 28/30 passes against a 100% floor fails even if its portfolio-weighted quality is higher. An unpaired result is descriptive and cannot enter the paired numerator or denominator.

## Cost normalization

For each comparable group:

cost = (input / U × Pi) + (output / U × Po) + (cacheRead / U × Pr) + (cacheWrite / U × Pw)

U is the rate unit, normally 1,000,000 tokens.

Report:

- baseline and candidate group totals;
- cost per paired run;
- absolute and percentage change;
- confirmed portfolio total from complete rows;
- incomplete rows and the exact missing component.

If a component is unknown, do not include the row in the confirmed total. A partial subtotal must say what it excludes and cannot support a savings claim.

## Latency normalization

Use the same statistic and population. For lower-is-better latency:

change % = (candidate − baseline) / baseline × 100

Negative means faster. Preserve the supplied unit and percentile. If one side is mean and the other p95, mark the comparison invalid.

## Coverage and confidence

Track at least:

- critical groups represented;
- required minimum paired runs;
- long-context coverage;
- safety or refusal coverage;
- tool-use and structured-output coverage;
- live-production evidence;
- required configuration migration.

Confidence is:

- **confirmed**: paired, comparable, complete fields;
- **bounded**: useful paired evidence with a named missing dimension;
- **unknown**: unpaired or missing data prevents the stated conclusion.

## Verdict precedence

1. A demonstrated critical-floor failure or failed required compatibility test → hold.
2. No critical failure, but evidence cannot establish whether critical gates pass → blocked.
3. Critical observed gates pass, but sample, coverage, or production evidence is incomplete → limited-pilot.
4. All gates pass with a controlled rollout and approval path → go.

A failed critical group remains a hold even if another missing field also blocks confirmed cost arithmetic.
