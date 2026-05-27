# 美柚 H5 迁移说明

## 导出内容
此目录包含当前已复现的完整工程内容，已去除 `.git` 和 `node_modules`，便于迁移到新项目目录。

### 重点目录
- `src/` 当前 React 工程源码
- `src/scenes/scene1/` scene1 当前复现结果
- `src/scenes/scene2/` scene2 当前复现结果
- `src/scenes/scene3/` scene3 当前复现结果
- `src/scenes/record-shell/` record 承接页
- `src/styles/` 当前样式入口与分场景样式
- `tests/` 当前全部测试
- `docs/` 当前静态产物输出
- `docs/RESTORATION_BASELINE.md` 后续复原基线文档
- `MIGRATION_SUMMARY.md` 当前阶段总结

## 启动方式
迁移后在新目录执行：

```bash
npm install
npm run dev
```

## 构建方式
```bash
npm run build
node scripts/build-standalone.js
```

## 当前页面入口
- scene1: `/#/scene1`
- record: `/#/record`
- scene2: `/#/scene2`
- scene3: `/#/scene3`

## 真值来源
后续继续复原请优先参考：
- `docs/RESTORATION_BASELINE.md`
- 原始单文件产物：`meiyou-scene1-period-calendar.html`、`meiyou-scene2-record-empty.html`、`meiyou-scene3-record-blank.html`
- 对应原始源码：`calendar-page.jsx`、`record-empty.jsx`、`record-blank.jsx`
