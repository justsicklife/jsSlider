const slideList = document.querySelector(".slide_list");
const buttonPrev = document.querySelector(".button_box_prev");
const buttonNext = document.querySelector(".button_box_next");
const slideContents = document.querySelectorAll(".slide_content");
const pagination = document.querySelector(".pagination");
const slideLength = slideContents.length;
const contentWidth = 400;
const contentSpeed = 300;
const startNum = 1;
const endNum = 5;
const selectSlide = "slide_active"; 
let pageDots;

let curIndex = 0;

slideList.style.width = (slideLength + 2)*(contentWidth) + "px";

const firstChild = slideList.firstElementChild;
const lastChild = slideList.lastElementChild;
const clonedFirst = firstChild.cloneNode(true);
const clonedlast = lastChild.cloneNode(true);

slideList.appendChild(clonedFirst);
slideList.insertBefore(clonedlast,slideList.firstElementChild);

slideList.style.transform = "translateX(-" + contentWidth * startNum + "px)";

slideContents[curIndex].classList.add(selectSlide);

function init() {
    buttonNext.addEventListener("click",clickButtonNext);
    buttonPrev.addEventListener("click",clickButtonPrev);
    paginationInitializer();
    pageDots = document.querySelectorAll(".dot");
    pageDots.forEach(function(dot){
        dot.addEventListener("click",function(event){
        const selectIdx = Number(this.getAttribute('data-index'));
        if (curIndex !== selectIdx) {
        slideContents[curIndex].classList.remove("slide_active");
        slideContents[selectIdx].classList.add("slide_active");
        pageDots[curIndex].classList.remove("dot_active");
        pageDots[selectIdx].classList.add("dot_active");
        curIndex = selectIdx;
        slideList.style.transform = "translateX(-" + contentWidth * (parseInt(selectIdx) + 1) + "px)";
        slideList.style.transition = contentSpeed + "ms";   
        }
        });
    });
}


function clickButtonNext() {
    slideContents[curIndex].classList.remove(selectSlide);
    pageDots[curIndex].classList.remove("dot_active")
    if(curIndex < slideLength - 1) {
        slideList.style.transform = "translateX(-" + contentWidth * (curIndex + 2) + "px)";
        slideList.style.transition = contentSpeed + "ms";
        curIndex++;
    } else {
        slideList.style.transform = "translateX(-" + contentWidth * (endNum +1) + "px)";
        slideList.style.transition = contentSpeed + "ms";
        setTimeout(function(){
            slideList.style.transition = 0 + "ms";
            slideList.style.transform = "translateX(-" + contentWidth * (startNum) + "px)";
        },contentSpeed)
        curIndex = startNum - 1
    }
    slideContents[curIndex].classList.add(selectSlide);
    pageDots[curIndex].classList.add("dot_active")
}

function clickButtonPrev(){
    slideContents[curIndex].classList.remove(selectSlide);
    pageDots[curIndex].classList.remove("dot_active")
    if(curIndex > 0 ) {
        slideList.style.transform = "translateX(-" + contentWidth * (curIndex) + "px)";
        slideList.style.transition = contentSpeed + "ms";
        curIndex--;
    } else {
        slideList.style.transform = "translateX(-" + contentWidth * (startNum - 1) + "px)";
        slideList.style.transition = contentSpeed + "ms";
        setTimeout(function(){
            slideList.style.transition = 0 + "ms";
            slideList.style.transform = "translateX(-" + contentWidth * (endNum) + "px)";
        },contentSpeed)
        curIndex = endNum - 1;
    }
    slideContents[curIndex].classList.add(selectSlide);
    pageDots[curIndex].classList.add("dot_active")
}

function paginationInitializer() {
    for (let i = 0 ; i < slideLength ; i++ ) {
        li = document.createElement("li");
        a = document.createElement("a");
        a.setAttribute("href","#");
        li.classList.add("dot");
        if (i === startNum - 1) {
            li.classList.add("dot_active");
        }
        li.setAttribute("data-index",i);
        li.appendChild(a);
        pagination.appendChild(li);
    }
}

init();