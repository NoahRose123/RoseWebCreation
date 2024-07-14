
function generatePassword(legnth,includeLowercase,includeUppercase,includeNumbers,includeSymbols){
     
 const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
 const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
 const numberChars = "0123456789";
 const symbolChars = "!@#$%^&*()+=";

let allowedChars = "";
let password = "";

allowedChars += includeLowercase ? lowercaseChars : "";
allowedChars += includeUppercase ? uppercaseChars : "";
allowedChars += includeNumbers ? numberChars : "";
allowedChars += includeSymbols ? symbolChars : "";



if(legnth<= 0){
return `(Password length must be at least 1)`;
}

if(allowedChars.length === 0){
return `(At least 1 set of character needs to be selected)`;
}

for(let i =0; i < length; i++){
const randomIndex = Math.floor(Math.random() * allowedChars.length);
password += allowedChars[randomIndex];
}
    return password;
}

const passwordLegnth = 12;
const includeLowercase = false;
const includeUppercase = true;
const includeNumbers = true;
const includeSymbols = true;

const password = generatePassword(passwordLegnth, 
                                  includeLowercase,
                                  includeUppercase,
                                  includeNumbers,
                                  includeSymbols);

        
console.log(`Generated password: ${password}`);

               