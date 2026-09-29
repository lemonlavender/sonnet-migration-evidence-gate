# Migration report format

## Verdict

State go, limited-pilot, hold, or blocked. Give the smallest set of facts that determines it and distinguish demonstrated failures from missing evidence.

## Evidence ledger

| Claim or metric | Baseline | Candidate | Evidence class | Confidence | Decision use |
|---|---|---|---|---|---|

Keep vendor context separate from paired and unpaired workload observations.

## Gate table

| Task group | Critical | Paired runs | Baseline quality | Candidate quality | Floor | Gate result | Latency change | Cost status |
|---|---:|---:|---:|---:|---:|---|---:|---|

Show exact pass counts with rounded percentages. Never let a portfolio average override a failed group gate.

## Cost analysis

Show the formula, rates, complete row totals, per-run values, exclusions, and confirmed portfolio total. Put incomplete rows in a separate subsection and name every unknown component. State whether a savings percentage is confirmed, partial, or unavailable.

## Compatibility and coverage

List required settings, tested state, operator control, missing workload dimensions, unpaired observations, and live-production exposure. Identify which gaps block production and which only limit confidence.

## Rollout gates

For each stage show entry evidence, action, pass signal, stop signal, owner or required approver, output artifact, and rollback action. Do not describe a proposed stage as completed.

## Validation checklist

Provide the smallest reproducible set of paired reruns and configuration checks needed to move the verdict.

## Rollback signals

Tie measurable quality, schema, latency, cost, safety, and tool-failure signals to the exact model or configuration value to restore. Keep human approval explicit.

## Boundary

End with the exact advisory sentence from SKILL.md.
