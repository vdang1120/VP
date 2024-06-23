(function () {
    "use strict";

    const forms = document.querySelectorAll(".needs-validation");

    Array.prototype.slice.call(forms).forEach(function (form) {
        form.addEventListener(
            "submit", function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                    form.querySelectorAll(":invalid")[0].focus();
                }                   //Marks Invalid Inputs & Prevents Form Submission
                else {
                    event.preventDefault();
                    event.stopPropagation();

                    const formData = new FormData(form);
                    const object = Object.fromEntries(formData);
                    const json = JSON.stringify(object);

                    fetch("https://api.web3forms.com/submit", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json",
                        },
                        body: json,
                    })          //Sends Form using Web3Forms API
                        .then(async (response) => {
                            let json = await response.json();
                            if (response.status == 200) {
                                Swal.fire({
                                    title: "Message Sent!",
                                    text: "We will respond to you shortly!",
                                    icon: "success",
                                    confirmButtonColor: "mediumseagreen",
                                });
                                form.reset();
                            } else {
                                console.log(response);
                                Swal.fire({
                                    icon: "error",
                                    title: "Something Went Wrong",
                                    text: "Please Try Again",
                                    confirmButtonColor: "#d33",
                                });
                            }
                        })      //Displays Success Message & Resets Form
                        .catch((error) => {
                            console.log(error);
                            Swal.fire({
                                icon: "error",
                                title: "Something Went Wrong",
                                text: "Please Try Again",
                                confirmButtonColor: "#d33",
                            });
                        })      //Displays Success Message
                        .then(function () {
                            form.classList.remove("was-validated");
                        });
                }                   //Submits Form
                form.classList.add("was-validated");
            },
            false
        );
    });
})();