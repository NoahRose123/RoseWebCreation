// Email sending function
function sendMail() {
    var params = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value,
        myEmail: "your-email@example.com", // Your personal email for receiving the message
    };

    // Ensure fields are not empty
    if (!params.name || !params.email || !params.message) {
        alert("Please fill in all fields before sending.");
        return;
    }

    const fileInput = document.getElementById("attachment");
    const file = fileInput.files[0]; // Get the file

    // If a file is selected, we'll read it and send it as a base64 string
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            params.attachment = e.target.result; // Attach the file as base64
            params.attachmentName = file.name; // Pass file name
            sendEmailJS(params);
        };
        reader.readAsDataURL(file); // Read file as base64
    } else {
        // No file, send email without attachment
        sendEmailJS(params);
    }
}

function sendEmailJS(params) {
    const serviceID = "service_sjsyk68";
    const templateID = "template_kau3sto";

    emailjs
        .send(serviceID, templateID, params)
        .then((res) => {
            document.getElementById("name").value = "";
            document.getElementById("email").value = "";
            document.getElementById("message").value = "";
            document.getElementById("attachment").value = ""; // Clear file input
            console.log(res);
            alert("Your message was sent successfully!");
        })
        .catch((err) => {
            console.error(err);
            alert("Failed to send your message. Please try again.");
        });
}

