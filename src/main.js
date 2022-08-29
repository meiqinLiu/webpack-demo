// import 'core-js' // js兼容性补丁，全部引入的写法，不推荐
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
    // webpackPrefetch 优先级低，利用空闲加载资源，可以加载下一页资源，兼容性差
    // webpackPreload 优先级更高，并行加载当前页面资源，兼容性好

    import(/* webpackChunkName: "sum" *//* webpackPrefetch: true */'./sum').then((res)=>{
        console.log(res.default([10,20,30]));
    })
}

function p1() {
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve()
        },1000)
    })
}

p1()

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

// 离线缓存，有兼容性问题
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js').then(registration => {
        console.log('SW registered: ', registration);
      }).catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
    });
  }