let arr=[1,2,3,4,5];
arr.a=9;
for(let i=0;i<arr.length;i++){//编程式
    console.log("for:"+arr[i]);
}
arr.forEach(function(item){//声明式,不关心遍历是如何实现，不支持return
    console.log("forEach:"+item);
})
for(let key in arr){//key会变成字符串，包括数组的私有属性也能打印出来
    console.log("for in:"+key);
}
for(let val of arr){//支持return，不能遍历私有属性
    console.log('for of'+val);
}
let obj={school:'daxue',age:20};//Obeject.key将对象的key作为新的数组
for(let val of Object.keys(obj)){
    console.log(obj[val]);
}
//filter过滤 不会改变数组，返回过滤后的新数组，回调函数返回true时值放入新的数组
let arrys=[2,43,56,7,8,9].filter(function(item){
    return item>7;
})
console.log(arrys);
//map 映射 将原有的数组映射成一个新数组,不操作原数组，返回新数组，回调函数返回什么那一项就是什么

let arr2=[1,2,4,6].map((function(item){
    return `<li>${item}</li>`;//这里时反引号，不是单引号es6中的模板字符串
}))
console.log(arr2.join());


//every 回调函数返回false停止
//includes返回布尔值
let arr3=[1,2,45,3,5,6,55,45];
console.log('includes:',arr3.includes(5));

//find返回找到的那一项，不会改变数组，回掉函数中返回true表示找到了找到后就停止迭代（即找到就停止迭代），找不到返回undefined
let result=arr3.find(function(item,index){
    return item.toString().indexOf(5)>-1;//返回数组中含有5的那一项
})
console.log(result)
//reduce 收敛，有4个参数,返回叠加后的结果，原数组不发生变化，回调函数返回的结果：本次的而返回值会作为上一次的prev
let sum1=[1,2,3,4].reduce(function(prev,next,index,item){
    console.log(next);
;
//some 找到回调函数true后停止 prev+next;
});
console.log(sum1);
var sum3=[{price:30,count:3},{price:10,count:5},{price:30,count:9}].reduce(function(prev,next,){
    return prev+next.price*next.count;
},0);//第二个参数默认的第一次prev
console.log(sum3);
let arry4=[[1,2,3],[4,5,6],[7,8,9]];
console.log(arry4.join(',').split(','));
let array5=arry4.reduce(function(prev,next){
    return prev.concat(next);
})
console.log(array5);