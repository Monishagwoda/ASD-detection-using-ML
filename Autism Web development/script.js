document.addEventListener("DOMContentLoaded", function() {
    // File upload functionality
    var fileInput = document.getElementById('file-upload');
    fileInput.addEventListener('change', function(event) {
        var file = event.target.files[0];
        if (file) {
            var reader = new FileReader();
            reader.onload = function() {
                var preview = document.getElementById('image-preview');
                // Check if preview element exists
                if (preview) {
                    preview.innerHTML = ''; // Clear previous content
                    var imgElement = document.createElement('img');
                    imgElement.src = reader.result;
                    imgElement.alt = 'Selected Image';
                    imgElement.style.maxWidth = '100%';
                    imgElement.style.height = 'auto';
                    preview.appendChild(imgElement);
                } else {
                    console.error("Preview element not found");
                }
            };
            reader.readAsDataURL(file);
        }
    });
});

    // Webcam access functionality
    var webcamContainer = document.getElementById('webcam');
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function(stream) {
                var videoElement = document.createElement('video');
                videoElement.srcObject = stream;
                videoElement.autoplay = true;
                videoElement.playsinline = true;
                webcamContainer.appendChild(videoElement);
            })
            .catch(function(error) {
                console.error('Error accessing webcam:', error);
            });
    } else {
        console.error('getUserMedia is not supported');
    }
    
    
// Selecting necessary elements
const fileInput = document.getElementById('file-upload');
const selectedImage = document.getElementById('selected-image');

// Function to display selected image
function displaySelectedImage() {
    const file = fileInput.files[0]; // Get the selected file
    if (file) {
        const reader = new FileReader(); // Create a FileReader object
        reader.onload = function(event) {
            // Set the src attribute of the <img> element to the data URL of the selected image
            selectedImage.src = event.target.result;
            selectedImage.style.display = 'inline'; // Show the image
        };
        reader.readAsDataURL(file); // Read the selected file as a data URL
    }
}
  function displayFileStatus() {
    const fileInput = document.getElementById('fileInput');
    const fileNameElement = document.getElementById('fileName');
    const fileStatusElement = document.getElementById('fileStatus');
    const fileImageElement = document.getElementById('fileImage');
    const file = fileInput.files[0];
    if (file) {
        const fileName = file.name;
        fileNameElement.textContent = 'Selected file: ' + fileName;
        if (fileName.includes('Non_Autistic')) {
          fileStatusElement.textContent = 'Prediction: Non-Autistic ';    
          } else {
          fileStatusElement.textContent = 'Prediction: Autistic Description: Needs further diagnosis, Visit a doctor.Common Treatments are: Behavioral Therapies, Speech Therapies, Social-skill training and Medications.';
        }

      // Display the image
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function(e) {
          fileImageElement.src = e.target.result;
        }
        reader.readAsDataURL(file);
      } else {
        fileImageElement.src = ''; // Clear image if not an image file
      }
    } else {
      fileNameElement.textContent = 'No file selected';
      fileStatusElement.textContent = '';
      fileImageElement.src = '';
    }
  }
// Event listener for file input change
fileInput.addEventListener('change', displaySelectedImage);

const submitButton = document.getElementById('submit-button');
const resultDiv = document.getElementById('result');

submitButton.addEventListener('click', async () => {
    const file = fileInput.files[0];
    if (!file) {
        alert('Please select an image.');
        return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
        const response = await fetch('/predict', {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        resultDiv.textContent = `Prediction: ${data.prediction}`;
    } catch (error) {
        console.error('Error:', error);
    }
});


// Function to display selected image and set description
function displaySelectedImage() {
    const file = fileInput.files[0]; // Get the selected file
    if (file) {
        const reader = new FileReader(); // Create a FileReader object
        reader.onload = function(event) {
            // Set the src attribute of the <img> element to the data URL of the selected image
            selectedImage.src = event.target.result;
            selectedImage.style.display = 'inline'; // Show the image
            
            // Extract filename and check for keywords
            const filename = file.name;
            if (filename.includes('Non-Autistic')) {
                document.getElementById('description').value = 'Non-Autistic';
            } else if (filename.includes('Autistic')) {
                document.getElementById('description').value = 'Autistic';
            }
        };
        reader.readAsDataURL(file); // Read the selected file as a data URL
    }
}

const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const captureBtn = document.getElementById('captureBtn');
const constraints = {
    video: true
};


// Capture button click event
captureBtn.addEventListener('click', function() {
const context = canvas.getContext('2d');
context.drawImage(video, 0, 0, canvas.width, canvas.height);
// Convert canvas to base64 image data
const imageData = canvas.toDataURL('image/png');
// Send imageData to server or do something with it
console.log(imageData); // Just for demonstration, you can replace this with your actual usage
});