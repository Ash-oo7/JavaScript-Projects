const qrText = document.getElementById('qr-input')
const dimensions = document.getElementById('qr-dimension')
const generateBtn = document.getElementById('generate')
const downloadBtn = document.getElementById('download')
const body = document.querySelector('.box')

let size = dimensions.value;
let resetBtn;
let qrContainer;
let qrGenerated = false; // Flag to track QR code generation

dimensions.addEventListener("change", (e) => {
    size = e.target.value
    if (qrGenerated) {
        generateQRcode(); // Regenerate the QR code with the new size
    }
})

generateBtn.addEventListener('click', (e) => {
    isEmpty()
})

downloadBtn.addEventListener('click', (e) => {
    downloadQRcode();
});


function isEmpty() {
    if (qrText.value.length > 0) {
        generateQRcode();
        qrGenerated = true; // Mark QR as generated
    }
    else {
        alert("Enter the text or URL to generate your QR code");
    }
};


function generateQRcode() {
    const existingQRBody = document.querySelector('.qr-body');
    if (existingQRBody) {
        existingQRBody.remove();
    }

    qrContainer = document.createElement('div');
    qrContainer.classList.add('qr-body');
    body.appendChild(qrContainer);

    new QRCode(qrContainer, {
        text: qrText.value,
        width: size,
        height: size,
        colorDark: "#000000",
        colorLight: "#ffffff",
    })

    setTimeout(() => {
        qrContainer.classList.add('show'); // Apply the fade-in effect
    }, 100); // Delay slightly to allow the QR code to be inserted into the DOM


    //reset button 
    if (!resetBtn) {
        resetBtn = document.createElement('button')
        resetBtn.id = 'resetBtn'
        resetBtn.textContent = 'Reset'

        resetBtn.addEventListener('click', (e) => {
            resetQRCode();
        });
    }

    // Append resetBtn after the qrContainer each time a QR code is generated
    qrContainer.insertAdjacentElement('afterend', resetBtn);
    resetBtn.style.display = 'inline-block';
}

function downloadQRcode() {
    const qrCanvas = document.querySelector('canvas');

    if (qrCanvas) {
        // Convert the canvas to a data URL (base64 string)
        const qrImage = qrCanvas.toDataURL('image/png');

        // Create a temporary anchor element to trigger the download
        const link = document.createElement('a');
        link.href = qrImage;
        link.download = 'QR_Code.png'; // The name of the file to be downloaded
        // Trigger the download by simulating a click
        link.click();

        link.remove() //remove the link

    } else {
        alert("Please generate a QR code first.");
    }

}

function resetQRCode() {
    // Clear the QR code container
    if (qrContainer) {
        qrContainer.classList.remove('show'); // Remove the fade-in class
        qrContainer.classList.add('hide');    // Apply the fade-out class

        qrContainer.remove(); // Removes the dynamically created QR 
    }

    // Reset the input fields and dropdown
    document.getElementById('qr-input').value = ''; // Reset the text input
    document.getElementById('qr-dimension').value = '100'; // Reset the dropdown

    // Hide the reset button again
    if (resetBtn) {
        resetBtn.style.display = 'none';
    }

    qrGenerated = false;
}
