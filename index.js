const puppeteer = require('puppeteer')

const getBunnies = async () => {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null
    }) 

    const page = await browser.newPage()
    const url = 'https://nh.craigslist.org/search/sss?query=bunnies&sort=rel&hasPic=1'

    await page.goto(url)

    await page.waitFor('.result-row')

    const results = await page.$$eval('.result-row', rows => {
        return rows.map(row => {
            const properties = {}
            const titleElement = row.querySelector('.result-title')
            properties.title = titleElement.innerText
            properties.url = titleElement.getAttribute('href')
            const priceElement = row.querySelector('.result-price')
            properties.price = priceElement ? priceElement.innerText : ''
            const imageElement = row.querySelector('.swipe [data-index="0"] img')
            properties.imageUrl = imageElement ? imageElement.src : ''
            return properties
        })
    })

    console.log(results)
    browser.close()
}

getBunnies()