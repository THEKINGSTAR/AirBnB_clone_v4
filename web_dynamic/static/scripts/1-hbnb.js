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
        var amintyList = Object.values(amenityIds).join(',');
        $('.amenities h4').text(amintyList);
    }

});