import { expect, test } from "@playwright/test";

test.describe("layout outlet", () => {
  test("keeps shell mounted while swapping child routes", async ({ page }) => {
    await page.goto("/app/a");
    const shell = page.getByTestId("docs-shell");
    await expect(shell).toBeVisible();
    await expect(page.getByTestId("page-docs-a")).toBeVisible();

    await page.getByRole("link", { name: "Page B" }).click();

    await expect(shell).toBeVisible();
    await expect(page.getByTestId("page-docs-b")).toBeVisible();
    await expect(page.getByTestId("page-docs-a")).toHaveCount(0);
    await expect(page).toHaveURL("/app/b");
  });

  test("applies NavLink active class on current child", async ({ page }) => {
    await page.goto("/app/a");

    const linkA = page.getByRole("link", { name: "Page A" });
    const linkB = page.getByRole("link", { name: "Page B" });

    await expect(linkA).toHaveClass(/active/);
    await expect(linkB).not.toHaveClass(/active/);

    await linkB.click();

    await expect(linkB).toHaveClass(/active/);
    await expect(linkA).not.toHaveClass(/active/);
  });
});
