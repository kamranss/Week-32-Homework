$(document).ready(function(){

    $.ajax({
        url: "http://api.aladhan.com/v1/calendar/2017/4?latitude=51.508515&longitude=-0.1254872&method=2",
        method: "get",
        success: function(data){
            console.log(data);
        },
        error: function(data){
            console.log(data);
        }
    })
})