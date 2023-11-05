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
    /*
    Request http://0.0.0.0:5001/api/v1/places_search/:
    
    Description of this endpoint here. If this endpoint is not available,
    you will have to add it to the API
    Send a POST request with Content-Type: application/json
    and an
    empty dictionary in the body -
    cURL version: curl "http://0.0.0.0:5001/api/v1/places_search" -XPOST -H "Content-Type: application/json" -d '{}'
    Loop into the result of the request and create an article tag 
    representing a Place in the section.places. (you can remove the Owner tag in the place description)
     */
    function updatePlaces() {
      $.ajax({
        url: 'http://' + window.location.hostname + ':5001/api/v1/places_search/',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({}), 
        success: function (data) {
          $('.places').empty();
    
          data.forEach(function (place) {
            const article = $('<article>');
            article.html(
              '<div class="title_box">' +
              '<h2>' + place.name + '</h2>' +
              '<div class="price_by_night">$' + place.price_by_night + '</div>' +
              '</div>' +
              '<div class="information">' +
              '<div class="max_guest">' + place.max_guest + ' Guest' + (place.max_guest !== 1 ? 's' : '') + '</div>' +
              '<div class="number_rooms">' + place.number_rooms + ' Bedroom' + (place.number_rooms !== 1 ? 's' : '') + '</div>' +
              '<div class="number_bathrooms">' + place.number_bathrooms + ' Bathroom' + (place.number_bathrooms !== 1 ? 's' : '') + '</div>' +
              '</div>' +
              '<div class="description">' + place.description + '</div>'
            );
            $('.places').append(article);
          });
        },
        error: function () {
          console.log('Failed to fetch places data.');
        }
      });
    }
    updatePlaces();
});