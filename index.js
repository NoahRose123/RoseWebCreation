function sendMail(){
    var params = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value,
    };


const serviceID ="service_sjsyk68";
const templateID ="template_kau3sto";

emailjs
.send(serviceID,templateID, params)
.then((res) =>{
        document.getElementById("name").value ="";
        document.getElementById("email").value ="";
        document.getElementById("message").value ="";
        console.log(res);
        alert("Your Message Sent Sucessfully");
    }
)
.catch((err) => console.log(err));
}

sendMail(onclick);
