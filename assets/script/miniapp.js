$(document).ready(function(){
      // "https://countriesnow.space/api/v0.1/countries/capital"

      // taking country names for drop-down menu 
      let countriesSelection = $(".countriesSelection");
      let citiesSelection = $(".citiesSelection");
    $.ajax({
      url: "https://countriesnow.space/api/v0.1/countries/states",
      method: "get",
      success: function(data){
        console.log(data);    

                // creationg new options for country menu 
                data.data.forEach(item=>{
                  console.log(item.name);
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
                    console.log(item.states);
                    citiesSelection.html(''); // deleting previous options from cities list

                  // creationg new options for cities menu   
                  item.states.forEach(item=>{
                    console.log(item.name);
                    const option = document.createElement("option");
                    option.textContent = item.name;
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
    console.log(dateInputArr);
    let year = dateInputArr[0];
    let month = dateInputArr[1];
    let day  = dateInputArr[2];

    let city = $(".citiesSelection").val();
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
            // console.log(data[0].country);
            console.log(data[0].longitude);
            console.log(data[0].latitude);
            
            let cityLongitude = data[0].longitude
            let cityLatitude = data[0].latitude

            $.ajax({
              url: `http://api.aladhan.com/v1/calendar/${year}/${month}?latitude=${cityLatitude}&longitude=${cityLongitude}&method=2`,
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