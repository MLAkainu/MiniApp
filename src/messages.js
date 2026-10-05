export const wishes = [
  'Chúc bạn luôn rạng rỡ theo cách của riêng mình. Bạn không cần giống bất kỳ ai cả ♡',
  'Mong mọi điều dịu dàng trên thế giới đều tìm được đường đến bên bạn ✧',
  'Chúc bạn có những ngày bình yên, những giấc mơ đẹp và một trái tim luôn được nâng niu ♡',
  'Hôm nay, hãy tự thưởng cho mình một điều thật vui. Bạn xứng đáng mà! ✿',
  'Mong bạn được yêu thương thật nhiều, và đừng quên dành một phần yêu thương ấy cho chính mình ♡',
  'Chúc những điều bạn đang ấp ủ sẽ nở hoa, vào đúng thời điểm đẹp nhất ✧',
];
export function getShareUrl(location) {
  return `${location.origin}${location.pathname}`;
}
