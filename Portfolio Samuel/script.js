/* Mobile drawer */
const menuBtn = document.getElementById('menuBtn');
const drawer = document.getElementById('drawer');
if(menuBtn){
  menuBtn.addEventListener('click', ()=> drawer.classList.toggle('open'));
}

/* Current year */
document.getElementById('year').textContent = new Date().getFullYear();

/* Reveal on scroll using IntersectionObserver */
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e => {
    if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
  })
}, { threshold: .12 });
revealEls.forEach(el => io.observe(el));

/* "Magnetic" hover on buttons */
const magnets = document.querySelectorAll('[data-magnet]');
magnets.forEach(btn => {
  const strength = 18; // px
  let rect;
  const reset = ()=> { btn.style.transform = 'translate3d(0,0,0)' }
  btn.addEventListener('pointermove', (e)=>{
    rect = rect || btn.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width/2;
    const relY = e.clientY - rect.top - rect.height/2;
    btn.style.transform = `translate3d(${(relX/rect.width)*strength}px, ${(relY/rect.height)*strength}px, 0)`;
  });
  btn.addEventListener('pointerleave', ()=> {
    rect = null;
    reset();
  });
});

/* Toggle Description Function - MOVED OUTSIDE AND CLEANED UP */
function toggleDescription(button) {
    const workCopy = button.closest('.work__copy');
    const shortDesc = workCopy.querySelector('.description-short');
    const fullDesc = workCopy.querySelector('.description-full');

    if (fullDesc.style.display === 'none' || fullDesc.style.display === '') {
        // Show full description
        shortDesc.style.display = 'none';
        fullDesc.style.display = 'block';
        button.textContent = 'See less';
    } else {
        // Show short description
        shortDesc.style.display = 'block';
        fullDesc.style.display = 'none';
        button.textContent = 'See more';
    }
}

/* Smooth anchor scrolling */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e)=>{
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if(!el) return;
    e.preventDefault();
    const y = el.getBoundingClientRect().top + window.scrollY - 70;
    window.scrollTo({ top: y, behavior: 'smooth' });
  });
});

/* Modal functionality */
// Open modal
document.querySelectorAll(".see-more").forEach(button => {
  button.addEventListener("click", () => {
    const projectId = button.getAttribute("data-project");
    const modal = document.getElementById(`${projectId}-modal`);
    if (modal) modal.style.display = "block";
  });
});

// Close modal
document.querySelectorAll(".modal .close").forEach(closeBtn => {
  closeBtn.addEventListener("click", () => {
    closeBtn.closest(".modal").style.display = "none";
  });
});

// Close if user clicks outside modal content
window.addEventListener("click", event => {
  document.querySelectorAll(".modal").forEach(modal => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
});