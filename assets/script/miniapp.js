$(document).ready(function(){
      // "https://countriesnow.space/api/v0.1/countries/capital"

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





  $(".button").click(function(e){

    e.preventDefault();

    let dateInputArr = $(".dateInput").val().split("-");
    // console.log(dateInputArr);
    let year = dateInputArr[0];
    let month = dateInputArr[1];
    let day  = dateInputArr[2];

    let city = $(".citiesSelection").val();
    console.log(city);
  
        let keyTimeZone = "+eTWYvpbfBgFGn4RbZbEpQ==6zUS8yIwq093kBch"
        $.ajax({
          url:`https://api.api-ninjas.com/v1/city?name=${city}`,
          headers: { 'X-Api-Key': keyTimeZone},
          success: function(data){
            console.log(data);
            // console.log(data[0].country);
            console.log(data[0].longitude);
            console.log(data[0].latitude);
            
            let cityLongitude = data[0].longitude
            let cityLatitude = data[0].latitude

            $.ajax({
              url: `http://api.aladhan.com/v1/calendar/${year}/${month}?latitude=${cityLatitude}&longitude=${cityLongitude}&method=2`,
              method: "get",
              success: function(data){

                  // checking whether the Table body have some content and if have deleting old one
                  let tBody = $("#tableTBody")
                  tBody.html() !== "" ? $("#tableTBody").html('') : null;

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
                      // <th scope="row">${element.date.gregorian.day}</th>
                    $("#tableTBody").append(content);
                });
      
              },
              error: function(data){
                  console.log(data);
              }
          })


          },
          error: function(data){
            console.log(data);
          }
        })

   
      
      
  })
 
})






