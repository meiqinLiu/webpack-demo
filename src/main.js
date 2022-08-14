import count from './count'
import add from './add'
import './style/style.css'
import './style/style1.less'
import './style/iconfont.css'

let res1 = count(6,5);

const addNum = (...arr)=>{
    console.log(arr);
}

console.log(res1);
console.log(add([1,2,3]));
console.log(addNum(1,2,3,5));