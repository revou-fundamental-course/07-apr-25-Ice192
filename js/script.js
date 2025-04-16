const form = document.getElementById("contact-form");
const result = document.getElementById("result-display");

form.addEventListener("submit", function (e) {
    e.preventDefault(); // Mencegah form reload
    console.log("Form Submitted");

  const currentTime = new Date().toLocaleString();
  const name = form.elements["name"].value;
  const birthDate = form.elements["birth-date"].value;
  const gender = form.elements["gender"].value;
  const message = form.elements["message"].value;

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
