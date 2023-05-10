import puppeteer from 'puppeteer'

// Start up the browser
const browser = await puppeteer.launch({ headless: 'new' })
const page = await browser.newPage()

console.log('Fetching news headlines from Google...')

// Direct the browser to open a page
await page.goto('https://www.google.com/search?q=news')

// Wait for element to appear on the page
await page.waitForSelector('h3')

// If above doesn't work, you can also use below. But it might be slower, since it waits for all network requests to finish.
// await page.waitForNetworkIdle()

const headlines = await page.$$eval(
  // Find all elements with this selector
  'h3',
  // And run the below function on the array of elements
  (headers) => {
    return headers.map((header) => header.textContent)
  }
)

console.log(`Headlines:\n\n${headlines.join('\n')}\n`)
console.log('Fetching restaurants from Yelp...')

await page.goto(
  'https://www.yelp.com/search?find_desc=restaurants&find_loc=fremont%2C+ca'
)

const businessSelector = 'div[class*="businessName"]'
await page.waitForSelector(businessSelector)

const restaurants = await page.$$eval(businessSelector, (businesses) =>
  businesses.map((business) => business.textContent)
)

console.log(`Restaurants:\n\n${restaurants.join('\n')}`)

await browser.close()
