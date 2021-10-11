import { baseCategories, preperationCategories, aboutUs } from "./categories.js"
//פונקציה שקוראת כשהעמוד מוכן
$(document).ready(function () {
    //בדיקה האם מדובר בדף תוכן של אירוע עזרה ראשונה
    if (pageType == 'cases') {
        //קריאה לפוקציה הרלוונטית לעמודים מסוג זה לאחר טעינת הדף 
        casesInitFunc();
    }
    else {
        prepInitFunc();
    }
})
//משתנים להחזקת שם העמוד והתיקייה בהתאם לשם העמוד כפי שנשמר בעמוד הקודם
const pageFullName = localStorage.pageName.split('/', 3);
const pageFolder = pageFullName[1];
const pageName = pageFullName[0];
const pageType = pageFullName[2];
//משתנים להחזקת כותרת העמוד והשלבים
var pageTitle, pageSteps;
//משתנה שמחזיק האם יש בעמוד שימוש בביט להחייאה
var RCbeat = false;
//משתנה שיחזיק את מספר השלב בו יופעל הביט
var RCbeatStart;
//משתנה שמחזיק האם הביט מושמע
var RCbeatIsOn = false;
//משתנה שיחזיק את הכפתור להפעלה ידנית של הביט
var RCbeatStartBtn;

//פונקציה המופעלת בעת טעינת העמוד
function init() {
    //headerהקטנה של ה
    document.getElementById("header").style = "height: 90px; border-bottom-left-radius: 0;";
    //headerשינוי הנראות של ה
    document.getElementById("blueBG").style = "border-bottom-left-radius: 0;";
    //הסרה של שורת החיפוש
    document.getElementById("searchDiv").remove();
   //משתנה להחזקת רשימת השלבים 
    var listItem;
    //בדיקה האם מדובר בדף תוכן של אירוע עזרה ראשונה
    if (pageType == 'cases') {
        //אם כן- מעבר על כל הקטגוריות 
        baseCategories.forEach(e => {
            //עבור כל איבר- בדיקה אם הוא קטגוריה בפני עצמה או תתי קטגוריה
            if (e.length > 2) {
                //אם מדובר בקטגוריה עם תתי קטגוריות- הכנסת מערכי תתי הקטגוריות לתוך משתנה
                listItem = e[2];
            }
            else {
                //הכנסת מערך הקטגוריה לתוך משתנה
                listItem = e;
            }
            //עבור כל אחד מהאיברים במערך הקטגוריות
            listItem.forEach(el => {
                //בדיקה האם האיבר (שהוא מערך בעצמו), במקום האפס, שווה לשם העמוד הנוכחי
                if (el[0] == pageName) {
                    //אם כן- לקיחת הכותרת המתאימה לעמוד מתוך המערך של האיבר
                    pageTitle = "שלבי טיפול ב" + el[1];
                    //אם כן- לקיחת השלבים המתאימים לעמוד מתוך המערך של האיבר
                    pageSteps = el[2];
                }
            })
        })
    }
    //אם מדובר בעמוד פנימי שלא של מקרה עזרה ראשונה 
    else {
        //משתנה להחזקה סוג העמוד
        let typeName = "";
        //אם מדובר בעמוד הכנה מוקדמת
        if (pageType == 'preperation') {
           //הכנסת התוכן הרלוונטי לעמוד מסוג זה לתוך משתנה
            typeName = preperationCategories;
        }
         //אם לא-סימן שמדובר בעמוד אודות
        else {
            //הכנסת התוכן הרלוונטי לעמוד אודות לתוך משתנה
            typeName = aboutUs;
        }
        //עבור כל אחד מהאיברים במערך התוכן הרלוונטי
        typeName.forEach(e => {
            //בדיקה האיבר במקום ה-1 בתוך האיבר בשמערך התוכן שווה לשם הדף הנוכחי
            if (e[1] == pageName) {
            //אם כן- הגדרת כותרת העמוד לפי הכתוב המקום הרלוונטי 
            pageTitle = e[0];
            // הגדרת "שלבי העמוד" לפי הכתוב במקום הרלוונטי
            pageSteps = e[2];
           }
        });
       }
}

//קריאה לפונקציה שתופעל בעת טעינת העמוד 
init();
//פונקציה ליצירת התוכן בדף
function mainContentBuildeFunction(pageType) {
    //משתנה להחזקת התוכן הפנימי
    let mainContent = ``;
    //משתנה להחזקת התוכן הפנימי המשני- שלבי ההוראות
    let mainContentInner = ``;
    //משתנה להחזקת רשימת הוראות הטיפול
    let isList = ``;
    //משתנה להחזקת אלמנטים שאחראיים על הקראה
    let forVoiceRead = ``;
    //בדיקה האם מדובר בדף תוכן של אירוע עזרה ראשונה
    if (pageType == 'cases') {
            //בדיקה האם יש הוראות לטיפול- בדפי כאב בטן וראש אין הוראות
        if (pageSteps.length > 1) {
            //אם כן- בעבור כל אחד מהאיברים במערך שלבי העמוד
            pageSteps.forEach(e => {
                //משתנה להחזקת מספר השלב
                var listItemNum = pageSteps.indexOf(e) + 1;
                //בדיקה האם השלב הוא מערך, כלומר מורכב משני איברים
                if (e.length == 2) {
                    //אם כן- סימן שהשלב כולל בתוכו הוראות להחייאה- משנים את המשתנה של החייאה ל-טרו
                    RCbeat = true;
                    //הכנסת מספר השלב לתוך משתנה להפעלת ההחיאה
                    RCbeatStart = pageSteps.indexOf(e) + 1;
                    //שינוי החלק האחרון של ההוראה שיכיל כפתור לצורך הפעלה ידנית של הביט להחייאה
                    e = e[0] + "<a id='startBeat'> השמע קצב </a>";
                }
                mainContentInner += `<li><p class="instructions" id="instruction${listItemNum}" title="${pageName}-Step${listItemNum}"><span>${listItemNum}.</span>${e}</p></li>`;
            });
            forVoiceRead = `<div id="voiceReadBtnDiv" class="row">
        <button id="voiceReadBtn" class="btn">
        <span id="voiceReadBtnTxt">הקריאו לי</span>
        <div id="voiceReadPlayStopBtn"></div>
        </button> 
        </div> 
        <div id="switchDiv" class="row hidden">
        <span id="switchBtnTxt" class="none-active">מרווח של 10 שניות בין השלבים</span>
        <label class="switch">
        <input id="breakBtn" type="checkbox">
        <span class="switchSlider round"></span>
        </label>
        </div>`
            isList = `<ol class="instructionsList">
            ${mainContentInner}
            </ol>`
        }
        else {
            mainContentInner = `<p class="instructions nonList">${pageSteps}</p>`;
            isList = mainContentInner;
        }

        mainContent = `<div id="pageHeadline" class="innerPageHeadline row justify-content-center">
        <div class="col-9 row justify-content-center">
        <h4 class="text-center">${pageTitle}</h4>
        </div>
        </div>  
        ${forVoiceRead}
        <div id="stepsDiv" class="row justify-content-center">
            <div id="steps" class="col-11">
            <div id="slider" class="ui-slider"></div>
            ${isList}
             <p class="instructions" id="instruction" hidden title="this was the last step"></p>
            </div>
`;
    }
    else {
        if (pageName == "cardiopulmonaryResuscitation") {
            RCbeat = true;
        }
        mainContentInner = pageSteps;
        mainContent = `<div id="pageHeadline" class="innerPageHeadline row justify-content-center">
        <div class="row justify-content-center">
        <h3 class="text-center">${pageTitle}</h3>
        </div>
        </div>  
            <div id="stepsDiv" class="row justify-content-center">
            <div id="steps" class="col-11">
                ${mainContentInner}
                <p class="instructions" id="instruction" hidden title="this was the last step"></p>
            </div>`;
    }
    //החזרה של המשתנה עם התוכן הפנימי
    return mainContent;
}

//משתנה להחזקת כל תוכן העמוד
const pageContent = `<div class="goBackDiv">
                    <a class="offset-1" id="backBtn">
                    <img src="images/arrow_blue.png"></img>
                    </a>
                    </div>
                    ${mainContentBuildeFunction(pageType)}
                    ${audioControls()}`;

//הכנסת המשתנה עם כל תוכן העמוד לתוך הדיב הרלוונטי בעמוד
document.getElementById("innerPageDiv").innerHTML = pageContent;
//הוספת אירוע לחיצה על כפתור חזור- קריאה לפונקציה הרלוונטית
document.getElementById("backBtn").addEventListener("click", goBack);

//פונקציה שיוצרת רכיבי אודיו בהתאם לתוכן העמוד, אם צריך ביט להחייאה היא יוצרת שניים
function audioControls() {
    //משתנה להחזקה רכיבי האודיו של העמוד
    var createAudio = ``;
    //בדיקה האם יש צורך ברכיב אודיו להשמעת מטרונות להחייאה
    if (RCbeat) {
       //אם כן, המשתנה כולל שני רכיבי אודיו אחד לההוראות והשני למטרונום שיפעל במקביל
        createAudio = `<audio hidden controls id="audioBar">
        <source id="source" type="audio/mpeg">
            Your browser does not support the audio element.
      </audio>

     <audio hidden controls id="audioForBeat">
        <source id="source" type="audio/mpeg">
            Your browser does not support the audio element.
      </audio>`

    }
    else {
        //אם לא, המשתנה כולל רכיב אודיו אחד בלבד להוראות
        createAudio = `<audio hidden controls id="audioBar">
        <source id="source" type="audio/mpeg">
            Your browser does not support the audio element.
      </audio>`
    }
    //החזרה של המשתנה עם רכיבי האודיו
    return createAudio;
}

//פונקציה לכפתור חזור
function goBack() {
    //החזרת החלון לעמוד הקודם
    window.history.back();
}

//משתנה להחזקת מספר ההוראה הנוכחית לטובת ההקראה
var lineNum = 1;
//משתנה להחזקת מספר ההוראות הקיימות בדף
var lastLine;
//משתנה לבדיקה האם זו השורה האחרונה
var isLast;
//משתנה להפעלה או הפסקה של הקראה
var speakIsOn = false;
//משתנה להחזקת הטקסט שיוקרא
var textToSpeech;
//משתנה להחזקת מיקום הטקסט שיוקרא
var textToSpeechPath;
//משתנה להחזקת ההקלטה לצורך הפעלה / הפסקה
var audioPlayer;
//משתנה להחזקת הסליידר של ההקראה
var stepSlider
//משתנה להחזקת מספר שניות להפסקה בין הקראת שלבים
var breakSec = 1;
//משתנה להחזקת רכיב האודיו לביט של ההחייאה 
var aud;
//משתנה להחזקת רכיב האודיו עם הביט להחייאה 
var audForBeat;
//משתנה להחזקת הנגן עם הביט של ההחיאה לצורך הפעלה / הפסקה
var audForBeatPlayer;
// משתנה להחזקת טיים אאוט לקריאה לפונקציה
var timeOutVar;
//משתנה להחזקת מערך הערכים האמיתי של מיקום השלבים ביחס לחלק העליון לטובת עיצוב הסליידר
var sliderTrueValues = [];

////פונקציה שמופעלת בעת טעינת דף של אירועי עזרה ראשונה
function casesInitFunc() {
    //ספירת כמות ההוראות בדף והכנסת המספר לתוך המשתנה הרלוונטי
    lastLine = $('.instructions').length -1;
    //הכנסת כפתור הפעלת/הפסקת ההקראה לתוך משתנה
    var speakButton = $("#voiceReadBtn");
    //בדיקה האם יש בעמוד שימוש בביט להחייאה
    if (RCbeat) {
    //הכנסת כפתור הפעלת/הפסקת הביט לתוך משתנה
    RCbeatStartBtn = $("#startBeat");
    //הוספת קריאה לפונקציה הרלוונטית בלחיצה על כפתור הפעלת הביט
        RCbeatStartBtn.click(funcForRCbeat);
    }
    //הכנסת הסליידר של ההקראה לתוך משתנה
    stepSlider = $("#slider");
    //הגדרות הסליידר של ההקראה
    stepSlider.slider({
        //כיוון הסליידר-מאונך
        orientation: "vertical",
        //ערך מינימאלי
        min: 1,
        //ערך מקסימלי- בהתאם לכמות ההוראות שנספרו בעמוד
        max: pageSteps.length,
        //ערך נוכחי- בהתאם לערך האחרון, כיוון שהסלידר אנכי הוא אמור להתחיל מלמטה ואנחנו רוצים שיתחיל מלמעלה
        value: pageSteps.length,
        //קפיצות בכל מעבר
        step: 1,
        //בכל הזזה של הסליידר
        slide: function whenSlide(event, ui) {
             //קריאה לפונקציה למעבר הוראה
            whenSliderChange(event, ui);
        },
        //בכל שינוי של הסליידר
        change: function whenChange(event, ui) {
           //קריאה לפונקציה למעבר הוראה
            whenSliderChange(event, ui);
        }
    });

    //פונקציה לחישוב גובה השורה
    function calcTopPose(lineNum) {
        //משתנה להחזקת מיקום השורה ביחס לכל השורות
        var topPosCalc = sliderTrueValues[lineNum];
        //קביעת מיקום כפתור הסליידר בהתאם למיקום השורה
        $(".ui-slider-handle").css("top", topPosCalc + "px");
        //משתנה להחזקת גובה הסליידר
        var sliderHeight = document.getElementById("slider").clientHeight;
        //משתנה לחישוב מיקום כפתור הסליידר ביחס לאורך הסליידר
        var myGradientValue = sliderHeight - topPosCalc - 5;
        //משתנה להחזקת הגדרות המילוי של הסליידר בהתאם למיקום הכפתור
        var myGradient = "linear-gradient(to top, #EDEBEB " + myGradientValue + "px, #3460E0 " + myGradientValue + "px)";
        //שינוי מילוי הסליידר
        $("#slider").css("background", myGradient);
    }

    
    function whenSliderChange(event, ui) {
        //הכנסת מספר השורה לתוך משתנה
        lineNum = pageSteps.length + 1 - parseInt(ui.value);
        //קריאה לפונקציה לחישוב גובה השורה לטובת עיצוב
        calcTopPose(lineNum);
        //בדיקה האם השורה היא לא האחרונה
        if (!isLast) {
            //הגדרת שם קובץ הטקסט להשמעה כשם הכותרת של השורה המושמעת
            textToSpeech = document.getElementById("instruction" + lineNum).title;
            //הגדרת הטקסט להשמעה לפי המשתנים הרלוונטים
            textToSpeechPath = pageFolder + "/" + pageName + "/" + textToSpeech;
            //שינוי נראות הכפתור 
            $("#voiceReadPlayStopBtn").removeClass("restart");
        }
        else {
            //אם מדובר בשורה האחרונה
            textToSpeechPath = "thisWaslastLine";
            //שינוי נראות הכפתור 
            $("#voiceReadPlayStopBtn").addClass("restart");
        }
         //בדיקה האם שונה מיקום הסליידר
        if (event.type == "slidechange") {
        //איתור הקלטה של הטקסט הרלוונטי מתוך הקלטות המאוחסנות בענן בהתאם לשם הנמצא בכותרת שלו
         $('#audioBar').attr('src', 'records/' + textToSpeechPath + '.mp3');
        //בדיקה האם ההקראה פועלת
        if (speakIsOn) {
        //במידה וכן, הפעלת הההשמעה של הטקסט 
         $('#audioBar').get(0).play();
        }
        //הכנסת ההקלטה הפועלת לתוך משתנה לטובת הפסקה במקרה הצורך
        audioPlayer = $('#audioBar').get(0);
        }
        //הסרת הקלאס של השורה שהושמעה
        $(`.instructions.active`).removeClass("active");
        //הוספת קלאס לשורה הנוכחית
        $(`#instruction` + lineNum).addClass("active");
        //הכנסת רכיב האודיו של ההקראה לתוך משתנה
        aud = document.getElementById("audioBar");
        //פונקציה שפועלת בעת סיום ההקראה של השלב הנוכחי 
        aud.onended = function () {
            //בדיקה האם צריך להפעיל ביט להחייאה בסיום הקראת השורה
            if (RCbeat && lineNum == RCbeatStart) {
                //במידה וכן- קריאה לפונקציה להפעלת הביט להחייאה
                funcForRCbeat();
                //פונקציה שפועלת בסיום ההקלטה של הביט
                audForBeat.onended = function () {
                 //בדיקה האם ההקראה עדיין מופעלת
                    if (speakIsOn) {
                        //במידה וכן- המשך להשמיע את הביט להחייאה
                        audForBeatPlayer.play();
                    }
                }
            }
        //שינוי נראות השורה שהושמעה
            $(`#instruction` + lineNum).css("color", "#345FDF");
            //פונקציה שתופעל בדיליי של שלוש שניות  
            timeOutVar = setTimeout(timeOutFunc, breakSec * 1000);
            //בדיקה אם השורה האחרונה שהושמעה הייתה האחרונה
            if (lineNum == lastLine) {
                //בדיקה אם נאמר כבר שזאת השורה האחורנה
                if (textToSpeechPath != "thisWaslastLine") {
                    //אם לא- שינוי המשתנה המתאים לטובת הקראת המשפט שמיידע שזאת הייתה השורה האחרונה
                    isLast = true;
                }
                else {
                     //אם כן- הפסקת השמעת שורות באופן אוטומטי
                    clearTimeout(timeOutVar);
                    //שינוי המשתנה בהתאם
                    isLast = false;
                }
            }
            else {
                //אם לא מדובר בשורה האחורנה- שינוי המשתנה המתאים בהתאם
                isLast = false;
            }

        };
        //פונקציה להפעלת המשך ההוראות  
        function timeOutFunc() {
                //בדיקה האם ההקראה עדיין פעילה מצד המשתמש
                if (speakIsOn == true) {
                    //בדיקה אם אין שום שורה שמופעלת כרגע
                    if (audioPlayer.duration == 0 || audioPlayer.paused) {
                        //הזזת הסליידר לשורה הבאה ובתוכו הפעלה של ההקראה הבאה
                        $("#slider").slider("value", $("#slider").slider("value") - 1);}
            }

        }
    }

    
    //הגדרת פונקציה שתפעל בלחיצה על הכפתור
    speakButton.click(() => {
        //בדיקה האם ההקראה הופעלה מחדש
        if ($("#voiceReadPlayStopBtn").hasClass('restart')) {
            //אם כן- הגדרת השורה להקראה כשורה הראשונה
            lineNum = 1;
            //שינוי נראות הכפתור 
            speakButton.removeClass('active play');
        }
        else {
            //שינוי מצב המשתנה להפעלת או הפסקה ההקראה
            speakIsOn = !speakIsOn;
        }

        //בדיקה האם ההקראה מופעלת
        if (!speakButton.hasClass('active')) {
            //שינוי נראות הכפתור 
            speakButton.addClass('active');
            //שינוי נראות הטקסט של הכפתור 
            $("#voiceReadBtnTxt").addClass("active");
            //שינוי נראות הסימן של הכפתור 
            $("#voiceReadPlayStopBtn").addClass("active play");
            //הצגת כפתור להפסקת\הפעלת ההפוגה בין הפסקאות
            $("#switchDiv").removeClass("hidden");
            //הצגת הסליידר לשליטה בהקראה
            stepSlider.show();
            
            //טיימאאוט שיופעל ברגע שהשורות מסיימות לזוז ולפנות מקום לסליידר- לאחר חצי שנייה
             setTimeout(function () {
            //לולאה שחוזרת כמספר השלבים בדף
                for (var i = 1; i <= pageSteps.length; i++) {
                    //הכנסת הערך של מיקום השלב ביחס לחלק העליון לתוך המערך המתאים
                    sliderTrueValues[i] = document.getElementById("instruction" + i).offsetTop;
                }
            }, 500)
        }
        else {
            //שינוי נראות הכפתור 
            $("#voiceReadPlayStopBtn").toggleClass("pause play");
        }

        //בדיקה האם הופעלה או הופסקה ההקראה על ידי המשתמש
        if (!speakIsOn) {
            //הפסקה של ההקראה
            audioPlayer.pause();
            //בדיקה האם יש ביט של החייאה
            if (RCbeat) {
                //הפסקה של הביט להחייאה
                audForBeatPlayer.pause();
            }
            //הסרת הקלאס מהשורה שהושמעה
            $(`#instructions.active`).removeClass("active");
        }
        else {
            //בדיקה האם זאת הפעלה ראשונה
            if (lineNum == 1) {
                //קריאה לפונקציית ההקראה   
                $("#slider").slider("value", lastLine);
                //הוספה של קלאס להוראות שיזיז אותן ויפנה מקום לסליידר
                $(".instructionsList").addClass("withVoice");
            }
            else {
                 //קריאה לפונקציית ההקראה שתתחיל מהמשפט הנוכחי   
                $("#slider").slider("value", (lastLine-lineNum+1));
            }
        }

    });

    $("#breakBtn").click(function () {
       //שינוי נראות הכיתוב של כפתור הפעלת הפסקה
        $("#switchBtnTxt").toggleClass("none-active");
        //בדיקה האם הופעלה ההפסקה או הופסקה
        if ($("#switchBtnTxt").hasClass("none-active")) {
            //אם הופסקה ההפסקה בין הקראת השלבים- שינוי המשתנה של מספר שניות ההפסקה לשניה אחת
            breakSec = 1;
            //בדיקה אם אין שום שורה שמופעלת כרגע
            if (speakIsOn && (audioPlayer.duration == 0 || audioPlayer.paused)) {
                //הזזת הסליידר לשורה הבאה ובתוכו הפעלה של ההקראה הבאה
                $("#slider").slider("value", $("#slider").slider("value") - 1);
            }
        }
        else {
            //אם הופעלה ההפסקה בין הקראת השלבים- שינוי המשתנה של מספר שניות ההפסקה לעשר שניות
            breakSec = 10;
        }
    })

    //פונקציה בלחיצה על שורת הקראה
    $(".instructions").click(function () {
     //בדיקה האם ההקראה פועלת
        if (speakIsOn) {
       //הוצאת מספר השורה שנלחצה מתוך האי-די
      var clickedLineId = event.currentTarget.id.slice(11, event.currentTarget.id.length);
      //הזזת הסליידר לשורה שנלחצה ובתוכו הפעלה של ההקראה שלה
       $("#slider").slider("value", lastLine - clickedLineId + 1)
     }
    })

    //פונקציה שמופעלת בעת יציאה מהעמוד- לצורך הפסקה של ההקראה
    function handleVisibilityChange() {
        //אם לא רואים את העמוד יותר
        if (document.hidden) {
            //הפסקת הההשמעה של הטקסט 
            audioPlayer.pause();
            //בדיקה האם יש ביט בעמוד
            if (RCbeat) {
                //הפסקה של הביט
                audForBeatPlayer.pause();
            }
        }
    }

    //הוספת אירוע שעת יציאה מעהמוד- קריאה לפונקציה להפסקת ההקראה
    document.addEventListener("visibilitychange", handleVisibilityChange, false);
}

function funcForRCbeat() {
    //שינוי המשתנה של מצב הביט
    RCbeatIsOn = !RCbeatIsOn;
   //הכנסת רכיב האודיו של הביט לתוך משתנה לטובת הפסקה או הפעלה
    audForBeat = document.getElementById("audioForBeat");
    //הכנסת האודיו של הביט לתוך רכיב האודיו
    $('#audioForBeat').attr('src', 'records/CRbeat.mp3');
    //הכנסת ההקלטת הביט לתוך משתנה לטובת הפסקה במקרה הצורך
    audForBeatPlayer = $('#audioForBeat').get(0);
    //בדיקה האם הפונקציה הופעלה מלחיצה על כפתור הפעלת הביט ולא באופן אוטמטי והאם המשתמש ביקש להפסיק את הביט
    if (event.currentTarget.id == 'startBeat' && !RCbeatIsOn) {
       //הפסקה של הביט
        audForBeatPlayer.pause();
        //שינוי הכיתוב על הכפתור
        RCbeatStartBtn.text(" השמע קצב ");
    }
    else {
    //הפעלת הההשמעה של ביט להחייאה 
        audForBeatPlayer.play();
        //שינוי הכיתוב על הכפתור
        RCbeatStartBtn.text(" הפסק השמעת קצב ");
    }

    //בסיום השמעת הביט
    audForBeatPlayer.onended = function () {
         //שינוי המשתנה של מצב הביט
        RCbeatIsOn =!RCbeatIsOn
            //קריאה לפונקציה להפעלת הביט להחייאה
            funcForRCbeat();
    }
}



//פונקציה שמופעלת אם זה הדף הוא של הכנה מראש
function prepInitFunc() {
    //בדיקה האם זה דף מהסוג שמכיל מצגת שקופיות
    if (pageName == "choking" || pageName == "cardiopulmonaryResuscitation") {

        $("#carouselIndicators").swipe({
            swipeLeft: function (event, direction, distance, duration, fingerCount) {
                $(this).parent().carousel('prev');
            },
            swipeRight: function () {
           
                $(this).parent().carousel('next');
            }
        });

    }

    if (pageName == "choking" || pageName == "cardiopulmonaryResuscitation") {
        //הגדרות הסוויפר של הדרכה מוקדמת חנק והחייאה
        var swiper = new Swiper(".swiper-container", {
            //כיוון הסוויפר
            direction: 'horizontal',
            // סמנים
            pagination: {
                el: '.swiper-pagination',
            },
            // ניווט דרך כפתורים- כשהמסך גדול- מחשב
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            slidesPerView: 1,
            centeredSlides: true,
            spaceBetween: 30,
            
        });

        //בהזזת שקופיות
        swiper.on('slideChange', function () {
            if (swiper.activeIndex!=0) {
                //אם זאת לא שקופית ראשונה- הסר את הקלאס להצגת הבולטים של השקופיות
                $(".swiper-pagination").removeClass("active");
            }
            else {
                //אם זאת השקופית הראשונה- הוסף קלאס והסתר את הבולטים
                $(".swiper-pagination").addClass("active");
            }
        });

        if (pageName == "cardiopulmonaryResuscitation") {
            //הכנסת כפתור הפעלת/הפסקת הביט לתוך משתנה
            RCbeatStartBtn = $("#startBeat");
            //הוספת קריאה לפונקציה הרלוונטית בלחיצה על כפתור הפעלת הביט
            RCbeatStartBtn.click(funcForRCbeat);
        }

        }
    }



//אם רוצים להוסיף אייקון בתוך העמוד
//<img class="innerPageIcon" src="../images/${pageFolder}/${pageName}.png" /> 


///קוד להוספת רכיב זיהוי קולי לאתר////


//יצירת משתנה שיוגדר בהמשך להחזקת אובייקט זיהוי קולי חדש
//var recognition;

//בתוך לחיצה על כפתור פליי
////אם ההקראה הופסקה- ההקלטה של המשתמש מופסקת
//recognition.stop();

//בתוך שינוי או הזזה של הסליידר
////קריאה לפונקציה של זיוהי דיבור המשתמש
//recognitionFunc();


////פונקציה לזיהוי קולי
//function recognitionFunc() {
//    //פונקציה מובנית של זיהוי קולי
//    var speechRecognition = window.webkitSpeechRecognition;
//    //אובייקט חדש של זיהוי קולי
//    recognition = new speechRecognition();
//    //הגדרת השפה של הזיהוי הקולי לעברית
//    recognition.lang = 'he';
//    //הגדרת הזיהוי כך שיפסק ברגע שהמשתמש מסיים לדבר ויש שקט
//    recognition.continuous = false;
//    //משתנה להחזקת התמלול שיתקבל
//    var transcript;
//    //הפעלת הזיהוי הקולי
//    recognition.start();

//    //פונקציה שמופעלת בהתחלת הזיהוי הקולי
//    recognition.onstart = function () {
//        //הדפסת המידע לקונסול
//        console.log("הקלטה פעילה");
//    }

//    //פונקציה שמופעלת בסיום הזיהוי הקולי
//    recognition.onspeechend = function (event) {
//        //הדפסת המידע לקונסול
//        console.log("הדיבור הסתיים");

//        recognitionFunc();
//    }

//    //פונקציה שמופעלת בעת תקלה בתהליך הזיהוי הקולי
//    recognition.onerror = function () {
//        //הדפסת המידע לקונסול
//        console.log("בעיות קליטה");
//        //הפעלה מחדש של הזיהוי הקולי
//        recognitionFunc();
//    }

//    //פונקציה שמופעלת בעת קבלת תוצאות הזיהוי הקולי
//    recognition.onresult = function (event) {
//        //הכנסת המילים שהתקבלו לתוך משתנה
//        transcript = event.results[0][0].transcript;
//        isLast = false;
//        //בדיקת המילים שהתקבלו
//        //אם התקבלה הוראת המשך
//        if (transcript == "המשך" || transcript == "תמשיך" || transcript == "המשך המשך" || transcript == "המשך" || transcript == "חג שמח" || transcript == "שח" || transcript == "הבא") {
//            //אם זאת לא השורה האחרונה בהוראות
//            if (lineNum < lastLine) {
//                //העלאה של מספר השורה לקראת הקראה
//                lineNum++;
//                //קריאה לפונקציה להפעלת הקראת שורה
//                $("#slider").slider("value", lastLine - lineNum + 1);
//            }
//            else {
//                //שינוי המשתנה של השורה האחרונה
//                isLast = true;
//                //קריאה לפונקציה להפעלת הקראת שורה
//                $("#slider").slider("value", lastLine);
//            }
//        }
//        else {
//            //אם התקבלה הוראת חזור
//            if (transcript == "חזור" || transcript == "מחזור" || transcript == "חצור" || transcript == "חגור" || transcript == "אזור" || transcript == "אחזור" || transcript == "הדור" || transcript == "דור" || transcript == "חזור חזור") {
//                //קריאה לפונקציה להפעלת הקראת שורה
//                $("#slider").slider("value", lastLine - lineNum + 1);            }
//            else {
//                //אם התקבלה הוראת הקודם
//                if (transcript == "הקודם" || transcript == "קודם" || transcript == "מה קודם") {
//                    //הורדה של מספר השורה לקראת הקראה
//                    lineNum--;
//                    //החזרת צבע השורה שהוקראה לכחול
//                    $('#instruction' + (lineNum + 1)).css("color", "blue");
//                    //קריאה לפונקציה להפעלת הקראת שורה
//                    $("#slider").slider("value", lastLine - lineNum + 1);
//                }
//                else {
//                    //במקרה שהמילה שהתקבלה לא זוהתה כ"המשך", "חזור" או "הקודם- תתבצע הפעלה מחדש של הזיהוי
//                    recognitionFunc();
//                }
//            }
//        }
//        //הדפסת המילים שהתקבלו לקונסול
//        console.log(transcript);
//    }
//}

