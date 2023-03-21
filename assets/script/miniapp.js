$(document).ready(function(){

  $(".button").click(function(e){

    e.preventDefault();

    let dateInputArr = $(".dateInput").val().split("-");
    console.log(dateInputArr);
    let year = dateInputArr[0];
    let month = dateInputArr[1];
    let day  = dateInputArr[2];

    // latitude
    // 40.409264
    // Longitude
    // 49.867092
      
      $.ajax({
          url: `http://api.aladhan.com/v1/calendar/${year}/${month}?latitude=51.508515&longitude=-0.1254872&method=2`,
          method: "get",
          success: function(data){
          
              data.data.forEach(element => {
              console.log(element);
            });
  
              // let box = d.createElement("div")
              // box.append(`<p>${data.}</p>
              // <p></p>
              // <p></p>`)
  
          },
          error: function(data){
              console.log(data);
          }
      })
  })
 
})