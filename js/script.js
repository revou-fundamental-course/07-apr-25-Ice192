// Daftar gambar yang akan ditampilkan dalam slideshow
const imageList = [
  'assets/hero1.png',
  'assets/hero2.png',
  'assets/hero3.png'
];

// Menyimpan indeks dan menampilkan gambar sesuai dengan id nya
let currentIndex = 0;
const slideshowImage = document.getElementById('slideshow-image');

// Pengaturan agar gambar berganti
setInterval(() => {
  currentIndex = (currentIndex + 1) % imageList.length;
  slideshowImage.src = imageList[currentIndex];
}, 5000);

// Pembuatan variable dengan mengambil dari id
const form = document.getElementById("contact-form");
const result = document.getElementById("result-display");

// Mencegah form reload
form.addEventListener("submit", function (e) {
    e.preventDefault(); 
    console.log("Form Submitted");

  const currentTime = new Date().toLocaleString();
  const name = form.elements["name"].value;
  const birthDate = form.elements["birth-date"].value;
  const gender = form.elements["gender"].value;
  const message = form.elements["message"].value;

  // Menampilkan hasil dengan InnerHTML
  result.innerHTML = `
    <p><strong>Current Time : </strong> ${currentTime}</p>
    <p><strong>Nama : </strong> ${name}</p>
    <p><strong>Tanggal Lahir : </strong> ${birthDate}</p>
    <p><strong>Jenis Kelamin : </strong> ${gender}</p>
    <p><strong>Pesan : </strong><br>${message}</p>
  `;

  // Mengupdate nama di hero section
  document.getElementById('user-name').innerText = name;


});
