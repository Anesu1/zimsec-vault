import re, time
from playwright.sync_api import sync_playwright

WIDTHS = [(390,"mobile"),(768,"tablet"),(1280,"desktop")]

with sync_playwright() as p:
    b = p.chromium.launch(headless=True)
    pg = b.new_page(viewport={"width":1280,"height":1400})
    pg.goto("http://localhost:3000"); pg.wait_for_load_state("networkidle")
    # auth screen shots first
    for w,name in WIDTHS:
        pg.set_viewport_size({"width":w,"height":1400})
        pg.wait_for_timeout(300)
        pg.screenshot(path=f".resp-auth-{name}.png")
    # register
    pg.set_viewport_size({"width":1280,"height":1400})
    pg.get_by_role("button", name="Sign Up").click()
    pg.get_by_placeholder("e.g. MathWarrior99").fill("resp_%d" % int(time.time()))
    pg.locator("button[title]").first.click()
    pg.get_by_role("button", name=re.compile("Create My Account")).click()
    pg.wait_for_timeout(2500)
    # chamber setup at each width
    for w,name in WIDTHS:
        pg.set_viewport_size({"width":w,"height":1600}); pg.wait_for_timeout(400)
        pg.screenshot(path=f".resp-setup-{name}.png", full_page=True)
    # parent dashboard
    pg.set_viewport_size({"width":1280,"height":1600})
    pg.get_by_role("button", name=re.compile("Parent Progress Centre")).click(); pg.wait_for_timeout(600)
    for w,name in WIDTHS:
        pg.set_viewport_size({"width":w,"height":1800}); pg.wait_for_timeout(400)
        pg.screenshot(path=f".resp-dash-{name}.png", full_page=True)
    b.close()
print("done")
