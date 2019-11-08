function imageUpload(base64Image, imageHeight, imageWidth) {
  base64Image = base64Image.substr(base64Image.indexOf(',') + 1, base64Image.length);
  const body = {
    "inputs": [
      {
        "data": {
          "image": {
            "base64": base64Image
          }
        }
      }
    ]
  }
  $.ajax({
    type: "POST",
    beforeSend: function (request) {
      request.setRequestHeader("Authorization", 'Key bf11610c94544ad0bc6838042e170c47');
      request.setRequestHeader("Content-Type", 'application/json');
    },
    url: "https://api.clarifai.com/v2/models/a403429f2ddf4b49b307e318f00e528b/outputs/",
    data: JSON.stringify(body),
    processData: false,
    success: function (result) {
      let message=document.getElementById("face-detection-message");
      if(result.outputs[0].data.regions){
        let regions = result.outputs[0].data.regions;
        message.style.color="#2418fa";
        message.innerText=`${regions.length} Face's detected`;
        regions.forEach(region => {
          const tempRegion = region.region_info.bounding_box;
          const top = tempRegion.top_row * imageHeight;
          const left = tempRegion.left_col * imageWidth;
          const bottom = tempRegion.bottom_row * imageHeight;
          const right = tempRegion.right_col * imageWidth;
          drawRectangle(top, left, bottom, right);
        })
      }else {
        message.style.color="red";
        message.innerText="No Face Detected!!!"
      }

    },
    error: function() {
      alert("Error in API call please try again.");
    }
  });
}

function drawRectangle(top, left, bottom, right) {
  let imageBox = document.getElementById('image-box');
  let faceBorder = document.createElement('div');
  faceBorder.style.position = 'absolute';
  faceBorder.style.background = "transparent";
  faceBorder.style.border = "solid 2px #f00";
  faceBorder.style.top = top + 'px';
  faceBorder.style.left = left + 'px';
  faceBorder.style.height = (bottom - top) + 'px';
  faceBorder.style.width = (right - left) + 'px';
  faceBorder.classList.add("rect");
  imageBox.appendChild(faceBorder);
}

$(document).ready(function () {
  $("#selected-image").on('load', function () {
    // alert(this.src);
    imageUpload(this.src, this.height, this.width);
  });
});
