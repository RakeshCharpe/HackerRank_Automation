//https://www.hackerrank.com/auth/login
const puppeteer = require("puppeteer");
const emailpassObj = require("./email");
const { answers } = require("./codes");

// creates headless browser
let browserStartPromise = puppeteer.launch({
  // visible browser window
  headless: false,
  // type spped 1 sec to prove it is done manually
  //slowMo: 1000,
  //to open the browser full screen
  defaultViewport: null,
  args: ["--start-maximized", "--disable-notifications"],
});
let page, browser, rtab;

browserStartPromise
  .then(function (browserObj) {
    console.log("browser opened");
    let browserTabOpenPromise = browserObj.newPage();
    browser = browserObj;
    return browserTabOpenPromise;
  })
  .then(function (newTab) {
    page = newTab;
    console.log("new tab opened");
    let gPageOpenPromise = newTab.goto("https://www.hackerrank.com/auth/login");
    return gPageOpenPromise;
  })
  .then(function () {
    let emailWillBeEnteredPromise = page.type(
      "input[id='input-1']",
      "rakeshcharpe99@gmail.com",
      { delay: 50 }
    );
    return emailWillBeEnteredPromise;
  })
  .then(function () {
    let passwordWillBeEnteredPromise = page.type(
      "input[type='password']",
      "Rakesh@99",
      { delay: 50 }
    );
    return passwordWillBeEnteredPromise;
  })
  .then(function () {
    let loginWillBeDOnepromise = page.click(
      'button[data-analytics="LoginPassword"]',
      { delay: 100 }
    );
    return loginWillBeDOnepromise;
  })
  .then(function () {
    let clickedOnAlgoPromise = waitAndClick(
      ".track-card a[data-attr2='algorithms']",
      page
    );
    return clickedOnAlgoPromise;
  })
  .then(function () {
    let getToWarmUp = waitAndClick("input[value='warmup']", page);
    return getToWarmUp;
  })
  .then(function () {
    let waitFor3SecondsPromise = page.waitFor(3000);
    return waitFor3SecondsPromise;
  })
  // .then(function () {
  //   let challengeClickPromise = page.click(".challenge-submit-btn", {
  //     delay: 100,
  //   });
  //   return challengeClickPromise;
  //   ;
  // })
  // .then(function () {
  //   let rightclickOnIDE = waitAndClick(".view-lines", page);
  //   return rightclickOnIDE;
  // })
  // .then(function () {
  //   let pressctrl = page.keyboard.down('Control');
  //   let pressA = page.keyboard.press('KeyA');
  //   let pressV = page.keyboard.press('KeyV');
  //   console.log("pastecode");
  // })
  // .then(function () {
  //   let clickOnSubmit=page.click(
  //     ".ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled",page
  //   );
  //   return clickOnSubmit;
  // })
  .then(function () {
    let AllChallengesArrPromise = page.$$(
      ".ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled",
      { delay: 100 }
    );
    return AllChallengesArrPromise;
  })
  .then(function (questionsArr) {
    // n number of question first
    console.log("number of questions", questionsArr.length);
    
      let qWillBeSolvedPromise = questionSolver(
        page,
        questionsArr[0],
        answers[0]
      );
      return qWillBeSolvedPromise;
    
    })
  
  .then(function () {
    console.log("Question is successfully submitted Hurray!!!");
  });


//question solver
function questionSolver(page, question, answer) {
  return new Promise(function (resolve, reject) {
    let qWillBeCLickedPromise = question.click();

    qWillBeCLickedPromise
      //click
      // code type
      // ctrl A+ ctrl x
      // click on editor
      // ctrl A+ctrl v
      //  reached to editor
      .then(function () {
        // focus
        let waitFOrEditorToBeInFocus = waitAndClick(
          ".monaco-editor.no-user-select.vs",
          page
        );
        return waitFOrEditorToBeInFocus;
      })
      // click
      .then(function () {
        return waitAndClick(".checkbox-input", page);
      })
      .then(function () {
        return page.waitForSelector("textarea.custominput", { visible: true });
      })
      .then(function () {
        return page.type("textarea.custominput", answer, { delay: 50 });
      })
      .then(function () {
        let ctrlIsPressedP = page.keyboard.down("Control");
        return ctrlIsPressedP;
      })
      .then(function () {
        let AIsPressedP = page.keyboard.press("A", { delay: 100 });
        return AIsPressedP;
      })
      .then(function () {
        return page.keyboard.press("X", { delay: 100 });
      })
      .then(function () {
        let ctrlIsPressedP = page.keyboard.up("Control");
        return ctrlIsPressedP;
      })
      .then(function () {
        // focus
        let waitFOrEditorToBeInFocus = waitAndClick(
          ".monaco-editor.no-user-select.vs",
          page
        );
        return waitFOrEditorToBeInFocus;
      })
      .then(function () {
        let ctrlIsPressedP = page.keyboard.down("Control");
        return ctrlIsPressedP;
      })
      .then(function () {
        let AIsPressedP = page.keyboard.press("A", { delay: 100 });
        return AIsPressedP;
      })
      .then(function () {
        let AIsPressedP = page.keyboard.press("V", { delay: 100 });
        return AIsPressedP;
      })
      .then(function () {
        let ctrlIsPressedP = page.keyboard.up("Control");
        return ctrlIsPressedP;
      })
      .then(function () {
        return page.click(".hr-monaco__run-code", { delay: 50 });
      })
      .then(function () {
        resolve();
      })
      .catch(function (err) {
        console.log(err);
        reject(err);
      });
  });
}

function waitAndClick(selector, cpage) {
  return new Promise(function (resolve, reject) {
    let waitForModalpromise = cpage.waitForSelector(selector, {
      Visible: true,
    });
    waitForModalpromise
      .then(function () {
        let clickModal = cpage.click(selector, { delay: 100 });
        return clickModal;
      })
      .then(function () {
        resolve();
      })
      .catch(function (err) {
        reject(err);
      });
  });
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
