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
  hearts(event.currentTarget);
});
$('.cat').addEventListener('click', (event) => {
  $('.animal-message').classList.remove('is-hint');
  $('.animal-message').textContent = 'Meo~~ phanh xink lắm óhh. ✧';
  hearts(event.currentTarget);
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
