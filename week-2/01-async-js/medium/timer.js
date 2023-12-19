/*setInterval(function(){
    let date=new Date();
    let hours=date.getHours();
    let minuts=date.getMinutes();
    let seconds=date.getSeconds();
    let meridies=hours<12?"AM":"PM";
    console.log(hours.toString()+":"+minuts.toString()+":"+seconds.toString()+" "+meridies);
},1000)

*/

function counter(){
    let date=new Date();
    let hours=date.getHours();
    let minuts=date.getMinutes();
    let seconds=date.getSeconds();
    let meridies=hours<12?"AM":"PM";
    console.log(hours.toString()+":"+minuts.toString()+":"+seconds.toString()+" "+meridies);
    setTimeout(counter,1000);
}
counter();