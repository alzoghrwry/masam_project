document.addEventListener("DOMContentLoaded", function () {

  const menuBtn = document.getElementById('menu-btn');
  const navLinks = document.getElementById('nav-links');
  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('show');
    });
  }

  // light mode و dark mode هذا الكود لتفعيل 
 const togglebtn = document.getElementById("theme-toggle");
  const Dark = document.getElementById("icon-dark");
  const Light = document.getElementById("icon-light");

  function setTheme(isDark) {
    document.body.classList.toggle("dark-mode", isDark);
    if (isDark) {
  Dark.style.display = "none";
  Light.style.display = "inline";
} else {
  Dark.style.display = "inline";
  Light.style.display = "none";
}

    localStorage.setItem("theme", isDark ? "dark" : "light");
  }

  //  localStorage تفعيل الوضع المحفوظ في 
  const saved = localStorage.getItem("theme");
  setTheme(saved === "dark");

  if (togglebtn) {
    togglebtn.addEventListener("click", () => {
      const isDark = !document.body.classList.contains("dark-mode");
      setTheme(isDark);
    });
  }
  // --- عرض الشرائح ---
  let Index = 0;
  const slides = document.getElementsByClassName("mySlides");
  const dots = document.getElementsByClassName("dot");
  let timer;

  function showSlides() {
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
      if(dots[i]) dots[i].classList.remove("active");
    }

    Index++;
    if (Index > slides.length) Index = 1;

    if(slides[Index - 1]) slides[Index - 1].style.display = "block";
    if(dots[Index - 1]) dots[Index - 1].classList.add("active");

    timer = setTimeout(showSlides, 5000);
  }

  function currentSlide(n) {
    clearTimeout(timer);
    Index = n - 1;
    showSlides();
  }

  if(slides.length > 0 && dots.length > 0) {
    showSlides();
    console.log(slides.length);
    
  }

  
 

  
  const searchIcon = document.querySelector('.search-icon');
  if (searchIcon) {
    searchIcon.addEventListener('click', () => {
      toggleMobileSearch();
    });
  }

  function toggleMobileSearch() {
    const search = document.querySelector('.mobile-search .search');
    if(search) search.classList.toggle('show');

  }
  


  //  تحميل بيانات الإحصائيات 
  const container = document.getElementById('stats-container');
  if (container) {
    loadData();
  }

 
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
            <div>
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
        



  //    في اعلى الصفحةnav هذا كود زر العودة الى رأس الصفحة مع تثبيت جزء 
  const scrollBtn = document.getElementById("ScrollBtn");
  const head = document.querySelector('.navbar');

  if (scrollBtn && head) {
    console.log(scrollBtn)
    window.onscroll = function () {
      if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        scrollBtn.style.display = "block";
        head.style.position = "fixed";
        head.style.top = "0";
        head.style.width = "100%";
        head.style.zIndex = "1000";
      } else {
        scrollBtn.style.display = "none";
        head.style.position = "relative";
      }
    };

    scrollBtn.onclick = function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    };
  }

 
  const story = document.getElementsByClassName('story-container')[0];
  const errorMsg = document.getElementById('error-msg');

  if (story && errorMsg) {
    console.log(story)
    loadStory();
  }

 async function loadStory() {
  try {
    const res = await fetch('https://raw.githubusercontent.com/alzoghrwry/masam_project/main/page/story.json')
      .then(res => {
        if (!res.ok) throw new Error("فشل في تحميل البيانات");
        return res.json();
      })
      .then(data => {
        if (!data.stories || data.stories.length === 0) {
          errorMsg.textContent = 'لا توجد قصص للعرض حالياً.';
          return;
        }

        data.stories.forEach(storyItem => {
          const card = document.createElement('div');
          card.className = 'card';
          card.innerHTML = `
            <img src="${storyItem.image}" alt="صورة القصة" />
            <div class="card-content">
              <div class="card-title">${storyItem.title}</div>
              <div class="card-date">${storyItem.date}</div>
            </div>
          `;

        
          story.appendChild(card);
        });
      })
      .catch(error => {
        console.error('خطأ في التحميل:', error);
        errorMsg.textContent = 'تعذر تحميل البيانات.';
      });
  } catch (error) {
    console.error('حدث خطأ غير متوقع:', error);
  }
}


});
function validateForm() {
  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const message = document.getElementById("message");


  if (!name.value.trim()) {
    alert("يرجى إدخال الاسم");
    name.focus();
    return false;
  }

  if (!email.value.trim() || !validateEmail(email.value)) {
    alert("يرجى إدخال بريد إلكتروني صحيح");
    email.focus();
    return false;
  }

  if (!message.value.trim()) {
    alert("يرجى إدخال الرسالة");
    message.focus();
    return false;
  }

  alert("تم إرسال الرسالة بنجاح ✅");
  return true;
}

// التحقق من البريد الإلكتروني
function validateEmail(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

