/* ################################################################################### */
/* ######################### START PAGE TRANSITION SECTION ########################### */
const sections = document.querySelectorAll(".section");
const secBtns = document.querySelectorAll(".controls");
const secBtn = document.querySelectorAll(".control");

function pageTransitions() {
  // Button Click Active Class
  for (let i = 0; i < secBtn.length;i++) {
    secBtn[i].addEventListener("click", function() {
      let currentBtn = document.querySelectorAll(".active-btn");
      currentBtn[0].classList = currentBtn[0].className.replace("active-btn", "");
      this.classList.add("active-btn");
    })
  };

  // Sections Active
  document.body.addEventListener("click",(e) => {
    let id = e.target.dataset.id;
    if(id) {
      // Remove Selected From Other Buttons
      secBtns.forEach((btn) => {
        btn.classList.remove("active");
      });

      e.target.classList.add("active");

      // Hide Other Sections
      sections.forEach((sec) => {
        sec.classList.remove("active");
      });

      const ele = document.getElementById(id);
      ele.classList.add("active");
    }
  });
};
pageTransitions();
/* ########################## END PAGE TRANSITION SECTION ############################ */
/* ################################################################################### */
/* ########################## START FETCH PROJECTS SECTION ########################### */
const projectsCont = document.getElementById("projectsCont");
var parseProjectsArr;

let req = new XMLHttpRequest();
req.onreadystatechange = function() {
  if (this.readyState === 4 && this.status === 200) {
    parseProjectsArr = JSON.parse(this.responseText);
    addProjects(parseProjectsArr);
  };
};
req.open("GET", "./script/projects.json");
req.send();

function addProjects(projectsArr) {
  projectsCont.innerHTML = "";
  for (let i = 0; i < projectsArr.length; i++) {
    let div = document.createElement("div");
    div.classList.add("project-card");
    div.innerHTML = `
      <img src="${projectsArr[i].img}" alt="Portfolio Image ${i + 1}" />
      <div class="card-info">
        <h3 class="project-name">${projectsArr[i].name}</h3>
        <p class="desc">${projectsArr[i].desc}</p>
        <div class="links">
          <a class="git" href="${projectsArr[i].links.code}" target="_blank" title="View project
            source code on Github"><i class="fa-brands fa-github"></i></a>
          <a class="live" href="${projectsArr[i].links.live}" target="_blank">view live</a>
        </div>
      </div>
    `;
    projectsCont.appendChild(div)
  }
};
/* ########################### END FETCH PROJECTS SECTION ############################ */
/* ################################################################################### */
/* ############################## START SKILLS SECTION ############################### */
const skillsCont = document.getElementById("skillsCont");
let mySkills = [
  {
    name: "html5",
    num: "95%",
  },
  {
    name: "css3",
    num: "90%",
  },
  {
    name: "scss & sass",
    num: "90%",
  },
  {
    name: "JavaScript",
    num: "80%",
  },
  {
    name: "Bootstrap",
    num: "75%",
  },
];

function addSkills(skillsArr) {
  skillsCont.innerHTML = "";
  for (let i = 0; i < skillsArr.length; i++){
    let div = document.createElement("div");
    div.classList.add("progress-bar");
    div.innerHTML = `
      <p class="prog-title">${skillsArr[i].name}</p>
      <div class="progress-cont">
        <p class="prog-text">${skillsArr[i].num}</p>
        <div class="progress">
          <span style="width: ${skillsArr[i].num}"></span>
        </div>
      </div>
    `;
    skillsCont.appendChild(div);
  };
};
addSkills(mySkills);
/* ############################### END SKILLS SECTION ################################ */
/* ################################################################################### */
/* ########################### START THEME TOGGLE SECTION ############################ */
const themeBtn = document.querySelector(".theme-btn");

let mode = localStorage.getItem("mode") ? localStorage.getItem("mode") : localStorage.setItem("mode", "dark");

if (mode == "dark") {
  document.body.classList.remove("light-mode");
} else if (mode == "light") {
  document.body.classList.add("light-mode");
};

themeBtn.onclick = function() {
  document.body.classList.toggle("light-mode");
  localStorage.setItem("mode", document.body.classList.contains("light-mode") ? "light" : "dark");
}
/* ############################ END THEME TOGGLE SECTION ############################# */
/* ################################################################################### */
/* ########################## START LANGUAGE TOGGLE SECTION ########################## */
const langBtn = document.getElementById("langBtn");
let elements = document.querySelectorAll("[data-lang]");
let html = document.getElementsByTagName("html")[0];

let htmlLang = "en";

if (localStorage.getItem("lang")) {
  htmlLang = localStorage.getItem("lang");
} else {
  localStorage.setItem("lang", htmlLang);
}

langBtn.onclick = function() {
  if(htmlLang === "en") {
    htmlLang = "ar";
    document.dir = "rtl";
  } else if (htmlLang === "ar") {
    htmlLang = "en";
    document.dir = "ltr";
  }
  localStorage.setItem("lang", htmlLang);
  setLang(localStorage.getItem("lang"));
};

function setLang(lang) {
  let langReq = new XMLHttpRequest();
  langReq.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      let translationObj = JSON.parse(this.responseText);
      elements.forEach((ele) => {
        let key = ele.getAttribute("data-lang");
        if (ele.getAttribute("placeholder")) {
          ele.setAttribute("placeholder", translationObj[lang][key]);
        } else {
          ele.innerHTML = translationObj[lang][key];
        }
      });
    }
  };
  langReq.open("GET", "./script/language.json");
  langReq.send();
  document.dir = lang == "ar" ? "rtl" : "ltr";
  html.setAttribute("lang", lang);
};

setLang(localStorage.getItem("lang"));
/* ########################### END LANGUAGE TOGGLE SECTION ########################### */
/* ################################################################################### */

let ele = document.querySelectorAll(".removeJS");
for (let i = 0; i < ele.length; i++) {
  ele[i].remove();
};

let submit = document.querySelector("a.submit");

submit.onclick = () => {
  let input =  document.querySelectorAll("input");
  let textarea = document.querySelectorAll("textarea");
  let allInputs = [...input, ...textarea];
  // console.log(allInputs)
  allInputs.forEach(function(v) {
    v.value = "";
  })
}