window.onload = function () {
    if (!localStorage.cash) {
        localStorage.cash = 5000;
    }
    document.getElementById("cash").innerText = localStorage.cash;
    document.getElementById("cashPresent").innerText = "你目前的余额是："+localStorage.cash;
}

function pay(){
    let num = parseInt(document.getElementById("number").value);
    if(!isNaN(num)&&num>0) {
        localStorage.cash=num+parseInt(localStorage.cash);
        alert("你充值了"+num);
    }else{
        alert("请输入一个正确的数！");
    }
    document.getElementById("cash").innerText = localStorage.cash;
    document.getElementById("cashPresent").innerText = "你目前的余额是："+localStorage.cash;
}