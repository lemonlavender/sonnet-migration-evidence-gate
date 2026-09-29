# Sonnet Migration Evidence Gate

[English](README.md) · 支持 [iPolloWork](https://github.com/Devin-AXIS/iPolloWork)

Sonnet Migration Evidence Gate 是一个声明式 Skill，帮助团队判断 Claude Sonnet 模型升级是否适合进入生产环境。它把成对的基线与候选模型运行结果整理为可复核决策，覆盖各工作负载质量门槛、标准化 Token 成本、延迟变化、兼容性检查、覆盖缺口、分阶段发布条件及回滚信号。

安装包不会调用 Claude、修改模型配置或切换生产流量，只分析用户提供的证据。

## 适用用户

- 审核 Sonnet 模型升级的 AI 平台团队。
- 需要同时向成本、质量和风险评审说明迁移依据的应用负责人。
- 使用私有工作负载比较模型版本的评测工程师。
- 需要明确进入、停止和回滚条件的发布负责人。

## 适用场景

- 在客服、编码、结构化提取和文档任务上比较 Claude Sonnet 5 与 Claude Sonnet 5.5。
- 防止较好的组合平均值掩盖关键任务组失败。
- 把发布页面的性能声明与自有提示词上的实际结果分开。
- 在缓存或价格字段缺失时仍正确计算可确认的 Token 成本。
- 检查新的 thinking 或工具配置等兼容性前置条件。
- 设计 shadow 或 canary 分阶段发布，同时明确这只是计划而非已完成操作。

## Skill 能力

1. 区分厂商背景、成对观测、非成对观测、推导计算与未知信息。
2. 逐个检查关键任务组的质量门槛与最小成对运行数量。
3. 使用输入、输出、缓存读取和缓存写入 Token 计算两组成本。
4. 将字段不完整的行排除在确认总额之外，不把缺失值当作零。
5. 仅比较口径一致的延迟统计，并报告绝对与百分比变化。
6. 审核兼容性前置条件、覆盖缺口、生产流量证据和审批边界。
7. 输出 **go**、**limited-pilot**、**hold** 或 **blocked** 之一。
8. 生成带负责人和证据产物的验证及回滚门槛。

## 前置条件

- 基线模型 ID 与候选模型 ID。
- 每个重要工作负载的成对运行数与通过数。
- 质量门槛和关键性标记。
- 可比的延迟统计。
- 支撑成本结论的 Token 总量和价格。
- 已知兼容性变化及操作者可以控制的设置。

缺失数据可以保留为 unknown，报告会说明该事实如何影响决策。

## 输入与输出

输入为 Markdown 数据包或包含上述字段的等价结构化文本。Skill 不需要厂商账号或网络连接。

输出为 Markdown 迁移报告，包含：

- 结论及决定性事实；
- 证据清单；
- 各任务组门槛表；
- 已确认与不完整成本分析；
- 兼容性和覆盖审计；
- 发布门槛；
- 验证清单；
- 回滚信号；
- advisory 边界句。

## 端到端示例

以 [examples/migration-packet.md](examples/migration-packet.md) 作为输入。

任务示例：

> 使用 Sonnet Migration Evidence Gate 审核 examples/migration-packet.md。只使用该数据包，并将完整报告保存为 migration-report.md。

预期结果：

- 结论为 **hold**；
- 关键 extraction 任务为 29/30，未达到 100% 门槛；
- 未测试的工具配置仍是生产门槛；
- 候选 extraction 成本因缓存写入 Token 未知而不完整；
- support 的改进不能覆盖关键任务失败；
- 报告以精确 advisory 边界句结束。

精简预期结果见 [examples/expected-report.md](examples/expected-report.md)。

## 在 iPolloWork 中安装和使用

1. 打开 GitHub Release，下载 **sonnet-migration-evidence-gate-1.0.0.ipollowork-plugin**。
2. 在 iPolloWork 选择 **扩展 → 插件 → 添加 → 文件**。
3. 选择下载文件并检查预览，应显示发布者 **lemonlavender**、版本 **1.0.0** 和 1 个必需 Skill。
4. 安装后启用插件，并确认 **Sonnet Migration Evidence Gate** Skill 已启用。
5. 把证据数据包加入本地项目。
6. 新建任务，明确要求使用该 Skill，并指定数据包和输出文件。
7. 检查报告是否包含结论、证据分类、逐组门槛、成本排除项、兼容性状态、发布计划、回滚信号与边界句。
8. 通过项目原有流程导出或分享生成的 Markdown 报告。

该安装包是声明式资源，不申请权限、自定义授权、本地服务、原生代码、进程型 MCP 或网络连接。

### 独立 Skill 导入

下载并解压 **sonnet-migration-evidence-gate-1.0.0-skill.zip**。在 iPolloWork 的本地 Skill 导入页面选择直接包含 SKILL.md 的文件夹，并按提示重新加载。不要选择 ZIP 或仓库根目录。

## 构建和校验

需要 Node.js、系统 zip 和 unzip。

~~~sh
npm test
npm run package
cd dist
shasum -a 256 -c SHA256SUMS.txt
~~~

构建会生成 iPolloWork 安装包、独立 Skill ZIP、源码 ZIP 和 SHA256SUMS.txt。打包使用干净 staging、固定时间戳、拒绝符号链接，并保证压缩包根目录只有一个清单。

## 常见问题

**文件无法选择**

确认文件名以 .ipollowork-plugin 结尾，并使用插件文件导入入口。

**安装后找不到 Skill**

打开插件详情，启用插件和 Skill，并在软件提示时重新加载项目。

**报告在缓存字段未知时仍声称节省**

Skill 应将该行排除在确认总额之外。要求它重新读取 decision-rules.md 并生成成本章节。

**把厂商基准当作自有工作负载证明**

要求 Skill 给每条声明标记证据类别。厂商背景不能证明自有工作负载改善。

**关键门槛失败却输出 go**

这违反结论规则。已观测到的关键失败必须输出 hold。

## 实测环境与限制

安装包目标为 iPolloWork 0.50.12 或更高版本、macOS arm64。1.0.0 已在 macOS arm64 的 iPolloWork 0.50.12 中完成导入和调用。安装后的 Skill 成功加载两个参考文件并生成预期的 hold 报告。详见 [docs/desktop-acceptance.md](docs/desktop-acceptance.md)。

Skill 只评估输入证据，不执行模型调用、不核验厂商账单、不读取生产遥测、不认证安全性，也不批准部署。评测设计、安全审查、业务批准和人工验证仍由使用团队负责。
