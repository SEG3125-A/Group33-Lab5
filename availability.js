var mechanicUnavailability = {
    "erwind": ["2024-02-23", "2024-02-24"],
    "michelle": ["2024-02-25", "2024-02-26"],
    "steven": ["2024-02-27", "2024-02-28"]
};

$(document).ready(function(){
    
    $('#timepicker').timepicker({
        minuteStep: 1, 
        showSeconds: false, 
        showMeridian: false 
    });

    // Event listener to update disabled dates when mechanic selection changes
    $('input[name="mechanic"]').change(function() {
        // Get the selected mechanic
        var selectedMechanic = $(this).val();
            
        // Get the unavailability dates for the selected mechanic
        var datesForDisable = mechanicUnavailability[selectedMechanic];

        if (datesForDisable) {
            // Show the datepicker input field
            // Initialize the datepicker
            $('.datepicker').datepicker({
                format: 'yyyy-mm-dd', // Set date format
                autoclose: true,
                datesDisabled: datesForDisable
            });
        } else {
            // Clear any selected date
            $('.datepicker').val('');
        }
    });
});

