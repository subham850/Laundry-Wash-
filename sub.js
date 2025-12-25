document.addEventListener("DOMContentLoaded", function () {
    const newsletterForm = document.getElementById("newsletter-form");
    const nameInput = document.getElementById("newsletter-name");
    const emailInput = document.getElementById("newsletter-email");

    newsletterForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();

        // Validation
        if (name === "" || email === "") {
            alert("❗ Please fill in both Name and Email.");
            return;
        }

        if (!validateEmail(email)) {
            alert("❗ Please enter a valid email address.");
            return;
        }

        // Success
        alert(`✅ Thank you ${name}, you are subscribed to our newsletter!`);

        // Reset form
        newsletterForm.reset();
    });

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
});