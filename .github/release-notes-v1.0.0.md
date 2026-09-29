# Sonnet Migration Evidence Gate 1.0.0

Evaluate a Claude model upgrade against your own paired workload runs before changing production traffic.

The release includes:

- an iPolloWork plugin package;
- a standalone Skill archive;
- a source archive;
- SHA-256 checksums.

The Skill separates vendor context from workload evidence, checks critical quality floors and sample coverage, computes observed token cost from supplied rates, and produces staged validation and rollback gates.
