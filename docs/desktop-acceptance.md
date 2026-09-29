# iPolloWork Desktop Acceptance / iPolloWork 桌面验收

## English

- Date: 2026-09-29
- Platform: macOS arm64
- iPolloWork: 0.50.12
- Project: AI 热点交付验收 2026-09-14
- Engine and model: OpenCode / configured project model
- Package: sonnet-migration-evidence-gate-1.0.0.ipollowork-plugin

The package was imported through **Extensions → Plugins → Add → File**. The preview identified publisher **lemonlavender**, version 1.0.0, one required Skill, and zero agents, commands, MCP servers, local services, native programs, or main-process code. The package passed the declarative safety check. The plugin and Skill were installed and enabled.

The acceptance task explicitly invoked Sonnet Migration Evidence Gate, decision-rules.md, and report-format.md against sonnet-migration-packet.md. iPolloWork loaded the installed Skill and both references, then wrote sonnet-migration-evidence-gate-acceptance.md in the local acceptance project.

The 242-line report passed these checks:

- verdict: hold;
- support: 47/50, above its 90% floor;
- extraction: 29/30, below its 100% critical floor;
- support observed cost: USD 19.450 to USD 17.425;
- extraction candidate cost remained incomplete because cache-write tokens were unknown;
- portfolio p95 was not fabricated from group percentiles;
- evidence classes, comparability gaps, rollout gates, validation checklist, rollback signals, and named approval gaps were present;
- the report ended with the required advisory boundary.

This acceptance verifies packaged import, installed Skill discovery, reference loading, invocation, arithmetic behavior, and Markdown file output. It does not call a model vendor API or change production configuration.

## 中文

- 日期：2026-09-29
- 平台：macOS arm64
- iPolloWork：0.50.12
- 项目：AI 热点交付验收 2026-09-14
- 引擎与模型：OpenCode / 项目现有模型
- 安装包：sonnet-migration-evidence-gate-1.0.0.ipollowork-plugin

通过 **扩展 → 插件 → 添加 → 文件** 导入安装包。预览正确识别发布者 **lemonlavender**、版本 1.0.0 与 1 个必需 Skill，并显示 0 个 Agent、命令、MCP、本地服务、原生程序和主进程代码。安装包通过声明式安全检查，插件与 Skill 均已安装并启用。

验收任务明确调用 Sonnet Migration Evidence Gate、decision-rules.md 和 report-format.md，审核 sonnet-migration-packet.md。iPolloWork 成功加载安装后的 Skill 与两个参考文件，并在本地验收项目生成 sonnet-migration-evidence-gate-acceptance.md。

生成的 242 行报告通过以下检查：

- 结论为 hold；
- support 为 47/50，达到 90% 门槛；
- extraction 为 29/30，未达到关键任务 100% 门槛；
- support 观测成本为 USD 19.450 至 USD 17.425；
- extraction 候选缓存写入 Token 未知，因此成本保持不完整；
- 未把分组 p95 伪造为组合 p95；
- 包含证据分类、可比性缺口、发布门槛、验证清单、回滚信号和具名审批缺口；
- 报告以要求的 advisory 边界句结尾。

本次验收覆盖安装包导入、安装后 Skill 发现、参考文件加载、调用、算术行为与 Markdown 文件输出。该过程未调用模型厂商 API，也未修改生产配置。
