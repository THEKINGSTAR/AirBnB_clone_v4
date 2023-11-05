$(document).ready(function(){
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
        // update the h4 tag and make space after this semicolon except last element
        var amenityList = Object.values(amenityIds).sort().join(', ');
        $('.amenities h4').text(amenityList);
    }

});