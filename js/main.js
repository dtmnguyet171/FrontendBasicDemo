$(function () {
    $(".header").load("./html/header.html");
    $(".main").load("./html/account.html");
    $(".footer").load("./html/footer.html");
});
function clickNavHome(){
    $(".main").load("./html/home.html")
}
function clickNaviViewListAccount(){
    $(".main").load("./html/account.html")
    getListAccount()
}
function clickNaviViewListDepartment(){
    $(".main").load("./html/department.html")
}

