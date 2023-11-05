$(document).ready(function(){
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
        // update the h4 tag and make space after this semicolon except last element
        let amenityList = Object.values(amenityIds).sort().join(', ');
        $('.amenities h4').text(amenityList);
    }

});