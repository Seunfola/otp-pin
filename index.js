const inputs = document.querySelectorAll(".otp-field input");

inputs.forEach((input, index) => {
    input.dataset.index = index;
    input.addEventListener("paste", handleOnPasteOtp);
    input.addEventListener("keyup", handleOtp);
});

function handleOnPasteOtp(e) {
    const data = e.clipboardData?.getData('text');
    const value = data.split("");

    if (value.length === inputs.length) {
        inputs.forEach((input, index) => {
            input.value = value[index];
        });

        submit();
    }
}

function handleOtp(e) {
    const input = e.target;
    const value = input.value;
    input.value = value ? value[0] : "";

    const fieldIndex = parseInt(input.dataset.index);

    if (value.length > 0 && fieldIndex < inputs.length - 1) {
        input.nextElementSibling.focus();
    }

    if (e.key === "Backspace" && fieldIndex > 0) {
        input.previousElementSibling.focus();
    }

    if (fieldIndex === inputs.length - 1) {
        submit();
    }
}

function submit() {
    console.log("Submitting ...");

    const otp = Array.from(inputs)
        .map(input => {
            input.disabled = true;
            input.classList.add("disabled");
            return input.value;
        })
        .join("");

    console.log(otp);

    fetch('https://telesign-telesign-send-sms-verification-code-v1.p.rapidapi.com/sms-verification-code?phoneNumber=%3CREQUIRED%3E&verifyCode=%3CREQUIRED%3E')
        .then(res => res.json())
        .then(response => {
            document.getElementById('testId').innerHTML = response.data[0][0][0][0][0][0];
        })
        .catch(error => console.error('Error:', error));git

}
