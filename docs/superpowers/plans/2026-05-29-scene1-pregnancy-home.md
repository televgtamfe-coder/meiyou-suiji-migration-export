# Scene1 Pregnancy Home Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a standalone `scene1` pregnancy homepage that matches the exported layout proportions, opens from the `scene1` mode switch, and keeps the page usable inside the existing phone shell.

**Architecture:** Follow the existing `Scene1PrepPage` and `Scene1ParentingPage` pattern: add one standalone page component under `src/scenes/scene1`, wire it into `src/app/router.tsx`, special-case `怀孕` in `Scene1Page.tsx`, and keep all visual rules namespaced under `.scene1-pregnancy-*` in `src/styles/base.css`. Reuse `StatusBar`, `Scene1BottomTabBar`, and the existing route shell so the new page behaves like the other `scene1` standalone pages.

**Tech Stack:** React 18, React Router 6, Vite 5, Vitest 2, Testing Library, plain CSS

---

### Task 1: Add the pregnancy route tests first

**Files:**
- Modify: `C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\tests\scene1\scene1-ui.test.tsx`
- Test: `C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\tests\scene1\scene1-ui.test.tsx`

- [ ] **Step 1: Write the failing route-shell test**

```tsx
  it('renders the pregnancy page route shell', () => {
    render(
      <MemoryRouter initialEntries={['/scene1-pregnancy']}>
        <AppRouter />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('scene1-pregnancy-shell')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-pregnancy-hero')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-pregnancy-quick-grid')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-pregnancy-changes-card')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-pregnancy-services-grid')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-pregnancy-article-card')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-pregnancy-checkin-card')).toBeInTheDocument();
  });
```

- [ ] **Step 2: Write the failing navigation test**

```tsx
  it('navigates to the pregnancy page from the scene1 mode switch', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/scene1']}>
        <AppRouter />
      </MemoryRouter>,
    );

    await user.click(screen.getByRole('button', { name: '稍后再说' }));
    await user.click(screen.getByRole('button', { name: '怀孕' }));

    expect(screen.getByTestId('scene1-pregnancy-shell')).toBeInTheDocument();
  });
```

- [ ] **Step 3: Run the focused UI test file to verify RED**

Run: `npm test -- tests/scene1/scene1-ui.test.tsx`  
Expected: FAIL because `/scene1-pregnancy` is not routed yet and `scene1-pregnancy-*` test ids do not exist yet.

- [ ] **Step 4: Keep the existing parenting navigation test aligned**

```tsx
  it('navigates to the parenting page from the scene1 mode switch', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/scene1']}>
        <AppRouter />
      </MemoryRouter>,
    );

    await user.click(screen.getByRole('button', { name: '稍后再说' }));
    await user.click(screen.getByRole('button', { name: '育儿' }));

    expect(screen.getByTestId('scene1-parenting-shell')).toBeInTheDocument();
  });
```

- [ ] **Step 5: Commit**

```bash
git add C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\tests\scene1\scene1-ui.test.tsx
git commit -m "test: add scene1 pregnancy page coverage"
```

### Task 2: Add the standalone pregnancy page component

**Files:**
- Create: `C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\src\scenes\scene1\Scene1PregnancyPage.tsx`
- Create: `C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\src\assets\scene1-pregnancy\`
- Test: `C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\tests\scene1\scene1-ui.test.tsx`

- [ ] **Step 1: Copy only the required pregnancy assets**

Copy the minimal artwork/photo set from the extracted export into `src/assets/scene1-pregnancy/`, keeping filenames stable and focused on:

```text
hero background / hero illustration / quick-entry icons / service icons / article photo strip / avatar / check-in art
```

- [ ] **Step 2: Write the page structure that matches the reviewed spec**

```tsx
import heroBackground from '../../assets/scene1-pregnancy/bg0.png';
import heroIllustration from '../../assets/scene1-pregnancy/990b3eae88a8abea9dc5b823d878ce62a96b8388.png';
import articlePhotoA from '../../assets/scene1-pregnancy/5dc14bab99b339fd992a6f5c0a2dc0a1fd42b5c3.png';
import articlePhotoB from '../../assets/scene1-pregnancy/84737e0ae3402fa33a235e8b6e0d4da68a63cb94.png';
import articlePhotoC from '../../assets/scene1-pregnancy/63fc3fcc2b72b6ca1b3d9e4770641b7b471e2e57.png';
import checkinArt from '../../assets/scene1-pregnancy/a3d4f8b7723d1dc79b9b04e9bd8c0a12b374d598.png';
import { Scene1BottomTabBar } from './components/Scene1BottomTabBar';
import { StatusBar } from './components/StatusBar';

const pregnancyDates = [
  { label: '2天(8月31日)' },
  { label: '8周3天(9月1日)', active: true },
  { label: '8周4天(9月2日)' },
];

const pregnancyQuickActions = [
  { key: 'doctor', label: '问医生' },
  { key: 'food', label: '能不能吃' },
  { key: 'checkup', label: '产检时间表' },
  { key: 'hcg', label: 'hCG查询' },
  { key: 'weight', label: '孕期体重' },
] as const;

const pregnancyServiceItems = [
  { key: 'skincare', label: '孕妈护肤' },
  { key: 'nanny', label: '月嫂报价' },
  { key: 'journal', label: '宝宝记' },
  { key: 'group', label: '同城孕妈群' },
  { key: 'exercise', label: '能不能做' },
] as const;

export function Scene1PregnancyPage() {
  return (
    <div className="scene1-pregnancy-page" data-testid="scene1-pregnancy-shell">
      <StatusBar />

      <div className="scene1-pregnancy-scroll">
        <header className="scene1-pregnancy-hero" data-testid="scene1-pregnancy-hero">
          {/* date strip */}
          {/* main pregnancy card */}
        </header>

        <main className="scene1-pregnancy-body">
          <section className="scene1-pregnancy-quick-card" data-testid="scene1-pregnancy-quick-grid">
            {/* five quick actions */}
          </section>

          <section className="scene1-pregnancy-changes-card" data-testid="scene1-pregnancy-changes-card">
            {/* 宝宝变化 / 妈妈变化 */}
          </section>

          <section className="scene1-pregnancy-services-card" data-testid="scene1-pregnancy-services-grid">
            {/* five service entries */}
          </section>

          <section className="scene1-pregnancy-article-card" data-testid="scene1-pregnancy-article-card">
            {/* article card */}
          </section>

          <section className="scene1-pregnancy-checkin-card" data-testid="scene1-pregnancy-checkin-card">
            {/* 每日签到挑战 +5 */}
          </section>
        </main>
      </div>

      <Scene1BottomTabBar activeTab="home" className="scene1-pregnancy-tabbar" />
      <div className="scene1-home-indicator" aria-hidden="true" />
    </div>
  );
}
```

- [ ] **Step 3: Use the export measurements as fixed layout anchors**

Carry these dimensions directly into CSS-backed markup:

```text
Main hero card width: 351px
Main hero card height: about 263px
Quick-entry block width: 351px
Quick-entry block top spacing: about 8px under hero
Quick-entry icon frame: 44px
Services / utility block height: about 156px
Change card inner padding: 8px 12px
Check-in row width: 327px with 8px inner padding
```

- [ ] **Step 4: Keep the copy clean and UTF-8-safe**

Use these exact labels instead of any garbled source text:

```text
距离预产期 / 236 / 天 / 回今天 / 身长 / 463 mm / 体重 / 2384 g / 38周
宝宝变化 / 妈妈变化 / 问医生 / 能不能吃 / 产检时间表 / hCG查询 / 孕期体重
孕妈护肤 / 月嫂报价 / 宝宝记 / 同城孕妈群 / 能不能做
菠萝是个大可爱 / 孕27周1天 / 潮湿的生活环境会得阴道炎吗？ / 全文 / 每日签到挑战 / +5
```

- [ ] **Step 5: Run the focused UI test file to verify GREEN for the new shell**

Run: `npm test -- tests/scene1/scene1-ui.test.tsx`  
Expected: pregnancy route-shell assertions now pass, while routing may still fail until Task 3 is done.

- [ ] **Step 6: Commit**

```bash
git add C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\src\scenes\scene1\Scene1PregnancyPage.tsx C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\src\assets\scene1-pregnancy
git commit -m "feat: add scene1 pregnancy homepage shell"
```

### Task 3: Wire the route and scene1 mode switch

**Files:**
- Modify: `C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\src\app\router.tsx`
- Modify: `C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\src\scenes\scene1\Scene1Page.tsx`
- Test: `C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\tests\scene1\scene1-ui.test.tsx`

- [ ] **Step 1: Import and mount the new pregnancy page route**

```tsx
import { Scene1PregnancyPage } from '../scenes/scene1/Scene1PregnancyPage';

function ScenePregnancyRouteShell() {
  return (
    <div className="app-root">
      <div className="phone-shell" data-testid="phone-shell">
        <Scene1PregnancyPage />
      </div>
    </div>
  );
}

// inside <Routes>
<Route path="/scene1-pregnancy" element={<ScenePregnancyRouteShell />} />
```

- [ ] **Step 2: Special-case `怀孕` in the existing mode switch**

```tsx
  function handleModeSelect(mode: string) {
    if (mode === '备孕') {
      navigate('/scene1-prep');
      return;
    }

    if (mode === '怀孕') {
      navigate('/scene1-pregnancy');
      return;
    }

    if (mode === '育儿') {
      navigate('/scene1-parenting');
      return;
    }

    setState((prev) => selectScene1Mode(prev, mode));
  }
```

- [ ] **Step 3: Run the focused UI test file again**

Run: `npm test -- tests/scene1/scene1-ui.test.tsx`  
Expected: PASS for both pregnancy tests, prep tests, parenting tests, and existing scene1 shell coverage.

- [ ] **Step 4: Commit**

```bash
git add C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\src\app\router.tsx C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\src\scenes\scene1\Scene1Page.tsx
git commit -m "feat: route scene1 pregnancy mode"
```

### Task 4: Add page-scoped pregnancy styles and verify shell behavior

**Files:**
- Modify: `C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\src\styles\base.css`
- Test: `C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\tests\scene1\scene1-ui.test.tsx`

- [ ] **Step 1: Add a namespaced `.scene1-pregnancy-*` block**

```css
.scene1-pregnancy-page {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: #f2f2f5;
}

.scene1-pregnancy-scroll {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0 0 108px;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}
```

- [ ] **Step 2: Match the export proportions instead of stretching everything**

Use these rules when writing the rest of the block:

```css
.scene1-pregnancy-hero { padding: 8px 12px 0; }
.scene1-pregnancy-main-card { width: 351px; max-width: 100%; min-height: 263px; }
.scene1-pregnancy-quick-card,
.scene1-pregnancy-services-card { border-radius: 12px; }
.scene1-pregnancy-quick-grid,
.scene1-pregnancy-services-grid { grid-template-columns: repeat(5, minmax(0, 1fr)); }
.scene1-pregnancy-body { gap: 8px; padding: 8px 12px 24px; }
.scene1-pregnancy-checkin-card { min-height: 40px; }
```

- [ ] **Step 3: Preserve the tab bar and scroll safe area**

```css
.scene1-pregnancy-tabbar {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 20px;
}
```

Do not add any page-root `height: 812px;`. Keep fixed heights only on the hero card, icon tiles, service block, and similar inner modules.

- [ ] **Step 4: Run the test file after the CSS block lands**

Run: `npm test -- tests/scene1/scene1-ui.test.tsx`  
Expected: PASS with no new test regressions caused by renamed or missing selectors.

- [ ] **Step 5: Commit**

```bash
git add C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\src\styles\base.css
git commit -m "style: add scene1 pregnancy page layout"
```

### Task 5: Final verification and optional scene1 regression check

**Files:**
- Verify: `C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\tests\scene1\scene1-ui.test.tsx`
- Verify: `C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\src\scenes\scene1\Scene1PregnancyPage.tsx`
- Verify: `C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\src\styles\base.css`

- [ ] **Step 1: Run the requested test command fresh**

Run: `npm test -- tests/scene1/scene1-ui.test.tsx`  
Expected: PASS, 0 failures.

- [ ] **Step 2: Run the production build fresh**

Run: `npm run build`  
Expected: PASS, Vite exits with code 0.

- [ ] **Step 3: If the pregnancy route touched shared scene1 behavior, run the adjacent flow test**

Run: `npm test -- tests/scene1/scene1-ui.test.tsx tests/scene1/scene1-assessment-flow.test.tsx`  
Expected: PASS if the shared `Scene1Page` flow changed.

- [ ] **Step 4: Review the final diff against the spec**

Checklist:

```text
/scene1-pregnancy route exists
Scene1 mode switch sends 怀孕 to /scene1-pregnancy
Page stays inside phone shell
Bottom tab remains visible
Scroll area still works
Main hero / quick grid / changes / services / article / check-in match the reviewed proportions
```

- [ ] **Step 5: Commit**

```bash
git add C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export
git commit -m "feat: integrate scene1 pregnancy homepage"
```
