import { test, expect } from "@playwright/test";

test("user can sign in and view dashboard", async ({ page }) => {
  await page.goto("/");
  
  // Should redirect to signin page
  await expect(page).toHaveURL("/auth/signin");
  
  // Fill in demo credentials
  await page.fill("input[name=email]", "demo@example.com");
  await page.fill("input[name=password]", "demo123");
  
  // Submit form
  await page.click("button[type=submit]");
  
  // Should redirect to dashboard
  await expect(page).toHaveURL("/dashboard");
  
  // Should show dashboard content
  await expect(page.locator("h1")).toContainText("Jobs Tracker");
  await expect(page.locator("text=Total Jobs")).toBeVisible();
});

test("user can create a new job", async ({ page }) => {
  // Sign in first
  await page.goto("/auth/signin");
  await page.fill("input[name=email]", "demo@example.com");
  await page.fill("input[name=password]", "demo123");
  await page.click("button[type=submit]");
  
  // Wait for dashboard to load
  await expect(page).toHaveURL("/dashboard");
  
  // Click add job button
  await page.click("text=Add Job");
  
  // Fill in job form
  await page.fill("input[name=title]", "Test Job");
  await page.fill("input[name=company]", "Test Company");
  await page.fill("input[name=location]", "Test Location");
  await page.selectOption("select[name=stage]", "APPLIED");
  await page.selectOption("select[name=priority]", "HIGH");
  
  // Submit form
  await page.click("text=Create");
  
  // Should close form and show new job
  await expect(page.locator("text=Test Job").first()).toBeVisible();
  await expect(page.locator("text=Test Company").first()).toBeVisible();
});
