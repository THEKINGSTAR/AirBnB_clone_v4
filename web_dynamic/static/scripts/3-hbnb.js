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
.fail(function() {
  console.log("Error while calling search endpoint");
});
} 