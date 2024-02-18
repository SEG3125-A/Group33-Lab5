// Need to edit this so it chooses the availability of a certain mechanic
var datesForDisable = ["2024-02-23"]

$(document).ready(function(){
    $('.datepicker').datepicker({
        format: 'yyyy-mm-dd', // Set date format
        autoclose: true, 
        datesDisabled: datesForDisable
    });
    $('#timepicker').timepicker({
        minuteStep: 1, 
        showSeconds: false, 
        showMeridian: false 
    });
});

