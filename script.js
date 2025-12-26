function submitComplaint() {
  const name = document.getElementById("name").value;
  const category = document.getElementById("category").value;
  const complaint = document.getElementById("complaint").value;
  const msg = document.getElementById("msg");

  if (name === "" || category === "" || complaint === "") {
    msg.innerText = "Please fill all fields";
    msg.style.color = "red";
    return;
  }

  msg.innerText = "Complaint submitted successfully";
  msg.style.color = "green";

  document.getElementById("name").value = "";
  document.getElementById("category").value = "";
  document.getElementById("complaint").value = "";
}
