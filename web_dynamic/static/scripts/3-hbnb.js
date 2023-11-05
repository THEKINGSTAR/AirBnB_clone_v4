$(document).ready(function(){
    function updateApiStatusClass() {
      $.get('http://' + window.location.hostname + ':5001/api/v1/status/')
      .done( function conn_ok(data) {
        if (data.status === 'OK') {
            $('#api_status').addClass('available');
          } else {
            $('#api_status').removeClass('available');
          }
        })
      .fail( function conn_fail() {
        $('#api_status').removeClass('available');
        });
      }  
      updateApiStatusClass();
      setInterval(updateApiStatusClass, 5000);

    let amenityIds = {};
    $('input[type="checkbox"]').on('change', function(){
        let $checkbox = $(this);
        let amenityId = $checkbox.data('id');
        let amenityName  = $checkbox.data('name');

        if ($checkbox.is(':checked')){

            amenityIds[amenityId] = amenityName ;
        }
        else
        {
            delete amenityIds[amenityId];
        }
        updateAmenityList();
    });

    function updateAmenityList()
    {
        let amintyList = Object.values(amenityIds).sort().join(', ');
        $('.amenities h4').text(amintyList);
    }

    // task 3 - Search
    searchPlaces ();
});
// task 3 - Search
function searchPlaces () {
  $.ajax({
    type: 'POST',
    url: 'http://' + window.location.hostname + ':5001/api/v1/places_search/',
    // Empty JSON object (empty dictionary) as data
    data: JSON.stringify({}), 
    dataType: 'json',
    contentType: 'application/json',
})
.done(function(data, textStatus, jqXHR) {
    console.log("data: " + data);
    console.log("textStatus: " + textStatus);
    console.log("jqXHR: " + jqXHR);
})
.fail(function() {
    console.log("Error while calling search endpoint");
});
}  