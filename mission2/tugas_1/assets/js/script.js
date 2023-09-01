let total = 0
let datanya

function tambah(id) {
  //Mencari nilai qty berdasarkan barang yang dipilih
  const inputElement = document.querySelector(`#item-${id} input`);

  //Mengambil nilai qty dan ubah ke integer
  var i = inputElement.getAttribute('value');
  i = parseInt(i);

  //Menambahkan nilai qty
  inputElement.setAttribute('value', i + 1);
}

function hapus(id) {
  //Mencari nilai qty berdasarkan barang yang dipilih
  const inputElement = document.querySelector(`#item-${id} input`);

  //Mengambil nilai qty dan ubah ke integer
  var i = inputElement.getAttribute('value');

  //kondisi agar nilai qty tidak minus
  if (!checkQuantityMinus(i)) {
    i = parseInt(i);
    inputElement.setAttribute('value', i - 1); //mengurangi nilai qty
  }
}

function tambahbarang(id) {
  let myData;
  myData = datanya;

  //Mencari nilai qty berdasarkan barang yang dipilih
  const inputElement = document.querySelector(`#item-${id} input`);

  //Mengambil nilai qty dan ubah ke integer
  var i = inputElement.getAttribute('value');

  //Kondisi agar barang tidak ditambahkan jika qty = 0
  if (i != 0) {

    //Menampilkan list barang yang dipilih
    let htmlContent = '';
    const x = document.getElementById('chart');
    id = id - 1;
    total += myData[id].harga * i;

    htmlContent += `
      <div class="row listchart">
        <div class="col-6 ">
          <p class="m-0">${myData[id].name}</p>
          <p>${formatIDR(myData[id].harga)}  X  ${i}</p>
        </div>
        <div class="col-6 d-flex align-items-center justify-content-end ">
          <p>${formatIDR(myData[id].harga * i)}</p>
        </div>
      </div>
      `;

    x.innerHTML += htmlContent;

    //Mengembalikan nilai qty menjadi 0
    inputElement.setAttribute('value', 0);

    //Menampilkan total harga, pajak, dan total bayar
    const totalHarga = document.getElementById('totalharga');
    totalHarga.innerHTML = formatIDR(total);

    const totalPajak = document.getElementById('totalpajak');
    totalPajak.innerHTML = formatIDR(total * 0.11);

    const totalBayar = document.getElementById('totalfinal');
    totalBayar.innerHTML = formatIDR(total + (total * 0.11));
  }

}


function listbarang() {
  let myData;

  //fetch data dari json
  fetch("./dataProduct.json")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      myData = data;
      datanya = data;

      const x = document.getElementById('list');
      let htmlContent = ''; 

      //menampilkan data-data barang
      for (var i = 0; i < myData.length; i++) {
        htmlContent += `<div class="col">
                            <div class="card mb-3 border border-dark p-2 shadow" style="width: 250px;">
                                <img class="card-img-top" src="assets/img/item-${i + 1}.jpg" alt="Card image cap">
                                <div class="card-body text-center" id="item-${i + 1}">
                                  <h5 class="card-title">${myData[i].name}</h5>
                                  <p class="card-text">${formatIDR(myData[i].harga)}</p>
                                  <button class="btn-qty-del" onclick="hapus(${myData[i].id})"><p>-</p></button>
                                  <input type="text" id="incDec" value="0" disabled>
                                  <button class="btn-qty-add" onclick="tambah(${myData[i].id})"><p>+</p></button>
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


// Function to format number as IDR
function formatIDR(number) {
  if (!Number.isInteger(number) || number < 0) {
    return "Invalid input";
  }

  const formattedNumber = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Add "IDR" symbol and return the formatted string
  return `Rp. ${formattedNumber}`;
}

