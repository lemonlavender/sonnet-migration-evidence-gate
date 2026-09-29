# Sonnet Migration Evidence Gate

[简体中文](README.zh-CN.md) · Supports [iPolloWork](https://github.com/Devin-AXIS/iPolloWork)

Sonnet Migration Evidence Gate is a declarative Skill for teams deciding whether a Claude Sonnet model upgrade is ready for production. It converts paired baseline and candidate runs into a reviewable decision with per-workload quality gates, normalized token costs, latency deltas, compatibility checks, coverage gaps, staged rollout criteria, and rollback signals.

The package does not call Claude, change model configuration, or move production traffic. It evaluates evidence that you provide.

## Who it is for

- AI platform teams reviewing a Sonnet model upgrade.
- Application owners who need a migration decision that can survive cost, quality, and risk review.
- Evaluation engineers comparing model versions on private workloads.
- Release managers who need explicit entry, stop, and rollback gates.

## Useful scenarios

- Compare Claude Sonnet 5 with Claude Sonnet 5.5 on support, coding, extraction, and document workflows.
- Prevent a strong portfolio average from hiding a failed critical task group.
- Separate launch-page performance claims from results observed on your own prompts.
- Calculate token cost while preserving unknown cache or pricing fields.
- Check configuration prerequisites such as a new thinking or tool-use setting.
- Design a staged shadow or canary rollout without claiming that the rollout already happened.

## What the Skill does

1. Classifies vendor context, paired observations, unpaired observations, derived arithmetic, and unknowns.
2. Checks each critical task group against its own quality floor and minimum paired-run rule.
3. Computes baseline and candidate cost from input, output, cache-read, and cache-write tokens.
4. Excludes incomplete rows from confirmed totals instead of treating missing values as zero.
5. Compares like-for-like latency statistics and reports absolute and percentage changes.
6. Audits compatibility prerequisites, coverage gaps, live-traffic exposure, and approval boundaries.
7. Produces one verdict: **go**, **limited-pilot**, **hold**, or **blocked**.
8. Generates staged validation and rollback gates with owners and evidence artifacts.

## Prerequisites

- A baseline model ID and candidate model ID.
- Paired run counts and pass counts for each material workload.
- Quality floors and criticality labels.
- Comparable latency statistics.
- Token totals and pricing for any cost conclusion.
- Known compatibility changes and the settings the operator may control.

Missing data can remain unknown. The report will state how the missing fact affects the decision.

## Inputs and outputs

Input is a Markdown packet or equivalent structured text containing the fields above. The Skill does not require a vendor account or network access.

Output is a Markdown migration report containing:

- verdict and determining facts;
- evidence ledger;
- per-group gate table;
- confirmed and incomplete cost analysis;
- compatibility and coverage audit;
- rollout gates;
- validation checklist;
- rollback signals;
- advisory boundary.

## End-to-end example

Use [examples/migration-packet.md](examples/migration-packet.md) as the input.

Ask:

> Use Sonnet Migration Evidence Gate to assess examples/migration-packet.md. Use only the packet and save the complete report as migration-report.md.

Expected outcome:

- verdict is **hold**;
- the critical extraction group fails its 100% floor at 29/30;
- the untested tool configuration remains a production gate;
- candidate extraction cost is incomplete because cache-write tokens are unknown;
- support improvements do not override the critical failure;
- the report ends with the exact advisory boundary.

A compact expected result is in [examples/expected-report.md](examples/expected-report.md).

## Install and use in iPolloWork

1. Open the GitHub Release and download **sonnet-migration-evidence-gate-1.0.0.ipollowork-plugin**.
2. In iPolloWork, choose **Extensions → Plugins → Add → File**.
3. Select the downloaded file and inspect the preview. It should show publisher **lemonlavender**, version **1.0.0**, and one required Skill.
4. Install the package, enable the plugin, and confirm that **Sonnet Migration Evidence Gate** is enabled.
5. Add your evidence packet to a local project.
6. Start a task and explicitly request the Skill, naming the packet and output file.
7. Verify that the report includes the verdict, evidence classes, per-group gates, cost exclusions, compatibility state, rollout plan, rollback signals, and boundary sentence.
8. Export or share the generated Markdown report through your normal project workflow.

The package is declarative and requests no permissions, custom authorization, local service, native code, process MCP, or network connection.

### Standalone Skill import

Download and unzip **sonnet-migration-evidence-gate-1.0.0-skill.zip**. In iPolloWork's local Skill import page, select the folder that directly contains SKILL.md, then reload when prompted. Do not select the ZIP or the repository root.

## Build and verify

Requirements: Node.js, the system zip tool, and unzip.

~~~sh
npm test
npm run package
cd dist
shasum -a 256 -c SHA256SUMS.txt
~~~

The build produces the iPolloWork package, standalone Skill ZIP, source ZIP, and SHA256SUMS.txt. Packaging uses a clean staging directory, fixed timestamps, no symbolic links, and a single root manifest.

## Troubleshooting

**The file cannot be selected**

Confirm the filename ends in .ipollowork-plugin and use the plugin file importer.

**The Skill is missing after installation**

Open the plugin detail, enable the plugin and Skill, then reload the project if prompted.

**The report claims savings despite an unknown cache field**

The Skill should exclude that row from confirmed totals. Ask it to re-read decision-rules.md and regenerate the cost section.

**A vendor benchmark is treated as workload proof**

Ask the Skill to label every claim by evidence class. Vendor context cannot establish workload improvement.

**The result says go while a critical floor fails**

This violates the verdict rules. A demonstrated critical failure requires hold.

## Tested environment and limits

The package targets iPolloWork 0.50.12 or later and macOS arm64. Version 1.0.0 was imported and invoked in iPolloWork 0.50.12 on macOS arm64. The installed Skill loaded both references and generated the expected hold report. See [docs/desktop-acceptance.md](docs/desktop-acceptance.md).

The Skill evaluates supplied evidence only. It does not execute model calls, validate vendor billing, inspect production telemetry, certify safety, or approve deployment. Teams remain responsible for evaluation design, security review, business approval, and human validation.
