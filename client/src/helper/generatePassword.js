let upperLetters= [...Array(26)].map((val, i) => String.fromCharCode(i + 65))
let lowerLetters= upperLetters.map((val, i) => val.toLowerCase())
let numbers=[0,1,2,3,4,5,6,7,8,9]
let symbols = [
    '!', '"', '#', '$', '%', '&', "'", '(', ')', '*', '+', ',', '-', '.', '/',
    ':', ';', '<', '=', '>', '?', '@', '[', '\\', ']', '^', '_', '`', '{', '|',
    '}', '~'
  ];
  
export default function generatePassword(option, length){
    length= Number(length)
    let password=chooseRandomFromArray(lowerLetters)
    let arr=[...lowerLetters]
    if(option.upperCase){
        arr=[...arr, ...upperLetters]
        password+=chooseRandomFromArray(upperLetters);
    }
    if(option.numbers){
        arr=[...arr, ...numbers]
        password+=chooseRandomFromArray(numbers);
    } 
    if(option.symbols){
        arr=[...arr, ...symbols]
        password+=chooseRandomFromArray(symbols);
      }
    while(password.length!==length){
        password+= chooseRandomFromArray(arr)
    }
    return password
}

function chooseRandomFromArray(arr){
    return arr[Math.floor(Math.random()*arr.length)]
}