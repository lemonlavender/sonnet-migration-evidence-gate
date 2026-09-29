# Example migration packet

Compare sonnet-current with sonnet-candidate.

Policy: every critical group needs 30 paired runs and must meet its floor. A failed critical group means hold. Prices are USD per 1M tokens: input 2, output 10, cache read 0.20, cache write 2.50.

| Group | Critical | Floor | Runs | Baseline passes | Candidate passes | Baseline p95 | Candidate p95 | Baseline input | Candidate input | Baseline output | Candidate output | Baseline cache read | Candidate cache read | Baseline cache write | Candidate cache write |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| support | yes | 90% | 50 | 45 | 47 | 5.0 s | 3.9 s | 4,000,000 | 3,700,000 | 900,000 | 760,000 | 6,000,000 | 6,500,000 | 500,000 | 450,000 |
| extraction | yes | 100% | 30 | 30 | 29 | 8.0 s | 6.1 s | 2,000,000 | 1,800,000 | 500,000 | 430,000 | 1,000,000 | 1,300,000 | 250,000 | unknown |

The candidate needs an untested configuration change for tool use. Long-context and safety-refusal cases are absent. No production traffic has used the candidate.
