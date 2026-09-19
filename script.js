const menuBtn=document.getElementById("menuBtn"),nav=document.getElementById("nav");
if(menuBtn){menuBtn.addEventListener("click",()=>{nav.style.display=nav.style.display==="flex"?"none":"flex"})}
document.querySelectorAll(".faq-item button").forEach(btn=>btn.addEventListener("click",()=>btn.parentElement.classList.toggle("open")));
const form=document.getElementById("contactForm");
if(form){form.addEventListener("submit",e=>{e.preventDefault();document.getElementById("formMsg").textContent="Thank you! Your message has been submitted.";form.reset()})}
