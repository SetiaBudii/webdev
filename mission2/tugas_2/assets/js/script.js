function tambah(id) {
  const inputElement = document.querySelector(`#item-${id} input`);
  var i = inputElement.getAttribute('value');
  i = parseInt(i);
  inputElement.setAttribute('value', i + 1);
}

function hapus(id) {
  const inputElement = document.querySelector(`#item-${id} input`);
  var i = inputElement.getAttribute('value');
  if (!checkQuantityMinus(i)) {
    i = parseInt(i);
    inputElement.setAttribute('value', i - 1);
  }
}

function tambahbarang(clickedButton) {
  const parentElement = clickedButton.parentElement;

  const items = [
    { nama: "Iphone 12", harga: 15000 },
    { nama: "Iphone 14", harga: 30000 }
  ];

  const inputElement = parentElement.querySelector('input');

  // Retrieve the value of the <input> element
  const inputValue = inputElement.value;

  var x = document.getElementById('barang')
  x.innerHTML = `<p> ${items[inputValue].nama} </p>`;
}


function listbarang() {
  let myData;
  fetch("./dataProduct.json")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      // Save the JSON data to a variable
      myData = data;

      // Process the data and build the HTML
      const x = document.getElementById('list');
      let htmlContent = ''; // Accumulate the HTML content here

      for (var i = 0; i < myData.length; i++) {
        htmlContent += `<div class="col">
                            <div class="card p-3" style="width: 18rem;">
                                <img class="card-img-top" src="assets/img/item-${i + 1}.jpg" alt="Card image cap">
                                <div class="card-body" id="item-${i + 1}">
                                  <h5 class="card-title">${myData[i].name}</h5>
                                  <p class="card-text">${myData[i].harga}</p>
                                  <button onclick="hapus(${myData[i].id})">-</button>
                                  <input type="text" id="incDec" value="0">
                                  <button onclick="tambah(${myData[i].id})">+</button>
                                  <button class="btn btn-success m-2" onclick="tambahbarang()">Tambah Barang</button>
                                </div>
                             </div>
                        </div>`;
      }

      // Set the accumulated HTML content to the 'x' element
      x.innerHTML = htmlContent;
    })
    .catch((error) => {
      console.error("Error fetching JSON:", error);
    });
}

function checkQuantityMinus(quantity) {
  if (quantity <= 0) {
    return true;
  }
  return false;
}
