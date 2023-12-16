$(document).ready(function () {
    $('#loginForm').on('submit', function (e) {
        e.preventDefault();
        const username = $('#email').val();
        const password = $('#password').val();
        // Make an API request to check if the user's credentials match
        $.ajax({
            type: "POST",
            url: "http://cbsiot.live/utkarsh/api.php",
            data: JSON.stringify({
                "operation": "read",
                "data": "user"
            }),
            dataType: 'json',
            success: function (response) {
                const user = response.find(u => u.user_id === username && u.password === password);
                if (user) {
                    // Redirect to the specified page if credentials match
                    window.location.href = "http://cbsiot.live/utkarsh/Power_MS/powerv2/Powerv2.html";
                } else {
                    // Display an error message if credentials don't match
                    $('#error').text('Invalid user name or password');
                }
            },
            error: function () {
                $('#error').text('Error occurred during login');
            }
        });
    });
});