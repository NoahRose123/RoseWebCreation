// Initialize EmailJS
(function() {
    emailjs.init("Czs0cXQsp5B-Dbm8Y");
})();

function sendMail(event) {
    event.preventDefault(); // Prevent default form submission

    // Collect form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Define parameters for EmailJS
    const templateParams = {
        from_name: name,
        from_email: email,
        message: message
    };

    // Replace 'your_service_id' and 'your_template_id' with actual EmailJS values
    emailjs.send("your_service_id", "your_template_id", templateParams)
        .then((response) => {
            alert('Message sent successfully!');
            document.getElementById("contact-form").reset();
        })
        .catch((error) => {
            alert('Failed to send message. Please try again later.');
            console.error('Error:', error);
        });
}

