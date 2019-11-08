document.querySelector("html").classList.add('js');

let fileInput = document.querySelector(".input-file"),
  browseImageBtn = document.querySelector(".input-file-trigger");
let uploadedFile;
let imageBase64;

browseImageBtn.addEventListener("keydown", function (event) {
  if (event.keyCode == 13 || event.keyCode == 32) {
    fileInput.focus();
  }
});
browseImageBtn.addEventListener("click", function (event) {
  fileInput.focus();
  return false;
});
fileInput.addEventListener("change", function (event) {
  $('.rect').remove();
  document.getElementById("face-detection-message").innerText='';
  let selectedImage = document.getElementById('selected-image');
  uploadedFile = event.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(event.target.files[0]); // read file as data url
  reader.onload = (data) => { // called once readAsDataURL is completed
    imageBase64 = data.target.result;
    selectedImage.src = imageBase64;
  };
});

