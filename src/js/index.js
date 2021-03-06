import "../styles/main.scss";

const $ = (selector) => document.querySelector(selector);

const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

$(".js-email-input").addEventListener("keyup", (e) => {
    const email = e.target.value;
    if (!emailRegex.test(email)) {
        $(".js-form-response").textContent = "Please enter a valid email";
        $(".js-submit-button").disabled = true;
    }
    else {
        $(".js-form-response").textContent = "";
        $(".js-submit-button").disabled = false;
    }
});

$(".js-form").addEventListener("submit", (ev) => {
    const email = $(".js-email-input").value;
    if (!emailRegex.test(email)) {
        $(".js-form-response").textContent = "Please enter a valid email";
        $(".js-submit-button").disabled = true;
        ev.preventDefault();
        return false;
    }
    else {
        $(".js-form-response").textContent = "";
        $(".js-submit-button").disabled = false;
        let httpRequest;
        if (window.XMLHttpRequest) {
            httpRequest = new XMLHttpRequest();
        }
        else if (window.ActiveXObject) {
            httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
        }
        httpRequest.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                $(".js-form-response").innerHTML = this.responseText;
            }
            $(".loader").style.display = "none";
        }
        httpRequest.open("POST", "subscribe.php", true);
        httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        httpRequest.send("mail_input=" + email);
        $(".loader").style.display = "block";
    }
})
