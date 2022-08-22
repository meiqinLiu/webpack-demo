import count from './count'
// import sum from './sum'
import {add} from './math'
import './style/style.css'
import './style/style1.less'
import './style/iconfont.css'

let res1 = count(6,5);



console.log(res1);
// console.log(sum([1,2,3]));
console.log(add(100,100));

document.getElementById('btn').onclick = function(){
    import(/* webpackChunkName: "sum" */'./sum').then((res)=>{
        console.log(res.default([10,20,30]));
    })
}


// console.log(module.hot.accept);

// js使用热替换需要自己写
// vue-loader和react-hot-loader有解决这个问题
if(module.hot){
    module.hot.accept('./sum.js',()=>{
        console.log(sum([1,2,3]));
    })
   
    module.hot.accept('./count.js',()=>{
        console.log(count(6,2));
    })
   
}