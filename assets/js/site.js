document.addEventListener("DOMContentLoaded",()=>{
const toggle=document.querySelector(".menu-toggle");
const nav=document.querySelector(".nav-links");
if(toggle&&nav){toggle.addEventListener("click",()=>{const open=nav.classList.toggle("open");toggle.setAttribute("aria-expanded",String(open));});nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");toggle.setAttribute("aria-expanded","false");}));}
const params=new URLSearchParams(location.search);
const customer=params.get("customer");
const customerField=document.querySelector("#customer");
if(customerField&&customer){const value=customer.toLowerCase().includes("msp")?"Managed Service Provider (MSP)":customer.toLowerCase().includes("direct")?"Business / direct customer":customer;const option=[...customerField.options].find(o=>o.text.toLowerCase()===value.toLowerCase());if(option)customerField.value=option.value;}
const service=params.get("service");
if(service){const wanted=service.toLowerCase();document.querySelectorAll('input[name="services[]"]').forEach(input=>{if(wanted.includes(input.value.toLowerCase())||input.value.toLowerCase().includes(wanted)||(wanted.includes("infrastructure")&&input.value==="Infrastructure Projects"))input.checked=true;});}
if(params.get("submitted")==="true"){const notice=document.querySelector("[data-form-success]");if(notice)notice.hidden=false;history.replaceState({},document.title,location.pathname);}
/* Reveal sections and cards as visitors scroll. */
const motionOff=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if(!motionOff&&"IntersectionObserver" in window){
 document.body.classList.add("reveal-ready");
 const targets=document.querySelectorAll(".section-head,.card,.audience,.step,.band,.tags,.info-panel,.form-panel");
 targets.forEach((el,i)=>{el.classList.add("reveal");if(el.classList.contains("card")||el.classList.contains("step"))el.style.transitionDelay=(i%3)*80+"ms";});
 const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("is-visible");observer.unobserve(entry.target);}});},{threshold:.12,rootMargin:"0px 0px -35px 0px"});
 targets.forEach(el=>observer.observe(el));
}
/* Persistent WhatsApp enquiry shortcut. */
if(!document.querySelector(".whatsapp-float")){
 const wa=document.createElement("a");
 wa.className="whatsapp-float";
 wa.href="https://wa.me/919055121420?text="+encodeURIComponent("Hello, I found your website and would like to discuss remote IT support.");
 wa.target="_blank";wa.rel="noopener noreferrer";wa.setAttribute("aria-label","Chat with Remote IT & MSP Services on WhatsApp");
 wa.innerHTML='<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.52 3.48A11.82 11.82 0 0 0 12.08 0C5.5 0 .15 5.35.15 11.93c0 2.1.55 4.15 1.6 5.96L.05 24l6.27-1.64a11.9 11.9 0 0 0 5.75 1.47h.01c6.58 0 11.93-5.35 11.93-11.93 0-3.19-1.24-6.19-3.49-8.42ZM12.08 21.8a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.72.97.99-3.63-.24-.37a9.85 9.85 0 0 1-1.52-5.25c0-5.46 4.44-9.9 9.9-9.9a9.82 9.82 0 0 1 7 2.9 9.82 9.82 0 0 1 2.9 7c0 5.46-4.44 9.9-9.9 9.9Zm5.43-7.41c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.21 5.09 4.5.71.31 1.26.5 1.69.64.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.42.25-.7.25-1.29.17-1.42-.07-.12-.27-.2-.57-.35Z"/></svg><span>Chat on WhatsApp</span>';
 document.body.appendChild(wa);
}
});