$(document).ready(function(){
    $("#loading").hide();
    $("#error").hide();
    $('#result').hide();
    $("#test").click(function(){
        var url = $('#website_url').val();
        $.ajax({
            type: "POST",
           // url: "http://localhost:5000/",
            url: "https://page-speed.herokuapp.com/",
            data: {weburl:url},
            dataType: "text", 
            beforeSend: function(){
                $("#loading").show(500);
                $('#result').hide();
            },
            success:function(response){
                response = String(response);
                $("#loading").hide(500,function(){
                    console.log(response);
                    if(response=="not_valid")
                    {
                        $("#error_msg").text("Website URL is invalid");
                        $('#error').show(0).delay(3500).hide(100);
                    }
                    else
                    {
                        response = JSON.parse(response);
                        var time = response.msg.totalTimeSeconds;
                        $('#result').show();
                        $('#result').html("<p>Total Time Taken - " + time + " seconds</p>" +
                                "<p>Total Errors - " + response.msg.totalErrors + "</p>" + 
                                "<p>Total Requests - " + response.msg.totalRequests + "</p>" +
                                "<p>Mean Latency - " + response.msg.meanLatencyMs + " ms</p>");
                    }
                });
            },
            error: function() {
                $("#loading").hide(500,function(){
                    $("#error_msg").text("Server error! Please try again later");
                    $('#error').show(0).delay(3500).hide(100);
                });
            }
        });
    });
});