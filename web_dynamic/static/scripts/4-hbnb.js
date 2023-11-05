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
    function getAllPlaces () {
      $.ajax({
        type: 'POST',
        url: 'http://' + window.location.hostname + ':5001/api/v1/places_search/',
        // Empty JSON object (empty dictionary) as data
        data: JSON.stringify({}), 
        dataType: 'json',
        contentType: 'application/json',
      })
      .done(function(serchResponse) {
          for (const placeObj of serchResponse) {
            const placeData = ['<article>',
              '<div class="title_box">',
            `<h2>${placeObj.name}</h2>`,
            `<div class="price_by_night">$${placeObj.price_by_night}</div>`,
            '</div>',
            '<div class="information">',
            `<div class="max_guest">${placeObj.max_guest} Guest${placeObj.max_guest != 1 ? 's' : ''}</div>`,
            `<div class="number_rooms">${placeObj.number_rooms} Bedroom${placeObj.number_rooms != 1 ? 's' : ''}</div>`,
            `<div class="number_bathrooms">${placeObj.number_bathrooms} Bathroom${placeObj.number_bathrooms != 1 ? 's' : ''}</div>`,
            '</div>',
            '<div class="description">',
            `${placeObj.description}`,
            '</div>',
            '</article>'];
            $('SECTION.places').append(placeData.join(''));
          }
      })
    }
      getAllPlaces();
    /**************************************************************************** */
    /*
    5. Filter places by Amenity
    Replace the route 3-hbnb with 4-hbnb in the file 4-hbnb.py (based on 3-hbnb.py)
    Create a new template 4-hbnb.html (based on 3-hbnb.html) and update it:
    Import the JavaScript static/scripts/4-hbnb.js in the <head> tag (instead of 3-hbnb.js)
    Write a JavaScript script (static/scripts/4-hbnb.js):
    Based on 3-hbnb.js
    When the button tag is clicked, a new POST request to places_search should be made with the list of Amenities checked
    */
    function searchPlacesWithAmenities() {
        const checkedAmenities = Object.keys(amenityIds);
    
        $.ajax({
          url: 'http://' + window.location.hostname + ':5001/api/v1/places_search/',
          type: 'POST',
          contentType: 'application/json',
          data: JSON.stringify({ amenities: checkedAmenities }),
          success: function (data) {
          },
          error: function () {
            console.log('Failed to fetch places data.');
          }
        });
      }
    
      $('button').on('click', function () {
        searchPlacesWithAmenities();
      });
    /**************************************************************************** */
});