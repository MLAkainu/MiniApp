import './style.css';

const $ = (selector) => document.querySelector(selector);
function hearts(anchor, symbols = ['♡', '♥', '✧']) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const rect = anchor.getBoundingClientRect();
  for (let i = 0; i < 12; i++) {
    const node = document.createElement('span');
    node.className = 'float-heart';
    node.textContent = symbols[i % symbols.length];
    node.setAttribute('aria-hidden', 'true');
    node.style.left = `${rect.left + rect.width / 2 + (Math.random() - .5) * 90}px`;
    node.style.top = `${rect.top + rect.height / 2}px`;
    node.style.color = ['#cb7796', '#de9fb4', '#b86685'][i % 3];
    node.style.setProperty('--drift', `${(Math.random() - .5) * 190}px`);
    document.body.append(node);
    setTimeout(() => node.remove(), 1800);
  }
}
for (const dialog of document.querySelectorAll('dialog')) {
  dialog.querySelector('.close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    const r = dialog.getBoundingClientRect();
    if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close();
  });
}
$('#open-letter').addEventListener('click', () => $('#letter').showModal());
$('#letter-love').addEventListener('click', () => {
  $('#letter').close();
  hearts($('#open-letter'));
});
$('.rabbit').addEventListener('click', (event) => {
  $('.animal-message').classList.remove('is-hint');
  $('.animal-message').textContent = 'chúc phanh hôm nay phải thiệc dui hong được buồn nụa. ✧';
  animateAnimal(event.currentTarget);
  hearts(event.currentTarget, ['✧', '✦', '✧']);
});
$('.cat').addEventListener('click', (event) => {
  $('.animal-message').classList.remove('is-hint');
  $('.animal-message').textContent = 'Meo~~ phanh xink lắm óhh. ✧';
  animateAnimal(event.currentTarget);
  hearts(event.currentTarget, ['✧', '✦', '✧']);
});
// Original pixel sprites: each character is one pixel, no external image assets.
const palette = { o: '#cbaeb9', w: '#fffdfa', p: '#f0b9ca', e: '#725765', n: '#cb849b', b: '#edbdce', g: '#e3ccd4' };
const rabbit = [
'    ooo       ooo       ',
'   owwwo     owwwo      ',
'   owpwo     owpwo      ',
'   owpwo     owpwo      ',
'   owpwo     owpwo      ',
'   owpwo     owpwo      ',
'   owpwo     owpwo      ',
'   owwwo     owwwo      ',
'    owwwooooowwwo       ',
'   owwwwwwwwwwwwwo      ',
'  owwwwwwwwwwwwwwwo     ',
' owwwwwwwwwwwwwwwwwo    ',
' owwwwwwwwwwwwwwwwwo    ',
' owwwewwwwwwwwewwwwo    ',
' owwwewwwwwwwwewwwwo    ',
' owpwwwwwnwwwwwwpwwo    ',
' owpwwwwwewwwwwwpwwo    ',
'  owwwwwwwwwwwwwwwo     ',
'   owwwwwwwwwwwwwo      ',
'    oowwwwwwwwwoo       ',
'    owwwwwwwwwwwo       ',
'   owwwwwwwwwwwwwo      ',
'  owwowwwwwwwwowwwo     ',
'  owwowwwwwwwwowwwo     ',
'  owwwbbbbbbbbwwwwo     ',
'   owwbbbbbbbbwwwo      ',
'   owwwwwwwwwwwwwo      ',
'   owwwwwwwwwwwwwo      ',
'    owwwoooowwwwo       ',
'    owwwo  owwwo        ',
'     ooo    ooo         ',
];
const cat = [
'                        ',
'                        ',
'                        ',
'                        ',
'                        ',
'                        ',
'   oo           oo      ',
'   owo         owo      ',
'   owpwo     owpwo      ',
'   owppwooooowppwo      ',
'  owwwwwwwwwwwwwwwo     ',
'  owwwwwwwwwwwwwwwo     ',
' owwwwwwwwwwwwwwwwwo    ',
' owwwwwwwwwwwwwwwwwo    ',
' owwewwwwwwwwwwewwwo    ',
' owwewwwwwwwwwwewwwo    ',
' owppwwwwnwwwwwppwwo    ',
' gowwwwwwewwwwwwwwg     ',
'  gwwwwwwwwwwwwwwg      ',
'   oowwwwwwwwwoo        ',
'    owwwwwwwwwo         ',
'   owwwwwwwwwwwo        ',
'  owwowwwwwwowwwo       ',
'  owwowwwwwwowwwo  oo   ',
'  owwwwwwwwwwwwwo oww o ',
'   owwwwwwwwwwwo  owwo  ',
'   owwwwwwwwwwwo  owwo  ',
'   owwwwwwwwwww ooowwo  ',
'   owwwwwwwwwwwwwwwo    ',
'   owwwoooowwwwoooo     ',
'    ooo    ooo          ',
];
function drawSprite(canvas, rows) {
  const ctx = canvas.getContext('2d');
  rows.forEach((row, y) => [...row].forEach((color, x) => {
    if (palette[color]) { ctx.fillStyle = palette[color]; ctx.fillRect(x, y, 1, 1); }
  }));
}
drawSprite($('.rabbit canvas'), rabbit);
drawSprite($('.cat canvas'), cat);
for (let i = 0; i < 8; i++) {
  const petal = document.createElement('span');
  petal.className = 'petal';
  petal.textContent = i % 2 ? '✧' : '♡';
  petal.style.left = `${8 + i * 12}%`;
  petal.style.animationDelay = `${i * -2.7}s`;
  petal.style.animationDuration = `${18 + i * 2}s`;
  $('.petals').append(petal);
}

// Small, fixed decoration count keeps the background light on mobile.
for (let i = 0; i < 16; i++) {
  const sparkle = document.createElement('span');
  sparkle.className = 'background-sparkle';
  sparkle.textContent = i % 3 === 0 ? '✧' : '·';
  sparkle.style.left = `${4 + (i * 29) % 92}%`;
  sparkle.style.top = `${3 + (i * 17) % 94}%`;
  sparkle.style.setProperty('--sparkle-duration', `${5 + i % 5}s`);
  sparkle.style.animationDelay = `${i * -.9}s`;
  $('.background-sparkles').append(sparkle);
}

function animateAnimal(animal) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  animal.getAnimations().forEach(animation => animation.cancel());
  animal.animate([
    { transform: 'translateY(0) rotate(0)' },
    { transform: 'translateY(-16px) rotate(-5deg)', offset: .35 },
    { transform: 'translateY(-5px) rotate(4deg)', offset: .7 },
    { transform: 'translateY(0) rotate(0)' },
  ], { duration: 550, easing: 'ease-out' });
  const message = $('.animal-message');
  message.getAnimations().forEach(animation => animation.cancel());
  message.animate([{ opacity: 0, transform: 'translateY(5px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 300, easing: 'ease-out' });
}
// A small burst follows intentional taps on empty areas, without intercepting controls.
document.addEventListener('pointerdown', (event) => {
  if (event.target.closest('button, a, dialog') || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  for (let i = 0; i < 5; i++) {
    const star = document.createElement('span');
    star.className = 'tap-sparkle';
    star.setAttribute('aria-hidden', 'true');
    star.textContent = i % 2 ? '✦' : '✧';
    star.style.left = `${event.clientX}px`;
    star.style.top = `${event.clientY}px`;
    const angle = i * Math.PI * 2 / 5;
    star.style.setProperty('--star-x', `${Math.cos(angle) * 42}px`);
    star.style.setProperty('--star-y', `${Math.sin(angle) * 42 - 15}px`);
    document.body.append(star);
    setTimeout(() => star.remove(), 900);
  }
});
document.addEventListener('visibilitychange', () => {
  document.documentElement.classList.toggle('animations-paused', document.hidden);
});
