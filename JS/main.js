// Account
// Front Desk Page
// Kitchen Page
// Inventory Page
// Room Services Task
// Admin Room Page
// Admin Staff Page
// Admin Kitchen Page
// Admin Task Page
// Admin Inventory Page
// Admin Statistic Page





//-----------------------Account----------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------
function login() {
  var SID = $("#SID").val();
  var PW = $("#PW").val();
  var TSID = SID.trim();
  var TPW = PW.trim();
  if (SID == "" || PW == "") {
    $("#Warning").html("");
    $("#Warning").addClass("alert alert-danger");
    $("#Warning").append(
      "<li>You must input both ID and Password for login</li>"
    );
  }
  else{
  $.ajax({
    type: "POST",
    url: "/PHP/login.php",
    data: {
      SID: TSID,
      PW: TPW,
    },
    dataType:"json",
    success: function (response) {

      if (response.status == "database") {
        $("#Warning").html("");
        $("#Warning").addClass("alert alert-danger");
        $("#Warning").append(
          "<li>Database error please call technical support</li>"
        );
      }

      if (response.status == "failed") {
        $("#Warning").html("");
        $("#Warning").addClass("alert alert-danger");
        $("#Warning").append("<li>Staff not found</li>");
      }

      if (response.status == "success") {
        switch(response.type){
          case "Admin":
            location.replace('adminRoom.html')
            break;
          case "Kitchen":
            location.replace('Kitchen.html')
            break;
          case "Room_Services":
            location.replace('RoomServices.html')
            break;
          case "Inventory":
            location.replace('Inventory.html')
            break;
          case "Front_Desk":
              location.replace('FrontDesk.html')
              break;
        }
      }
    },
  });
}
}

function logout(Type){
  $.ajax({
    type: "GET",
    url: "/PHP/logout.php",
    dataType:"json",
    success: function (response) {
      if(Type != '1'){
        alert('logout success');
        
      }
      location.replace('index.html')
    },
    })
}


//-----------------------Front Desk page----------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------
function FrontDesk(){
  $.ajax({
    type: "GET",
    url: "/PHP/checksession.php",
    dataType:"json",
    success: function (response) {
      $("#SID").html(response.ID)
      $("#Name").html("Hello! "+response.Name+'<button class="btn btn-warning ms-3" onclick="logout()">Logout</button>')
      if(response.Type == 'Front_Desk'){
        checkBooking()
        FloorSelect();
        RoomShow();
      }
      else{
        alert("Please Login to the correct account")
        logout('1');
      }
    },
    })
 }
 
 function checkBooking(){
   $.ajax({
    type: "GET",
    url: "/PHP/checkBooking.php",
    dataType:"json",
    success: function (response) {
    },
  })
 }

 function FloorSelect(){
   $.ajax({
     type: "GET",
     url: "/PHP/floorSelect.php",
     dataType:"json",
     success: function (response) {
       if(response.status == "database"){
         $("#FloorSelect").html("");
         $("#FloorSelect").addClass("alert alert-danger");
         $("#FloorSelect").append("<li>Database found</li>");
       }
       if(response.status == "noRecord"){
         $("#room-place").html("");
         $("#room-place").addClass("alert alert-danger");
         $("#room-place").append("<li>no record</li>");
       }
       else{
         $("#FloorSelect").html("");
         $("#FloorSelect").removeClass("alert alert-danger");
         $.each(response, function (key, item){
           $("#FloorSelect").append("<h3 id='FLD' class='selectable' value='"+item+"' onclick = 'RoombyFloor("+item+")'>Floor "+item+"</h3>");
         })
         
         
       }
   }
 });
 }
 function roomTemplate(ID,type,Cost,Status){
  if(Status == "Available"){
    var html = `<div class="card col-xl-3 shadow" id="room-card">\
    <div class="card-img-top text-center my-3"><i class="fas fa-door-open fa-7x" id="avalibleIcon"></i></div>\
    <div class="card-body">\
      <h2 class="card-title">${ID}</h2>\
      <p class="card-text fw-bold fs-4">Type:${type}</p>\
      <p class="card-text fw-bold fs-5">Price: ${Cost}</p>\
      <p class="card-text fw-bold fs-5">${Status}</p>\
      <div class="dropdown" id="moreOption">\
        <button class="btn btn-primary float-end dropdown-toggle"data-bs-toggle="dropdown" aria-expanded="false" >More Option</button>\
        <ul class="dropdown-menu" aria-labelledby="moreOption">\
          <li><button class="dropdown-item" data-bs-toggle="modal" data-bs-target="#DetailModal" onclick="ViewDetail('${ID}','${Status}')">View Details</button></li>\
          <li><button class="dropdown-item"  data-bs-toggle="modal" data-bs-target="#BookingModal" onclick="BookModal('${ID}','${type}',${Cost})">Booking</button></li>\
          <li><button class="dropdown-item"  data-bs-toggle="modal" data-bs-target="#CheckinModal" onclick="ChkinModal('${ID}','${type}',${Cost})">Check in</button></li>\
        </ul>\
      </div>\
    </div>\
  </div>`
  }
  if(Status == "checked-in"){
    var html =`<div class="card col-xl-3 shadow" id="room-card">\
    <div class="card-img-top text-center my-3"><i class="fas fa-door-closed fa-7x" id="chkinIcon"></i></div>\
    <div class="card-body">\
      <h2 class="card-title">${ID}</h2>\
      <p class="card-text fw-bold fs-4">Type:${type}</p>\
      <p class="card-text fw-bold fs-5">Price: ${Cost}</p>\
      <p class="card-text fw-bold fs-5">${Status}</p>\
      <div class="dropdown" id="moreOption">\
        <button class="btn btn-primary float-end dropdown-toggle"data-bs-toggle="dropdown" aria-expanded="false" >More Option</button>\
        <ul class="dropdown-menu" aria-labelledby="moreOption">\
        <li><button class="dropdown-item" data-bs-toggle="modal" data-bs-target="#DetailModal" onclick="ViewDetail('${ID}','${Status}')">View Details</button></li>\
        <li><button class="dropdown-item" data-bs-toggle="modal" data-bs-target="#RoomServicesModal" onclick="roomSerModal('${ID}')">Room Services</button></li>
          <li><button class="dropdown-item"  data-bs-toggle="modal" data-bs-target="#BookingModal" onclick="BookModal('${ID}','${type}',${Cost})">Booking</button></li>\
          <li><button class="dropdown-item"  data-bs-toggle="modal" data-bs-target="#CheckoutModal" onclick="ChkoutModal('${ID}','${type}',${Cost})">Check out</button></li>\
        </ul>\
      </div>\
    </div>\
  </div>`
  }
  if(Status == "booking"){
  var html =`<div class="card col-xl-3 shadow" id="room-card">\
  <div class="card-img-top text-center my-3"><i class="fas fa-calendar-alt fa-7x" ></i></div>\
    <div class="card-body">\
      <h2 class="card-title">${ID}</h2>\
      <p class="card-text fw-bold fs-4">Type:${type}</p>\
      <p class="card-text fw-bold fs-5">Price: ${Cost}</p>\
      <p class="card-text fw-bold fs-5">${Status}</p>\
      <div class="dropdown" id="moreOption">\
        <button class="btn btn-primary float-end dropdown-toggle"data-bs-toggle="dropdown" aria-expanded="false" >More Option</button>\
        <ul class="dropdown-menu" aria-labelledby="moreOption">\
        <li><button class="dropdown-item" data-bs-toggle="modal" data-bs-target="#DetailModal" onclick="ViewDetail('${ID}','${Status}')">View Details</button></li>\
          <li><button class="dropdown-item"  data-bs-toggle="modal" data-bs-target="#BookingModal" onclick="BookModal('${ID}','${type}',${Cost})">Booking</button></li>\
          <li><button class="dropdown-item"  data-bs-toggle="modal" data-bs-target="#CheckinModal" onclick="ChkinModal('${ID}','${type}',${Cost})">Check in</button></li>\
          <li><button class="dropdown-item" onclick = "cancelBooking('${ID}','today')">Cancel Booking</button></li>\
        </ul>\
      </div>\
    </div>\
  </div>`
  }
  if(Status == "Unavailable" || Status == ""){
    var html =`<div class="card col-xl-3 shadow" id="room-card">\
    <div class="card-img-top text-center my-3"><i class="fas fa-times fa-7x" ></i></div>\
      <div class="card-body">\
        <h2 class="card-title">${ID}</h2>\
        <p class="card-text fw-bold fs-4">Type:${type}</p>\
        <p class="card-text fw-bold fs-5">Price: ${Cost}</p>\
        <p class="card-text fw-bold fs-5">${Status}</p>\
      </div>\
    </div>`
    
    }
    return html
 }
 function RoomShow(){
   $.ajax({
     type: "GET",
     url: "/PHP/Rooms.php",
     dataType:"json",
     success: function (response) {
       if(response.status == "database"){
         $("#room-place").html("");
         $("#room-place").addClass("alert alert-danger");
         $("#room-place").append("<li>database error</li>");
       }
       if(response.status == "noRecord"){
         $("#room-place").html("");
         $("#room-place").addClass("alert alert-danger");
         $("#room-place").append("<li>no record</li>");
       }
       else{
         $("#room-place").html("");
         $("#FloorSelect").removeClass("alert alert-danger");
       $.each(response, function (key, room){
        $("#room-place").append(roomTemplate(room.RID,room.R_TYPE,room.R_Cost,room.R_Status));
         
       })
     }
   }
 })
 }
 function RoombyFloor(floor){
   $.ajax({
     type: "POST",
     url: "/PHP/RoomsFloor.php",
     data:{
       FID: floor,
     },
     dataType:"json",
     success: function (response) {
       if(response.status == "database"){
         $("#room-place").html("");
         $("#room-place").addClass("alert alert-danger");
         $("#room-place").append("<li>database error</li>");
       }
       if(response.status == "noRecord"){
         $("#room-place").html("");
         $("#room-place").addClass("alert alert-danger");
         $("#room-place").append("<li>no record</li>");
       }
       else{
         $("#room-place").removeClass("alert alert-danger");
         $("#room-place").html("");
         $.each(response, function (key, room){
          $("#room-place").append(roomTemplate(room.RID,room.R_TYPE,room.R_Cost,room.R_Status));
         })
     }
   }
 })
 }
 
 function RoomStatusShow(status){
   $.ajax({
     type: "POST",
     url: "/PHP/RoomsStatus.php",
     data:{
       Rstatus: status,
     },
     dataType:"json",
     success: function (response) {
       if(response.status == "database"){
         $("#room-place").html("");
         $("#room-place").addClass("alert alert-danger");
         $("#room-place").append("<li>database error</li>");
       }
       if(response.status == "noRecord"){
         $("#room-place").html("");
         $("#room-place").addClass("alert alert-danger");
         $("#room-place").append("<li>no record</li>");
       }
       else{
         $("#room-place").removeClass("alert alert-danger");
         $("#room-place").html("");
         $.each(response, function (key, room){
          $("#room-place").append(roomTemplate(room.RID,room.R_TYPE,room.R_Cost,room.R_Status));
         })
     }
   }
 })
 }

function roomSearch(){
  var keyword = $("#SearchInput").val().trim()
  $.ajax({
    type: "POST",
    url: "/PHP/searchRoom.php",
    data:{
      keyword: keyword,
    },
    dataType:"json",
    success: function (response) {
      if(response.status == "database"){
        $("#room-place").html("");
        $("#room-place").addClass("alert alert-danger");
        $("#room-place").append("<li>database error</li>");
      }
      if(response.status == "noRecord"){
        $("#room-place").html("");
        $("#room-place").addClass("alert alert-danger");
        $("#room-place").append("<li>no record</li>");
      }
      else{
        $("#room-place").removeClass("alert alert-danger");
        $("#room-place").html("");
        $.each(response, function (key, room){
         $("#room-place").append(roomTemplate(room.RID,room.R_TYPE,room.R_Cost,room.R_Status));
        })
    }
  }
})
}
// Booking

function Booking(){
 var RID = $("#BRID").val();
 var RType = $("#BType").val();
 var RCost = $("#BCOST").val();
 var BCustomer = $("#BCusName").val();
 var BDate = $("#BDate").val();
 var BPeriod = $("#BPeriod").val();
 var BGender = $("#BGender").val();
var TRID = RID.trim();
var TRType = RType.trim();
var TRCost = RCost.trim();
var TBCustomer = BCustomer.trim();
var TBDate = BDate.trim();
var TBPeriod = BPeriod.trim();
var TBGender = BGender.trim();
 if(BCustomer == "" || BDate == "" || BPeriod == ""){
  $("#BError").html("")
  $("#BError").addClass("alert alert-danger");
   $("#BError").append("<li>Please input customer info</li>")
 }
 $.ajax({
  type: "POST",
  url: "/PHP/booking.php",
  data:{
    ID : TRID,
    Type: TRType,
    Cost: TRCost,
    Customer: TBCustomer,
    date: TBDate,
    Period: TBPeriod,
    Gender: TBGender,
  },
  dataType:"json",
  success: function (response) {
    if(response.status == "database"){
      alert("database error");
    }
    if(response.status == "success"){
      $("#BError").html("")
      $("#BError").removeClass("alert alert-danger");
      alert("booking success");
    }
  }
 })
}

function BookModal(RID,RTYPE,RCost){
  $("#BRID").val(RID)
  $("#BType").val(RTYPE)
  $("#BCOST").val(RCost)
  $("#BCusName").val("");
  $("#BDate").val("");
  $("#BPeriod").val("");
}

// Checkin
function ChkinModal(RID,RTYPE,RCost){
  $("#ChkinRID").val(RID)
  $("#ChkinTYPE").val(RTYPE)
  $("#ChkinPrice").val(RCost)
  $.ajax({
    type: "POST",
    url: "/PHP/getBookingInfo.php",
    data:{
      ID : RID,
    },
    dataType:"json",
   success: function (response) {
     if(response.status == '1' ){
      $("#ChkinCustomer").val(response.Name);
      $("#ChkinPeriod").val(response.Period);
      $("#ChkinGender").val(response.Gender).change();
      $("#checkBook").val('1');
      
     }
     else{
      $("#ChkinCustomer").val();
      $("#ChkinPeriod").val();
     }
   }
  })
}

function Checkin(){
  var RID = $("#ChkinRID").val();
  var BCustomer = $("#ChkinCustomer").val();
  var BPeriod = $("#ChkinPeriod").val();
  var BGender = $("#ChkinGender").val();
 var TRID = RID.trim();
 var TBCustomer = BCustomer.trim();
 var TBPeriod = BPeriod.trim();
 var TBGender = BGender.trim();
  if(BCustomer == "" || BDate == "" || BPeriod == ""){
   $("#CiError").html("")
   $("#CiError").addClass("alert alert-danger");
    $("#CiError").append("<li>Please type customer info</li>")
  }
  $.ajax({
   type: "POST",
   url: "/PHP/checkin.php",
   data:{
     ID : TRID,
     Customer: TBCustomer,
     Period: TBPeriod,
     Gender: TBGender,
     Booking: $("#checkBook").val(),
   },
   dataType:"json",
   success: function (response) {
    if(response.status == "database"){
      alert("Database Error")
    }
    if(response.status == "success"){
      $("#CiError").html("")
      $("#CiError").removeClass("alert alert-danger");
      alert("Check in success");
      RoomShow();
    }
   }
  })
 }
// View Room Detail

 function ViewDetail(RID,Status){
  $.ajax({
    type: "POST",
    url: "/PHP/Vdetails.php",
    data:{
      ID : RID,
      Rstatus : Status,
    },
    dataType:"json",
    success: function (response) {
      
     if(response.status == "database"){
       $("#DError").html("")
       $("#DError").addClass("alert alert-danger");
       $("#DError").append("<li>Database error</li>")
     }
     else{
      $("#DError").removeClass("alert alert-danger");
      $.each(response, function (key, room){
        $('#DRID').html("Room ID: "+room.RID)
        $('#DType').html("Type: "+room.R_TYPE)
        $('#DCost').html("Cost per night: "+room.R_Cost)
        $('#DStatus').html("Current Status: "+room.R_Status)

        if(room.R_Status == "checked-in"){
        $('#DCusName').html("Current Customer: "+room.CusName)
        $('#DCid').html("Check in Date: "+room.ChkinDate)
        $('#DPeriod').html("Period: "+room.Period)
        
        }
        else{
          $('#DCusName').html("Current Customer: None")
          $('#DCid').html("Check in Date: None")
          $('#DPeriod').html("Period: None")
        }
      })
       getBookingRecord(RID)
     }
    }
   })
 }

 function getBookingRecord(RID){
  $.ajax({
    type: "POST",
    url: "/PHP/BookingRecord.php",
    data:{
      ID : RID,
    },
    dataType:"json",
    success: function (response) {
     if(response.status == "database"){
       $("#bookingRecordBody").html("")
       $("#bookingRecordBody").addClass("alert alert-danger");
       $("#bookingRecordBody").append("<li>Database error</li>")
     }
     if(response.status == "noRecord")
     {
      $("#bookingRecordBody").html("")
      $("#bookingRecordBody").addClass("alert alert-danger");
      $("#bookingRecordBody").append("<li>No booking record</li>")
     }
     else{
      $("#bookingRecordBody").html("")
      $("#bookingRecordBody").removeClass("alert alert-danger");
      $.each(response, function (key, booking){
      var html = `<div id="bookingRecord" class="border-3 border">
          <div class="row">
        <label class="col-lg-5 form-label" >Booking Date: ${booking.BookingDate}</label>
        <label class="col-5 form-label">Period: ${booking.BPeriod}</label>
      </div>
      <div class="row">
                    <label class="col-5 form-label">Name: ${booking.CusName}</label>
                    <button class="btn btn-warning" onclick = "cancelBooking('${RID}','${booking.BookingDate}')" style = "width:auto;margin-bottom: 2%;">Cancel Booking</button>
                  </div>`
      
      $("#bookingRecordBody").append(html)
      })
     }
    }
   })
 }

 function cancelBooking(RID,Date){
  $.ajax({
    type: "POST",
    url: "/PHP/cancelBooking.php",
    data:{
      ID : RID,
      BDate : Date,
    },
    dataType:"json",
    success: function (response) {
      if(Date == "today"){
        RoomShow();
      }
      else{
        getBookingRecord(RID);
      }
      
      alert("Booking Canceled")
    }
 })
 }
// Call Room Services


 function roomSerModal(RID){
  $("#RSRID").val(RID);
  $("#RSSelect").val('Select a Services');
  $("#RoomServicesBody").html("");
 }
 function RSBody(){
  var RS = $("#RSSelect").val();
  if(RS == "Room"){
    $("#RoomServicesBody").html("");
    $("#RoomServicesBody").append('<div class="row" id="BookingRow">\
      <label class="form-label col-2">Request:</label>\
      <textarea class="form-control" rows="4" style="width: 50%;" id="RSRequest"></textarea>\
    </div>\
    <div class="row" id="BookingRow">\
      <label class="form-label col-2">Remark:</label>\
      <textarea class="form-control" rows="4" style="width: 50%;" id="RSRemark"></textarea>\
    </div>');
  }

  if(RS == "Kitchen"){
    $("#RoomServicesBody").html("");
    $("#RoomServicesBody").append('<div class="row" id="BookingRow">\
      <label class="form-label col-2">Menu:</label>\
      <button class="btn btn-primary col-11" data-bs-toggle="modal" data-bs-target="#MenuModal" style="width : auto;" id="RSmeals" value="" onclick="showMeal()">Select a meals</button>\
    </div>\
    <div class="row" id="BookingRow">\
      <label class="form-label col-2">Remark:</label>\
      <textarea class="form-control" rows="4" style="width: 50%;" id="KitRemark"></textarea>\
    </div>');
  }
}

 function roomServices(){
   var RID = $("#RSRID").val();
   var RsType = $("#RSSelect").val();
   if(RsType == "Room"){
    var RSRequest = $("#RSRequest").val().trim();
    var RSRemark = $("#RSRemark").val().trim();
    $.ajax({
      type: "POST",
      url: "/PHP/RoomServices.php",
      data:{
        ID : RID,
        Type : RsType,
        Request : RSRequest,
        Remark : RSRemark,
      },
      dataType:"json",
      success: function (response) {
        
        if(response.status == "success"){
          alert("Room Services added");
        }
        if(response.status == 'database'){
          alert("database server error")
        }
      }
   })
   }
   if(RsType == "Kitchen"){
    var RSRequest = $("#RSmeals").val().trim();
    var RSRemark = $("#KitRemark").val().trim();
   
    $.ajax({
      type: "POST",
      url: "/PHP/RoomServices.php",
      data:{
        ID : RID,
        Type : RsType,
        Request : RSRequest,
        Remark : RSRemark,
      },
      dataType:"json",
      success: function (response) {
        
        if(response.status == "success"){
          alert("Room Services added");
        }
        if(response.status == 'database'){
          alert("database server error")
        }
      }
   })
  }
 }

 function showMeal(){
   $.ajax({
     type:"GET",
     url: "/PHP/showMeal.php",
     dataType:"json",
     success: function (response){
       
      if(response.status == "database"){
        $("#MenuBookingRow").html("");
        $("#MenuError").addClass("alert alert-danger");
        $("#MenuError").append("<li>database error</li>");
      }
      if(response.status == "noRecord"){
        $("#MenuBookingRow").html("");
        $("#MenuError").addClass("alert alert-danger");
        $("#MenuError").append("<li>no record</li>");
      }
      else{
        $("#MenuError").html("");
        $("#MenuBookingRow").html("");
        $("#MenuError").removeClass("alert alert-danger");
        $.each(response, function (key, room){
          var name =  encodeURI(room.M_Name)
        var html = `<div class="card col-xl-3 text-center" id="room-card">
        <div class="card-img-top text-center my-3"><img src="Menu/${room.MID}.jpg" class="img-thumbnail" loading="lazy"></div>
        <div class="card-body">
        <h2 class="card-title">${room.M_Name}</h2>
        <p class="card-text fw-bold fs-4">Price: ${room.cost}</p>
        <p class="card-text fw-bold fs-4">${room.Desc}</p>
        <div class="dropdown" id="moreOption">
          <button class="btn btn-primary ms-auto" onclick=selectMeal('${room.MID}','${name}') >Select</button>
        </div>
      </div>
    </div>`
    $("#MenuBookingRow").append(html);
        })
  }
     }
   })
  
 }

 function selectMeal(MID,Name){
   var Names = decodeURI(Name);
  $("#RSmeals").val(MID);
  $("#RSmeals").html(Names);
  alert("Meal selected. "+Names)
 }
// Check out

 function ChkoutModal(RID,TYPE,COST){
   $.ajax({
     type:"POST",
     url:"/PHP/showChkout.php",
     data:{
      ID : RID,
     },
     dataType:"json",
     success: function(response){
      $.each(response, function (key, room){
        $("#CORID").val(RID);
        $("#COTYPE").val(TYPE);
        $("#COCusName").val(room.CusName);
        $("#COdate").val(room.ChkDate);
        $("#COPeriod").val(room.Period);
        $("#CORecord").val(room.RecordID);
        if(room.Rs == '1'){
          var Total = (COST * room.Period) + room.RSPrice;
        $("#PriceDetails").val("Room Cost per night: RM"+COST+"\nRoom Services Fee: RM"+room.RSPrice);
        $("#TotalPay").val("RM"+Total);
        $("#Total").val(Total);
        }
        else{
        $("#PriceDetails").val("Room Cost per night: RM"+COST);
        $("#TotalPay").val("RM"+COST * room.Period);
        $("#Total").val(COST * room.Period);
        }
     })
   }
  })
 }

 function checkOut(){
  $.ajax({
    type:"POST",
    url:"/PHP/checkout.php",
    data:{
     ID : $("#CORecord").val().trim(),
     Total : $("#Total").val().trim(),
     RID : $("#CORID").val().trim(),
    },
    dataType:"json",
    success: function(response){
      if(response.status == 'success'){
     RoomShow();
     alert("checkout success")
    }
    if(response.status == 'database'){
      alert("database server error")
    }
  }
 })
 }
//-----------------------Inventory page----------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------
function Inventory(){
  $.ajax({
    type: "GET",
    url: "/PHP/checksession.php",
    dataType:"json",
    success: function (response) {
      $("#SID").html(response.ID)
      $("#Name").html("Hello! "+response.Name+'<button class="btn btn-warning ms-3" onclick="logout()">Logout</button>')
      if(response.Type == 'Inventory'){
        showInventory();
      }
      else{
        alert("Please Login to the correct account")
        logout('1');
      }
    },
    })
  
}

function showInventory(){
  $.ajax({
    type: "GET",
    url: "/PHP/Inventorys.php",
    dataType:"json",
    success: function (response) {
      if(response.status == "database"){
        $("#Warning-bar").html("");
        $("#Warning-bar").addClass("alert alert-danger");
        $("#Warning-bar").append("<li>database error</li>");
      }
      if(response.status == "noRecord"){
        $("#Warning-bar").html("");
        $("#Warning-bar").addClass("alert alert-danger");
        $("#Warning-bar").append("<li>no record</li>");
      }
      else{
        $("#Warning-bar").removeClass("alert alert-danger");
        $("#Warning-bar").html("");
        $("#normal-bar").html("");
      $.each(response, function (key, room){
        
          var html = `<div class="card col-xl-3 shadow" id="room-card">
          <div class="card-body text-center">
            <h2 class="card-title">${room.InvName}</h2>
            <p class="card-text fw-bold fs-4">Current: ${room.S_Number}</p>
            <p class="card-text fw-bold fs-5">Warning: ${room.W_Number}</p>
              <button class="btn btn-primary" onclick="showResupply('${room.InvID}','${room.InvName}','${room.S_Number}')" data-bs-toggle="modal" data-bs-target="#ReSupModal">Resupply</button>
            </div>
          </div>`
          if(room.W_Number > room.S_Number){
            $("#Warning-bar").append(html);
          }
          else{
            $("#normal-bar").append(html);
          }
        
       
      })
    }
  }
})
}

function InventorySearch(){
  var keyword = $("#SearchInput").val().trim()
  $.ajax({
    type: "POST",
    url: "/PHP/searchInv.php",
    data:{
      keyword: keyword,
    },
    dataType:"json",
    success: function (response) {
      if(response.status == "database"){
        $("#Warning-bar").html("");
        $("#Warning-bar").addClass("alert alert-danger");
        $("#Warning-bar").append("<li>database error</li>");
      }
      if(response.status == "noRecord"){
        $("#Warning-bar").html("");
        $("#Warning-bar").addClass("alert alert-danger");
        $("#Warning-bar").append("<li>no record</li>");
      }
      else{
        $("#Warning-bar").removeClass("alert alert-danger");
        $("#Warning-bar").html("");
        $("#normal-bar").html("");
        $.each(response, function (key, room){
        
          var html = `<div class="card col-xl-3 shadow" id="room-card">
          <div class="card-body text-center">
            <h2 class="card-title">${room.InvName}</h2>
            <p class="card-text fw-bold fs-4">Current: ${room.S_Number}</p>
            <p class="card-text fw-bold fs-5">Warning: ${room.W_Number}</p>
              <button class="btn btn-primary" onclick="showResupply('${room.InvID}','${room.InvName}','${room.S_Number}')" data-bs-toggle="modal" data-bs-target="#ReSupModal">Resupply</button>
            </div>
          </div>`
          if(room.W_Number > room.S_Number){
            $("#Warning-bar").append(html);
          }
          else{
            $("#normal-bar").append(html);
          }
        
       
      })
    }
  }
})
}

function addInv(){
  if($("#NewInvName").val().trim() == "" || $("#NewInvStock").val().trim() == ""){
    alert("Please insert both Name and Stock number")
  }
  else{
  $.ajax({
    type:"POST",
    url:"/PHP/addInventory.php",
    data:{
      Name : $("#NewInvName").val().trim(),
      Stock: $("#NewInvStock").val().trim(),
    },
    dataType:"json",
    success: function(response){
      if(response.status == "success"){
        showInventory();
        alert("Inventory added")
      }
      if(response.status == 'database'){
        alert("database server error")
      }
    }
  })
}
}

function Resupply(){
 $.ajax({
  type:"POST",
  url:"/PHP/resupply.php",
  data:{
    ID : $("#ReSupID").val().trim(),
    Stock: $("#ReSupStock").val().trim(),
    Supply: $("#ReSupNewStock").val().trim(),
  },
  dataType:"json",
  success: function(response){
    if(response.status == "success"){
      showInventory();
      alert("Resupply success")
    }
    if(response.status == 'database'){
      alert("database server error")
    }
  }
})
}

function showResupply(ID,Name,Stock){
  $('#ReSupID').val(ID)
  $('#ReSupName').val(Name)
  $('#ReSupStock').val(Stock)
}
//-----------------------Kitchen page----------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------
function Kitchen(){
  $.ajax({
    type: "GET",
    url: "/PHP/checksession.php",
    dataType:"json",
    success: function (response) {
      $("#SID").html(response.ID)
      $("#Name").html("Hello! "+response.Name+'<button class="btn btn-warning ms-3" onclick="logout()">Logout</button>')
      if(response.Type == 'Kitchen'){
        showKitTask()
      }
      else{
        alert("Please Login to the correct account")
        logout('1');
      }
    },
    })

}
function kitTemplate(StfID,RID,Meals,Remark,Status,SerID){
  var SID = $("#SID").html().trim();
  if(Status == "Cooking" && StfID == SID){
    var html = `<div class="card col-xl-3 shadow" id="room-card">
    <div class="card-body text-center">
      <h3 class="card-title">Room NO: ${RID}</h3>
      <p class="card-text fw-bold fs-4">Status: ${Status}</p>
      <p class="card-text fw-bold fs-4">Menu:</p>
      <p class="card-text fw-bold fs-4 text-primary">${Meals}</p>
      <p class="card-text fw-bold fs-5">Remark:</p>
      <p class="card-text fw-bold fs-4 text-primary">${Remark}</p>
      <br>
      <button class="btn btn-primary" onclick = "deliverKitchen('${SerID}','${RID}')">Deliver</button>
      </div>
    </div>`
   }
   if(Status == "Complete" && StfID == SID){
    var html = `<div class="card col-xl-3 shadow" id="room-card">
    <div class="card-body text-center">
      <h3 class="card-title">Room NO: ${RID}</h3>
      <p class="card-text fw-bold fs-4">Status: ${Status}</p>
      <p class="card-text fw-bold fs-4">Menu:</p>
      <p class="card-text fw-bold fs-4 text-primary">${Meals}</p>
      <p class="card-text fw-bold fs-5">Remark:</p>
      <p class="card-text fw-bold fs-4 text-primary">${Remark}</p>
      <br>
      </div>
    </div>`
   }
   if(Status == "Pending"){
    var html = `<div class="card col-xl-3 shadow" id="room-card">
    <div class="card-body text-center">
      <h3 class="card-title">Room NO: ${RID}</h3>
      <p class="card-text fw-bold fs-4">Status: ${Status}</p>
      <p class="card-text fw-bold fs-4">Menu:</p>
      <p class="card-text fw-bold fs-4 text-primary">${Meals}</p>
      <p class="card-text fw-bold fs-5">Remark:</p>
      <p class="card-text fw-bold fs-4 text-primary">${Remark}</p>
      <br>
        <button class="btn btn-primary" onclick = "acceptKitchen('${SerID}')">Accept</button>
      </div>
    </div>`
   }
   return html
}

function showKitTask(){
  $.ajax({
    type: "GET",
    url: "/PHP/Kitchens.php",
    dataType:"json",
    success: function (response) {
      if(response.status == "database"){
        $('#MenuButton').html('')
        $("#Kitchen").html("");
        $("#Kitchen").addClass("alert alert-danger");
        $("#Kitchen").append("<li>database error</li>");
      }
      if(response.status == "noRecord"){
        $('#MenuButton').html('')
        $("#Kitchen").html("");
        $("#Kitchen").addClass("alert alert-danger");
        $("#Kitchen").append("<li>no record</li>");
      }
      else{
        $('#MenuButton').html('');
        $("#Kitchen").html("");
        $("#Kitchen").removeClass("alert alert-danger");
      $.each(response, function (key, room){
        
        
            $("#Kitchen").append(kitTemplate(room.StfID,room.RID,room.Meals,room.Remark,room.Status,room.SerID));
          
        
       
      })
    }
  }
})
}

function KitchenType(Status){
  $.ajax({
    type: "POST",
    url: "/PHP/KitStatus.php",
    data:{
      Stats: Status,
    },
    dataType:"json",
    success: function (response) {
    
      if(response.status == "database"){
        $('#MenuButton').html('')
        $("#Kitchen").html("");
        $("#Kitchen").addClass("alert alert-danger");
        $("#Kitchen").append("<li>database error</li>");
      }
      if(response.status == "noRecord"){
        $('#MenuButton').html('')
        $("#Kitchen").html("");
        $("#Kitchen").addClass("alert alert-danger");
        $("#Kitchen").append("<li>no record</li>");
      }
      else{
        $('#MenuButton').html('');
        $("#Kitchen").html("");
        $("#Kitchen").removeClass("alert alert-danger");
      $.each(response, function (key, room){
        
          
        $("#Kitchen").append(kitTemplate(room.StfID,room.RID,room.Meals,room.Remark,room.Status,room.SerID));
          
        
       
      })
    }
  }
})
}

function showMenu(){
  $.ajax({
    type:"GET",
    url: "/PHP/showMeal.php",
    dataType:"json",
    success: function (response){
      $('#MenuButton').html('')
      $('#MenuButton').append('<button class="btn btn-primary"  data-bs-toggle="modal" data-bs-target="#NewMenuModal">Create</button>')
     if(response.status == "database"){
       $("#Kitchen").html("");
       $("#Kitchen").addClass("alert alert-danger");
       $("#Kitchen").append("<li>database error</li>");
     }
     if(response.status == "noRecord"){
       $("#Kitchen").html("");
       $("#Kitchen").addClass("alert alert-danger");
       $("#Kitchen").append("<li>no record</li>");
     }
     else{
       $("#Kitchen").html("");
       $("#Kitchen").html("");
       $("#Kitchen").removeClass("alert alert-danger");
       $.each(response, function (key, room){
       var html = `<div class="card col-xl-3 text-center shadow" id="room-card">
       <div class="card-img-top text-center my-3"><img src="Menu/${room.MID}.jpg" class="img-thumbnail" loading="lazy"></div>
       <div class="card-body">
       <h2 class="card-title">${room.M_Name}</h2>
       <p class="card-text fw-bold fs-4">Price: ${room.cost}</p>
       <p class="card-text fw-bold fs-4">${room.Desc}</p>
       <div class="dropdown" id="moreOption">
         <button class="btn btn-primary ms-auto" data-bs-toggle="modal" data-bs-target="#EditMenuModal" onclick="editMeals('${room.MID}','${room.M_Name}','${room.cost}','${room.Desc}')" >Edit</button>
         <button class="btn btn-danger ms-auto" onclick=DeleteMeals('${room.MID}') >Delete</button>
       </div>
     </div>
   </div>`
   $("#Kitchen").append(html);
       })
 }
    }
  })
 
}

function KitchenSearch(){
  var keyword = $("#SearchInput").val().trim()
  $.ajax({
    type: "POST",
    url: "/PHP/searchMenu.php",
    data:{
      keyword: keyword,
    },
    dataType:"json",
    success: function (response) {
      $('#MenuButton').html('')
      $('#MenuButton').append('<button class="btn btn-primary"  data-bs-toggle="modal" data-bs-target="#NewMenuModal">Create</button>')
     if(response.status == "database"){
       $("#Kitchen").html("");
       $("#Kitchen").addClass("alert alert-danger");
       $("#Kitchen").append("<li>database error</li>");
     }
     if(response.status == "noRecord"){
       $("#Kitchen").html("");
       $("#Kitchen").addClass("alert alert-danger");
       $("#Kitchen").append("<li>no record</li>");
     }
     else{
       $("#Kitchen").html("");
       $("#Kitchen").html("");
       $("#Kitchen").removeClass("alert alert-danger");
       $.each(response, function (key, room){
       var html = `<div class="card col-xl-3 text-center shadow" id="room-card">
       <div class="card-img-top text-center my-3"><img src="Menu/${room.MID}.jpg" class="img-thumbnail" loading="lazy"></div>
       <div class="card-body">
       <h2 class="card-title">${room.M_Name}</h2>
       <p class="card-text fw-bold fs-4">Price: ${room.cost}</p>
       <p class="card-text fw-bold fs-4">${room.Desc}</p>
       <div class="dropdown" id="moreOption">
         <button class="btn btn-primary ms-auto" data-bs-toggle="modal" data-bs-target="#EditMenuModal" onclick="editMeals('${room.MID}','${room.M_Name}','${room.cost}','${room.Desc}')" >Edit</button>
         <button class="btn btn-danger ms-auto" onclick=DeleteMeals('${room.MID}') >Delete</button>
       </div>
     </div>
   </div>`
   $("#Kitchen").append(html);
       })
 }
  }
})
}

function acceptKitchen(ID){
  var SID = $("#SID").html().trim()
  $.ajax({
    type:"POST",
    url:"/PHP/acceptKitchen.php",
    data:{
      ID : ID,
      SID : SID,
    },
    dataType:"json",
    success: function(response){
      if(response.status == "success"){
        showKitTask()
        alert("Accept Cooking Task")
      }
      if(response.status == 'database'){
        alert("database server error")
      }
    }
  })
}

function deliverKitchen(ID,RID){
  $.ajax({
    type:"POST",
    url:"/PHP/deliverKitchen.php",
    data:{
      ID : ID,
      RID : RID,
    },
    dataType:"json",
    success: function(response){
      if(response.status == "success"){
        showKitTask()
        alert("Meals deliver arranged")
      }
      if(response.status == 'database'){
        alert("database server error")
      }
    }
  })
}

function DeleteMeals(ID){
  if(confirm("Are you sure you want to delete this?"))
    {
  $.ajax({
    type:"POST",
    url:"/PHP/DeleteMenu.php",
    data:{
      ID : ID,
    },
    dataType:"json",
    success: function(response){
      if(response.status == "success"){
        showMenu()
        alert("Delete success")
      }
      if(response.status == 'database'){
        alert("database server error")
      }
    }
  })
}
}
function editMeals(MID,Name,cost,Desc){
  $("#EditMenuID").val(MID);
  $("#EditMenuName").val(Name);
  $("#EditMenuPrice").val(cost);
  $("#EditMenuDesc").val(Desc);
  
  }

function addMenu(){
  $.ajax({
    type:"POST",
    url:"/PHP/addMenu.php",
    data:{
      Name : $("#NewMenuName").val().trim(),
      Price : $("#NewMenuPrice").val().trim(),
      Desc : $("#NewMenuDesc").val().trim(),
    },
    dataType:"json",
    success: function(response){
      if(response.status == "success"){
        adduploadPic(response.ID);
        alert("Menu added");
        showMenu();
      }
      if(response.status == 'database'){
        alert("database server error")
      }
    }
  })

}

function editMenu(){
  var MID = $("#EditMenuID").val().trim();
  $.ajax({
    type:"POST",
    url:"/PHP/editMenu.php",
    data:{
      ID : $("#EditMenuID").val().trim(),
      Name : $("#EditMenuName").val().trim(),
      Price : $("#EditMenuPrice").val().trim(),
      Desc : $("#EditMenuDesc").val().trim(),
    },
    dataType:"json",
    success: function(response){
      if(response.status == "success"){
        edituploadPic(MID);
        alert("Menu edited");
        showMenu();
      }
      if(response.status == 'database'){
        alert("database server error")
      }
    }
  })

}

function edituploadPic(ID){
  var filename = ID;
  var file_data = $("#editPic").prop('files')[0];
  var form_data = new FormData();
  form_data.append("file",file_data);
  form_data.append("filename",filename);
  $.ajax({
    type:"POST",
    url:"/PHP/uploadPic.php",
    cache : false,
    contentType: false,
    processData: false,
    data:
      form_data,
    success: function(response){
      if(response.status == "success"){
        alert("Picture success upload")
      }
      if(response.status == "type"){
        alert("Only accept jpg, jpeg and png")
      }
    }
  })
}

function adduploadPic(ID){
  var filename = ID;
  var file_data = $("#addPic").prop('files')[0];
  var form_data = new FormData();
  form_data.append("file",file_data);
  form_data.append("filename",filename);
  $.ajax({
    type:"POST",
    url:"/PHP/uploadPic.php",
    cache : false,
    contentType: false,
    processData: false,
    data:
      form_data,
    success: function(response){
      if(response.status == "success"){
        alert("Picture success upload")
      }
      if(response.status == "type"){
        alert("Only accept jpg, jpeg and png")
      }
    }
  })
}

//-----------------------Room Services Task----------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------
function RoomServicesPage(){
  var SID = $("#SID").html().trim();
  $.ajax({
    type: "GET",
    url: "/PHP/checksession.php",
    dataType:"json",
    success: function (response) {
      $("#SID").html(response.ID)
      $("#Name").html("Hello! "+response.Name+'<button class="btn btn-warning ms-3" onclick="logout()">Logout</button>')
      if(response.Type == 'Room_Services'){
        showRoomServices()
      }
      else{
        alert("Please Login to the correct account")
        logout('1');
      }
    },
    })

}
function roomServiceTemplate(StfID,RID,Task,Remark,Status,SerID){
  var SID = $("#SID").html().trim();
  if(Status == "Accepted" && StfID == SID){
    var html = `<div class="card col-xl-3 shadow" id="room-card">
    <div class="card-body text-center">
      <h3 class="card-title">Room NO: ${RID}</h3>
      <p class="card-text fw-bold fs-4">Status: ${Status}</p>
      <p class="card-text fw-bold fs-4">Task:</p>
      <p class="card-text fw-bold fs-4 text-primary">${Task}</p>
      <p class="card-text fw-bold fs-5">Remark:</p>
      <p class="card-text fw-bold fs-4 text-primary">${Remark}</p>
      <br>
      <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#InventoryModal" onclick = "InventoryUsageModal('${SerID}', '${Status}')">Done</button>
      </div>
    </div>`
   }
   if(Status == "Complete" && StfID == SID){
    var html = `<div class="card col-xl-3 shadow" id="room-card">
    <div class="card-body text-center">
      <h3 class="card-title">Room NO: ${RID}</h3>
      <p class="card-text fw-bold fs-4">Status: ${Status}</p>
      <p class="card-text fw-bold fs-4">Task:</p>
      <p class="card-text fw-bold fs-4 text-primary">${Task}</p>
      <p class="card-text fw-bold fs-5">Remark:</p>
      <p class="card-text fw-bold fs-4 text-primary">${Remark}</p>
      <br>
      </div>
    </div>`
   }
   if(Status == "Daily" && StfID == SID){
     var html = `<div class="card col-xl-3 shadow" id="room-card">
     <div class="card-body text-center">
       <h3 class="card-title">Floor: ${RID}</h3>
       <p class="card-text fw-bold fs-3">Task: </p>
       <p class="card-text fw-bold fs-3 text-primary">${Task}</p>
       <p class="card-text fw-bold fs-3">Status: </p>
       <p class="card-text fw-bold fs-3 text-primary">Daily</p>
       <br>
       <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#InventoryModal" onclick = "InventoryUsageModal('${SerID}', '${Status}')">Done</button>
       </div>
     </div>`
   }
   if(Status == "Daily_Complete" && StfID == SID){
    var html = `<div class="card col-xl-3 shadow" id="room-card">
    <div class="card-body text-center">
      <h3 class="card-title">Floor: ${RID}</h3>
      <p class="card-text fw-bold fs-3">Task: </p>
      <p class="card-text fw-bold fs-3 text-primary">${Task}</p>
      <p class="card-text fw-bold fs-3">Status: </p>
      <p class="card-text fw-bold fs-3 text-primary">Daily</p>
      <br>
      </div>
    </div>`
  }
   if(Status == "Pending"){
    var html = `<div class="card col-xl-3 shadow" id="room-card">
    <div class="card-body text-center">
      <h3 class="card-title">Room NO: ${RID}</h3>
      <p class="card-text fw-bold fs-4">Status: ${Status}</p>
      <p class="card-text fw-bold fs-4">Task:</p>
      <p class="card-text fw-bold fs-4 text-primary">${Task}</p>
      <p class="card-text fw-bold fs-5">Remark:</p>
      <p class="card-text fw-bold fs-4 text-primary">${Remark}</p>
      <br>
        <button class="btn btn-primary" onclick = "acceptTask('${SerID}')">Accept</button>
      </div>
    </div>`
   }
   return html
}
function showRoomServicesStatus(Status){
 
  $.ajax({
    type: "POST",
    url: "/PHP/getRoomSerbyStatus.php",
    data:{
      Stats: Status,
    },
    dataType:"json",
    success: function (response) {
      if(response.status == "database"){
        $("#roomServices").html("");
        $("#roomServices").addClass("alert alert-danger");
        $("#roomServices").append("<li>database error</li>");
      }
      if(response.status == "noRecord"){
        $("#roomServices").html("");
        $("#roomServices").addClass("alert alert-danger");
        $("#roomServices").append("<li>no record</li>");
      }
      else{
        $("#roomServices").removeClass("alert alert-danger");
        $("#roomServices").html("");
      $.each(response, function (key, room){
        
        
            $("#roomServices").append(roomServiceTemplate(room.StfID,room.RID,room.Task,room.Remark,room.Status,room.SerID));
        
       
      })
    }
  }
})
}

function showRoomServices(){
  $.ajax({
    type: "GET",
    url: "/PHP/getRoomServices.php",
    dataType:"json",
    success: function (response) {
      if(response.status == "database"){
        $("#roomServices").html("");
        $("#roomServices").addClass("alert alert-danger");
        $("#roomServices").append("<li>database error</li>");
      }
      if(response.status == "noRecord"){
        
        $("#roomServices").html("");
        $("#roomServices").addClass("alert alert-danger");
        $("#roomServices").append("<li>no record</li>");
      }
      else{
        $("#roomServices").removeClass("alert alert-danger");
        $("#roomServices").html("");
      $.each(response, function (key, room){
        
        $("#roomServices").append(roomServiceTemplate(room.StfID,room.RID,room.Task,room.Remark,room.Status,room.SerID));
        
       
      })
    }
  }
})
}

function TaskSearch(){
  var keyword = $("#SearchInput").val().trim()
  $.ajax({
    type: "POST",
    url: "/PHP/searchTask.php",
    data:{
      keyword: keyword,
    },
    dataType:"json",
    success: function (response) {
      if(response.status == "database"){
        $("#roomServices").html("");
        $("#roomServices").addClass("alert alert-danger");
        $("#roomServices").append("<li>database error</li>");
      }
      if(response.status == "noRecord"){
        
        $("#roomServices").html("");
        $("#roomServices").addClass("alert alert-danger");
        $("#roomServices").append("<li>no record</li>");
      }
      else{
        $("#roomServices").removeClass("alert alert-danger");
        $("#roomServices").html("");
      $.each(response, function (key, room){
        
        $("#roomServices").append(roomServiceTemplate(room.StfID,room.RID,room.Task,room.Remark,room.Status,room.SerID));
        
       
      })
    }
  }
})
}

function acceptTask(ID){
  var SID = $("#SID").html().trim()
  $.ajax({
    type:"POST",
    url:"/PHP/acceptTask.php",
    data:{
      ID : ID,
      SID : SID,
    },
    dataType:"json",
    success: function(response){
      if(response.status == "success"){
        showRoomServices()
        alert("Accept Task")
      }
      if(response.status == 'database'){
        alert("database server error")
      }
    }
  })
}

function InventoryUsageModal(ID,Status){
  $("#TaskID").val(ID);
  $("#Status").val(Status);
  showInventoryUsage();
}

function showInventoryUsage(){
  
  $.ajax({
    type: "GET",
    url: "/PHP/Inventorys.php",
    dataType:"json",
    success: function (response) {
      
      if(response.status == "database"){
        $("#MenuError").html("");
        $("#MenuError").addClass("alert alert-danger");
        $("#MenuError").append("<li>database error</li>");
      }
      if(response.status == "noRecord"){
        $("#MenuError").html("");
        $("#MenuError").addClass("alert alert-danger");
        $("#MenuError").append("<li>no record</li>");
      }
      else{
        $("#MenuError").removeClass("alert alert-danger");
        $("#MenuBookingRow").html("");
      $.each(response, function (key, room){
        
          var html = `<div class="card col-xl-3" id="room-card">
          <div class="card-body text-center">
            <h2 class="card-title">${room.InvName}</h2>
            <p class="card-text fw-bold fs-4">Current: ${room.S_Number}</p>
            <input class="form-text" type="text" id="InvUsage${room.InvID}" value="0"> <br>
              <button class="btn btn-primary mt-2" onclick="inventoryUsage('${room.InvID}','${room.S_Number}')" >Set</button>
            </div>
          </div>`
          
          
            $("#MenuBookingRow").append(html);
          
        
       
      })
    }
  }
})
}

function inventoryUsage(ID,Stock){
  var Usage = $("#InvUsage"+ID).val()
  $.ajax({
    type: "POST",
    url: "/PHP/InventoryUsage.php",
    data: {
      ID : ID,
      Stock : Stock,
      Usage : Usage,
    },
    dataType:"json",
    success: function (response) {
      showInventoryUsage()
      if(response.status == 'database'){
        alert("database server error")
      }
  }
})
}

function completeTask(){
    var ID = $("#TaskID").val().trim()
    var Status = $("#Status").val().trim()
    var SID = $("#SID").html().trim()
    $.ajax({
      type:"POST",
      url:"/PHP/completeTask.php",
      data:{
        ID : ID,
        Status : Status,
        SID : SID,
        
      },
      dataType:"json",
      success: function(response){
        if(response.status == "success"){
          showRoomServices()
          alert("Task Complete")
        }
        if(response.status == 'database'){
          alert("database server error")
        }
      }
    })
  }
//-----------------------Admin Room Page----------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------
function adminRoom(){
  $.ajax({
    type: "GET",
    url: "/PHP/checksession.php",
    dataType:"json",
    success: function (response) {
      $("#SID").html(response.ID)
      $("#Name").html("Hello! "+response.Name+'<button class="btn btn-warning ms-3" onclick="logout()">Logout</button>')
      if(response.Type == 'Admin'){
        adminFloorSelect();
        adminRoomShow();
        suitesSelect()
      }
      else{
        alert("Please Login to the correct account")
        logout('1');
      }
    },
    })
}

function adminFloorSelect(){
  $.ajax({
    type: "GET",
    url: "/PHP/floorSelect.php",
    dataType:"json",
    success: function (response) {
      
        $("#floorSelect").html("");
        $("#floorSelect").append("<option selected value = 'none'>Floor</option>");
        $.each(response, function (key, item){
          $("#floorSelect").append("<option value = "+item+">Floor "+item+"</option>");
        })
        
        
      
  }
});
}
function adminRoomTemplate(RID,Type,Cost,Status,Desc){
  var html =`<div class="card col-xl-3 shadow" id="room-card">
        <div class="card-body">
          <input type="checkbox" id="Rooms" value = "${RID}" class="form-check-input get_value">
          <div class="text-center">
          <h2 class="card-title">${RID}</h2>
          <p class="card-text fw-bold fs-4">Type:${Type}</p>
          <p class="card-text fw-bold fs-5">Price: ${Cost}</p>
          <p class="card-text fw-bold fs-5">${Status}</p>
          <p class="card-text fw-bold fs-5">Description:</p>
          <p class="card-text fw-bold fs-4 mb-2">${Desc}</p>
        </div>
            <button class="btn btn-primary float-end" data-bs-toggle="modal" data-bs-target="#DetailModal" onclick = "adminViewDetail('${RID}','${Status}')" >Details</button>
        </div>
      </div>`
      return html
}
function adminRoomShow(){
  $.ajax({
    type: "GET",
    url: "/PHP/Rooms.php",
    dataType:"json",
    success: function (response) {
      if(response.status == "database"){
        $("#room-place").html("");
        $("#room-place").addClass("alert alert-danger");
        $("#room-place").append("<li>database error</li>");
      }
      if(response.status == "noRecord"){
        $("#room-place").html("");
        $("#room-place").addClass("alert alert-danger");
        $("#room-place").append("<li>no record</li>");
      }
      else{
        $("#room-place").html("");
        $("#FloorSelect").removeClass("alert alert-danger");
      $.each(response, function (key, room){
        
          $("#room-place").append(adminRoomTemplate(room.RID,room.R_TYPE,room.R_Cost,room.R_Status,room.R_Desc));
        
      })
    }
  }
})
}

function getAdminRoomFloor(){
  var floor = $("#floorSelect").val().trim();
  if(floor == "none"){
    adminRoomShow();
  }
  else{
$.ajax({
  type: "POST",
  url: "/PHP/RoomsFloor.php",
  data:{
    FID: floor,
  },
  dataType:"json",
  success: function (response) {
    if(response.status == "database"){
      $("#room-place").html("");
      $("#room-place").addClass("alert alert-danger");
      $("#room-place").append("<li>database error</li>");
    }
    if(response.status == "noRecord"){
      $("#room-place").html("");
      $("#room-place").addClass("alert alert-danger");
      $("#room-place").append("<li>no record</li>");
    }
    else{
      $("#room-place").removeClass("alert alert-danger");
      $("#room-place").html("");
    $.each(response, function (key, room){
      $("#room-place").append(adminRoomTemplate(room.RID,room.R_TYPE,room.R_Cost,room.R_Status,room.R_Desc));
    })
  }
}
})
  }
}
function adminRoomSearch(){
  var keyword = $("#SearchInput").val().trim()
  $.ajax({
    type: "POST",
    url: "/PHP/searchRoom.php",
    data:{
      keyword: keyword,
    },
    dataType:"json",
    success: function (response) {
      if(response.status == "database"){
        $("#room-place").html("");
        $("#room-place").addClass("alert alert-danger");
        $("#room-place").append("<li>database error</li>");
      }
      if(response.status == "noRecord"){
        $("#room-place").html("");
        $("#room-place").addClass("alert alert-danger");
        $("#room-place").append("<li>no record</li>");
      }
      else{
        $("#room-place").removeClass("alert alert-danger");
        $("#room-place").html("");
        $.each(response, function (key, room){
          $("#room-place").append(adminRoomTemplate(room.RID,room.R_TYPE,room.R_Cost,room.R_Status,room.R_Desc));
        })
    }
  }
})
}

function adminViewDetail(RID,Status){
  $.ajax({
    type: "POST",
    url: "/PHP/Vdetails.php",
    data:{
      ID : RID,
      Rstatus : Status,
    },
    dataType:"json",
    success: function (response) {
      
     if(response.status == "database"){
       $("#DError").html("")
       $("#DError").addClass("alert alert-danger");
       $("#DError").append("<li>Database error</li>")
     }
     else{
      $("#DError").removeClass("alert alert-danger");
      $.each(response, function (key, room){
        $("#HRID").val(room.RID);
        $('#DRID').html("Room ID: "+room.RID)
        $('#DType').html("Type: "+room.R_TYPE)
        $('#DCost').html("Cost per night: "+room.R_Cost)
        $('#DStatus').html("Current Status: "+room.R_Status)

        if(room.R_Status == "checked-in"){
        $('#DCusName').html("Current Customer: "+room.CusName)
        $('#DCid').html("Check in Date: "+room.ChkinDate)
        $('#DPeriod').html("Period: "+room.Period)
        
        }
        else{
          $('#DCusName').html("Current Customer: None")
          $('#DCid').html("Check in Date: None")
          $('#DPeriod').html("Period: None")
        }
      })
       getBookingRecord(RID)
       roomStatistic(RID)
     }
    }
   })
 }

 

 function roomStatistic(ID){
  $.ajax({
    type: "POST",
    url: "/PHP/getGender.php",
    data:{
      ID : ID,
    },
    dataType:"json",
    success: function (response) {
      $("#Total").html("Customer This month: "+response.total)
      $("#Female").html("Female Customer This month: "+response.Female)
      $("#Male").html("Male Customer This month: "+response.Male)
      $("#profits").html("Total profits This month: "+response.profits)
    }
    })
   }

   function suitesSelect(){
    $.ajax({
      type: "GET",
      url: "/PHP/showSuites.php",
      dataType:"json",
      success: function (response) {
        
          $("#Suites").html("");
          $.each(response, function (key, item){
            $("#Suites").append("<option value = "+item.Name+">"+item.Name+"</option>");
          })
          
          
        
    }
  });
  }

  function showSuites(){
    $.ajax({
      type:"GET",
      url: "/PHP/showSuites.php",
      dataType:"json",
      success: function (response){
        
       if(response.status == "database"){
         $("#SuitesList").html("");
         $("#SuitesList").addClass("alert alert-danger");
         $("#SuitesList").append("<li>database error</li>");
       }
       if(response.status == "noRecord"){
         $("#SuitesList").html("");
         $("#SuitesList").addClass("alert alert-danger");
         $("#SuitesList").append("<li>no record</li>");
       }
       else{
         $("#SuitesList").html("");
         $("#SuitesList").removeClass("alert alert-danger");
         $.each(response, function (key, room){

            var html = `<div class="card col-11" id="room-card">
            <div class="card-body">
              <div class="row">
              <p class="h3 col-6">Roles: ${room.Name}</p>
              <button class="btn btn-primary col-2 ms-5" data-bs-toggle="modal" data-bs-target="#editSuitesModal" onclick ="editSuitesModal('${room.Name}','${room.Cost}','${room.Desc}')">Edit</button>
              </div>
              <div class="row mt-2">
              <p class="h3 col-6">Prefix: ${room.Cost}</p>
                <button class="btn btn-danger col-2 ms-5" onclick = "deleteSuites('${room.Name}')">Delete</button>
              </div>
              <p class="h3 col-6">Desc:</p>
                <p class="card-text fw-bold fs-4">${room.Desc}</p>
            </div>
            </div>`
          
     $("#SuitesList").append(html);
         })
   }
      }
    })
    
  }

  function addSuitesModal(){
    $("#SuitesName").val("");
    $("#SuitesCost").val("");
    $("#SuitesDesc").val("");
    $("#SuitesbuttonArea").html("");
    var button = `<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
         <button type="button" class="btn btn-primary"  onclick= "addSuites()" >Confirm</button>`;
         $("#SuitesbuttonArea").append(button);
  }

  function addSuites(){
   var Name =  $("#SuitesName").val().trim();
   var Cost = $("#SuitesCost").val().trim();
   var Desc =  $("#SuitesDesc").val().trim();
   if(Name == "" || Cost == "" || Desc == ""){
     alert("Make sure you keyin all the info!")
   }
   else{
    $.ajax({
      type: "POST",
      url: "/PHP/addSuites.php",
      data:{
        Name: Name,
        Cost: Cost,
        Desc: Desc,
      },
      dataType:"json",
      success: function (response) {
        if(response.status == 'success'){
          alert("New Suites added")
          $("#SuitesModal").modal("toggle")
          $("#editSuitesModal").modal("toggle")
          showSuites();
          suitesSelect();
        }
        if(response.status == 'database'){
          alert("database server error")
        }
      }
    })
   }
  }

  function editSuitesModal(Name,Cost,Desc){
    $("#SuitesName").val(Name);
    $("#SuitesCost").val(Cost);
    $("#SuitesDesc").val(Desc);
    $("#SuitesbuttonArea").html("");
    var button = `<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
         <button type="button" class="btn btn-primary"  onclick= "editSuites()" >Confirm</button>`;
         $("#SuitesbuttonArea").append(button);
  }

  function editSuites(){
    var Name =  $("#SuitesName").val().trim();
    var Cost = $("#SuitesCost").val().trim();
    var Desc =  $("#SuitesDesc").val().trim();

     $.ajax({
       type: "POST",
       url: "/PHP/editSuites.php",
       data:{
         Name: Name,
         Cost: Cost,
         Desc: Desc,
       },
       dataType:"json",
       success: function (response) {
         if(response.status == 'success'){
         alert("Suites Edited! Please reconfig your room's type if you change the type name")
         $("#SuitesModal").modal("toggle")
         $("#editSuitesModal").modal("toggle")
         showSuites();
         }
         if(response.status == 'database'){
          alert("database server error")
        }
       }
     })
   }

   function deleteSuites(Name){
    if(confirm("Are you sure you want to delete this?"))
    {
    $.ajax({
      type: "POST",
      url: "/PHP/deleteSuites.php",
      data:{
        Name: Name,
      },
      dataType:"json",
      success: function (response) {
        if(response.status == 'success'){
        alert("Suites Deleted! Please reconfig your room's type")
        showSuites();
        suitesSelect();
        }
        if(response.status == 'database'){
          alert("database server error")
        }
      }
    })
  }
   }

   function addRoom(){
     var FloorNumber = $("#FloorNumber").val().trim();
     var RoomNumber = $("#RoomNumber").val().trim();
     if(FloorNumber == "" || RoomNumber == ""){
       alert("Please key in the Floor and Room number you wish to add.")
     }
     $.ajax({
       type: "POST",
       url: "/PHP/addRoom.php",
       data:{
         Floor : FloorNumber,
         Room : RoomNumber,
       },
       dataType: "json",
       success: function(response){
         if(response.status == 'success'){
        adminRoomShow();
        adminFloorSelect()
        alert("Room and floor created")
         }
        if(response.status == 'database'){
          alert("database server error")
        }
       }
     })
   }

  function setRoomSuites(){
    var Type = $("#Suites").val()
    var Rooms = [];
    $(".get_value").each(function(){
      if($(this).is(":checked"))
      {
        Rooms.push($(this).val());
      }
    })
    $.ajax({
      type: "POST",
      url: "/PHP/setRoom.php",
      data:{
        Type : Type,
        Rooms : Rooms,
      },
      dataType: "json",
      success: function(response){
        var error
        var errorid
        $.each(response, function (key, room){
          if(room.status == 'database'){
            error = '1';
            errorid = room.ID;
          }
        })
       if(error == '1'){
        alert("Please check your network and "+errorid+" must be idle")
        adminRoomShow();
      }
       else{
        alert("Room Type Change")
        adminRoomShow();
       }
       
      }
    })
  }

  function disableRoom(){
    var Type = "Unavailable"
    var Rooms = [];
    $(".get_value").each(function(){
      if($(this).is(":checked"))
      {
        Rooms.push($(this).val());
      }
    })
    $.ajax({
      type: "POST",
      url: "/PHP/disableRoom.php",
      data:{
        Type : Type,
        Rooms : Rooms,
      },
      dataType: "json",
      success: function(response){
        var error
        var errorid
        $.each(response, function (key, room){
          if(room.status == 'database'){
            error = '1';
            errorid = room.ID;
          }
        })
       if(error == '1'){
        alert("Please check your network and "+errorid+" must be idle")
        adminRoomShow();
      }
       else{
        alert("Room Type Change")
        adminRoomShow();
       }
       
      }
    })
  }
//-----------------------Admin Staff Page----------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------
function adminStaff(){
  $.ajax({
    type: "GET",
    url: "/PHP/checksession.php",
    dataType:"json",
    success: function (response) {
      $("#SID").html(response.ID)
      $("#Name").html("Hello! "+response.Name+'<button class="btn btn-warning ms-3" onclick="logout()">Logout</button>')
      if(response.Type == 'Admin'){
        showStaff();
      }
      else{
        alert("Please Login to the correct account")
        logout('1');
      }
    },
    })
 
    }
  
    function showStaff(){
      $.ajax({
        type:"GET",
        url: "/PHP/showStaff.php",
        dataType:"json",
        success: function (response){
          
         if(response.status == "database"){
           $("#normal-bar").html("");
           $("#normal-bar").addClass("alert alert-danger");
           $("#normal-bar").append("<li>database error</li>");
         }
         if(response.status == "noRecord"){
           $("#normal-bar").html("");
           $("#normal-bar").addClass("alert alert-danger");
           $("#normal-bar").append("<li>no record</li>");
         }
         else{
           $("#normal-bar").html("");
           $("#normal-bar").removeClass("alert alert-danger");
           $.each(response, function (key, room){
           var html = `<div class="card col-xl-12 shadow" id="room-card">
           <div class="card-body">
             <div class="row">
                 <p class="h3 col-4">Staff ID: ${room.SID}</p>
                 <p class="h3 col-4">Position: ${room.Position}</p>
                 <button class="btn btn-danger col-2" onclick= "deleteStaff('${room.SID}')">Delete</button>
             </div>
             <div class="row mt-2">
               <p class="h3 col-4">Name : ${room.Name}</p>
               <p class="h3 col-4">Status: ${room.status}</p>
               <button class="btn btn-primary col-2" data-bs-toggle="modal" data-bs-target="#StaffModal" onclick="editStaffModal('${room.SID}','${room.Position}','${room.Name}')">Edit</button>
             </div>
             <div class="row mt-2 ms-1">
             <button class="btn btn-warning col-2 mt-2" onclick="ForgotPass('${room.SID}')">Forgot Password</button>
             </div>
           </div>
           </div>`
       $("#normal-bar").append(html);
           })
     }
        }
      })
    }
    function adminStaffSearch(){
      var keyword = $("#SearchInput").val().trim()
      $.ajax({
        type: "POST",
        url: "/PHP/searchStaff.php",
        data:{
          keyword: keyword,
        },
        dataType:"json",
        success: function (response) {
          if(response.status == "database"){
            $("#normal-bar").html("");
            $("#normal-bar").addClass("alert alert-danger");
            $("#normal-bar").append("<li>database error</li>");
          }
          if(response.status == "noRecord"){
            $("#normal-bar").html("");
            $("#normal-bar").addClass("alert alert-danger");
            $("#normal-bar").append("<li>no record</li>");
          }
          else{
            $("#normal-bar").html("");
            $("#normal-bar").removeClass("alert alert-danger");
            $.each(response, function (key, room){
            var html = `<div class="card col-xl-12 shadow" id="room-card">
            <div class="card-body">
              <div class="row">
                  <p class="h3 col-4">Staff ID: ${room.SID}</p>
                  <p class="h3 col-4">Position: ${room.Position}</p>
                  <button class="btn btn-danger col-2" onclick= "deleteStaff('${room.SID}')">Delete</button>
              </div>
              <div class="row mt-2">
                <p class="h3 col-4">Name : ${room.Name}</p>
                <p class="h3 col-4">Status: ${room.status}</p>
                <button class="btn btn-primary col-2" data-bs-toggle="modal" data-bs-target="#StaffModal" onclick="editStaffModal('${room.SID}','${room.Position}','${room.Name}')">Edit</button>
              </div>
              <div class="row mt-2">
              <button class="btn btn-warning col-2 mt-2 align-self-end" onclick="ForgotPass('${room.SID}')">Forgot Password</button>
              </div>
            </div>
            </div>`
        $("#normal-bar").append(html);
            })
      }
      }
    })
    }
  
    function showRoles(){
      $.ajax({
        type:"GET",
        url: "/PHP/showRoles.php",
        dataType:"json",
        success: function (response){
          
         if(response.status == "database"){
           $("#RoleList").html("");
           $("#RoleList").addClass("alert alert-danger");
           $("#RoleList").append("<li>database error</li>");
         }
         if(response.status == "noRecord"){
           $("#RoleList").html("");
           $("#RoleList").addClass("alert alert-danger");
           $("#RoleList").append("<li>no record</li>");
         }
         else{
           $("#RoleList").html("");
           $("#RoleList").removeClass("alert alert-danger");
           $.each(response, function (key, room){
             if(room.Name == "Admin"){
              var html = `<div class="card col-11 shadow" id="room-card">
              <div class="card-body">
                <div class="row">
                    <p class="h3 col-6">Roles: ${room.Name}</p>
                    <button class="btn btn-primary col-2 ms-5" data-bs-toggle="modal" data-bs-target="#editRolesModal" onclick ="editRolesModal('${room.Name}','${room.Prefix}')">Edit</button>
                </div>
                <div class="row mt-2">
                  <p class="h3 col-6">Prefix: ${room.Prefix}</p>
                  
                </div>
              </div>
              </div>`
             }
            else{
              var html = `<div class="card col-11 shadow" id="room-card">
              <div class="card-body">
                <div class="row">
                <p class="h3 col-6">Roles: ${room.Name}</p>
                <button class="btn btn-primary col-2 ms-5" data-bs-toggle="modal" data-bs-target="#editRolesModal" onclick ="editRolesModal('${room.Name}','${room.Prefix}')">Edit</button>
                </div>
                <div class="row mt-2">
                <p class="h3 col-6">Prefix: ${room.Prefix}</p>
                  <button class="btn btn-danger col-2 ms-5" onclick = "deleteRoles('${room.Name}')">Delete</button>
                </div>
              </div>
              </div>`
            }
       $("#RoleList").append(html);
           })
     }
        }
      })
      
    }
  
    function addStaffModal(){
      $("#PassName").html("")
      $("#PassPosition").html("")
      $("#PassPass").html("")
      $("#PassID").html("")
      $("#StaffName").val("");
      $("#StaffbuttonArea").html("");
      $("#positionSelect").html("");
      $.ajax({
        type:"GET",
        url: "/PHP/showRoles.php",
        dataType:"json",
        success: function (response){
           $.each(response, function (key, room){
       var html = `<option value = "${room.Name}">${room.Name}</option>`
       $("#positionSelect").append(html);
           })
           var button = `<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
           <button type="button" class="btn btn-primary"  onclick= "addStaff()" >Confirm</button>`;
           $("#StaffbuttonArea").append(button);
        }
      })
    }
  
    function addStaff(){
      if($("#StaffName").val().trim() == "" ){
        alert("Please key in the name!")
      }
      else{
        var Name = $("#StaffName").val().trim();
        var Position = $("#positionSelect").val().trim();
      $.ajax({
        type: "POST",
        url: "/PHP/addStaff.php",
        data:{
          Name: Name,
          Position: Position,
        },
        dataType:"json",
        success: function (response) {
          if(response.status == 'success'){
          $("#PassModal").modal("toggle");
          $("#StaffModal").modal("toggle");
            $("#PassName").html("Staff Name: "+Name)
            $("#PassPosition").html("Staff Position: "+Position)
            $("#PassPass").html("Password: "+response.Pass)
            $("#PassID").html("Password: "+response.ID)
           showStaff();
          }
           if(response.status == 'database'){
            alert("database server error")
          }
        }
    })
  }
    }
  
    function editStaffModal(ID,Position,Name){
      $("#StaffName").val(Name);
      $("#StaffID").val(ID);
      $("#StaffbuttonArea").html("");
      $.ajax({
        type:"GET",
        url: "/PHP/showRoles.php",
        dataType:"json",
        success: function (response){
           $.each(response, function (key, room){
             if(room.Name == Position){
              var html = `<option value = "${room.Name}" selected>${room.Name}</option>`
             }
            else{
              var html = `<option value = "${room.Name}">${room.Name}</option>`
            }
       
       $("#positionSelect").append(html);
           })
           var button = `<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
           <button type="button" class="btn btn-primary"  onclick= "editStaff()" >Confirm</button>`;
           $("#StaffbuttonArea").append(button);
           
        }
      })
    }
  
    function editStaff(){
      $("#PassName").html("")
      $("#PassPosition").html("")
      $("#PassPass").html("")
      $("#PassID").html("")
      var Name = $("#StaffName").val().trim();
      var Position = $("#positionSelect").val().trim();
      var ID = $("#StaffID").val().trim();
      $.ajax({
        type: "POST",
        url: "/PHP/editStaff.php",
        data:{
          ID: ID,
          Name: Name,
          Position: Position,
        },
        dataType:"json",
        success: function (response) {
          if(response.status == 'success'){
          $("#PassModal").modal("toggle");
          $("#StaffModal").modal("toggle");
            $("#PassName").html("Staff Name: "+Name)
            $("#PassPosition").html("Staff Position: "+Position)
            $("#PassID").html("Staff ID: "+response.ID)
           showStaff();
          }
           if(response.status == 'database'){
            alert("database server error")
          }
        }
    })
  }
    
  function deleteStaff(ID){
    if(confirm("Are you sure you want to delete this?"))
    {
      $.ajax({
        type: "POST",
        url: "/PHP/deleteStaff.php",
        data:{
          ID: ID,
        },
        dataType:"json",
        success: function (response) {
          if(response.status == 'success'){
          alert("Delete Success")
           showStaff();
          }
           if(response.status == 'database'){
            alert("database server error")
          }
        }
    })
  }
  }
  
  function ForgotPass(ID){
    $("#PassName").html("")
    $("#PassPosition").html("")
    if(confirm("Are you sure you want to reset password?"))
    {
      $.ajax({
        type: "POST",
        url: "/PHP/resetPass.php",
        data:{
          ID: ID,
        },
        dataType:"json",
        success: function (response) {
          if(response.status == 'success'){
          $("#PassModal").modal("toggle");
          $("#PassPass").html("Password: "+response.ID)
            $("#PassID").html("Staff ID: "+ID)
           showStaff();
          }
           if(response.status == 'database'){
            alert("database server error")
          }
        }
    })
    }  
  }
  
  
  
  function addRoles(){
    if($("#RolesPrefix").val().trim() == "" ){
      alert("Please key in the Prefix!")
    }
    else{
      var Name = $("#RolesName").val().trim();
      var Prefix = $("#RolesPrefix").val().trim();
    $.ajax({
      type: "POST",
      url: "/PHP/addRoles.php",
      data:{
        Name: Name,
        Prefix: Prefix,
      },
      dataType:"json",
      success: function (response) {
        if(response.status == 'success'){
         showRoles();
        alert("Roles Created");
        $("#AddRolesModal").modal("toggle")
        $("#RolesModal").modal("toggle")
        }
        if(response.status == 'database'){
          alert("database server error")
        }
      }
  })
  }
  }
  
  function editRolesModal(Name,Prefix){
  $("#editRolesName").val(Name);
  $("#editRolesPrefix").val(Prefix);
  }
  
  function editRoles(){
    var Name = $("#editRolesName").val().trim();
    var Prefix = $("#editRolesPrefix").val().trim();
    $.ajax({
      type: "POST",
      url: "/PHP/editRoles.php",
      data:{
        Name: Name,
        Prefix: Prefix,
      },
      dataType:"json",
      success: function (response) {
        if(response.status == 'success'){
        showRoles();
        alert("Roles edited");
        }
        if(response.status == 'database'){
          alert("database server error")
        }
      }
  })
  }
  
  function deleteRoles(Name){
    if(confirm("Are you sure you want to delete this?"))
    {
    $.ajax({
      type: "POST",
      url: "/PHP/deleteRoles.php",
      data:{
        Name: Name,
      },
      dataType:"json",
      success: function (response) {
        if(response.status == 'success'){
        alert("Delete Success")
         showRoles();
        }
         if(response.status == 'database'){
          alert("database server error")
        }
      }
  })
}
  }
  
  function addRolesModal(){
    $("#RolesPrefix").val("");
    $("#RolesbuttonArea").html("");
    $("#RolesSelection").html("");
     var html = `<select class="form-select" id="RolesName">
     <option value="Front_Desk">Front Desk</option>
     <option value="Room_Services">Room Services</option>
     <option value="Kitchen">Kitchen</option>
     <option value="Inventory">Inventory</option>
   </select>`
     $("#RolesSelection").append(html);
         var button = `<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
         <button type="button" class="btn btn-primary"  onclick= "addRoles()" >Confirm</button>`;
         $("#RolesbuttonArea").append(button);
      
  }
  
//-----------------------Admin Task Page----------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------
function adminTask(){
  $.ajax({
    type: "GET",
    url: "/PHP/checksession.php",
    dataType:"json",
    success: function (response) {
      $("#SID").html(response.ID)
      $("#Name").html("Hello! "+response.Name+'<button class="btn btn-warning ms-3" onclick="logout()">Logout</button>')
      if(response.Type == 'Admin'){
        showAdminTask();
      }
      else{
        alert("Please Login to the correct account")
        logout('1');
      }
    },
    })
  
}
function adminTaskTemplate(RID,Status,StfID,Task,Remark){
  if(Status == "Daily"){
    var html = `<div class="card col-xl-3 shadow" id="room-card">
    <div class="card-body text-center">
      <h3 class="card-title">Floor: ${RID}</h3>
      <p class="card-text fw-bold fs-4">Status: ${Status}</p>
      <p class="card-text fw-bold fs-4">Staff: ${StfID}</p>
      <p class="card-text fw-bold fs-4">Task:</p>
      <p class="card-text fw-bold fs-4 text-primary">${Task}</p>
      <p class="card-text fw-bold fs-5">Remark:</p>
      <p class="card-text fw-bold fs-4 text-primary">${Remark}</p>
      </div>
    </div>`
   
  }
  else{
    var html = `<div class="card col-xl-3" id="room-card">
    <div class="card-body text-center">
      <h3 class="card-title">Room NO: ${RID}</h3>
      <p class="card-text fw-bold fs-4">Status: ${Status}</p>
      <p class="card-text fw-bold fs-4">Staff: ${StfID}</p>
      <p class="card-text fw-bold fs-4">Task:</p>
      <p class="card-text fw-bold fs-4 text-primary">${Task}</p>
      <p class="card-text fw-bold fs-5">Remark:</p>
      <p class="card-text fw-bold fs-4 text-primary">${Remark}</p>
      </div>
    </div>`
  }
  return html
}
function showAdminTask(){
  $.ajax({
    type: "GET",
    url: "/PHP/getRoomServices.php",
    dataType:"json",
    success: function (response) {
      if(response.status == "database"){
        $("#roomServices").html("");
        $("#roomServices").addClass("alert alert-danger");
        $("#roomServices").append("<li>database error</li>");
      }
      if(response.status == "noRecord"){
        
        $("#roomServices").html("");
        $("#roomServices").addClass("alert alert-danger");
        $("#roomServices").append("<li>no record</li>");
      }
      else{
        $("#roomServices").removeClass("alert alert-danger");
        $("#roomServices").html("");
      $.each(response, function (key, room){
        
        
          
         
            $("#roomServices").append(adminTaskTemplate(room.RID,room.Status,room.StfID,room.Task,room.Remark));
          
        
       
      })
    }
  }
})
}

function adminTaskSearch(){
  var keyword = $("#SearchInput").val().trim()
  $.ajax({
    type: "POST",
    url: "/PHP/searchTask.php",
    data:{
      keyword: keyword,
    },
    dataType:"json",
    success: function (response) {
      if(response.status == "database"){
        $("#roomServices").html("");
        $("#roomServices").addClass("alert alert-danger");
        $("#roomServices").append("<li>database error</li>");
      }
      if(response.status == "noRecord"){
        
        $("#roomServices").html("");
        $("#roomServices").addClass("alert alert-danger");
        $("#roomServices").append("<li>no record</li>");
      }
      else{
        $("#roomServices").removeClass("alert alert-danger");
        $("#roomServices").html("");
      $.each(response, function (key, room){
        
        $("#roomServices").append(adminTaskTemplate(room.RID,room.Status,room.StfID,room.Task,room.Remark));
        
       
      })
    }
  }
})
}

function showAdminTaskStatus(Status){
  $.ajax({
    type: "POST",
    url: "/PHP/getRoomSerbyStatus.php",
    data:{
      Stats: Status,
    },
    dataType:"json",
    success: function (response) {
      if(response.status == "database"){
        $("#roomServices").html("");
        $("#roomServices").addClass("alert alert-danger");
        $("#roomServices").append("<li>database error</li>");
      }
      if(response.status == "noRecord"){
        $("#roomServices").html("");
        $("#roomServices").addClass("alert alert-danger");
        $("#roomServices").append("<li>no record</li>");
      }
      else{
        $("#roomServices").removeClass("alert alert-danger");
        $("#roomServices").html("");
      $.each(response, function (key, room){
        
        $("#roomServices").append(adminTaskTemplate(room.RID,room.Status,room.StfID,room.Task,room.Remark));
        
       
      })
    }
  }
})
}

function showDailyStaff(){
  $("#DailyStaffModal").modal("toggle");
  $.ajax({
    type:"GET",
    url: "/PHP/showStaff.php",
    dataType:"json",
    success: function (response){
      
     if(response.status == "database"){
       $("#StaffSelection").html("");
       $("#MenuError").addClass("alert alert-danger");
       $("#MenuError").append("<li>database error</li>");
     }
     if(response.status == "noRecord"){
       $("#StaffSelection").html("");
       $("#MenuError").addClass("alert alert-danger");
       $("#MenuError").append("<li>no record</li>");
     }
     else{
       $("#MenuError").html("");
       $("#StaffSelection").html("");
       $("#MenuError").removeClass("alert alert-danger");
       $.each(response, function (key, room){
         var Name = encodeURI(room.Name)
        if(room.Position == "Room_Services" && room.status == "On Duty"){
          var html = `<div class="card col-xl-3 text-center" id="room-card">
       <div class="card-body">
       <h2 class="card-title">${room.SID}</h2>
       <p class="card-text fw-bold fs-4">Staff Name: ${room.Name}</p>
       <p class="card-text fw-bold fs-4">${room.status}</p>
       <div class="dropdown" id="moreOption">
         <button class="btn btn-primary ms-auto" onclick=selectStaff('${room.SID}','${Name}') >Select</button>
       </div>
     </div>
   </div>`

   $("#StaffSelection").append(html);
        }
       
       })
 }
    }
  })
}

function selectStaff(ID,Name){
  var SName = decodeURI(Name)
  $("#DailyStaffSelect").val(ID);
  $("#DailyStaffSelect").html(SName);
  alert("Staff Selected. "+SName)
 }

function addDaily(){
  var ID = $("#DailyStaffSelect").val().trim()
  if(ID == ""){
    alert("Please Select a staff for assign Daily Task")
  }
  else{
    $.ajax({
      type: "POST",
      url: "/PHP/addDaily.php",
      data:{
        ID: ID,
        floor: $("#floorSelect").val().trim(),
        Task: $("#DailyInfo").val().trim(),

      },
      dataType:"json",
      success: function (response) {
        if(response.status == 'success'){
        $("#DailyModal").modal("toggle");
         showAdminTask();
         alert("Daily Task Created")
        }
         if(response.status == 'database'){
          alert("database server error")
        }
      }
  })
  }
}
//-----------------------Admin Kitchen Page----------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------

function adminKitchen(){
  $.ajax({
    type: "GET",
    url: "/PHP/checksession.php",
    dataType:"json",
    success: function (response) {
      $("#SID").html(response.ID)
      $("#Name").html("Hello! "+response.Name+'<button class="btn btn-warning ms-3" onclick="logout()">Logout</button>')
      if(response.Type == 'Admin'){
        showAdminKitchen()
      }
      else{
        alert("Please Login to the correct account")
        logout('1');
      }
    },
    })
  
}

function showAdminKitchen(){
  $.ajax({
    type:"GET",
    url: "/PHP/showMeal.php",
    dataType:"json",
    success: function (response){
      
     if(response.status == "database"){
       $("#Kitchen").html("");
       $("#Kitchen").addClass("alert alert-danger");
       $("#Kitchen").append("<li>database error</li>");
     }
     if(response.status == "noRecord"){
       $("#Kitchen").html("");
       $("#Kitchen").addClass("alert alert-danger");
       $("#Kitchen").append("<li>no record</li>");
     }
     else{
       $("#Kitchen").html("");
       $("#Kitchen").removeClass("alert alert-danger");
       $.each(response, function (key, room){
       var html = `<div class="card col-xl-3 text-center shadow" id="room-card">
       <div class="card-img-top text-center my-3"><img src="Menu/${room.MID}.jpg" class="img-thumbnail" loading="lazy"></div>
       <div class="card-body">
       <h2 class="card-title">${room.M_Name}</h2>
       <p class="card-text fw-bold fs-4">Price: ${room.cost}</p>
       <p class="card-text fw-bold fs-4">${room.Desc}</p>
       <div class="dropdown" id="moreOption">
        <button class="btn btn-primary ms-auto" data-bs-toggle="modal" data-bs-target="#MenuDetailsModal" onclick= "MenuDetails('${room.MID}','${room.M_Name}','${room.cost}','${room.Desc}')" >View Details</button>
       </div>
     </div>
   </div>`
   $("#Kitchen").append(html);
       })
 }
    }
  })
 
}
function adminKitchenSearch(){
  var keyword = $("#SearchInput").val().trim()
  $.ajax({
    type: "POST",
    url: "/PHP/searchMenu.php",
    data:{
      keyword: keyword,
    },
    dataType:"json",
    success: function (response) {
      if(response.status == "database"){
        $("#Kitchen").html("");
        $("#Kitchen").addClass("alert alert-danger");
        $("#Kitchen").append("<li>database error</li>");
      }
      if(response.status == "noRecord"){
        $("#Kitchen").html("");
        $("#Kitchen").addClass("alert alert-danger");
        $("#Kitchen").append("<li>no record</li>");
      }
      else{
        $("#Kitchen").html("");
        $("#Kitchen").removeClass("alert alert-danger");
        $.each(response, function (key, room){
        var html = `<div class="card col-xl-3 text-center shadow" id="room-card">
        <div class="card-img-top text-center my-3"><img src="Menu/${room.MID}.jpg" class="img-thumbnail" loading="lazy"></div>
        <div class="card-body">
        <h2 class="card-title">${room.M_Name}</h2>
        <p class="card-text fw-bold fs-4">Price: ${room.cost}</p>
        <p class="card-text fw-bold fs-4">${room.Desc}</p>
        <div class="dropdown" id="moreOption">
         <button class="btn btn-primary ms-auto" data-bs-toggle="modal" data-bs-target="#MenuDetailsModal" onclick= "MenuDetails('${room.MID}','${room.M_Name}','${room.cost}','${room.Desc}')" >View Details</button>
        </div>
      </div>
    </div>`
    $("#Kitchen").append(html);
        })
  }
  }
})
}

function MenuDetails(ID,Name,Price,Description){
  $("#MenuName").val(Name);
  $("#MenuPrice").val(Price);
  $("#MenuDesc").val(Description);
  $("#MenuID").val(ID);
  $.ajax({
    type: "POST",
    url: "/PHP/getMenuStatistic.php",
    data:{
      ID : ID,
    },
    dataType:"json",
    success: function (response) {
      $("#Order").html("Total order This month: "+response.Number)
      $("#Profits").html("Total profits This month: "+response.profits)
    }
    })
   }
//-----------------------Admin Inventory Page----------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------
function adminInventory(){
  $.ajax({
    type: "GET",
    url: "/PHP/checksession.php",
    dataType:"json",
    success: function (response) {
      $("#SID").html(response.ID)
      $("#Name").html("Hello! "+response.Name+'<button class="btn btn-warning ms-3" onclick="logout()">Logout</button>')
      if(response.Type == 'Admin'){
        showAdminInventory();
      }
      else{
        alert("Please Login to the correct account")
        logout('1');
      }
    },
    })
  
}

function showAdminInventory(){
  $.ajax({
    type: "GET",
    url: "/PHP/Inventorys.php",
    dataType:"json",
    success: function (response) {
      
      if(response.status == "database"){
        $("#Warning-bar").html("");
        $("#Warning-bar").addClass("alert alert-danger");
        $("#Warning-bar").append("<li>database error</li>");
      }
      if(response.status == "noRecord"){
        $("#Warning-bar").html("");
        $("#Warning-bar").addClass("alert alert-danger");
        $("#Warning-bar").append("<li>no record</li>");
      }
      else{
        $("#Warning-bar").removeClass("alert alert-danger");
        $("#Warning-bar").html("");
        $("#normal-bar").html("");
      $.each(response, function (key, room){
        
          var html = `<div class="card col-xl-3 shadow" id="room-card">
          <div class="card-body text-center">
            <h2 class="card-title">${room.InvName}</h2>
            <p class="card-text fw-bold fs-4">Current: ${room.S_Number}</p>
            <p class="card-text fw-bold fs-5">Warning: ${room.W_Number}</p>
              <button class="btn btn-primary" onclick="showResupply('${room.InvID}','${room.InvName}','${room.W_Number}')" data-bs-toggle="modal" data-bs-target="#ReSupModal">Set Warning Bar</button>
            </div>
          </div>`
          
            $("#normal-bar").append(html);
          
        
       
      })
    }
  }
})
}

function adminInventorySearch(){
  var keyword = $("#SearchInput").val().trim()
  $.ajax({
    type: "POST",
    url: "/PHP/searchInv.php",
    data:{
      keyword: keyword,
    },
    dataType:"json",
    success: function (response) {
      if(response.status == "database"){
        $("#Warning-bar").html("");
        $("#Warning-bar").addClass("alert alert-danger");
        $("#Warning-bar").append("<li>database error</li>");
      }
      if(response.status == "noRecord"){
        $("#Warning-bar").html("");
        $("#Warning-bar").addClass("alert alert-danger");
        $("#Warning-bar").append("<li>no record</li>");
      }
      else{
        $("#Warning-bar").removeClass("alert alert-danger");
        $("#Warning-bar").html("");
        $("#normal-bar").html("");
        $.each(response, function (key, room){
        
          var html = `<div class="card col-xl-3 shadow" id="room-card">
          <div class="card-body text-center">
            <h2 class="card-title">${room.InvName}</h2>
            <p class="card-text fw-bold fs-4">Current: ${room.S_Number}</p>
            <p class="card-text fw-bold fs-5">Warning: ${room.W_Number}</p>
            <button class="btn btn-primary" onclick="showResupply('${room.InvID}','${room.InvName}','${room.W_Number}')" data-bs-toggle="modal" data-bs-target="#ReSupModal">Set Warning Bar</button>
            </div>
          </div>`
            $("#normal-bar").append(html);
        
       
      })
    }
  }
})
}

function setWarning(){
  $.ajax({
    type:"POST",
    url:"/PHP/setWarning.php",
    data:{
      ID : $("#ReSupID").val().trim(),
      Stock: $("#ReSupStock").val().trim(),
      Supply: $("#ReSupNewStock").val().trim(),
    },
    dataType:"json",
    success: function(response){
      if(response.status == "success"){
        showAdminInventory()
        alert("Warning Bar set success")
      }
      if(response.status == 'database'){
        alert("database server error")
      }
    }
  })
}

//-----------------------Admin Statistic Page----------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------
function checkAdmin(){
  $.ajax({
    type: "GET",
    url: "/PHP/checksession.php",
    dataType:"json",
    success: function (response) {
      $("#SID").html(response.ID)
      $("#Name").html("Hello! "+response.Name+'<button class="btn btn-warning ms-3" onclick="logout()">Logout</button>')
      if(response.Type == 'Admin'){

      }
      else{
        alert("Please Login to the correct account")
        logout('1');
      }
    },
    })
}

function getMenuGraph(){
  $("#GraphModal").modal("toggle");
  $('#myChart').replaceWith($('<canvas id="myChart" class="w-100"></canvas>'));
  var ID = $("#MenuID").val();
  var count = [];
  var months = [];
  var profits = [];
  $.ajax({
   type: "POST",
   url: "/PHP/menuGraph.php",
   data:{
     ID : ID,
   },
   dataType: "json",
   success: function(response){
     $.each(response, function (key, room){
       count.push(room.count)
       months.push(room.months)
       profits.push(room.profits)
     })
 const ctx = document.getElementById('myChart');
 const myChart = new Chart(ctx, {
     type: 'bar',
     data: {
         labels: months ,
         datasets: [{
             label: 'Order Number',
             data: count ,
             backgroundColor: 'red',
             borderColor: 'red',
             borderWidth: 4
         },
         {
           label: 'Profits',
           data: profits ,
           backgroundColor: 'blue',
           borderColor: 'blue',
           borderWidth: 4
       }
       ]
     },
     options: {
         scales: {
             y: {
                 beginAtZero: true
             }
         }
     }
 });
   }
 })
   }
 
   function getRoomGraph(){
     $("#GraphModal").modal("toggle");
     $('#myChart').replaceWith($('<canvas id="myChart" class="w-100"></canvas>'));
     var ID = $("#HRID").val();
     var male = [];
     var female = [];
     var months = [];
     var profits = [];
     $.ajax({
      type: "POST",
      url: "/PHP/maleGraph.php",
      data:{
        ID : ID,
      },
      dataType: "json",
      success: function(response){
        $.each(response, function (key, room){
          male.push(room.Male)
          months.push(room.Months)
        })
    
      }
    })
    $.ajax({
     type: "POST",
     url: "/PHP/femaleGraph.php",
     data:{
       ID : ID,
     },
     dataType: "json",
     success: function(response){
       $.each(response, function (key, room){
         female.push(room.Female)
       })
   
     }
   })
   $.ajax({
     type: "POST",
     url: "/PHP/profitsGraph.php",
     data:{
       ID : ID,
     },
     dataType: "json",
     success: function(response){
       $.each(response, function (key, room){
         profits.push(room.profits)
       })
   
     }
   })
   const ctx = document.getElementById('myChart');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: months ,
            datasets: [{
                label: 'Male Customer',
                data: male ,
                backgroundColor: 'red',
                borderColor: 'red',
                borderWidth: 4
            },
            {
              label: 'Female Customer',
              data: female ,
              backgroundColor: 'blue',
              borderColor: 'blue',
              borderWidth: 4
          },
            {
              label: 'Profits',
              data: profits ,
              backgroundColor: 'green',
              borderColor: 'green',
              borderWidth: 4
          }
          ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
      }
 
 function statisticGraph(){
   var GraphType = $("#GraphSelect").val();
   
   $('#myChart').replaceWith($('<canvas id="myChart" class="w-100"></canvas>'));
     if(GraphType == 'total'){
       var total = [];
       var months = [];
       $.ajax({
         type: "GET",
         url: "/PHP/totalGraph.php",
         dataType: "json",
         success: function(response){
           $.each(response, function (key, room){
             total.push(room.Total)
             months.push(room.Months)
           })
           const ctx = document.getElementById('myChart');
           const myChart = new Chart(ctx, {
               type: 'bar',
               data: {
                   labels: months ,
                   datasets: [{
                       label: 'Total Customer',
                       data: total,
                       backgroundColor: 'red',
                       borderColor: 'red',
                       borderWidth: 4
                   }
                  
                 ]
               },
               options: {
                   scales: {
                       y: {
                           beginAtZero: true
                       }
                   }
               }
           });
         }
       })
     }
     if(GraphType == 'gender'){
     var male = [];
     var female = [];
     var months = [];
     alert("If no data please reload the graph by pressing the confirm button.")
     $.ajax({
       type: "GET",
         url: "/PHP/maleGraph.php",
         dataType: "json",
         success: function(response){
         $.each(response, function (key, room){
           male.push(room.Male)
           months.push(room.Months)
         })
       }
     })
     $.ajax({
       type: "GET",
       url: "/PHP/femaleGraph.php",
       dataType: "json",
       success: function(response){
        $.each(response, function (key, room){
          female.push(room.Female)
        })
        const ctx = document.getElementById('myChart');
        const myChart = new Chart(ctx, {
         type: 'bar',
         data: {
             labels: months ,
             datasets: [{
                 label: 'Male Customer',
                 data: male,
                 backgroundColor: 'red',
                 borderColor: 'red',
                 borderWidth: 4
             },
             {
               label: 'Female Customer',
               data: female,
               backgroundColor: 'blue',
               borderColor: 'blue',
               borderWidth: 4
           }
            
           ]
         },
         options: {
             scales: {
                 y: {
                     beginAtZero: true
                 }
             }
         }
     });
      }
    })
    
     }
     if(GraphType == 'profits'){
       var total = [];
       var months = [];
       $.ajax({
         type: "GET",
         url: "/PHP/profitsGraph.php",
         dataType: "json",
         success: function(response){
           $.each(response, function (key, room){
             total.push(room.profits)
             months.push(room.Months)
           })
           const ctx = document.getElementById('myChart');
           const myChart = new Chart(ctx, {
               type: 'bar',
               data: {
                   labels: months ,
                   datasets: [{
                       label: 'Total Profits',
                       data: total,
                       backgroundColor: 'red',
                       borderColor: 'red',
                       borderWidth: 4
                   }
                  
                 ]
               },
               options: {
                   scales: {
                       y: {
                           beginAtZero: true
                       }
                   }
               }
           });
         }
       })
     }
 }
 

//-------------------------------Other-----------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------
  function adminPage(page){
    switch(page){
      case "room":
        location.replace('adminRoom.html')
        break;
      case "kitchen":
        location.replace('adminKitchen.html')
        break;
        case "services":
        location.replace('adminTask.html')
        break;
      case "inventory":
        location.replace('adminInventory.html')
        break;
        case "staff":
        location.replace('adminStaff.html')
        break;
      case "analyze":
        location.replace('adminStatistic.html')
        break;
    }
  }

 



