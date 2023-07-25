let accountList = [];
let apiBase= "https://643d4c71f0ec48ce90586caf.mockapi.io/Account"

$(function () {
    $(".header").load("./html/header.html");
    $(".main").load("./html/account.html");
    $(".footer").load("./html/footer.html");
    getListAccount()
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
function getListAccount(){
    // Lấy ra danh sách Account
    // Gán giá trị lấy được cho accountList
    $.ajax({
        url: apiBase,
        type: 'GET',
        contentType: 'application/json', // Định nghĩa định dạng dữ liệu truyền vào là json
        // data: JSON.stringify(request),
        error: function (err) {
            // Hành động khi api bị lỗi
            console.log(err)
            alert(err.responseJSON)
        },
        success: function (data) {
            // Hành động khi thành công
            console.log(data)
            fillDataToTable(data)
        }
    });
}
function fillDataToTable(data){
    accountList = data;
    $('tbody').empty();

    accountList.forEach(function (item, index) {
        $('tbody').append(
            '<tr>'
                +'<td class="align-middle">' + (index+1) + '</td>'
                +'<td><img src="'+item.avatar +'"></td>' 
                +'<td>' + item.name + '</td>'
                +'<td>' + item.address + '</td>'
                +'<td>' + item.createdAt + '</td>'
                +'<td>'
                    + '<a class="edit" title="Edit" data-toggle="tooltip" onclick="updateAccount('+item.id+')"><i class="fa fa-pencil"></i></a>'
                    + '<a class="delete" title="delete" data-toggle="tooltip" onclick="confirmDelete('+item.id+')"><i class="fa fa-trash" aria-hidden="true"></i></a>'
                +'</td>'
            +'</tr>'
        )
    });
}
function addNewAccount(){
    resetform()
}
function resetform(){

    document.getElementById("name").value="";
    document.getElementById("avatar").value="";
    document.getElementById("address").value="";
    document.getElementById("accountIdUpdate").value="";
}

function Account(id,name,avatar,address,createdAt){
    this.id = id
    this.name = name
    this.avatar = avatar
    this.address = address
    this.createdAt = createdAt
}

function saveAccount(){
    // Lấy các giá trị có trong form -> tạo ra object -> call API
    let id = document.getElementById("accountIdUpdate").value;
    let name = document.getElementById("name").value;
    let avatar = document.getElementById("avatar").value;
    let address = document.getElementById("address").value;
    let createdAt = new Date();

    let method;
    let api;
    console.log(id)
    if(id){
        // update
        method = 'PUT' ;
        api = apiBase + "/" + id;
    } else{
        method = 'POST';
        api = apiBase;
    }

    // Tạo object:
    let account = new Account(id,name,avatar,address,createdAt)
    console.log(account)

    // Call API
    $.ajax({
        url: api,
        type: method,
        contentType: 'application/json', // Định nghĩa định dạng dữ liệu truyền vào là json
        data: JSON.stringify(account),
        error: function (err) {
            // Hành động khi api bị lỗi
            console.log(err)
            alert(err.responseJSON)
        },
        success: function (data) {
            // Hành động khi thành công
            console.log(data)
            getListAccount();
            $('#exampleModalCenter').modal('hide');
            showAlrtSuccess();
        }
    });
}


function showAlrtSuccess() {
    $("#success-alert").fadeTo(2000, 500).slideUp(500, function () {
        $("#success-alert").slideUp(3000);
    });
}
function updateAccount(id){
    const account = accountList.find((item, index) => {
        if (item.id == id) {
            return item;
        }
    }
    )
    console.log(id, account)
    // Fill Thông tin ra ngoài form create/update
    $("#accountIdUpdate").val(account.id)
    $("#name").val(account.name)
    $("#avatar").val(account.avatar)
    $("#password").val(account.password)
    $("#address").val(account.address)
    $('#exampleModalCenter').modal('show');
}
function confirmDelete(id){
    console.log(id)
    $("#accountIdDelete").val(id)
    $('#modalConfirmDelete').modal('show');
}
function deleteAccount(){
    let id = $("#accountIdDelete").val()
    console.log(id)
    $.ajax({
        url: apiBase +"/" + id,
        type: 'DELETE',
        contentType: 'application/json', // Định nghĩa định dạng dữ liệu truyền vào là json
        // data: JSON.stringify(request),
        error: function (err) {
            // Hành động khi api bị lỗi
            console.log(err)
            alert(err.responseJSON)
        },
        success: function (data) {
            // Hành động khi thành công
            $('#modalConfirmDelete').modal('hide')
            getListAccount()
        }
    });

}  