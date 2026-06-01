# 部署与发布规则

本文件与 `AGENTS.md` 保持一致，作为项目内的部署说明与备查文档。
后续更新 GitHub / GitHub Pages / Vercel 时，以本文件和 `AGENTS.md` 为准，不再沿用旧版本规则。

当用户提出以下任意意思时，自动命中本流程：

- 更新 GitHub
- 更新 Pages
- 更新线上版本
- 发布到公网
- 同步到 github.io
- 更新 GitHub 和 Vercel
- 部署最新代码
- 推送线上可访问版本

项目本地路径：
`C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export`

## 一、当前部署资产

1. GitHub 仓库已经存在，必须沿用这个，不要新建仓库：
   `https://github.com/televgtamfe-coder/meiyouds-weijuejingqi`

2. GitHub Pages 对外地址已经存在，必须沿用这个，不要换名字：
   `https://televgtamfe-coder.github.io/meiyouds-weijuejingqi/`

3. 页面实际访问使用 hash 路由，审查和验收时使用这些地址：
   `https://televgtamfe-coder.github.io/meiyouds-weijuejingqi/#/scene1`
   `https://televgtamfe-coder.github.io/meiyouds-weijuejingqi/#/scene1-home`
   `https://televgtamfe-coder.github.io/meiyouds-weijuejingqi/#/scene1-message`
   `https://televgtamfe-coder.github.io/meiyouds-weijuejingqi/#/scene1-my`
   `https://televgtamfe-coder.github.io/meiyouds-weijuejingqi/#/scene1-perimenopause`
   后续 H5 验证默认只保留 GitHub Pages 域名进行审查，不再使用 Vercel 域名作为 H5 验证地址。

4. Vercel 以前接通过，但用户后续明确说过“只保留 githubio”。
   默认情况下：
   - 只更新 GitHub / GitHub Pages
   - 不主动更新 Vercel
   只有当用户这次明确再次要求“同时更新 Vercel”时，才更新现有 Vercel 项目。

## 二、最重要的历史约束

1. 不要再用 `meiyou-suiji` 作为仓库名、项目名、公开地址名。
   统一使用：
   `meiyouds-weijuejingqi`

2. 不要重建 GitHub 仓库

3. 不要重建 Vercel 项目

4. 必须直接复用之前已经存在的同一套仓库 / Pages / Vercel 项目

5. 不要改坏 GitHub Pages 的 base 配置

6. 不要把已经修过的 `.gitignore` 和 `vite.config.ts` 回退

## 三、历史上遇到过的问题，更新时必须规避

1. 以前曾生成过错误名字的仓库和地址，后来已经统一改成：
   `meiyouds-weijuejingqi`
   后续任何更新都必须保持这个名字不变。

2. GitHub Pages 手机上看起来“没更新”，很多时候不是没推上去，而是：
   - Pages 还在发布
   - 浏览器缓存没刷新
   所以推送后必须等待 1 到 3 分钟，再强刷验证。

3. “我的”页底部栏以前在公网不显示，根因是页面高度被写死成 `812px`。
   后续不要再把整页高度写死，尤其不要把底部 tab 所在页面写死高度。

4. 公网图片加载慢，尤其是：
   - 首页 feeds 图片
   - 消息页头像
   后续更新时不要再引入超大的未优化图片；
   要保留 `loading="lazy"`、`decoding="async"`；
   必要时主动压缩素材。

5. 用户非常在意：
   - 手机端显示
   - 底部 tab 是否完整显示
   - GitHub Pages 地址是否还是原来那条 github.io
   所以每次更新后，必须优先从手机视角核查这些问题。

6. 发生过一次“Vercel 已更新，但 GitHub Pages 验收地址仍返回旧 bundle”的情况：
   - 当时 Vercel 已更新到新资源：`index-BvqSwz6_.js`、`index-Bej1CNHb.css`
   - GitHub Pages 验收地址一开始仍返回旧资源：`index-BPH_8cwP.js`、`index-BkQ6IUPp.css`
   - 根因是流程误判：只看了 Vercel 已更新或 GitHub Actions success，没有先以 GitHub Pages 验收地址做最终核查
   - 后续部署是否成功，必须优先以这个地址为准：`https://televgtamfe-coder.github.io/meiyouds-weijuejingqi/#/scene1`

## 四、部署前必须检查

1. 确认 git remote 仍然指向：
   `televgtamfe-coder/meiyouds-weijuejingqi`

2. 确认 `vite.config.ts` 里 GitHub Pages 的 `base` 仍然匹配仓库名：
   `/meiyouds-weijuejingqi/`

3. 确认路由仍然可通过 hash 路由访问

4. 确认底部 tab 没有被页面内容顶出去

5. 先本地验证：
   - `npm run build`
   - 必要时跑相关 scene1 测试

## 五、推荐更新流程

1. 在本地完成代码修改

2. 本地验证：
   - `npm run build`
   - 跑本次改动相关测试

3. 提交并推送到已有 GitHub 仓库

4. 等 GitHub Pages 自动发布
   - 不要改项目名
   - 不要改仓库名
   - 不要新建 Pages 项目

5. 用以下地址直接验收：
   - `https://televgtamfe-coder.github.io/meiyouds-weijuejingqi/#/scene1`
   - `https://televgtamfe-coder.github.io/meiyouds-weijuejingqi/#/scene1-home`
   - `https://televgtamfe-coder.github.io/meiyouds-weijuejingqi/#/scene1-message`
   - `https://televgtamfe-coder.github.io/meiyouds-weijuejingqi/#/scene1-my`
   - `https://televgtamfe-coder.github.io/meiyouds-weijuejingqi/#/scene1-perimenopause`

6. 如果用户这次明确要求同时更新 Vercel：
   - 只更新现有 Vercel 项目
   - 直接触发现有项目重新部署最新 commit
   - 不要新建 project
   - 不要重新 import 一个新仓库

如果出现“Vercel 已更新，但 Pages 看起来没变”：
- 先确认最新 commit 已在 `main`
- 再确认 `Deploy GitHub Pages` workflow 对应最新 SHA 且成功
- 抓取 GitHub Pages 公网 `index.html`，比对 asset hash 是否与本地 `docs/index.html` 或 `dist/index.html` 一致
- 等待 1 到 3 分钟后强刷缓存
- 若仍然是旧 bundle，重跑现有 `pages.yml` workflow，不要新建 Pages / Vercel 项目

## 六、和用户沟通时的要求

1. 明确告诉用户：
   - 这次是“沿用原 GitHub 仓库和原 Pages 地址更新”
   - “没有重建”

2. 更新后要给用户：
   - GitHub 仓库地址
   - GitHub Pages 可直接访问地址
   - 本次相对上次更新的内容

3. 如果手机端看起来没变化，先从以下三项排查：
   - Pages 发布延迟
   - 浏览器缓存
   - hash 路由地址是否正确
   不要立刻判断为“代码没推上去”。

## 七、执行原则

1. 默认以 GitHub Pages 为唯一主发布渠道

2. Vercel 只有在用户再次明确要求时才一起更新

3. 绝对不要重建 repo / Pages / project

4. 绝对不要改公开地址名字

5. H5 验证与验收默认只使用 GitHub Pages 域名

6. 修改完成后，直接按已有方式更新，不要再走第一次部署时的探索流程

7. 不能只因为 Vercel ready 或 GitHub Actions success 就宣布更新完成；GitHub Pages 验收地址才是最终验收源

## 八、默认输出格式

完成部署后，输出内容至少包括：

1. 是否已更新 GitHub
2. 是否已更新 GitHub Pages
3. 是否已更新 Vercel
4. 本次沿用的仓库 / 项目 / 地址
5. 本次更新内容摘要
6. 验收地址
7. 若手机端未立即生效，需要提醒用户等待 1 到 3 分钟并强刷缓存
8. GitHub Pages 验收地址是否已实际检查并通过

## 九、禁止事项

1. 禁止新建仓库
2. 禁止新建 Vercel 项目
3. 禁止更换仓库名
4. 禁止更换 github.io 地址名
5. 禁止回退部署相关修复
6. 禁止绕开本地验证直接推送
