$(document).ready(function() {
    // for credit card expiry date
    var currentYear = new Date().getFullYear();
    var expiryYearSelect = $('#expiryYear');
    var htmlOptions = '<option value="">Choose...</option>';
    for (var i = 0; i < 5; i++) {
        var year = currentYear + i;
        htmlOptions += '<option value="' + year + '">' + year + '</option>';
    }
    expiryYearSelect.html(htmlOptions);

    // Function to check if all fields in the appointment form are filled
    function checkAppointmentForm() {
        var name = $('#name').val();
        var email = $('#email').val();
        var num = $('#num').val();

        // Check if all fields have values
        return (name !== '' && email !== '' && num !== '');
    }

    // Function to check if all fields in the appointment details are filled
    function checkAppointmentDetails() {
        var service = $('input[name="service"]:checked').val();
        var mechanic = $('input[name="mechanic"]:checked').val();
        var date = $('#date').val(); // Get the value of the date input field

        // Check if all fields have values
        return (service && mechanic && date);
    }

    // Function to toggle the payment section based on appointment form completion and button press status
    function togglePaymentSection() {
        var paymentFormInputs = $('#paymentForm input, #paymentForm select');
        var submitPaymentButton = $('#paymentForm button[type="submit"]');

        if (checkAppointmentForm() && checkAppointmentDetails()) {
            // Enable editing in the payment section
            paymentFormInputs.prop('readonly', false);
            paymentFormInputs.prop('disabled', false);
            submitPaymentButton.prop('disabled', false);
        } else {
            // Disable editing in the payment section
            paymentFormInputs.prop('readonly', true);
            paymentFormInputs.prop('disabled', true);
            submitPaymentButton.prop('disabled', true);
        }
    }

    // Call the togglePaymentSection function on page load
    togglePaymentSection();

    // Listen for changes in the appointment form fields
    $('#appointmentForm input, #appointmentForm select').on('change', function() {
        // Call the togglePaymentSection function whenever there's a change in the appointment form
        togglePaymentSection();
    });

    function validateFormValues() {
        var name = $('#name').val();
        var email = $('#email').val();
        var num = $('#num').val();
        var date = $('#date').val();
        var incorrectFields = [];
    
        if (!/^[a-zA-Z]+$/.test(name)) {
            incorrectFields.push("Name");
        }
    
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            incorrectFields.push("Email");
        }
    
        if (isNaN(num) || num.trim() === '') {
            incorrectFields.push("Phone Number");
        }
        if (!checkAppointmentDetails()) {
            incorrectFields.push("Service/Mechanic")
        }
        var datePattern = /^\d{4}-\d{2}-\d{2}$/;
        if (!datePattern.test(date)) {
            incorrectFields.push("Date");
        }

        return incorrectFields;
    }

    function validateCreditCard() {
        var ccNumber = $('#ccNumber').val();
        var cvv = $('#cvv').val();
        var nameOnCard = $('#nameOnCard').val();
        var expiryMonth = $('#expiryMonth').val();
        var expiryYear = $('#expiryYear').val();
        var incorrectCreditCardFields = [];
        
        ccNumber = ccNumber.replace(/\s/g, '');

        if (!/^\d+$/.test(ccNumber) || (ccNumber.length < 13 || ccNumber.length > 16)) {
            incorrectCreditCardFields.push("Credit Card Number");
        }
        if (isNaN(cvv) || cvv.trim() === '' || (cvv.trim().length !== 3 && cvv.trim().length !== 4)) {
            incorrectCreditCardFields.push("CVV");
        }
        if (!/^[a-zA-Z]+$/.test(nameOnCard)) {
            incorrectCreditCardFields.push("Name On Card");
        }
        if (expiryMonth === '') {
            incorrectCreditCardFields.push("Expiry Month");
        }
        if (expiryYear === '') {
            incorrectCreditCardFields.push("Expiry Year");
        }

        return incorrectCreditCardFields;
    }
    
    $("#submitPaymentBtn").click(function(event) {
        event.preventDefault();
        var incorrectCreditCardFields = validateCreditCard()
        var incorrectFields = validateFormValues()

        var full = $.merge(incorrectCreditCardFields, incorrectFields);

        if (full.length == 0){
            alert("Appointment booked. Thank you!")
            $("#paymentForm").trigger("reset");
            $("#appointmentForm").trigger("reset");
        } else {
            alert("Please correct the following field(s):\n- " + full.join("\n- "));
        }
    });
});
