// ── PROJECTS DATA ──────────────────────────────────────────────────────────────
const PROJECTS = {
  wildway:  { name:'Wild Way',          cat_pt:'Branding · Acampamento', cat_en:'Branding · Camping',  desc_pt:'Equipamentos de camping & aventura. Identidade visual completa com logotipo, sistema de cores, tipografia, aplicações em produtos e redes sociais estruturadas.', desc_en:'Camping & adventure equipment. Full visual identity with logo, color system, typography, product applications and structured social media.', tags:['Logotipo','Brand System','Embalagem','Redes Sociais'], bg:'linear-gradient(135deg,#0a1c0a,#162a18)', glow:'rgba(30,140,30,.4)' },
  emini:    { name:'eMini',             cat_pt:'Branding · Digital',           cat_en:'Branding · Digital',           desc_pt:'Mercadinho local com presença digital estruturada. Identidade visual moderna e acessível, com comunicação consistente em todos os canais online.', desc_en:'Local grocery with structured digital presence. Modern and accessible visual identity, with consistent communication across all online channels.', tags:['Logotipo','Instagram','Google Meu Negócio','WhatsApp'], bg:'linear-gradient(135deg,#0a0e38,#151550)', glow:'rgba(50,50,200,.4)' },
  acroarte: { name:'Acroarte',          cat_pt:'Branding · Arte & Circo',      cat_en:'Branding · Art & Circus',      desc_pt:'Escola de acrobacia e artes com identidade visual vintage e circense. Logo aplicado em copo, almofada, sacola, adesivo e embalagem.', desc_en:'Acrobatics and arts school with a vintage circus identity. Logo applied on cups, pillows, bags, stickers and packaging.', tags:['Logotipo','Brand System','Merchandise','Papelaria'], bg:'linear-gradient(135deg,#3a0808,#5a1010)', glow:'rgba(180,30,30,.4)' },
  edith:    { name:'Edith Hairstylist', cat_pt:'Branding · Beleza',            cat_en:'Branding · Beauty',            desc_pt:'Hairstylist com identidade visual sofisticada e feminina. Logotipo elegante aplicado em sacola, cartão de visita, frascos e embalagens que transmitem luxo e profissionalismo.', desc_en:'Hairstylist with a sophisticated and feminine visual identity. Elegant logo applied on bags, business cards, bottles and packaging.', tags:['Logotipo','Identidade Visual','Papelaria','Aplicações'], bg:'linear-gradient(135deg,#280a40,#3d1260)', glow:'rgba(140,40,200,.4)' },
  moex:     { name:'Moex',             cat_pt:'Branding · Games',             cat_en:'Branding · Games',             desc_pt:'Identidade visual para marca do universo gamer. Logotipo com força e personalidade, aplicado em produtos físicos como mochila e acessórios.', desc_en:'Visual identity for a gaming brand. Logo with strength and personality, applied on physical products like backpacks and accessories.', tags:['Logotipo','Brand System','Merchandise','Aplicações'], bg:'linear-gradient(135deg,#1a0a38,#2d1260)', glow:'rgba(120,40,200,.4)' },
  leitura:  { name:'Clube de Leitura', cat_pt:'Branding · Comunidade',        cat_en:'Branding · Community',         desc_pt:'Identidade visual para clube de leitura cristão. Marca acolhedora e com personalidade, aplicada em produtos físicos como caneca e materiais de comunicação.', desc_en:'Visual identity for a Christian book club. Welcoming brand with personality, applied on physical products like mugs and communication materials.', tags:['Logotipo','Brand System','Produtos','Comunicação'], bg:'linear-gradient(135deg,#2a1800,#3d2400)', glow:'rgba(200,140,20,.4)' },
  dra_ana:  { name:'Dra. Ana Farfan',
    cat_pt:'Branding · Saúde', cat_en:'Branding · Healthcare',
    desc_pt:'Identidade visual para pediatra integrativa. Marca acolhedora, delicada e profissional — aplicada em papelaria, uniformes e materiais de atendimento.',
    desc_en:'Visual identity for an integrative pediatrician. Welcoming, delicate and professional brand — applied on stationery, uniforms and service materials.',
    tags:['Logotipo','Identidade Visual','Papelaria','Aplicações'],
    bg:'linear-gradient(135deg,#2a1510,#3d2018)', glow:'rgba(220,140,80,.35)'
  },
  afs:      { name:'AFS Contábil',     cat_pt:'Branding · Contábil',          cat_en:'Branding · Accounting',        desc_pt:'Escritório contábil com marca que transmite confiança, seriedade e autoridade no mercado.', desc_en:'Accounting firm with a brand that conveys trust, seriousness and authority in the market.', tags:['Logotipo','Brand System','Papelaria','Digital'], bg:'linear-gradient(135deg,#081a14,#102a20)', glow:'rgba(20,160,90,.4)' },
};

// ── PORTFOLIO IMAGES ─────────────────────────────────────────────────────────
const IMGS = {};
document.querySelectorAll('#img-store img').forEach(img => {
  const p = img.id.replace('img-','').split('-');
  const idx = parseInt(p.pop());
  const pid = p.join('-');
  if (!IMGS[pid]) IMGS[pid] = [];
  IMGS[pid][idx] = img.src;
});

// ── CAROUSEL ─────────────────────────────────────────────────────────────────
let curProject = null, curSlide = 0;
function buildCarousel(pid) {
  const images = IMGS[pid] || [];
  if (!images.length) return '';
  const slides = images.map(s => `<div class="car-slide"><img src="${s}" loading="lazy"/></div>`).join('');
  const dots   = images.map((_,i) => `<button class="car-dot ${i===0?'on':''}" onclick="goSlide(${i})"></button>`).join('');
  return `<div class="carousel"><div class="car-track" id="car-track">${slides}</div><button class="car-btn car-prev" onclick="prevSlide()">&#8249;</button><button class="car-btn car-next" onclick="nextSlide()">&#8250;</button><div class="car-dots">${dots}</div><div class="car-count" id="car-count">1 / ${images.length}</div></div>`;
}
function goSlide(idx) {
  const track = document.getElementById('car-track');
  if (!track) return;
  const total = track.children.length;
  curSlide = (idx + total) % total;
  track.style.transform = `translateX(-${curSlide * 100}%)`;
  document.getElementById('car-count').textContent = `${curSlide+1} / ${total}`;
  document.querySelectorAll('.car-dot').forEach((d,i) => d.classList.toggle('on', i===curSlide));
}
function nextSlide() { goSlide(curSlide+1); }
function prevSlide() { goSlide(curSlide-1); }

// ── MODAL ─────────────────────────────────────────────────────────────────────
function openModal(pid) {
  const p = PROJECTS[pid]; if (!p) return;
  const lang = document.documentElement.dataset.lang || 'pt';
  document.getElementById('mcl-cat').textContent  = p['cat_'+lang];
  document.getElementById('mcl-name').textContent = p.name;
  document.getElementById('mcl-desc').textContent = p['desc_'+lang];
  document.getElementById('mcl-tags').innerHTML   = p.tags.map(t=>`<span class="modal-tag">${t}</span>`).join('');
  curProject = pid; curSlide = 0;
  document.getElementById('car-container').innerHTML = buildCarousel(pid);
  document.getElementById('modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal() {
  document.getElementById('modal').classList.remove('open');
  document.body.style.overflow = '';
}
function closeModalBg(e) { if (e.target === document.getElementById('modal')) closeModal(); }
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
  if (e.key === 'ArrowRight') nextSlide();
  if (e.key === 'ArrowLeft')  prevSlide();
});

// ── LANGUAGE ──────────────────────────────────────────────────────────────────
function setLang(lang) {
  document.documentElement.dataset.lang = lang;
  document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
  document.querySelectorAll('.lang-btn').forEach(b => b.classList.toggle('on', b.textContent.toLowerCase() === lang));
  document.querySelectorAll('[data-pt],[data-en]').forEach(el => {
    const val = el.getAttribute('data-'+lang);
    if (!val) return;
    if (val.includes('<')) el.innerHTML = val; else el.textContent = val;
  });
}

// ── CANVAS PARTICLES ─────────────────────────────────────────────────────────
(function() {
  const cv = document.getElementById('bg'), cx = cv.getContext('2d');
  let W, H, pts = [];
  function resize() { W = cv.width = innerWidth; H = cv.height = innerHeight; }
  function Pt() { this.x=Math.random()*W; this.y=Math.random()*H; this.r=Math.random()*1.2+.3; this.vx=(Math.random()-.5)*.18; this.vy=(Math.random()-.5)*.18; this.a=Math.random()*.28+.05; this.hot=Math.random()<.22; }
  function init() { pts=[]; for(let i=0;i<70;i++) pts.push(new Pt()); }
  function draw() {
    cx.clearRect(0,0,W,H);
    pts.forEach(p => { cx.beginPath(); cx.arc(p.x,p.y,p.r,0,Math.PI*2); cx.fillStyle=p.hot?`rgba(232,83,26,${p.a})`:`rgba(242,237,232,${p.a*.35})`; cx.fill(); p.x+=p.vx; p.y+=p.vy; if(p.x<0)p.x=W; if(p.x>W)p.x=0; if(p.y<0)p.y=H; if(p.y>H)p.y=0; });
    requestAnimationFrame(draw);
  }
  resize(); init(); draw();
  window.addEventListener('resize', () => { resize(); init(); });
})();

// ── NAV ───────────────────────────────────────────────────────────────────────
const navEl = document.getElementById('nav');
window.addEventListener('scroll', () => navEl.classList.toggle('sc', scrollY > 40));

// ── MOBILE MENU ───────────────────────────────────────────────────────────────
function toggleMenu() {
  const m = document.getElementById('mob-menu'), h = document.getElementById('ham');
  m.classList.toggle('open'); h.classList.toggle('open');
  document.body.style.overflow = m.classList.contains('open') ? 'hidden' : '';
}
function closeMenu() {
  document.getElementById('mob-menu').classList.remove('open');
  document.getElementById('ham').classList.remove('open');
  document.body.style.overflow = '';
}

// ── SCROLL REVEAL ─────────────────────────────────────────────────────────────
const revealOb = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); revealOb.unobserve(e.target); } });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(el => revealOb.observe(el));

// ── FAQ ───────────────────────────────────────────────────────────────────────
function toggleFaq(el) {
  const isOpen = el.classList.contains('open');
  document.querySelectorAll('.fitem').forEach(f => f.classList.remove('open'));
  if (!isOpen) el.classList.add('open');
}

// ── SMOOTH SCROLL ─────────────────────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
  const t = document.querySelector(a.getAttribute('href'));
  if (t) { e.preventDefault(); closeMenu(); t.scrollIntoView({behavior:'smooth',block:'start'}); }
}));
