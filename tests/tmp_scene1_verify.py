from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 390, "height": 844})
    page.goto("http://localhost:4173/", wait_until="networkidle")
    print("TITLE:", page.title())
    print("HAS_RECORD:", page.locator("text=记录").count())
    page.locator("textarea[aria-label='记录输入']").fill("月经来了")
    page.locator("button[aria-label='发送']").click()
    page.wait_for_timeout(300)
    print("HAS_ANALYSIS:", page.locator("text=已识别到新的经期记录").count())
    page.locator("button[aria-label='查看分析']").click()
    page.wait_for_timeout(300)
    print("URL:", page.url)
    print("HAS_RECORD_SKELETON:", page.locator("text=记录详情骨架").count())
    browser.close()
