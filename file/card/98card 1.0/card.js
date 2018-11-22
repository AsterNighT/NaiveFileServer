/**
 * 卡牌URL(需校内网访问)
 * adddna:https://card.cc98.org/Image/vvgpmkbi.png
 * Dearkano:https://card.cc98.org/Image/1lfh5r21.png
 * back:https://card.cc98.org/Image/khwd2khp.jpg
 */
window.onload = function()
{
    //设置初始财富值为5000
    var balance = sessionStorage.getItem("balance")
    if (!balance)
    {
        balance = 5000
        sessionStorage.setItem("balance",5000)
    }
    document.getElementsByClassName("balance")[0].innerText = balance
    //设置初始卡牌收藏数为0
    var adddna = sessionStorage.getItem("adddna")
    var Dearkano = sessionStorage.getItem("Dearkano")
    if(!adddna)
    {
        adddna = 0
        sessionStorage.setItem("adddna",0)
    }
    if(!Dearkano)
    {
        Dearkano = 0
        sessionStorage.setItem("Dearkano",0)
    }
    document.getElementsByClassName("card-number")[0].innerText = "✖ "+adddna
    document.getElementsByClassName("card-number")[1].innerText = "✖ "+Dearkano
}
function turnover(item)
{
    if(item.src=="https://card.cc98.org/Image/khwd2khp.jpg")    //若卡片未翻面，则它是可以被抽取的
    {
        //检查财富值余额是否足够1次抽卡
        var balance = parseInt(sessionStorage.getItem("balance"));
        if(balance < 500)
        {
            alert("剩余财富值不足！")
            return 0
        }
        //80%的概率抽到N卡，20%的概率抽到R卡
        const randNum = Math.random();
        var src = ""
        if(randNum>0.8)
        {
            const Dearkano = sessionStorage.getItem("Dearkano")
            const cardNum = parseInt(Dearkano)+1
            sessionStorage.setItem("Dearkano",cardNum)
            src="https://card.cc98.org/Image/1lfh5r21.png"
        }
        else
        {
            const adddna = sessionStorage.getItem("adddna")
            const cardNum = parseInt(adddna)+1
            sessionStorage.setItem("adddna",cardNum)
            src = "https://card.cc98.org/Image/vvgpmkbi.png"
        }     

        item.src=src
        balance = balance-500
        document.getElementsByClassName("balance")[0].innerText = balance
        sessionStorage.setItem("balance",balance)
    }
}
function turnoverall()
{
    const arr = document.getElementsByTagName("img")
    Array.from(arr).forEach(item => {
       a=turnover(item)
       if(a==0) throw new Error("剩余财富值不足!")//终止foreach
    })
}
function redraw()
{
    //所有卡牌翻回背面
    const arr = document.getElementsByTagName("img")
    Array.from(arr).forEach(item => {
        item.src="https://card.cc98.org/Image/khwd2khp.jpg"
    })
}
function recharge()
{
    const value = document.getElementsByClassName("recharge-input")[0].value
    const count = parseInt(value)
    var balance = parseInt(sessionStorage.getItem("balance"));
    balance = balance+count
    document.getElementsByClassName("balance")[0].innerText = balance
    sessionStorage.setItem("balance",balance)
}

/**
 * edge下报错的原因？
 * sessionStorage是建立在域上的，如果是建立一个html文件，双击打开，可能显示的就是不支持
 * 把它放到一个服务器中，通过http(s)://xxx打开就好了
 */