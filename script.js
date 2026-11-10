// Shared header/footer for all 5 pages
const PAGES = [["index.html", "Home"], ["about.html", "About"], ["skills.html", "Skills"], ["projects.html", "Projects"], ["contact.html", "Contact"]];
const here = location.pathname.split("/").pop() || "index.html";
document.querySelector("header").innerHTML = `<div class="wrap nav">
  <a class="logo" href="index.html"><i>AN</i>Aysha<span class="grad">.dev</span></a>
  <ul class="menu">${PAGES.map(([h, t]) => `<li><a href="${h}" class="${h === here ? "active" : ""}">${t}</a></li>`).join("")}</ul>
  <button class="burger" aria-label="Menu"><span></span><span></span><span></span></button></div>`;
document.querySelector("footer").innerHTML = `<div class="wrap"><span>© 2026 Aysha Nashvida · Full Stack Developer</span><span>BCA, Hira Women's College, Mangaluru</span></div>`;

const burger = document.querySelector(".burger"), menu = document.querySelector(".menu");
burger.onclick = () => { burger.classList.toggle("open"); menu.classList.toggle("open"); };

// Scroll reveal + skill bars
const io = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  e.target.classList.add("in");
  e.target.querySelectorAll(".fill").forEach(f => f.style.width = f.dataset.w + "%");
}), { threshold: .15 });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));

// Typing effect
const typed = document.querySelector(".typed");
if (typed) {
  const words = ["Full Stack Developer", "React & Node.js Dev", "UI Designer", "Problem Solver"];
  let w = 0, i = 0, del = false;
  (function tick() {
    const word = words[w];
    typed.textContent = word.slice(0, i);
    if (!del && i === word.length) { del = true; return setTimeout(tick, 1400); }
    if (del && i === 0) { del = false; w = (w + 1) % words.length; }
    i += del ? -1 : 1;
    setTimeout(tick, del ? 45 : 85);
  })();
}

// GitHub-style contribution grid
const gh = document.querySelector(".gh");
if (gh) gh.innerHTML = Array.from({ length: 182 }, (_, k) => `<i style="opacity:${[.08, .25, .45, .7, 1][(k * 7 + k % 5 * 3) % 5]}"></i>`).join("");

// Project filter
document.querySelectorAll(".filter button").forEach(b => b.onclick = () => {
  document.querySelectorAll(".filter button").forEach(x => x.classList.remove("on"));
  b.classList.add("on");
  document.querySelectorAll("[data-tag]").forEach(p => p.style.display = (b.dataset.f === "all" || p.dataset.tag.includes(b.dataset.f)) ? "" : "none");
});

// Contact form -> opens email app
const form = document.querySelector("form");
if (form) form.onsubmit = e => {
  e.preventDefault();
  const d = Object.fromEntries(new FormData(form));
  location.href = `mailto:zzubaidanashiya@gmail.com?subject=${encodeURIComponent("Portfolio enquiry from " + d.name)}&body=${encodeURIComponent(d.message + "\n\n" + d.name + " (" + d.email + ")")}`;
  const t = document.querySelector(".toast"); t.classList.add("show"); setTimeout(() => t.classList.remove("show"), 2500);
};
