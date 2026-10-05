import './style.css';
import QRCode from 'qrcode';
import { wishes, getShareUrl } from './messages.js';

const $ = (selector) => document.querySelector(selector);
const shareUrl = getShareUrl(window.location);
let wishIndex = 0;
let flowerCount = 0;
let hugCount = 0;
const result = $('.gift-result');
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
  result.textContent = 'Yêu thương đã được gửi đến bạn. Hãy giữ nó trong tim nhé ♡';
  hearts($('#open-letter'));
});
$('#wish').addEventListener('click', (event) => {
  result.textContent = wishes[wishIndex++ % wishes.length];
  hearts(event.currentTarget, ['✧', '♡']);
});
$('#flower').addEventListener('click', (event) => {
  flowerCount++;
  result.textContent = `Tặng bạn ${flowerCount === 1 ? 'một bông hoa' : `một bó ${flowerCount} bông hoa`}. Mong nụ cười của bạn luôn nở rộ! ✿`;
  hearts(event.currentTarget, ['✿', '❀', '✿']);
});
$('#hug').addEventListener('click', (event) => {
  hugCount++;
  result.textContent = `Một cái ôm thật ấm đã đến nơi ♡${hugCount > 1 ? ` Bạn đã nhận ${hugCount} cái ôm rồi đó!` : ' Mệt một chút cũng không sao, nghỉ ngơi nhé.'}`;
  hearts(event.currentTarget);
});
$('.rabbit').addEventListener('click', (event) => {
  $('.animal-message').textContent = 'Bé thỏ gửi bạn một chiếc thơm má ♡';
  hearts(event.currentTarget);
});
$('.cat').addEventListener('click', (event) => {
  $('.animal-message').textContent = 'Meo~ Hôm nay bạn xinh lắm đó! ♡';
  hearts(event.currentTarget);
});
$('#share').addEventListener('click', async () => {
  try {
    if (navigator.share) {
      await navigator.share({ title: 'Gửi bạn một chút dịu dàng · 20/10', text: 'Một món quà nhỏ dành cho bạn ♡', url: shareUrl });
      $('#share-status').textContent = 'Cảm ơn bạn đã sẻ chia yêu thương ♡';
    } else if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(shareUrl);
      $('#share-status').textContent = 'Đã sao chép liên kết. Gửi đến người bạn thương nhé!';
    } else {
      $('#qr-dialog').showModal();
    }
  } catch (error) {
    if (error.name !== 'AbortError') {
      $('#share-status').textContent = 'Bạn có thể tải mã QR hoặc sao chép đường dẫn bên dưới nhé.';
      $('#qr-dialog').showModal();
    }
  }
});
$('#show-qr').addEventListener('click', () => $('#qr-dialog').showModal());
$('.qr-url').textContent = shareUrl;
const qrOptions = { errorCorrectionLevel: 'M', margin: 3, color: { dark: '#704553', light: '#fffafd' } };
Promise.all([
  QRCode.toCanvas($('#qr'), shareUrl, { ...qrOptions, width: 180 }),
  QRCode.toCanvas($('#qr-large'), shareUrl, { ...qrOptions, width: 300 }),
]).then(() => { $('#download-qr').href = $('#qr-large').toDataURL('image/png'); }).catch(() => {
  $('#share-status').textContent = 'Mã QR chưa tải được. Bạn vẫn có thể dùng liên kết chia sẻ.';
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
