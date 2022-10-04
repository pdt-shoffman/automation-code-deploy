function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function getIP() {
    $.ajax({
        type: "GET",
        url: "https://api.ipify.org?format=json",
        success: function(data) {
            myIP = data.ip;
        }
    });
}

function PDCEFEvent(options) {
    var merged = $.extend(true, {}, {
            type: "POST",
            dataType: "json",
            headers: {
                "Accept": "application/vnd.pagerduty+json;version=2.0"
            },
            url: "https://events.pagerduty.com/v2/enqueue"

        },
        options);

    $.ajax(merged);
}

var myIP = "127.0.0.1";
var routing_key = "4f5b2b5f171e4104c04f244e867336f2";
var count = 0;
var email = "unknown@example.com";

$('.alert').alert();

$('#inputEmail').keypress(function(e) {
    if (e.keyCode == 13) {
        $('#signin-button').trigger("click");
    }
});

$('#inputPassword').keypress(function(e) {
    if (e.keyCode == 13) {
        $('signin-button').trigger("click");
    }
});

//Exercise Pt2 - FIX ME!
$('#bad-button1').on('click', function(){
    location.href = "https://www.bci.cl/personas/mach-bci/404";

    var payload = {
        "event_action": "trigger",
        "client": "New Relic",
        "client_url": "http://54.193.12.191:8000/en-US/app/search/search?q=search%20login",
        "routing_key": routing_key,
        "payload": {
            "summary": "Website Monitors (Home Page Health Check violated Error Rates)",
            "severity": "critical",
            "source": "New Relic",
            "custom_details": {
                "violation_callback_url": "https://synthetics.newrelic.com/accounts/1985859/monitors/704df0e2-dcc9-48f8-8756-dd83554c5da3/results/4a1a333d-2346-4a81-8091-dbf623d5016f",
                "version": "1.0",
                "targets": [
                    {
                      "type": "Monitor",
                      "product": "SYNTHETICS",
                      "name": "Home Page Health Check",
                      "link": "https://synthetics.newrelic.com/accounts/1985859/monitors/704df0e2-dcc9-48f8-8756-dd83554c5da3/results/4a1a333d-2346-4a81-8091-dbf623d5016f",
                      "labels": {},
                      "id": "New York, NY"
                    }
                  ],
                "policy_url": "https://alerts.newrelic.com/accounts/1985859/policies/423861",
                "policy_name": "Website Monitors",
                "open_violations_count": {
                    "warning": 0,
                    "critical": 1
                },
              "incident_url": "https://alerts.newrelic.com/accounts/1985859/incidents/62835129",
              "incident_id": 62835129,
              "incident_acknowledge_url": "https://alerts.newrelic.com/accounts/1985859/incidents/62835129/acknowledge",
              "event_type": "INCIDENT",
              "duration": 658,
              "details": "Monitor failed for location New York, NY",
              "current_state": "open",
              "condition_name": "Error Rates",
              "condition_id": 47340281,
              "condition_family_id": 10419059,
              "closed_violations_count": {
                "warning": 0,
                "critical": 0
              },
              "account_name": "PagerDuty",
              "account_id": 1985859
            }
        }
    };

    var options = {
        data: JSON.stringify(payload)
    };

    PDCEFEvent(options)



})


$('#bad-button2').on('click', function(){
    location.href = "https://www.bci.cl/personas/mach-bci/404";

    var payload = {
        "event_action": "trigger",
        "client": "New Relic",
        "client_url": "http://54.193.12.191:8000/en-US/app/search/search?q=search%20login",
        "routing_key": routing_key,
        "payload": {
            "summary": "Website Monitors (Home Page Health Check violated Error Rates)",
            "severity": "critical",
            "source": "New Relic",
            "custom_details": {
                "violation_callback_url": "https://synthetics.newrelic.com/accounts/1985859/monitors/704df0e2-dcc9-48f8-8756-dd83554c5da3/results/4a1a333d-2346-4a81-8091-dbf623d5016f",
                "version": "1.0",
                "targets": [
                    {
                      "type": "Monitor",
                      "product": "SYNTHETICS",
                      "name": "Home Page Health Check",
                      "link": "https://synthetics.newrelic.com/accounts/1985859/monitors/704df0e2-dcc9-48f8-8756-dd83554c5da3/results/4a1a333d-2346-4a81-8091-dbf623d5016f",
                      "labels": {},
                      "id": "New York, NY"
                    }
                  ],
                "policy_url": "https://alerts.newrelic.com/accounts/1985859/policies/423861",
                "policy_name": "Website Monitors",
                "open_violations_count": {
                    "warning": 0,
                    "critical": 1
                },
              "incident_url": "https://alerts.newrelic.com/accounts/1985859/incidents/62835129",
              "incident_id": 62835129,
              "incident_acknowledge_url": "https://alerts.newrelic.com/accounts/1985859/incidents/62835129/acknowledge",
              "event_type": "INCIDENT",
              "duration": 658,
              "details": "Monitor failed for location New York, NY",
              "current_state": "open",
              "condition_name": "Error Rates",
              "condition_id": 47340281,
              "condition_family_id": 10419059,
              "closed_violations_count": {
                "warning": 0,
                "critical": 0
              },
              "account_name": "PagerDuty",
              "account_id": 1985859
            }
        }
    };

    var options = {
        data: JSON.stringify(payload)
    };

    PDCEFEvent(options)

})

$('#signin-button').on('click', function() {
    if (email != $('#inputEmail').val()) count = 0;
    count++;
    email = $('#inputEmail').val();

    var alertbox = `
	<div id="alert" class="alert alert-danger alert-dismissible fade show" role="alert">
		<button type="button" class="close" data-dismiss="alert" aria-label="Close">
			<span aria-hidden="true">&times;</span>
		</button>
		Invalid password for <strong>${email}</strong>. Please try again.
	</div>
	`;

    $('#alert-container').html(alertbox);

    var payload = {
        "event_action": "trigger",
        "client": "Splunk",
        "client_url": "http://54.193.12.191:8000/en-US/app/search/search?q=search%20login",
        "dedup_key": `failed_login_${email}`,
        "routing_key": routing_key,
        "payload": {
            "summary": `Attempted malicious logins for username ${email}`,
            "source": "Splunk",
            "severity": "critical",
            "custom_details": {
                "From": myIP,
                "Event": "Logon",
                "User": email,
                "Last_Attempt": new Date(),
                "To": document.title,
                "Failure_Times": count
            }
        }
    };

    var options = {
        data: JSON.stringify(payload)
    };

    PDCEFEvent(options)

    //Exercise content
    if (count > 5) {
        var payload2 = {
            "event_action": "trigger",
            "client": "Splunk",
            "client_url": "http://54.193.12.191:8000/en-US/app/search/search?q=search%20login",
            "dedup_key": `repeated_failed_logins_${email}`,
            "routing_key": routing_key,
            "payload": {
                "summary": `Repeated login failures for username ${email} from IP ${myIP}`,
                "source": "Splunk",
                "severity": "critical",
                "custom_details": {
                    "From": myIP,
                    "Event": "Logon",
                    "User": email,
                    "Last_Attempt": new Date(),
                    "To": document.title,
                    "Failure_Times": count
                }
            }
        };

         var options2 = {
            data: JSON.stringify(payload2)
        };

        PDCEFEvent(options2)
    };


    password = $('#inputPassword').val();

    if (password.match(/vip/g)) {
        var payload3 = {
            "event_action": "trigger",
            "client": "Splunk",
            "client_url": "http://54.193.12.191:8000/en-US/app/search/search?q=search%20login",
            "dedup_key": `vip_failed_login_${email}`,
            "routing_key": routing_key,
            "payload": {
                "summary": `Potential hacking attempt for ${email} from IP ${myIP}`,
                "source": "Splunk",
                "severity": "critical",
                "custom_details": {
                    "From": myIP,
                    "Event": "Logon",
                    "User": email,
                    "Last_Attempt": new Date(),
                    "To": document.title,
                    "Failure_Times": count
                }
            }
        };

         var options3 = {
            data: JSON.stringify(payload3)
        };

        PDCEFEvent(options3)
    }
     else if (password.match(/ddos/g)){
        var payload4 = {
            "event_action": "trigger",
            "client": "Splunk",
            "client_url": "http://54.193.12.191:8000/en-US/app/search/search?q=search%20login",
            "dedup_key": `vip_failed_login_${email}`,
            "routing_key": routing_key,
            "payload": {
                "summary": `DDOS attack detected for Public IP: ${myIP}`,
                "source": "Splunk",
                "severity": "critical",
                "custom_details": {
                    "From": myIP,
                    "Event": "Logon",
                    "User": email,
                    "Last_Attempt": new Date(),
                    "To": document.title,
                    "Failure_Times": count
                }
            }
        };

         var options4 = {
            data: JSON.stringify(payload4)
        };

        PDCEFEvent(options4)

    };
    
});


getIP();
if (getParameterByName("title")) document.title = getParameterByName("title");