window.onload = function () {
    if (!localStorage.cash) {
        localStorage.cash = 5000;
    }
    document.getElementById("cash").innerText = localStorage.cash;
}
async function alertAsync(message){
    alert(message);
    return 0;
}
function flip(target) {
    if (target.flag) return 2;
    if (localStorage.cash < 500) {
        setTimeout(()=>{alert("米缸里没米了！");},100);
        return 0;
    } else {
        localStorage.cash -= 500;
        target.src = "pic/pic" + Math.ceil(Math.random() * 8) + ".png", target.flag = 1;
        document.getElementById("cash").innerText = localStorage.cash;
        return 1;
    }
}

function sleep(t){
    return new Promise(resolve => setTimeout(resolve,t));
}

async function flipAll() {
    let cards = document.getElementsByClassName("image");
    for (let card of cards) {
        if (!flip(card)) break;
        await sleep(100);
    }
    return true;
}

function reset(){
    let cards = document.getElementsByClassName("image");
    for (let card of cards) {
        card.src ="pic/back.jpg";
        card.flag=0; 
    }
    return true;
}