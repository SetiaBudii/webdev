let total = 0
let datanya

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

function tambahbarang(id) {
      let myData;
      myData = datanya;
      
      const inputElement = document.querySelector(`#item-${id} input`);
      var i = inputElement.getAttribute('value') ;

      let htmlContent = ''; 
      const x = document.getElementById('chart');
      id = id - 1;
      total += myData[id].harga * i;

      htmlContent += `<p>${myData[id].name}</p>
      <p>${myData[id].harga}  X  ${i}</p>
      <p>Rp.${myData[id].harga * i}</p>`;

      x.innerHTML += htmlContent;
      inputElement.setAttribute('value', 0);

      const totalHarga = document.getElementById('total');
      totalHarga.innerHTML = total;

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
      datanya = data;

      // Process the data and build the HTML
      const x = document.getElementById('list');
      let htmlContent = ''; // Accumulate the HTML content here

      for (var i = 0; i < myData.length; i++) {
        htmlContent += `<div class="col">
                            <div class="card mb-3 border border-dark" style="width: 250px;">
                                <img class="card-img-top" src="assets/img/item-${i + 1}.jpg" alt="Card image cap">
                                <div class="card-body" id="item-${i + 1}">
                                  <h5 class="card-title">${myData[i].name}</h5>
                                  <p class="card-text">${myData[i].harga}</p>
                                  <button onclick="hapus(${myData[i].id})">-</button>
                                  <input type="text" id="incDec" value="0">
                                  <button onclick="tambah(${myData[i].id})">+</button>
                                  <button class="btn btn-success m-2" onclick="tambahbarang(${myData[i].id})">Tambah Barang</button>
                                </div>
                             </div>
                        </div>`;
      }

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
