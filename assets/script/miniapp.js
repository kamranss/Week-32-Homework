$(document).ready(function(){

  // the basic concept of this service
  // First stage to get countries list from respective Api
  // Second stage according to user choise send this country to respective Api and get the list of Cities which related to this country
  // Third Stage according to user choice send city to respective Api and get Location params such as longitude and latitude
  // Forth stage considering day month year and city location sending this data to respective Api to get desired timings for Muslims
      

      // taking country names for drop-down menu 
      let countriesSelection = $(".countriesSelection");
      let citiesSelection = $(".citiesSelection");
    $.ajax({
      url: "https://countriesnow.space/api/v0.1/countries/states",
      method: "get",
      success: function(data){
        // console.log(data);    

                // creationg new options for country menu 
                data.data.forEach(item=>{
                  // console.log(item.name);
                  const option = document.createElement("option");
                  option.textContent = item.name;
                  countriesSelection.append(option) 
                
              })
              let filteredCounrty = []
              countriesSelection.on("change", function(){
                data.data.forEach(item=>{
                 filteredCounrty = data.data.filter(item=> item.name == countriesSelection.val())
                
              })
              console.log(filteredCounrty); // checking filtered countries
              
                  
                  filteredCounrty.forEach(item=>{
                    // console.log(item.states);
                    citiesSelection.html(''); // deleting previous options from cities list

                  // creationg new options for cities menu   
                  item.states.forEach(item=>{
                    // console.log(item.name);
                    const option = document.createElement("option");
                    citiesArr = item.name.split(" ");
                    // option.textContent = item.name;
                    option.textContent = citiesArr[0];
                    citiesSelection.append(option)
                    
                })
                
                
              })
            })
      },
      error: function(data){
        console.log(data);
      }

    })



        // when button will be clicked the data will be loaded according to provided params " date, country and city"
  $(".button").click(function(e){

    e.preventDefault();

    let dayInput = $(".day").val();
    let monthInput = $(".month").val();
    let yearInput = $(".year").val();
    let cityInput = $(".citiesSelection").val();

    dayInput == ""?  day = "1":day = dayInput;
    monthInput == ""? month = "1":month = monthInput;
    yearInput == ""? year = "2023":year = yearInput;
    cityInput = "" || cityInput == "Choose City" ? city = "Baku": city = cityInput;
    console.log(city);
        let keyTimeZone = "+eTWYvpbfBgFGn4RbZbEpQ==6zUS8yIwq093kBch"
        $.ajax({
          url:`https://api.api-ninjas.com/v1/city?name=${city}`,
          headers: { 'X-Api-Key': keyTimeZone},
          success: function(data){
            console.log(data);
            // console.log(data[0].country);
            // console.log(data[0].longitude);
            // console.log(data[0].latitude);
            
            let cityLongitude = data[0].longitude
            let cityLatitude = data[0].latitude

            $.ajax({
              url: `http://api.aladhan.com/v1/calendar/${year}/${month}?latitude=${cityLatitude}&longitude=${cityLongitude}&method=2`,
              method: "get",
              success: function(data){

                  // checking whether the Table body have some content and if have deleting old one
                  let tBody = $("#tableTBody")
                  tBody.html() !== "" ? $("#tableTBody").html('') : null;

                  
                  if (monthInput == "") {
                    console.log(data);
                    let content = `
                    <tr>
                    <td>${data.data[day-1].date.gregorian.day}</td>
                    <td>${data.data[day-1].timings.Asr}</td>
                    <td>${data.data[day-1].timings.Dhuhr}</td>
                    <td>${data.data[day-1].timings.Fajr}</td>
                    <td>${data.data[day-1].timings.Firstthird}</td>
                    <td>${data.data[day-1].timings.Imsak}</td>
                    <td>${data.data[day-1].timings.Isha}</td>
                    <td>${data.data[day-1].timings.Lastthird}</td>
                    <td>${data.data[day-1].timings.Maghrib}</td>
                    <td>${data.data[day-1].timings.Midnight}</td>
                    <td>${data.data[day-1].timings.Sunrise}</td>
                    <td>${data.data[day-1].timings.Sunset}</td>
                  </tr>`
                      
                      $("#tableTBody").append(content);

                  }
                  else{

                    data.data.forEach(element => {
                 
                      let content = `
                      <tr>
                      <td>${element.date.gregorian.day}</td>
                      <td>${element.timings.Asr}</td>
                      <td>${element.timings.Dhuhr}</td>
                      <td>${element.timings.Fajr}</td>
                      <td>${element.timings.Firstthird}</td>
                      <td>${element.timings.Imsak}</td>
                      <td>${element.timings.Isha}</td>
                      <td>${element.timings.Lastthird}</td>
                      <td>${element.timings.Maghrib}</td>
                      <td>${element.timings.Midnight}</td>
                      <td>${element.timings.Sunrise}</td>
                      <td>${element.timings.Sunset}</td>
                    </tr>`
    
                        $("#tableTBody").append(content);
                    });
                  }
                  
      
              },
              error: function(data){
                Swal.fire('Unable to retrieve prayer times for the selected city.')
              }
          })
          },
          error: function(data){
            Swal.fire('Unable to retrieve prayer times for the selected city.')
          }
        })

     
      
  })


 
})






  // "https://countriesnow.space/api/v0.1/countries/capital"








    //   // when button will be clicked the data will be loaded according to provided params " date, country and city"
  // $(".button").click(function(e){

  //   e.preventDefault();

  //   let dateInputArr = $(".dateInput").val().split("-");
  //   // console.log(dateInputArr);
  //   let year = dateInputArr[0];
  //   let month = dateInputArr[1];
  //   let day  = dateInputArr[2];

  //   let city = $(".citiesSelection").val();
  //   console.log(city);
  
  //       let keyTimeZone = "+eTWYvpbfBgFGn4RbZbEpQ==6zUS8yIwq093kBch"
  //       $.ajax({
  //         url:`https://api.api-ninjas.com/v1/city?name=${city}`,
  //         headers: { 'X-Api-Key': keyTimeZone},
  //         success: function(data){
  //           console.log(data);
  //           // console.log(data[0].country);
  //           console.log(data[0].longitude);
  //           console.log(data[0].latitude);
            
  //           let cityLongitude = data[0].longitude
  //           let cityLatitude = data[0].latitude

  //           $.ajax({
  //             url: `http://api.aladhan.com/v1/calendar/${year}/${month}?latitude=${cityLatitude}&longitude=${cityLongitude}&method=2`,
  //             method: "get",
  //             success: function(data){

  //                 // checking whether the Table body have some content and if have deleting old one
  //                 let tBody = $("#tableTBody")
  //                 tBody.html() !== "" ? $("#tableTBody").html('') : null;

  //                 data.data.forEach(element => {
                 
  //                 let content = `
  //                 <tr>
  //                 <td>${element.date.gregorian.day}</td>
  //                 <td>${element.timings.Asr}</td>
  //                 <td>${element.timings.Dhuhr}</td>
  //                 <td>${element.timings.Fajr}</td>
  //                 <td>${element.timings.Firstthird}</td>
  //                 <td>${element.timings.Imsak}</td>
  //                 <td>${element.timings.Isha}</td>
  //                 <td>${element.timings.Lastthird}</td>
  //                 <td>${element.timings.Maghrib}</td>
  //                 <td>${element.timings.Midnight}</td>
  //                 <td>${element.timings.Sunrise}</td>
  //                 <td>${element.timings.Sunset}</td>
  //               </tr>`
  //                     // <th scope="row">${element.date.gregorian.day}</th>
  //                   $("#tableTBody").append(content);
  //               });
      
  //             },
  //             error: function(data){
  //                 console.log(data);
  //             }
  //         })


  //         },
  //         error: function(data){
  //           console.log(data);
  //         }
  //       })

   
      
      
  // })
