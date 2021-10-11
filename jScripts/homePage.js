import { baseCategories, preperationCategories} from "./categories.js";

//פונקציה ליצירת כפתורי קטגוריות עזרה ראשונה
function homePageBtnCategories(itemList) {
    let newItemList = "";
    
    itemList.forEach(el => {
        if (el[2].length > 1) {
            el = `<div id="categoryDiv" class="col-6 col-sm-6 col-md-4 col-lg-3 justify-content-center" >
                    <div class="hpButtonDiv row justify-content-center">
                     <a id="${el[1]}" class="btn btnDiv exp">
                     <img src="./images/${el[1]}/${el[1]}.png" class="col-11 btnImage"/>
                     <div class="text-wrap hpBtnTxt" style="white-space: normal; word-break: normal;">${el[0]}</div>
                     </a>
                    </div>
                 </div>`
            newItemList += el;
        }
        else {
            el = ` 
       <div id="categoryDiv" class="col-6 col-md-4 col-lg-3">
        <div class="hpButtonDiv row justify-content-center">
            <a href="innerPage.html"  class="btn btnDiv" onClick="(function(){localStorage.pageName='${el[1]}'+'/'+'${el[1]}'+'/cases';})()">
            <img src="./images/${el[1]}/${el[1]}.png"  class="col-11 btnImage"/>
            <div class="text-wrap hpBtnTxt" style="white-space: normal; word-break: normal;">${el[0]}</div>
            </a>
        </div>
       </div>`

            newItemList += el;
        }
    });

    return newItemList;
}

//פונקציה ליצירת כפתורי הכנה מוקדמת
function homePagePreperationCategories(itemList) {
    let newItemList = "";
    itemList.forEach(el => {
        el = `<div class="card col-10 col-lg-7">
            <a class="blueBG"  href="innerPage.html" onClick="(function(){localStorage.pageName='${el[1]}'+'/'+'${el[1]}'+'/preperation';})()">
            <span class="BigLightblueCircle"></span>
                <div class="pinkCircle">            
                <img src="./images/arrow_white.png" class="cardArrow"/></div>
            <div class="card-body">
                <div class="row">
                <h4>${el[0]}</h4>
                </div>
                <div class="row">
                <p class="col-10">${el[3]}</p>
                </div>
            </div>
            </a>
          </div>`
       
        newItemList += el;
    });

    return newItemList;
}

//הכנסת כל תוכן עמוד הבית לתוך משתנה
const homePageCategoriesBtn = `<div id="secHpButtonRow" class="flex-row" data-effect="mfp-zoom-in">
<div class="goBackDiv">
                    <a class="offset-1" id="backBtn">
                    <img src="./images/arrow_blue.png"></img>
                    </a>
                    </div>
<div id="secHpButton" class="col-10 offset-1 row justify-content-around row-cols-md-1 row-cols-sm-1 row-cols-lg-1" >
   
</div>
</div>     

<div class="hpContent">
<div id="pageHeadline" class="row justify-content-center"><h4 class="col">קטגוריות לטיפול:</h4></div>
       
            <div id="categoriesBtn" class="row justify-content-around row-cols-md-3 row-cols-sm-2 row-cols-lg-4">
            ${homePageBtnCategories(baseCategories)}
            </div>

    <div id = "pageHeadline2" class="row justify-content-center"> <h4 class="col">הדרכה מוקדמת:</h4></div>
    <div id="PreperationCategoriesDiv" class="flex-row">
        ${ homePagePreperationCategories(preperationCategories) }
   </div>
 </div>
`
//הכנסת תוכן העמוד לתוך המקום המיועד בדף 
document.getElementById("homePageDiv").innerHTML = homePageCategoriesBtn;

//הוספת אירוע לחיצה על כפתור פתיחת תת קטגוריות 
$(".btnDiv.exp").click(function () {
    subCategory(this.id);
})

//הוספת אירוע לחיצה על כפתור חזרה מתת קטגוריות 
$(".goBackDiv").click(function () {
    subCategory("close");
})

//פונקציה ליצירת כפתורי תתי קטגוריות
function subCategory(action) {

    $("#secHpButton").empty();

    if (action != "close") {
    let newSecItemList = "";
        var newElement;
        var subCatTitle;
        baseCategories.forEach(el => {
        if (el[1] == action) {
            el[2].forEach(elm => {
                newElement =
                    `<a id="secHpInnerButton" class="col-sm-11 col-md-8 col-lg-5 row justify-content-start" href="innerPage.html" onClick="(function(){localStorage.pageName='${elm[0]}'+'/'+'${el[1]}'+'/cases';})()">
                    <div class="col-2" id="secHpInnerButtonImg"><img src="./images/${el[1]}/${elm[0]}.png"  class="btnImage"/> </div>
                    <div  class="col-7" id="secHpInnerButtonTxt"><span class="text-wrap" style="white-space: normal; word-break: normal;">${elm[1]}</span></div>
                    <div class="col-1" id="grayArrow"><img src="./images/gray_arrow.png"/> </div>
                    </a>`
                newSecItemList += newElement;
            })
            subCatTitle = `<h4 class="col-12 text-center">${el[0]}</h4>`
            $("#secHpButton").append(subCatTitle,newSecItemList);
        }
    })
    };

    //הסתרת התוכן של דף הבית
    $(".hpContent").toggle();
    //הצגת תתי קטגוריות רלוונטיים
    $("#secHpButtonRow").toggle();

    //ניקוי שורת החיפוש אם הוקלד בה משהו, שלא תסתיר את הכפתורים
    $('#searchLine').val("");
    $("#myUL").hide();
}

