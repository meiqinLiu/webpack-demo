import count from './count'
import add from './add'
import './style/style.css'
import './style/style1.less'
import './style/iconfont.css'

let res1 = count(6,5);



console.log(res1);
console.log(add([1,2,3]));

// console.log(module.hot.accept);

// js使用热替换需要自己写
// vue-loader和react-hot-loader有解决这个问题
if(module.hot){
    module.hot.accept('./add.js',()=>{
        console.log(add([1,2,3]));
    })
   
    module.hot.accept('./count.js',()=>{
        console.log(count(6,2));
    })
   
}