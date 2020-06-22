const slideBox = document.querySelector(".slide_box") ;
const slideList = document.querySelector(".slide_list");
const slideContents = document.querySelectorAll(".slide_content");
const slideButtonPrev = document.querySelector(".slide_btn_prev");
const slideButtonNext = document.querySelector(".slide_btn_next");
const slidePagination = document.querySelector(".slide_pagination");
const pageDots;
const slideLength = slideContents.length;
const contentWidth = 400;
const contentHeight = 400;
const slideSpeed = 300;
const startNum = 1;
const endNum = slideLength - 1

let curIndex  = 0;
let curSlide = slideContents[curIndex]

slideList.style.width = contentWidth * (slideLength + 2) + "px";
slideList.style.height = contentHeight + "px";

function init() {
    slideButtonPrev.addEventListener("click",clickButtonPrev);
    slideButtonNext.addEventListener("click",clickButtonNext);
    setPagination();
}

const firstChild = slideList.firstElementChild;
const lastChild = slideList.lastElementChild;
const clonedFirst = firstChild.cloneNode(true);
const clonedLast = lastChild.cloneNode(true);

slideList.appendChild(clonedFirst);
slideList.insertBefore(clonedLast,firstChild)

slideList.style.transform = "translatex(-" + startNum * contentWidth + "px)";

curSlide.classList.add("active_list");

function clickButtonPrev() {
    if (curIndex  > 0) {
        slideList.style.transition = slideSpeed + "ms";
        slideList.style.transform = "translatex(-" + (curIndex)* contentWidth + "px)";
        --curIndex ;
    } else {
        slideList.style.transition = slideSpeed + "ms";
        slideList.style.transform = "translatex(0px)";
        setTimeout(function(){
            slideList.style.transition = "0ms";
            slideList.style.transform = "translatex(-" + contentWidth*(endNum + 1) + "px";
        },slideSpeed)
        curIndex = endNum;
    }
}

function clickButtonNext() {
    if (curIndex  < endNum) {
        slideList.style.transition = slideSpeed + "ms";
        slideList.style.transform = "translatex(-" + (curIndex + 2)* contentWidth + "px)";
        curSlide.classList.remove("active_list");
        curSlide = slideContents[curIndex + 1];
        ++curIndex;
    } else {
        slideList.style.transition = slideSpeed + "ms";
        slideList.style.transform = "translatex(-" + (curIndex  + 2)* contentWidth + "px)";
        setTimeout(function(){
            slideList.style.transition = "0ms";
            slideList.style.transform = "translatex(-" + contentWidth * startNum + "px";
        },slideSpeed);
        curSlide.classList.remove("active_list");
        curIndex = 0;
        curSlide = slideContents[curIndex];
    }
    curSlide.classList.add("active_list");
}

function setPagination() {
    let pageChild = '';
    for (var i = 1 ; i <= slideLength ; i++) {
        pageChild += '<li class="dot';
        pageChild += (i === startNum) ? ' dot_active' : '';
        pageChild += '" data-index="' + i + '"><a href="#"></a></li>';
    }
    slidePagination.innerHTML = pageChild;
    pageDots = document.querySelectorAll('.dot');
}

init();