const menu=document.getElementById('menu');
const links=document.getElementById('links');
menu.addEventListener('click',()=>{
  const open=links.classList.toggle('open');
  menu.setAttribute('aria-expanded',String(open));
});
links.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
  links.classList.remove('open');
  menu.setAttribute('aria-expanded','false');
}));
document.getElementById('year').textContent=new Date().getFullYear();
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if(!reduced&&'IntersectionObserver' in window){
  const reveal=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add('visible');reveal.unobserve(entry.target)}
  }),{threshold:.12});
  document.querySelectorAll('.reveal').forEach(el=>reveal.observe(el));
}else document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'));
const sections=[...document.querySelectorAll('section[id]')];
const nav=[...document.querySelectorAll('.links a')];
let ticking=false;
addEventListener('scroll',()=>{
  if(!ticking){requestAnimationFrame(()=>{
    let id='';sections.forEach(s=>{if(scrollY>=s.offsetTop-180)id=s.id});
    nav.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+id));
    ticking=false;
  });ticking=true}
},{passive:true});
