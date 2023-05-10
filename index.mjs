import puppeteer from "puppeteer";

// Start up the browser
const browser = await puppeteer.launch({ headless: 'new' })
const page = await browser.newPage()

// Direct the browser to open a page
await page.goto('https://www.google.com/search?q=news')

// Wait for element to appear on the page
await page.waitForSelector('h3')
// await page.waitForNetworkIdle()

const headlines = await page.$$eval(
  // Find all elements with this selector
  'h3',
  // And run the below function on the array of elements
  (headers) => {
    return headers.map(header => header.textContent)
  })

await browser.close()

console.log('Headlines:\n\n', headlines.join('\n'));
