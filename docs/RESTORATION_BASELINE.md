# 美柚 H5 复原基线

## 目标
后续所有页面与交互复原，优先以 GitHub 仓库中原始场景源码与单文件产物为真值，不再凭空补设计。

## 真值优先级
1. 原始页面实际渲染结果
2. 对应单文件场景产物（meiyou-scene*.html）
3. 场景源码（calendar-page.jsx / record-empty.jsx / record-blank.jsx）
4. 对应样式文件（calendar.css / record-empty.css / record-blank.css）
5. 交互与场景边界（demo-scenes.jsx / app.jsx）
6. 文案与示例数据（data.jsx）
7. 输入与弹层能力（cloud-publisher.jsx / compose-portal.jsx / mood-picker.jsx / quick-pickers.jsx）
8. 搜索能力（search-page.jsx / search.css）
9. 设计语言文档（design/DESIGN-meiyou-510.md）

## 页面级复原来源
### scene1
- meiyou-scene1-period-calendar.html
- calendar-page.jsx
- calendar.css

### scene2
- meiyou-scene2-record-empty.html
- record-empty.jsx
- record-empty.css

### scene3
- meiyou-scene3-record-blank.html
- record-blank.jsx
- record-blank.css

### record 承接页
- timeline.jsx
- timeline.css
- timeline-modules.jsx
- timeline-sister-cards.jsx
- timeline-v3v2-cards.jsx

## 交互复原原则
- 当原始链接与通用组件定义冲突时，以原始链接实际渲染结果为准。
- scene1 是当前唯一明确可逐项临摹的一页；scene2 / scene3 / record 属于原型语义延续页，但仍优先沿用仓库里的原始场景源码。
- 多场景联动优先参考 demo-scenes.jsx 与 app.jsx 的原始状态流，而不是重新发明新流程。

## 工程约束
- scene2 / scene3 样式保持独立文件，不再堆回 base.css。
- 新实现优先从原始 JSX 与 CSS 迁移，不优先手写新结构。
- 文案、标签、示例数据优先复用 data.jsx，避免人工改写导致语义偏移。
