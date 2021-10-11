$(document).ready(function () {
     //הוספת פונקציה לפתחיחה וסגירה של התפריט בלחיצה על כפתור התפריט
    $('#sidebarCollapse').on('click', function () {
        // שינוי הקלאס של התפריט
        $('#sidebar').toggleClass('active');
        // שינוי הקלאס של הכפתור
        $(this).toggleClass("change");
        //שינוי מצב הרקע
        $(".modalBackdrop.Menu.fade").toggleClass("hide show");
        //שינוי מצב התפריט
        $('.wrapper').toggleClass('open');
    });

    //הספת פונקציה לסגירת התפריט אם הוא פתוח- בלחיצה במקום אחר במסך
    $(".modalBackdrop.Menu.fade").click(function () {
        $(".modalBackdrop.Menu.fade").toggleClass("hide show");
        //במידה והתפריט פתוח שינוי הקלאס של התפריט לסגירה
         $('#sidebar').toggleClass('active');
         //במידה והתפריט פתוח שינוי הקלאס של כפתור התפריט
        $('#sidebarCollapse').toggleClass("change");
        //שינוי מצב התפריט
        $('.wrapper').toggleClass('open');
    });

    //פונקציה להפעלת השלמת מילים בשורת החיפוש 
    $('#searchLine').on('input', function (e) {
        //הגדרת משתנים חדשים
        var input, ul, li, a, i, txtValue, fadeBack;
        //משתנה לטובת טשטוש רקע
        fadeBack = false;
        //הכנסת שורת החיפוש לתוך משתנה
        input = document.getElementById('searchLine');
        //הכנסת רשימת הקטגוריות לתוך משתנה
        ul = document.getElementById("myUL");
        //הכנסת כל קטגוריות עצמן לתוך משתנה
        li = ul.getElementsByTagName('li');
        //בדיקה האם הוקלדה מילה בשורת החיפוש
        if (input.value.length == 0) {
            //אם לא הוקלדה מילה- לא מוצג כלום
            ul.style.display = "none";
             //הסרת טשטוש הרקע
            $(".modalBackdrop.Search.fade.show").toggleClass("hide show");
        }
        else {
            //אם הוקלדה מילה- מוצגת רשימת הקטגוריות
            ul.style.display = "block";
            //לולאה שעוברת על כל הפריטים ברשימת הקטגוריות
            for (i = 0; i < li.length; i++) {
                //הכנסה מחדש של כל פריט לתוך משתנה
                a = li[i].getElementsByTagName("a")[0];
                //הכנסה של הטקסט של הפריט לתוך משתנה
                txtValue = a.innerText;
                //בדיקה האם הטקסט שהוקלד תואם לטקסט שבפריט
                if (txtValue.indexOf(input.value) > -1) {
                    //אם כן- הפריט מוצג
                    li[i].style.display = "";
                    //הוספת טשטוש הרקע
                    $(".modalBackdrop.Search.fade.hide").toggleClass("hide show");
                    //שינוי המשתנה לטשטוש רקע
                    fadeBack = true;
                } else {
                    //אם לא- הפריט מוסתר
                    li[i].style.display = "none";
                }
            }
            if (fadeBack == false) {
                $(".modalBackdrop.Search.fade.show").toggleClass("hide show");
            }
        }
    });
});

const pageType = document.getElementsByClassName("containerDiv");

//headerשל ה HTMLמשתנה שמחזיק את תוכן ה
const headerInnerContent = `
            <span class="blueBG" id="blueBG">
            <span class=BigLightblueCircle></span>
                                <a id="callMda" class="pinkCircle" href="tel:+972101">
                                <img id="callMdaImg" src="images/callMDA.png" class="w-200" />
                                <p>חיוג למד"א</p></a>
            <span class=darkBlueCircle></span>
           </span>
            <div id="menu" class="wrapper col-1">

            </div>
            <div class="col-10 row  justify-content-center">
            <h1 id="headerHeadline"><a id="hpLink" href="homePage.html">הגשת עזרה ראשונה לילדים</a></h1>
             </div>
            <div id="searchDiv" class="searchDiv col-11">
         ${searchLine(pageType)}
            </div>
        <div class="searchDiv row justify-content-center">
            <ul id="myUL" class="searchBar col-10">

            </ul>
        </div>
        <div class="modalBackdrop Menu fade hide"></div>
        <div class="modalBackdrop Search fade hide"></div>
        `;

//לתוכו headerשל ה HTMLהוספה של המשתנה שמחזיק את תוכן ה
document.getElementById("header").innerHTML = headerInnerContent;


const menuInnerContent = `<nav id="sidebar" class="active">
                <div class="sidebar-header">
                    <h3>מקרים לטיפול</h3>
                </div>
                <ul class="list-unstyled components">
                    ${menuCategories(baseCategories, `cases`)}
                </ul>
                <div class="sidebar-header">
                    <h3>הכנה מראש</h3>
                </div>
                 <ul class="list-unstyled components">
                    ${menuCategories(preperationCategories, `preperation`)}
                </ul>
                <div class="sidebar-header">
                    <h3>עוד באתר</h3>
                </div>
                 <ul class="list-unstyled components">
                    <li><a href="innerPage.html" onClick="(function(){localStorage.pageName='aboutUs'+'/'+'aboutUs'+'/'+'aboutUs';})()">אודות</a></li>
                </ul>
            </nav>
            <div id="content">
                <nav class="navbar navbar-expand">
                    <div class="container-fluid justify-content-center" id="sidebarCollapse">
                        <div id="menuBtn" class="justify-content-center">
                            <div id="bar1" class="icon-bar"></div>
                            <div id="bar2" class="icon-bar"></div>
                            <div id="bar3" class="icon-bar"></div>
                        </div>
                    </div>
                </nav>
            </div>
`

document.getElementById("menu").innerHTML = menuInnerContent;

//פונקציה ליצירת שורת חיפוש
function searchLine(page) {
    let searchPlace;
    if (page[0].id == "homePageDiv") {
        searchPlace = `<input type="search" id="searchLine" class="searchBar col-11 offset-1" placeholder="במה תרצו לטפל?">
            `}
    else {
        searchPlace = ``;
    }

    return searchPlace
}

import { baseCategories, preperationCategories } from "./categories.js";

//פונקציה ליצירת כפתורי התפריט
function menuCategories(itemList, type) {
    let newItemList = "";

    itemList.forEach(el => {
        if (el[2].length > 1 && type == 'cases') {
            el = `<li class="active">
              <a href="#${el[1]}" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">${el[0]}</a>
               <ul class="collapse list-unstyled" id="${el[1]}">
                ${el[2].map(elm =>`<li>
                <a href="innerPage.html" onClick="(function(){localStorage.pageName='${elm[0]}'+'/'+'${el[1]}'+'/'+'${type}';})()">${elm[1]}</a>
              </li>`).join(" ")}</ul></li>`
        }
        else {
            el = `<li><a href="innerPage.html" onClick="(function(){localStorage.pageName='${el[1]}'+'/'+'${el[1]}'+'/'+'${type}';})()">${el[0]}</a></li>`
        }

        newItemList += el;
    });

    return newItemList;
}

//פונקציה להכנסת כל הקטגוריות לרשימה שתופיע בחיפוש
function searchCategories(itemList) {
    let newItemList = "";
    let type = '';

    if (itemList == baseCategories) {
        type = 'cases';
    }
    else {
        type = 'preperation'
    }
    
    itemList.forEach(el => {
        if (el[2].length > 1) {
            el[2].forEach(el1 => newItemList += `<li><a href="innerPage.html" onClick="(function(){localStorage.pageName='${el1[0]}'+'/'+'${el[1]}'+'/'+'${type}';})()">${el1[1]}</a></li>`);
        }
        else {
            newItemList += `<li><a href="innerPage.html" onClick="(function(){localStorage.pageName='${el[1]}'+'/'+'${el[1]}'+'/'+'${type}';})()">${el[0]}</a></li>`
        }
    });

    return newItemList;
}

const searchLineInnerContent = searchCategories(baseCategories) + searchCategories(preperationCategories);

document.getElementById("myUL").innerHTML += searchLineInnerContent;
