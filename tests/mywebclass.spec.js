const { test, expect } = require('@playwright/test');

test('User should be able to access discussion forums', async ({ page }) => {
  await page.goto('https://example.com');
  await page.click('#discussion-forums-link');
  const title = await page.title();
  expect(title).toContain('Discussion Forums');
});

const { test, expect } = require('@playwright/test');

test('User should be able to create new discussions', async ({ page }) => {
  await page.goto('https://example.com/discussion-forums');
  await page.click('#new-discussion-button');
  await page.fill('#discussion-title', 'New Discussion Title');
  await page.fill('#discussion-content', 'This is the content of the new discussion.');
  await page.click('#submit-discussion-button');
  const successMessage = await page.textContent('#success-message');
  expect(successMessage).toContain('Discussion created successfully');
});

const { test, expect } = require('@playwright/test');

test('User should be able to manage their notification preferences', async ({ page }) => {
  await page.goto('https://example.com/account-settings');
  await page.click('#notification-preferences-link');
  await page.check('#email-notifications-checkbox');
  await page.click('#save-preferences-button');
  const successMessage = await page.textContent('#success-message');
  expect(successMessage).toContain('Notification preferences saved successfully');
});

const { test, expect } = require('@playwright/test');

test('Calendar should display important dates', async ({ page }) => {
  await page.goto('https://example.com/calendar');
  const importantDates = await page.$$eval('.important-date', dates => dates.map(date => date.textContent));
  expect(importantDates).toContain('April 1: Assignment 1 Due');
});

const { test, expect } = require('@playwright/test');

test('User should be able to access the list of courses', async ({ page }) => {
  await page.goto('https://example.com/courses');
  const courses = await page.$$eval('.course-name', names => names.map(name => name.textContent));
  expect(courses).toContain('Introduction to Programming');
});

const { test, expect } = require('@playwright/test');

test('Course materials should be downloadable', async ({ page }) => {
  await page.goto('https://example.com/courses/intro-to-programming');
  await page.click('#download-materials-button');
  const downloadedFiles = await page.context().downloads();
  expect(downloadedFiles.length).toBeGreaterThan(0);
});

const { test, expect } = require('@playwright/test');

test('User should be able to reset their password from the login page', async ({ page }) => {
  await page.goto('https://example.com/login');
  await page.click('#forgot-password-link');
  await page.fill('#email-address', 'user@example.com');
  await page.click('#reset-password-button');
  const email = await page.waitForEvent('message', message => message.text().includes('Password reset request'));
  expect(email).not.toBeNull();
  const resetPasswordLink = /https?:\/\/example\.com\/reset-password\?token=[a-zA-Z0-9]+/.exec(email.text())[0];
  await page.goto(resetPasswordLink);
  await page.fill('#new-password', 'newPassword123');

