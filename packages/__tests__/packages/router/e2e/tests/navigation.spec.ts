import { expect, test } from '@playwright/test'

test.describe('browser navigation', () => {
  test('home route renders without docs shell', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByTestId('page-home')).toBeVisible()
    await expect(page.getByTestId('docs-shell')).toHaveCount(0)
    await expect(page).toHaveURL('/')
  })

  test('navigates into layout child and updates URL', async ({ page }) => {
    await page.goto('/')
    await page.goto('/app/a')

    await expect(page.getByTestId('docs-shell')).toBeVisible()
    await expect(page.getByTestId('page-docs-a')).toBeVisible()
    await expect(page).toHaveURL('/app/a')
  })

  test('returns to home and unmounts docs shell', async ({ page }) => {
    await page.goto('/app/b')
    await page.getByRole('link', { name: 'Exit to home' }).click()

    await expect(page.getByTestId('page-home')).toBeVisible()
    await expect(page.getByTestId('docs-shell')).toHaveCount(0)
    await expect(page).toHaveURL('/')
  })
})
