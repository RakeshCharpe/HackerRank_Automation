//https://www.hackerrank.com/auth/login
const puppeteer = require("puppeteer");
const emailpassObj = require("./email");
const { answers } = require("./codes");

// creates headless browser
let page;
(async function fn(){
let browserStartPromise = await puppeteer.launch({

  headless: false,
  defaultViewport: null,
  args: ["--start-maximized", "--disable-notifications"],
});
  


    page = await browserStartPromise.newPage();
     await page.goto(
       "https://www.hackerrank.com/auth/login"
     );
    await page.type(
      "input[id='input-1']",
      emailpassObj.email,
      { delay: 50 }
    );
    await page.type(
      "input[type='password']",
      emailpassObj.password,
      { delay: 50 }
    );
    await  page.click(
      'button[data-analytics="LoginPassword"]',
      { delay: 100 }
    );
    await  waitAndClick(
      ".track-card a[data-attr2='algorithms']",
      page
    );
    await waitAndClick("input[value='warmup']", page);
    await page.waitFor(3000);
    let questionsArr=await page.$$(
      ".ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled",
      { delay: 100 }
    );
     await questionSolver(
      page,
      questionsArr[0],
      answers[0]
    );
     console.log("Question is successfully submitted Hurray!!!");
})();


//question solver

  async function questionSolver(page, question, answer) {
    
       await question.click();
      await waitAndClick(
        ".monaco-editor.no-user-select.vs",
        page
      );
      await waitAndClick(".checkbox-input", page);
      await page.waitForSelector("textarea.custominput", { visible: true });
      
      await page.type("textarea.custominput", answer, { delay: 50 });
     
      
      await page.keyboard.down("Control");
      await page.keyboard.press("A", { delay: 100 });
      
      await page.keyboard.press("X", { delay: 100 });
    
      await waitAndClick(
        ".monaco-editor.no-user-select.vs",
        page
      );
      await page.keyboard.press("A", { delay: 100 });
      await page.keyboard.press("V", { delay: 100 });
    
    await page.click(".hr-monaco__run-code", { delay: 50 });
     await page.keyboard.up("Control");
    } 
  

  


 async function waitAndClick(selector, cpage) {
   try {
     await cpage.waitForSelector(selector, {
       Visible: true,
     });
     await cpage.click(selector, { delay: 100 });
   }catch(err){
     console.log(err);
   }
    
    
}

function handleIfNotFound(selector, page) {
  return new Promise(function (resolve, reject) {
    let waitforclickpromise = waitAndClick(selector, page);

    waitforclickpromise.then(function () {
      resolve();
    });
    waitforclickpromise.catch(function (err) {
      resolve();
    });
  });
}
