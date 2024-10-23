// Email sending function
function sendMail() {
    var params = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value,
    };

    // Ensure all fields are filled
    if (!params.name || !params.email || !params.message) {
        alert("Please fill in all fields before sending.");
        return;
    }

    // Send email using EmailJS
    const serviceID = "service_sjsyk68";  // Your EmailJS service ID
    const templateID = "template_kau3sto";  // Your EmailJS template ID

    emailjs.send(serviceID, templateID, params)
        .then((res) => {
            // Clear form after successful submission
            document.getElementById("name").value = "";
            document.getElementById("email").value = "";
            document.getElementById("message").value = "";

            // Display success message
            const responseMessage = document.getElementById("responseMessage");
            responseMessage.style.display = "block";
            responseMessage.style.color = "green";
            responseMessage.textContent = "Your message has been delivered successfully!";
        })
        .catch((err) => {
            // Display error message
            const responseMessage = document.getElementById("responseMessage");
            responseMessage.style.display = "block";
            responseMessage.style.color = "red";
            responseMessage.textContent = "Failed to send your message. Please try again.";
        });
}

// Add event listener to button
document.getElementById("sendMailBtn").addEventListener("click", sendMail);
