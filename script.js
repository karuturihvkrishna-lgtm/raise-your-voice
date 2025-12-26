import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// 🔑 SUPABASE CONNECTION
const supabaseUrl = "https://etolbcnppnrbgkcvhtlz.supabase.co";
const supabaseKey = "sb_publishable_yW9TdRO-Ku1dALC1JnHIoA_DcKBAQic";

const supabase = createClient(supabaseUrl, supabaseKey);

// ================= STUDENT COMPLAINT =================
window.submitComplaint = async function () {
  const name = document.getElementById("name")?.value;
  const category = document.getElementById("category")?.value;
  const complaint = document.getElementById("complaint")?.value;
  const msg = document.getElementById("msg");

  if (!name || !category || !complaint) {
    msg.innerText = "Please fill all fields";
    msg.style.color = "red";
    return;
  }

  const { error } = await supabase
    .from("complaints")
    .insert([{ name, category, complaint }]);

  if (error) {
    msg.innerText = "Error submitting complaint";
    msg.style.color = "red";
    console.error(error);
  } else {
    msg.innerText = "Complaint submitted successfully";
    msg.style.color = "green";

    document.getElementById("name").value = "";
    document.getElementById("category").value = "";
    document.getElementById("complaint").value = "";
  }
};

// ================= ADMIN LOGIN =================
window.adminLogin = async function () {
  const email = document.getElementById("adminEmail")?.value;
  const password = document.getElementById("adminPassword")?.value;
  const adminMsg = document.getElementById("adminMsg");

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    adminMsg.innerText = "Login failed: " + error.message;
    adminMsg.style.color = "red";
    return;
  }

  adminMsg.innerText = "Login successful";
  adminMsg.style.color = "green";

  loadComplaints();
};

// ================= LOAD COMPLAINTS =================
async function loadComplaints() {
  const list = document.getElementById("complaintList");
  if (!list) return;

  list.innerHTML = "Loading...";

  const { data, error } = await supabase
    .from("complaints")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    list.innerHTML = "Error loading complaints";
    console.error(error);
    return;
  }

  list.innerHTML = "";
  data.forEach(c => {
    const li = document.createElement("li");
    li.innerHTML = `<b>${c.name}</b> | ${c.category}<br>${c.complaint}<hr>`;
    list.appendChild(li);
  });
}

