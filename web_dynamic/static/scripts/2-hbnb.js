$(document).ready(function(){
    function updateApiStatusClass() {
        $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
          if (data.status === 'OK') {
            $('#api_status').addClass('available');
          } else {
            $('#api_status').removeClass('available');
          }
        });
      }  
      updateApiStatusClass();
      setInterval(updateApiStatusClass, 5000);

    var amenityIds = {};
    $('input[type="checkbox"]').on('change', function(){
        var $checkbox = $(this);
        var amenityId = $checkbox.data('id');
        var amenityName  = $checkbox.data('name');

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
        var amintyList = Object.values(amenityIds).join(',');
        $('.amenities h4').text(amintyList);
    }
});