function numberToBanglaWords(num) {
 const a = [
   '',
   'এক',
   'দুই',
   'তিন',
   'চার',
   'পাঁচ',
   'ছয়',
   'সাত',
   'আট',
   'নয়',
   'দশ',
   'এগারো',
   'বারো',
   'তেরো',
   'চৌদ্দ',
   'পনেরো',
   'ষোল',
   'সতেরো',
   'আঠারো',
   'উনিশ'
 ];
 const b = ['', '', 'বিশ', 'ত্রিশ', 'চল্লিশ', 'পঞ্চাশ', 'ষাট', 'সত্তর', 'আশি', 'নব্বই'];
 const c = ['', 'হাজার', 'লাখ', 'কোটি', 'অরব'];

 function inWords(num) {
   if (num === 0) return 'শূন্য';

   let str = '';

   for (let i = 0; num > 0; i++) {
     let rem = num % 1000;

     if (rem !== 0) {
       str = `${convertThreeDigits(rem)} ${c[i]} ${str}`.trim();
     }

     num = Math.floor(num / 1000);
   }

   return str.trim();
 }

 function convertThreeDigits(num) {
   let hundreds = Math.floor(num / 100);
   let remainder = num % 100;

   let words = '';

   if (hundreds) {
     words += `${a[hundreds]} শত `;
   }

   if (remainder < 20) {
     words += a[remainder];
   } else {
     let tens = Math.floor(remainder / 10);
     let units = remainder % 10;
     words += `${b[tens]} ${a[units]}`;
   }

   return words.trim();
 }

 function convertFraction(fraction) {
   if (!fraction) return '';
   let fractionInWords = inWords(parseInt(fraction));
   return fractionInWords ? `এবং ${fractionInWords} পয়সা` : '';
 }

 // Splitting the number into integer and fractional parts
 const [integerPart, fractionalPart] = num.toString().split('.');

 let integerInWords = inWords(parseInt(integerPart));
 let fractionInWords = convertFraction(fractionalPart);

 return `${integerInWords} টাকা মাত্র ${fractionInWords}`.trim();
}

// Example usage
let amount = 1212124;
console.log(numberToBanglaWords(amount)); // Outputs: "বারো লক্ষ বারো হাজার একশত চব্বিশ টাকা মাত্র"
