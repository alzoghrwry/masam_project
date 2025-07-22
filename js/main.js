const menuBtn = document.getElementById('menu-btn');
    const navLinks = document.getElementById('nav-links');

    menuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('show');
    });

let slideIndex = 0;
let slides = document.getElementsByClassName("mySlides");
let dots = document.getElementsByClassName("dot");
let timer;

function showSlides() {
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
    dots[i].classList.remove("active");
  }

  slideIndex++;
  if (slideIndex > slides.length) slideIndex = 1;

  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].classList.add("active");

  timer = setTimeout(showSlides, 5000);
}

function currentSlide(n) {
  clearTimeout(timer);
  slideIndex = n - 1;
  showSlides();
}

showSlides();



// كل 5 ثواني
const toggleBtn = document.getElementById("theme-toggle");
const iconDark = document.getElementById("icon-dark");
const iconLight = document.getElementById("icon-light");

function setTheme(isDark) {
  document.body.classList.toggle("dark-mode", isDark);
  iconDark.style.display = isDark ? "none" : "inline";
  iconLight.style.display = isDark ? "inline" : "none";
  localStorage.setItem("theme", isDark ? "dark" : "light");
}

// تحميل الإعداد المحفوظ
const saved = localStorage.getItem("theme");
if (saved === "dark") setTheme(true);

toggleBtn.addEventListener("click", () => {
  const isDark = !document.body.classList.contains("dark-mode");
  setTheme(isDark);
});
 const searchIcon = document.querySelector('.search-icon');
searchIcon.addEventListener('click', () => {
toggleMobileSearch();
});
 function toggleMobileSearch() {
    const search = document.querySelector('.mobile-search .search');
        search.classList.toggle('show')}

const container = document.getElementById('stats-container');
 
async function loadData() {
  try {
    const res=await fetch('https://raw.githubusercontent.com/alzoghrwry/masam_project/main/data.json')
    .then(res => {
        if (!res.ok) throw new Error("فشل في تحميل البيانات");
        return res.json();
    })
    .then(data => {

        data.forEach(item => {
        const card = document.createElement('div');
        card.className = 'stat-card';
        card.innerHTML = `
            <img src="${item.icon}" class="stat-icon" alt="icon">
            <div class>
            <div class="stat-number">${item.number}</div>
            <div class="stat-label">${item.label}</div></div>
        `;
        container.appendChild(card);
        });
    })
    .catch(error => {
        console.error('خطأ:', error);
        document.getElementById('stats-container').innerHTML = '<p>تعذر تحميل البيانات</p>';
    });
  }
catch (error) {
    console.error('حدث خطأ:', error);
  }}
        

loadData();
