webServer: {
  command: 'next dev',
  port: 3000,
  reuseExistingServer: true,
  },


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

const { chromium } = require('playwright');

describe('Notification preferences and calendar', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await chromium.launch();
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });

  it('should allow users to manage their notification preferences and display important dates on a calendar', async () => {
    // Login as the user
    await page.goto('https://example.com/login%27);
    await page.fill('input[name="username"]', 'your-username');
    await page.fill('input[name="password"]', 'your-password');
    await page.click('button[name="login"]');

    // Navigate to the notification preferences page
    await page.goto('https://example.com/notification-preferences%27);

    // Enable or disable notification types as desired
    const emailCheckbox = await page.$('input[name="email-notifications"]');
    await emailCheckbox.click();

    const smsCheckbox = await page.$('input[name="sms-notifications"]');
    await smsCheckbox.click();

    // Save the changes
    await page.click('button[name="save-changes"]');

    // Verify that the changes were saved successfully
    const successMessage = await page.$('.success-message');
    expect(await successMessage.textContent()).toBe('Your notification preferences have been updated.');

    // Navigate to the calendar page
    await page.goto('https://example.com/calendar%27);

    // Verify that important dates are displayed on the calendar
    const importantDates = await page.$$('.important-date');
    expect(importantDates.length).toBeGreaterThan(0);
  });
  
  const { test, expect } = require('@playwright/test');

test('Users should be able to manage their notification preferences', async ({ page }) => {
  // Navigate to the notification settings page
  await page.goto('https://example.com/settings/notifications');

  // Check if the notification settings are displayed to the user
  const notificationSettingsSelector = '#notification-settings';
  const notificationSettingsElement = await page.$(notificationSettingsSelector);
  expect(notificationSettingsElement).not.toBeNull();

  // Update the notification settings to receive only email notifications
  await updateNotificationPreferences({ email: true, push: false });

  // Check if the notification preferences have been updated
  const updatedNotificationPreferences = await getNotificationPreferences();
  expect(updatedNotificationPreferences.email).toBe(true);
  expect(updatedNotificationPreferences.push).toBe(false);

  // Update the notification settings to receive only push notifications
  await updateNotificationPreferences({ email: false, push: true });

  // Check if the notification preferences have been updated
  const updatedNotificationPreferencesAgain = await getNotificationPreferences();
  expect(updatedNotificationPreferencesAgain.email).toBe(false);
  expect(updatedNotificationPreferencesAgain.push).toBe(true);
});

async function updateNotificationPreferences(preferences) {
  // Code to update the notification preferences based on the user's selections
}

async function getNotificationPreferences() {
  // Code to get the current notification preferences from the notification settings page
}
  
  const { test, expect } = require('@playwright/test');

test('Notifications should be timely, meaning they should be sent well before the deadline or event', async ({ page }) => {
  // Navigate to the notification settings page
  await page.goto('https://example.com/settings/notifications');

  // Update the notification settings to receive a notification 2 days before the event
  const daysBeforeEvent = 2;
  await updateNotificationSettings(daysBeforeEvent);

  // Create a new event that triggers the notification
  const eventTitle = 'Upcoming Event';
  const eventDate = '2023-04-01';
  await createNewEvent(eventTitle, eventDate);

  // Wait for the notification to be sent
  await page.waitForTimeout(daysBeforeEvent * 24 * 60 * 60 * 1000);

  // Check if the notification is displayed to the user
  const notificationSelector = '#notifications .notification';
  const notificationElement = await page.$(notificationSelector);
  expect(notificationElement).not.toBeNull();

  // Check if the notification contains the correct event information
  const notificationText = await notificationElement.textContent();
  expect(notificationText).toContain(eventTitle);
  expect(notificationText).toContain(eventDate);
});

async function updateNotificationSettings(daysBeforeEvent) {
  // Code to update the notification settings to receive a notification a certain number of days before the event
}

async function createNewEvent(title, date) {
  // Code to create a new event that triggers the notification
}

  const { test, expect } = require('@playwright/test');

test('Calendar should allow the user to easily add, edit, or delete events', async ({ page }) => {
  // Navigate to the calendar page
  await page.goto('https://example.com/calendar');

  // Wait for the calendar to load
  await page.waitForSelector('#calendar');

  // Add a new event to the calendar
  const newEventTitle = 'New Event';
  const newEventDate = '2023-04-01';
  await addNewEvent(newEventTitle, newEventDate);

  // Check if the new event is displayed on the calendar
  const newEventSelector = `#calendar [data-date="${newEventDate}"] [data-event-title="${newEventTitle}"]`;
  const newEventElement = await page.$(newEventSelector);
  expect(newEventElement).not.toBeNull();

  // Edit the new event on the calendar
  const editedEventTitle = 'Edited Event';
  await editEvent(newEventSelector, editedEventTitle);

  // Check if the edited event is displayed on the calendar
  const editedEventSelector = `#calendar [data-date="${newEventDate}"] [data-event-title="${editedEventTitle}"]`;
  const editedEventElement = await page.$(editedEventSelector);
  expect(editedEventElement).not.toBeNull();

  // Delete the edited event from the calendar
  await deleteEvent(editedEventSelector);

  // Check if the edited event is no longer displayed on the calendar
  const deletedEventElement = await page.$(editedEventSelector);
  expect(deletedEventElement).toBeNull();
});

async function addNewEvent(title, date) {
  // Code to add a new event to the calendar
}

async function editEvent(eventSelector, newTitle) {
  // Code to edit an event on the calendar
}

async function deleteEvent(eventSelector) {
  // Code to delete an event from the calendar
}

  const { test, expect } = require('@playwright/test');

test('Email should be delivered promptly and contain clear instructions on how to reset the password', async ({ page }) => {
  // Navigate to the password reset page
  await page.goto('https://example.com/reset-password');

  // Fill in the email address form field
  await page.fill('#email-address', 'user@example.com');

  // Submit the form to reset the password
  await page.click('#reset-password-btn');

  // Wait for the email to be sent
  await page.waitForSelector('#email-sent-msg');

  // Retrieve the email content from the email server
  const emailContent = await getEmailContent('user@example.com');

  // Expect the email to contain clear instructions on how to reset the password
  expect(emailContent).toContain('To reset your password, please click the link below:');
  expect(emailContent).toMatch(/https?:\/\/example\.com\/reset-password\/\w+/);
});

async function getEmailContent(emailAddress) {
  // Code to retrieve the email content from the email server
}
  
const { test, expect } = require('@playwright/test');

test('Calendar should display important dates', async ({ page }) => {
  // Navigate to the calendar page
  await page.goto('https://example.com/calendar');

  // Wait for the calendar to load
  await page.waitForSelector('#calendar');

  // Get the important dates from the backend API
  const importantDates = await getImportantDates();

  // Check if each important date is displayed on the calendar
  for (const date of importantDates) {
    const dateSelector = `#calendar [data-date="${date}"]`;
    const dateElement = await page.$(dateSelector);

    // Expect the date to be displayed on the calendar
    expect(dateElement).not.toBeNull();
  }
});

async function getImportantDates() {
  // Code to retrieve the important dates from the backend API
}
const { test, expect } = require('@playwright/test');

test('Reset password from login page', async ({ page }) => {
  // Navigate to the login page
  await page.goto('https://example.com/login');

  // Click on the "forgot password" link
  await page.click('a[href="/forgot-password"]');

  // Fill out the email address field
  await page.fill('input[name="email"]', 'user@example.com');

  // Click on the "reset password" button
  await page.click('button[type="submit"]');

  // Check that the success message is displayed
  const successMessage = await page.waitForSelector('.success-message');
  expect(await successMessage.isVisible()).toBeTruthy();
});

  const { test, expect } = require('@playwright/test');

test('Prompt user to enter email address when resetting password', async ({ page }) => {
  // Navigate to the forgot password page
  await page.goto('https://example.com/forgot-password');

  // Click on the "reset password" button without entering an email address
  await page.click('button[type="submit"]');

  // Check that the error message is displayed
  const errorMessage = await page.waitForSelector('.error-message');
  expect(await errorMessage.isVisible()).toBeTruthy();
  expect(await errorMessage.innerText()).toContain('Please enter your email address.');

  // Fill out the email address field
  await page.fill('input[name="email"]', 'user@example.com');

  // Click on the "reset password" button
  await page.click('button[type="submit"]');

  // Check that the success message is displayed
  const successMessage = await page.waitForSelector('.success-message');
  expect(await successMessage.isVisible()).toBeTruthy();
});

  const { test, expect } = require('@playwright/test');

test('Password reset page is loaded securely and is user-friendly', async ({ page }) => {
  // Navigate to the password reset page
  await page.goto('https://example.com/reset-password');

  // Check that the page is loaded over HTTPS
  const url = await page.url();
  expect(url.startsWith('https://')).toBeTruthy();

  // Check that the password reset form is displayed
  const form = await page.waitForSelector('form');
  expect(await form.isVisible()).toBeTruthy();

  // Check that the form has clear instructions
  const instructions = await page.$eval('form p', el => el.innerText);
  expect(instructions).toContain('Please enter your new password');

  // Check that the form is user-friendly
  const passwordInput = await page.waitForSelector('input[name="password"]');
  const confirmPasswordInput = await page.waitForSelector('input[name="confirm-password"]');
  const submitButton = await page.waitForSelector('button[type="submit"]');
  expect(await passwordInput.isVisible()).toBeTruthy();
  expect(await confirmPasswordInput.isVisible()).toBeTruthy();
  expect(await submitButton.isVisible()).toBeTruthy();
});

  const { test, expect } = require('@playwright/test');

test('User should receive an email with a link to reset their password if email address is valid', async ({ page }) => {
  // Navigate to the password reset page
  await page.goto('https://example.com/reset-password');

  // Fill in the email address form field
  await page.fill('#email-address', 'user@example.com');

  // Submit the form to reset the password
  await page.click('#reset-password-btn');

  // Wait for the email to be sent
  await page.waitForSelector('#email-sent-msg');

  // Check if the email contains a link to reset the password
  const emailContent = await getEmailContent('user@example.com');
  const resetPasswordLink = extractResetPasswordLinkFromEmail(emailContent);

  // Expect the reset password link to be valid
  expect(resetPasswordLink).toMatch(/https?:\/\/example\.com\/reset-password\/\w+/);
});

async function getEmailContent(emailAddress) {
  // Code to retrieve the email content from the email server
}

function extractResetPasswordLinkFromEmail(emailContent) {
  // Code to extract the reset password link from the email content
}

  onst { test, expect } = require('@playwright/test');

test('Clicking on the reset password link should take the user to a page to enter a new password', async ({ page }) => {
  // Navigate to the reset password link received in the email
  const resetPasswordLink = 'https://example.com/reset-password/abc123';
  await page.goto(resetPasswordLink);

  // Wait for the password reset page to load
  await page.waitForSelector('#new-password-form');

  // Fill in the new password form fields
  await page.fill('#new-password', 'new_password');
  await page.fill('#confirm-new-password', 'new_password');

  // Submit the form to set the new password
  await page.click('#set-password-btn');

  // Wait for the success message to be displayed
  await page.waitForSelector('#password-reset-success');

  // Expect the success message to be displayed
  const successMessage = await page.textContent('#password-reset-success');
  expect(successMessage).toContain('Your password has been reset successfully.');
});


name: Run Playwright and Generate a video, screenshots, and LightHouse HTML Report
on:
  push:
    branches: "*"
  workflow_dispatch:
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3
      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "17.x"
      - name: Install dependencies
        run: |
          sudo apt-get update
          sudo apt-get install -y libgbm-dev
          npm ci
          npx playwright install chromium
          npm install -g lighthouse chrome-launcher axe-core chromium wait-on
          npm install next@latest
      - name: Create the build
        run: npx next build
      - name: Check and kill process on port 3000
        run: |
          sudo fuser -k 3000/tcp || true
      - name: Start the application
        run: |
          export DISPLAY=:1
          echo "Starting the application..."
          npm run start & npx wait-on --timeout 50000 http://0.0.0.0:3000/
          echo "Application started."
      - name: Run Playwright tests
        run: npx playwright test --config=playwright.config.js
      - name: Generate Lighthouse Report
        run: |
          lighthouse http://localhost:3000/ --output html --output-path ./test-results/report.html --chrome-flags="--headless --no-sandbox --disable-gpu"
      - name: Upload report, screenshots and videos of failed tests
        uses: actions/upload-artifact@v3
        with:
          name: test-results
          path: ./test-results
 
