// ==UserScript==
// @name         ProMAX-YourShopPricer and Handy Buttons
// @namespace    Neopets
// @version      2.3
// @description  Adds a button to automatically copy page source, and open various helpful pages that need the source HTML;AUTO Pricing:Enter your own shop, click the "AutoPriceAll" button, and it will copy the prices from JN, filling in the price columns.
// @match        *://www.neopets.com/books_read.phtml?pet_name=*
// @match        *://items.jellyneo.net/tools/book-checklist/
// @match        *://www.neopets.com/moon/books_read.phtml?pet_name=*
// @match        *://items.jellyneo.net/tools/booktastic-checklist/
// @match        *://www.neopets.com/gourmet_club.phtml?pet_name=*
// @match        *://items.jellyneo.net/tools/gourmet-checklist/
// @match        *://www.neopets.com/dome/*
// @match        *://battlepedia.jellyneo.net/?go=challenger_checklist
// @match        *://www.neopets.com/neoboards/preferences.phtml
// @match        *://www.jellyneo.net/avatars/
// @match        *://www.neopets.com/safetydeposit.phtml
// @match        *://items.jellyneo.net/tools/sdb-price-checker/
// @match        *://www.neopets.com/market.phtml?type=your*
// @match        *://items.jellyneo.net/tools/shop-stock-price-checker/
// @match        *://www.neopets.com/shenkuu/neggcave/
// @match        *://thedailyneopets.com/articles/negg-solver/
// @match        *items.jellyneo.net/search/?name=*
// @match        *www.neopets.com/market.phtml?order_by*
// @match    https://items.jellyneo.net/tools/price-results/
// @match   https://items.jellyneo.net/tools/shop-stock-price-checker/
// @grant        GM_openInTab
// @grant        GM_setValue
// @grant        GM_getValue
// @author       themagicteethOriginally&BoriTutleModified
// ==/UserScript==

//Usage: Enter your own shop, click the "AutoPriceAll" button, and it will copy prices from jellyneo, filling in the price columns.

// Security: It does not automatically click any neopets websites.

//Minimum amount to undercut jelly price (minimum value); The amount to undercut is randomly between the minimum and maximum values.標價比果凍價降低多少(最小值) ;標價比果凍價降低数额在最小值和最大值之间随机.
var discountValueMin=1;
//Maximum amount to undercut jelly price (maximum value).標價比果凍價降低多少(最大值)
var discountValueMax=150;











////////////////////////////Dont Modify Below Unless Knowing What You Are Doing///////////////////////////

var discountValue=50;//default
var useRandomDiscountValue=true;
var invervalTime=5;
var finishedPricing=false;
if(useRandomDiscountValue)discountValue = Math.floor(Math.random() * (discountValueMax-discountValueMin)) + discountValueMin;

function wait(closure, seconds) {
    setTimeout(function () { closure() }, seconds * 1000)
}
//

if(window.location.href.includes("tools/price-results")){

       var i=2;
    var intervalId = setInterval(function() {

         var itemm=document.querySelector("body > div.row > div.large-9.small-12.columns.content-wrapper > div.table > div:nth-child("+i+") > div:nth-child(2) > p > a");//获取物品
         if(itemm!=null){
         var originalString = itemm.textContent;//提取item名称
var modifiedString = originalString.split(" ").join("+");//提取item名称
   var PriceJ=document.querySelector("body > div.row > div.large-9.small-12.columns.content-wrapper > div.table > div:nth-child("+i+") > div:nth-child(3) > a").textContent
    var numericPriceJ = PriceJ.replace(/[^0-9]/g, '');
GM_setValue(modifiedString,numericPriceJ );
    console.log(numericPriceJ);

i=i+1;

         }
        else{//不进入下一个物品的查找,如果是因为空就停下, 如果不是空就等一会
           // 


        if(itemm==null){
     GM_setValue("pricing","false" );

            clearInterval(intervalId);
       // finishedPricing=true;
        }


    }




}, invervalTime);



}




















//////////////////////////////////////////////////////
function KQmain(){
    
     GM_setValue("pricing","true" );
document.querySelector("#content > table > tbody > tr > td.content > center:nth-child(10) > button:nth-child(3)").click();

}

function KQmainWritePrice(){
    
     GM_setValue("pricing","true" );
console.log(1);
    var j=2;
    var intervalIdj = setInterval(function() {

         var itemm=document.querySelector("#content > table > tbody > tr > td.content > form > table > tbody > tr:nth-child("+j+") > td:nth-child(1) > b");//获取物品
if(itemm==null){ clearInterval(intervalIdj);
               alert("Pricing Finished");


               }
         var originalString = itemm.textContent;//提取item名称
var modifiedString = originalString.split(" ").join("+");//提取item名称

if (!isNaN(GM_getValue(modifiedString) )&&0<(parseInt(GM_getValue(modifiedString))-discountValue)&&(parseInt(document.querySelector("#content > table > tbody > tr > td.content > form > table > tbody > tr:nth-child("+j+") > td:nth-child(7) > input[type=text]").value)<1||parseInt(document.querySelector("#content > table > tbody > tr > td.content > form > table > tbody > tr:nth-child("+j+") > td:nth-child(7) > input[type=text]").value)>=(parseInt(GM_getValue(modifiedString))-discountValue)))
{
if(parseInt(GM_getValue(modifiedString))-discountValue<1000000){
document.querySelector("#content > table > tbody > tr > td.content > form > table > tbody > tr:nth-child("+j+") > td:nth-child(7) > input[type=text]").value=parseInt(GM_getValue(modifiedString))-discountValue;
}
    else{console.log(modifiedString+"超过100万");}

    j=j+1;
    }
    else{
j=j+1;
    console.log("請注意物品"+modifiedString+"無法定價, 果凍沒有價格或者價格過低無法discount");

    }

}, invervalTime);









}









function closePage(){
    window.opener = null;
        window.location.href = "about:blank";
       window.open("", "_self");
        window.close();



        unsafeWindow.close();

}


function makeButton(text) {
    const copyButton = document.createElement("button")  // Create the button element
    copyButton.innerText = text // Button text
    copyButton.style.margin = "0 0.5em"  // Styling for the button
    return copyButton
  }

  // Set onClick of button to open the link in new tab
  function setOnClick(button, url) {
    button.onclick = e => {
      GM_openInTab(url)
    }
  }

  if (!document.URL.includes("jellyneo") && !document.URL.includes("thedailyneopets")) {
    GM_setValue("source", document.documentElement.outerHTML)
  }

  // Safety deposit box
  if (document.URL.includes("safetydeposit")) {
    const beforeButton = document.evaluate("//b[contains(., 'Your Safety Deposit Box')]", document, null, XPathResult.ANY_TYPE, null ).iterateNext()
    const newButton = makeButton("Check prices on this page")
    beforeButton.after(newButton)
    setOnClick(newButton, "https://items.jellyneo.net/tools/sdb-price-checker/")
  }

  if (document.URL.includes("sdb-price-checker")) {
    document.getElementById("price-check-code").value = GM_getValue("source");
      document.querySelector("#price-check-submit").click();
  }

  // Shop
  if (document.URL.includes("market")) {
    const beforeButton = document.querySelector("img[name='keeperimage']")
    const newButton = makeButton("Check prices on this page")
    const newButton2 = makeButton("AutoPriceAll")
    newButton.style.display = "block"
      newButton2.style.display = "block"
    beforeButton.after(newButton)
      beforeButton.after(newButton2)
    setOnClick(newButton, "https://items.jellyneo.net/tools/shop-stock-price-checker/")

      //////////////////////////////////////////////////////////////////////////////////////////////////////////////////


       // 添加点击事件
      newButton2.addEventListener('click', function() {KQmain(); });
        //////////////////////
 // 设置定时器，每隔一定时间检查元素是否已经加载
  var intervalId4 = setInterval(function() {

    if ( GM_getValue("pricing")=="false") {
      // 元素已经加载，清除定时器
      clearInterval(intervalId4);
        KQmainWritePrice();
GM_setValue("pricing","true" );

}






  }, 1212); // 每隔1010毫秒检查一次









      //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  }

  if (document.URL.includes("shop-stock-price-checker")) {
    document.getElementById("price-check-code").value = GM_getValue("source")
      document.querySelector("#price-check-submit").click();
  }

//////////////////////////////////////////////////////////////////////////


















  // Booktastic books
  if (document.URL.includes("moon")) {
    const beforeButton = document.querySelector("#content > table > tbody > tr > td.content > center:nth-child(11) > p > a > img")
    const newButton = makeButton("Check needed books!")
    newButton.style.display = "block"
    beforeButton.after(newButton)
    setOnClick(newButton, "https://items.jellyneo.net/tools/booktastic-checklist/")
  }

  // Book club
  if (document.URL.includes("books_read") && !document.URL.includes("moon")) {
    const beforeButton = document.querySelector("#content > table > tbody > tr > td.content > center:nth-child(7) > p > a > img")
    const newButton = makeButton("Check needed books!")
    newButton.style.display = "block"
    newButton.style.margin = "1em  0.5em"
    beforeButton.after(newButton)
    setOnClick(newButton, "https://items.jellyneo.net/tools/book-checklist/")
  }

  // Book club and Booktastic books
  if (document.URL.includes("book-checklist") || document.URL.includes("booktastic-checklist")) {
    document.getElementById("checklist-hide-boring").checked = true

    // Change this if you want
    // 10 DOES NOT WORK ON BOOKTASTICK BOOKS!!!
    // 1: name, 2: price, 3: release, 4: SDB order, 5: price, 9: added to item DB, 10: category/shop
    document.getElementById("checklist-sort-by").value = 2

    document.getElementById("checklist-code").value = GM_getValue("source")
  }

  // Gourmet club
  if (document.URL.includes("gourmet_club")) {
    const beforeButton = document.querySelector("#content > table > tbody > tr > td.content > div > img")
    const newButton = makeButton("Check needed foods!")
    newButton.style.display = "block"
    newButton.style.margin = "1em  0.5em"
    beforeButton.after(newButton)
    setOnClick(newButton, "https://items.jellyneo.net/tools/gourmet-checklist/")
  }

  if (document.URL.includes("gourmet-checklist")) {
    document.getElementById("checklist-hide-yuck").checked = true

    // Change this if you want
    // 1: name, 2: rarity, 3: release, 4: SDB order, 5: price, 9: added to item DB, 10: category/shop
    document.getElementById("checklist-sort-by").value = 2

    document.getElementById("checklist-code").value = GM_getValue("source")
  }

  // Battledome
  if (document.URL.includes("dome")) {
    const beforeButton = document.getElementById("bdNav")
    const newButton = makeButton("Check missing challengers!")
    newButton.style.display = "block"
    newButton.style.margin = "0 auto"
    beforeButton.after(newButton)
    setOnClick(newButton, "http://battlepedia.jellyneo.net/?go=challenger_checklist")
  }

  if (document.URL.includes("challenger_checklist")) {
    document.querySelector("textarea[name='challengerHTML']").value = GM_getValue("source")
  }

  // Avatars
  if (document.URL.includes("neoboards")) {
    const beforeButton = document.querySelector("#content > table > tbody > tr > td.content > form > table:nth-child(4) > tbody > tr:nth-child(2) > td:nth-child(2) > select")
    const newButton = makeButton("Check missing avatars!")
    newButton.style.display = "block"
    newButton.style.margin = ".5em"
    beforeButton.after(newButton)
    setOnClick(newButton, "https://www.jellyneo.net/avatars/")

  }

  if (document.URL.includes("avatars")) {
    document.getElementById("avatarInput").value = GM_getValue("source")
    document.querySelector("input[name='excludeRetired'").checked = true
  }

  // Negg cave
  if (document.URL.includes("neggcave")) {
    const beforeButton = document.getElementById("mnc_popup_generic_wrongdate")  // Location to place the button
    const newButton = makeButton("Get the solution!")
    beforeButton.after(newButton)
    setOnClick(newButton, "https://thedailyneopets.com/articles/negg-solver/")
  }

  if (document.URL.includes("negg-solver")) {
    document.getElementById("PageSourceBox").value = GM_getValue("source")
  }
