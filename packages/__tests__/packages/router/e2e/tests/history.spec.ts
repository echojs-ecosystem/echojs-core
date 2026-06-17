import { expect, test } from '@playwright/test'

test.describe('history integration', () => {
  test('back and forward restore route content and URL', async ({ page }) => {
    await page.goto('/')
    await page.goto('/app/a')
    await page.goto('/app/b')

    await expect(page).toHaveURL('/app/b')
    await expect(page.getByTestId('page-docs-b')).toBeVisible()

    await page.goBack()
    await expect(page).toHaveURL('/app/a')
    await expect(page.getByTestId('page-docs-a')).toBeVisible()

    await page.goBack()
    await expect(page).toHaveURL('/')
    await expect(page.getByTestId('page-home')).toBeVisible()

    await page.goForward()
    await expect(page).toHaveURL('/app/a')
    await expect(page.getByTestId('page-docs-a')).toBeVisible()
  })
})
