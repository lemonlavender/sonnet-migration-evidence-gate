import test from 'node:test';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {readFileSync} from 'node:fs';
import {dirname,join} from 'node:path';
import {fileURLToPath} from 'node:url';

const root=dirname(dirname(fileURLToPath(import.meta.url)));

test('manifest is a safe declarative Skill package',()=>{
  const manifest=JSON.parse(readFileSync(join(root,'ipollowork.plugin.json')));
  assert.equal(manifest.schemaVersion,2);
  assert.equal(manifest.source.trusted,false);
  assert.equal(manifest.package.publisher.id,'lemonlavender');
  assert.equal(manifest.package.updateId,'lemonlavender/sonnet-migration-evidence-gate');
  assert.equal(manifest.package.compatibility.ipollowork,'>=0.50.12');
  for(const field of ['permissions','authorization','engines','commands','agents','mcpServers']) assert.equal(field in manifest,false);
  assert.deepEqual(manifest.resources.map(resource=>[resource.type,resource.path]),[
    ['skill','skills/sonnet-migration-evidence-gate']
  ]);
});

test('Skill separates evidence classes and protects critical gates',()=>{
  const skill=readFileSync(join(root,'skills/sonnet-migration-evidence-gate/SKILL.md'),'utf8');
  for(const token of ['vendor-context','paired-observation','unpaired-observation','derived','unknown']) assert.match(skill,new RegExp(token,'i'));
  assert.match(skill,/Never use vendor-context or an unpaired observation as proof/i);
  assert.match(skill,/failed observed critical floor cannot be rescued/i);
  assert.match(skill,/Treat compatibility prerequisites as gates/i);
});

test('Skill computes bounded cost without imputing unknowns',()=>{
  const skill=readFileSync(join(root,'skills/sonnet-migration-evidence-gate/SKILL.md'),'utf8');
  for(const token of ['input rate','output rate','cache-read rate','cache-write rate']) assert.match(skill,new RegExp(token,'i'));
  assert.match(skill,/unknown component out of confirmed cost totals/i);
  assert.match(skill,/Do not impute missing cache, token, quality, latency, or pricing values as zero/i);
});

test('decision rules define quality, cost, latency, coverage, and verdict precedence',()=>{
  const rules=readFileSync(join(root,'skills/sonnet-migration-evidence-gate/references/decision-rules.md'),'utf8');
  for(const heading of ['Comparability ledger','Quality gates','Cost normalization','Latency normalization','Coverage and confidence','Verdict precedence']) assert.match(rules,new RegExp('^## '+heading+'$','m'));
  assert.match(rules,/28\/30 passes against a 100% floor fails/i);
  assert.match(rules,/failed critical group remains a hold/i);
});

test('report format is complete and auditable',()=>{
  const format=readFileSync(join(root,'skills/sonnet-migration-evidence-gate/references/report-format.md'),'utf8');
  for(const heading of ['Verdict','Evidence ledger','Gate table','Cost analysis','Compatibility and coverage','Rollout gates','Validation checklist','Rollback signals','Boundary']) assert.match(format,new RegExp('^## '+heading+'$','m'));
  assert.match(format,/Never let a portfolio average override a failed group gate/i);
});

test('archives contain the full Skill and bilingual docs',()=>{
  execFileSync('node',['package.mjs'],{cwd:root});
  const plugin=execFileSync('unzip',['-Z','-1','dist/sonnet-migration-evidence-gate-1.0.0.ipollowork-plugin'],{cwd:root,encoding:'utf8'});
  assert.deepEqual(plugin.trim().split('\n').sort(),[
    'ipollowork.plugin.json',
    'skills/sonnet-migration-evidence-gate/SKILL.md',
    'skills/sonnet-migration-evidence-gate/references/decision-rules.md',
    'skills/sonnet-migration-evidence-gate/references/report-format.md'
  ].sort());
  const skill=execFileSync('unzip',['-Z','-1','dist/sonnet-migration-evidence-gate-1.0.0-skill.zip'],{cwd:root,encoding:'utf8'});
  assert.match(skill,/^SKILL\.md$/m);
  assert.match(skill,/^references\/decision-rules\.md$/m);
  assert.match(skill,/^references\/report-format\.md$/m);
  const source=execFileSync('unzip',['-Z','-1','dist/sonnet-migration-evidence-gate-1.0.0-source.zip'],{cwd:root,encoding:'utf8'});
  assert.match(source,/README\.md/);
  assert.match(source,/README\.zh-CN\.md/);
  assert.match(source,/examples\/expected-report\.md/);
});

test('topics contain exact iPolloWork and event labels',()=>{
  const topics=JSON.parse(readFileSync(join(root,'topics.json')));
  for(const topic of ['ipollowork','ipollowork-plugin','anthropic','claude-sonnet-5-5','model-evaluation','llm-migration']) assert.ok(topics.includes(topic));
  assert.equal(topics.includes('ipollo-plugin'),false);
});

test('public docs are bilingual and product-focused',()=>{
  const en=readFileSync(join(root,'README.md'),'utf8');
  const zh=readFileSync(join(root,'README.zh-CN.md'),'utf8');
  for(const token of ['Who it is for','Inputs and outputs','End-to-end example','Install and use in iPolloWork','Tested environment and limits']) assert.match(en,new RegExp(token,'i'));
  for(const token of ['适用用户','输入与输出','端到端示例','在 iPolloWork 中安装和使用','实测环境与限制']) assert.match(zh,new RegExp(token));
  for(const heading of ['Why this exists','热点背景','热点与边界','Topic and limits']) assert.doesNotMatch(en+'\n'+zh,new RegExp('^#+\\s+'+heading+'$','mi'));
});

test('exact advisory boundary is embedded',()=>{
  const skill=readFileSync(join(root,'skills/sonnet-migration-evidence-gate/SKILL.md'),'utf8');
  assert.match(skill,/This migration assessment is advisory\. It has not changed model configuration, production traffic, budgets, or safeguards\./);
});
