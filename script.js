const mobileNav = document.getElementById("mobileNav");
function handleMenu() {
  if (mobileNav.classList.contains("clicked")) {
    mobileNav.classList.toggle("clicked");
    setTimeout(() => {
      mobileNav.classList.toggle("hidden");
    }, 1000);
    return;
  }
  mobileNav.classList.toggle("hidden");
  setTimeout(() => {
    mobileNav.classList.toggle("clicked");
  }, 200);
}

const initialTranslate = -17;

function setupIntersectionObserver(element, isLTR, speed) {
  const intersectionCallback = (entries) => {
    const isIntersecting = entries[0].isIntersecting;
    if (isIntersecting) {
      document.addEventListener("scroll", scrollHandler);
    } else {
      document.removeEventListener("scroll", scrollHandler);
    }
  };
  const intersectionObserver = new IntersectionObserver(intersectionCallback);

  intersectionObserver.observe(element);

  function scrollHandler() {
    const translateX =
      (window.innerHeight - element.getBoundingClientRect().top) * speed;
    console.log(window.innerHeight, element.getBoundingClientRect().top);
    let totalTranslate = 0;
    if (isLTR) {
      totalTranslate = translateX + initialTranslate;
    } else {
      totalTranslate = -(translateX + initialTranslate);
    }

    element.style.transform = `translateX(${totalTranslate}rem)`;
  }
}

const line1 = document.getElementById("line1");
const line2 = document.getElementById("line2");

setupIntersectionObserver(line1, false, 0.1);
setupIntersectionObserver(line2, true, 0.1);

const dtElements = document.querySelectorAll("dt");
dtElements.forEach((dt) => {
  dt.addEventListener("click", () => {
    dt.nextElementSibling.classList.toggle("hidden");
  });
});

const form = document.getElementById("contactForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  console.log(data);
  form.reset();
  alert("Message sent successfully");
});
