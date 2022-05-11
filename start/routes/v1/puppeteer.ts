import Route from '@ioc:Adonis/Core/Route'
import puppeteer from 'puppeteer';

Route
    .group(() => {
        // GET /api/v1/puppeteer
        Route.get('/', async () => {

            // Launch Puppeteer headless browser
            const data: any = await puppeteer.launch({headless: true,args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-accelerated-2d-canvas',
                '--no-first-run',
                '--no-zygote',
                '--disable-gpu'
            ]}).then(async function(browser) {
        
                // Open a new page and set the DOM Elements to inspect
                const page = await browser.newPage();
                try {
                    await page.goto(`https://duckduckgo.com/`, {
                        waitUntil: 'networkidle2'
                    });
                    await page.waitForSelector('input[name="q"]', {visible: true})
                    await page.type('input[name="q"]', 'puppeteer');
                    await page.setViewport({ width: 1310, height: 669 });
                    
                    await Promise.all([
                        page.waitForNavigation(),
                        page.keyboard.press("Enter"),
                    ])
                    
                    await page.waitForSelector(".result__a", { visible: true })

                    const searchResults = await page.$$eval(".result__a", els => 
                        els.map(e => ({ title: e.innerText, link: e.href }))
                    )
                    
                    // Send response and close browser
                    return searchResults
                    
                } catch (err) {
                    return err.message
                } finally {
                    await browser.close();
                }
            });

            return {data:data}
        })
        

    }).prefix('/api/v1/puppeteer').middleware('TokenRequest');