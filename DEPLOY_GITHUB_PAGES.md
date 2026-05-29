# GitHub Pages 更新 SOP

这份文档记录当前项目已经验证可用的公开更新流程，目标是：

- 后续继续沿用同一个 GitHub 仓库
- 后续继续沿用同一个 GitHub Pages 地址
- 不再重复踩“推了代码但公网没更新”的坑

最后一次按本文档完整验证通过的日期：`2026-05-29`

## 固定发布资产

- GitHub 仓库：`https://github.com/televgtamfe-coder/meiyouds-weijuejingqi`
- GitHub Pages：`https://televgtamfe-coder.github.io/meiyouds-weijuejingqi/`
- 主审查入口：`https://televgtamfe-coder.github.io/meiyouds-weijuejingqi/#/scene1`

常用 hash 路由：

- `#/scene1`
- `#/scene1-home`
- `#/scene1-message`
- `#/scene1-my`
- `#/scene1-perimenopause`
- `#/scene1-prep`
- `#/scene1-parenting`

## 硬性约束

- 不要新建 GitHub 仓库。
- 不要把公开名字改回 `meiyou-suiji`。
- 统一沿用 `meiyouds-weijuejingqi`。
- 默认只维护 GitHub Pages 这一个公开渠道。
- 只有用户再次明确要求时，才更新 Vercel；而且只能更新现有 Vercel 项目，不能新建。
- 不要随意回退已经修好的 `.gitignore`。
- 不要随意改 `vite.config.ts` 里当前可用的 Pages 配置。

## 当前发布事实

- 路由使用的是 `HashRouter`，静态托管依赖 `#/scene1` 这种地址。
- GitHub Actions 工作流文件是 `.github/workflows/pages.yml`。
- 触发分支是 `main`。
- 实操上，`docs/` 必须视为公开发布产物的一部分，更新公网前要一起刷新。

## 这次确认过的关键坑

### 1. 不能只改源码，不刷新 `docs/`

这次已经验证：后续公开更新的安全做法是：

1. 改源码
2. 本地验证
3. 运行 `node scripts/build-standalone.js`
4. 把刷新后的 `docs/` 一起提交
5. 再推到 `main`

不要依赖“只推源码，公网会自动变新”这种侥幸路径。

### 2. 当前本地分支不一定能直接推到 `main`

本地工作分支可能是 `public-main`。

所以不要想当然执行裸 `git push`。

公开发布时统一使用：

```bash
git push origin HEAD:main
```

这样可以确保更新进入真正触发公开站点的 `main`。

### 3. 手机上看起来没更新，不一定是没推上去

优先按这个顺序排查：

1. GitHub Pages 还在发布，等 `1` 到 `3` 分钟
2. 手机浏览器缓存没刷新，先强刷
3. 打开的不是正确的 hash 路由
4. `docs/index.html` 没刷新到最新资源哈希

## 发布前必须检查

### 仓库与分支

```bash
git remote -v
git branch -vv
```

确认：

- 远端仍然是 `televgtamfe-coder/meiyouds-weijuejingqi`
- 发布目标仍然是 `main`

### 路由与配置

确认以下文件不要被误改坏：

- `src/main.tsx` 仍然是 `HashRouter`
- `vite.config.ts` 保持当前已验证可用的 Pages 配置

### 页面层面

重点看手机效果：

- 底部 tab 不能被内容顶出去
- 不要把整页高度重新写死成 `812px`
- 滚动区必须留在手机壳内部
- `scene1` 相关 hash 路由必须还能打开

## 推荐更新流程

### 1. 本地开发

先完成需求改动。

### 2. 本地验证

至少执行：

```bash
npm run build
node scripts/build-standalone.js
```

如果改的是 `scene1`，优先补跑相关测试，例如：

```bash
npm test -- tests/scene1/scene1-ui.test.tsx tests/scene1/scene1-assessment-flow.test.tsx
```

如果改的是其他模块，也按“就近、针对性”的原则跑对应测试。

### 3. 检查 `docs/` 是否已刷新

重点检查：

- `dist/index.html` 是否已经生成最新资源哈希
- `docs/index.html` 是否已经切到同一组哈希
- `docs/assets/` 是否已经包含对应的新文件

### 4. 提交代码

可以按两种方式做：

#### 方式 A：一次提交

源码和 `docs/` 一起提交。

#### 方式 B：两次提交

这次实践验证过，下面这种方式最稳：

1. 先提交源码改动
2. 再刷新 `docs/`
3. 再单独提交一次 `docs/`

比如：

```bash
git commit -m "feat: xxx"
git commit -m "chore: refresh github pages docs"
```

### 5. 显式推送到 `main`

```bash
git push origin HEAD:main
```

不要用裸 `git push` 代替这一步。

### 6. 等待 GitHub Pages 发布

推送后等待 `1` 到 `3` 分钟，再做公网验证。

### 7. 公网验收

优先检查这些地址：

- `https://televgtamfe-coder.github.io/meiyouds-weijuejingqi/#/scene1`
- `https://televgtamfe-coder.github.io/meiyouds-weijuejingqi/#/scene1-home`
- `https://televgtamfe-coder.github.io/meiyouds-weijuejingqi/#/scene1-message`
- `https://televgtamfe-coder.github.io/meiyouds-weijuejingqi/#/scene1-my`
- `https://televgtamfe-coder.github.io/meiyouds-weijuejingqi/#/scene1-perimenopause`

如果本次还改了其他独立页，也要把对应地址一起验，例如：

- `https://televgtamfe-coder.github.io/meiyouds-weijuejingqi/#/scene1-prep`
- `https://televgtamfe-coder.github.io/meiyouds-weijuejingqi/#/scene1-parenting`

## 公网看起来没更新时的恢复流程

按这个顺序来：

### 快速排查

1. 先等几分钟
2. 手机浏览器强刷
3. 确认打开的是正确 hash 路由

### 如果还是旧包

重新执行：

```bash
npm run build
node scripts/build-standalone.js
git status --short docs
```

然后确认 `docs/index.html` 已经切到新 hash，再把 `docs/` 提交并重新推：

```bash
git add docs
git commit -m "chore: refresh github pages docs"
git push origin HEAD:main
```

## 发布完成后的标准回报

每次对外回报时都要明确说明：

- 这次是沿用原 GitHub 仓库更新
- 这次是沿用原 GitHub Pages 地址更新
- 没有重建仓库
- 没有改公开地址名字

并附上：

- GitHub 仓库地址
- GitHub Pages 地址
- 本次相对上次的改动点

## 一句话版本

后续公开更新就按这条铁律执行：

**改源码 -> 本地验证 -> 刷新 `docs/` -> 提交源码与 `docs/` -> `git push origin HEAD:main` -> 等待 Pages -> 用 hash 路由验收。**
