// Initialize EmailJS with your public key
(function() {
  emailjs.init("pN97d4zK7oWxxxJ7S"); // Replace with your EmailJS public key
  console.log("EmailJS initialized");
})();

document.getElementById('contactForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the default form submission

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  console.log("Attempting to send email with EmailJS...");

  emailjs.send("service_sjsyk68", "emplate_kau3sto", {
    from_name: name,
    reply_to: email,
    message: message
  })
  .then(function(response) {
    console.log("Success!", response.status, response.text);
    document.getElementById('statusMessage').textContent = "Message sent successfully!";
  })
  .catch(function(error) {
    console.error("Error:", error);
    document.getElementById('statusMessage').textContent = "Failed to send message. Please try again later.";
  });
});

