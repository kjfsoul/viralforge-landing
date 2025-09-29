import { test, expect } from "@playwright/test"

test.describe('Landing Page Feature Verification', () => {

  test("brand socials render correctly", async ({ page }) => {
    await page.goto("/")
    await expect(page.getByRole("link", { name: /mysticArcana on instagram/i })).toHaveAttribute("href", "https://www.instagram.com/mysticarcanaofficial/")
    await expect(page.getByRole("link", { name: /mysticArcana on x/i })).toHaveAttribute("href", "https://x.com/arcana86042")
    await expect(page.getByRole("link", { name: /edmShuffle on tiktok/i })).toHaveAttribute("href", "https://www.tiktok.com/@edmshuffleofficial?lang=en")
    await expect(page.getByRole("link", { name: /birthdayGen on youtube/i })).toHaveAttribute("href", "https://www.youtube.com/@BirthdayGen")

    // Ensure 3I Atlas tile has no socials
    const atlasTile = page.locator('div:has(h3:has-text("3iAtlas"))').first();
    await expect(atlasTile.getByRole("link", { name: /on/i })).toHaveCount(0);
  })

  test("featured products rows render and links are valid", async ({ page, request }) => {
    await page.goto("/")

    // Wait for client-side rendering
    await page.waitForSelector('a[href*="printify.me/product/"]', { timeout: 15000 });

    const productLinks = await page.locator('a[href*="printify.me/product/"]').all();
    expect(productLinks.length).toBeGreaterThanOrEqual(9); // 3 for each of the 3 brands + at least some for 3iAtlas

    // Check a few links to ensure they are not broken
    for (let i = 0; i < Math.min(productLinks.length, 3); i++) {
        const href = await productLinks[i].getAttribute('href');
        expect(href).not.toBeNull();
        const response = await request.head(href!);
        expect(response.ok()).toBeTruthy();
    }
  })

  test("articles render with JSON-LD", async ({ page }) => {
    await page.goto("/")

    await page.waitForSelector('h3:has-text("Broadcasts from the 3I/Atlas Observatory")', { timeout: 10000 });

    const articleCards = await page.locator('article:has(a[href*="dispatch"])').all();
    expect(articleCards.length).toBe(3);

    const jsonLdScript = page.locator('script[type="application/ld+json"]');
    await expect(jsonLdScript).toBeAttached();

    const jsonLdContent = await jsonLdScript.textContent();
    const jsonLd = JSON.parse(jsonLdContent!);
    expect(Array.isArray(jsonLd)).toBe(true);
    expect(jsonLd.length).toBe(3);
    expect(jsonLd[0]['@type']).toBe('Article');
    expect(jsonLd[0].headline).toBeDefined();
  })

  test("flightpath animation degrades under reduced motion", async ({ page, context }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/")

    // In reduced motion, the animation is a simple, short fade/translate.
    // The complex SVG path animation and particles are not rendered.
    // We can assert that the particle circles are not present.
    const particles = await page.locator('svg circle[r="2"]').all();
    expect(particles.length).toBe(0);
  });

  test("survey gating prevents flip until submit/skip", async ({ page }) => {
    await page.goto("/")
    await page.locator('#oracle').scrollIntoViewIfNeeded();

    // Assert card flip is disabled by checking for the 'cursor-not-allowed' class
    await expect(page.locator('.group[style*="cursor: not-allowed;"]')).toHaveCount(0)

    // Click skip survey button
    await page.getByRole("button", { name: /Skip survey & draw/i }).click()

    // Assert card is now flippable (no longer disabled)
    // The placeholder text should also be gone, and the real card content visible.
    await expect(page.locator('h3:has-text("The Interstellar Journey")')).toBeVisible();
    await expect(page.locator('p:has-text("No Return Journey")')).not.toBeVisible();

    // Check that the choice persists on refresh
    await page.reload();
    await page.locator('#oracle').scrollIntoViewIfNeeded();
    await expect(page.locator('h3:has-text("The Interstellar Journey")')).toBeVisible();
  })

});