// Script for disabling dates in date selector based on mechanic availability

var mechanicUnavailability = {
    "erwind": ["2024-02-18", "2024-02-19", "2024-02-23", "2024-02-24", "2024-03-05", "2024-03-06", "2024-03-07"],
    "michelle": ["2024-02-25", "2024-02-26", "2024-03-05", "2024-03-10", "2024-03-15"],
    "steven": ["2024-02-27", "2024-02-28", "2024-03-07", "2024-03-12", "2024-03-17"]
};

$(document).ready(function(){
    
    $('#timepicker').timepicker({
        minuteStep: 1, 
        showSeconds: false, 
        showMeridian: false 
    });
    
    var datePickerInstance;

    // Event listener to update disabled dates when mechanic selection changes
    $('input[name="mechanic"]').change(function() {

        // Select mechanic
        var selectedMechanic = $(this).val();
            
        // Get the unavailability dates for the selected mechanic
        var datesForDisable = mechanicUnavailability[selectedMechanic];

        if (selectedMechanic) {
            // If datepicker instance is not initialized, initialize it
            if (!datePickerInstance) {
                datePickerInstance = $('.datepicker').datepicker({
                    format: 'yyyy-mm-dd', // Set date format
                    autoclose: true
                });
            }
            // Otherwise update the disabled dates
            datePickerInstance.datepicker('setDatesDisabled', datesForDisable);
        } else {
            // Clear any selected date
            $('.datepicker').val('');
        }
    });
});

