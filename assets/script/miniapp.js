$(document).ready(function(){

  $(".button").click(function(e){

    e.preventDefault();

    let dateInputArr = $(".dateInput").val().split("-");
    console.log(dateInputArr);
    let year = dateInputArr[0];
    let month = dateInputArr[1];
    let day  = dateInputArr[2];

    let city = $("#inlineFormSelectPref").val();
    console.log(city);
    // latitude
    // 40.409264
    // Longitude
    // 49.867092

        let keyTimeZone = "+eTWYvpbfBgFGn4RbZbEpQ==6zUS8yIwq093kBch"
        $.ajax({
          url:`https://api.api-ninjas.com/v1/city?name=${city}`,
          headers: { 'X-Api-Key': keyTimeZone},
          success: function(data){
            console.log(data);
            console.log(data[0].country);
            console.log(data[0].longitude);
          },
          error: function(data){
            console.log(data);
          }
        })

   
      
      $.ajax({
          url: `http://api.aladhan.com/v1/calendar/${year}/${month}?latitude=51.508515&longitude=-0.1254872&method=2`,
          method: "get",
          success: function(data){
          
              data.data.forEach(element => {
              console.log(element);
                
              let content = `
              <tbody>
                  <tr>
                    <th scope="row">${element.date.gregorian.day}</th>
                    <td>${element.meta.timezone}</td>
                    <td>${element.meta.midnightMode}</td>
                    <td>${element.meta.latitude}</td>
                    <td>${element.meta.longitude}</td>
                  </tr>
                </tbody>`

                $(".table").append(content);
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