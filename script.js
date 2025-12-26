import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// ================= SUPABASE CONNECTION =================
const supabaseUrl = "https://etolbcnppnrbgkcvhtlz.supabase.co";
const supabaseKey = "sb_publishable_yW9TdRO-Ku1dALC1JnHIoA_DcKBAQic"; // Public key is safe to use on frontend

const supabase = createClient(supabaseUrl, supabaseKey);

// ================= STUDENT COMPLAINT SUBMISSION =================
window.submitComplaint = async function () {
  const name = document.getElementById("name").value.trim();
  const category = document.getElementById("category").value.trim();
  const complaint = document.getElementById("complaint").value.trim();
  const msg = document.getElementById("msg");

  // Basic validation
  if (!name || !category || !complaint) {
    msg.innerText = " Please fill out all fields before submitting.";
    msg.style.color = "red";
    return;
  }

  // Insert into Supabase table
  const { error } = await supabase
    .from("complaints")
    .insert([{ name, category, complaint }]);

  // Handle response
  if (error) {
    msg.innerText = " Failed to submit your complaint. Please try again.";
    msg.style.color = "red";
    console.error("Supabase Error:", error);
  } else {
    msg.innerText = " Your complaint has been submitted successfully!";
    msg.style.color = "green";

    // Clear fields
    document.getElementById("name").value = "";
    document.getElementById("category").value = "";
    document.getElementById("complaint").value = "";
  }
};
// ================= ADMIN LOGIN =================
window.adminLogin = async function () {
  const email = document.getElementById("adminEmail").value;
  const password = document.getElementById("adminPassword").value;
  const adminMsg = document.getElementById("adminMsg");

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    adminMsg.innerText = "Login failed";
    adminMsg.style.color = "red";
    return;
  }

  adminMsg.innerText = "Login successful";
  adminMsg.style.color = "green";

  loadComplaints();
};

// ================= LOAD COMPLAINTS =================
// ================= LOAD ALL COMPLAINTS =================
async function loadComplaints() {
  const list = document.getElementById("complaintList");
  list.innerHTML = " Loading complaints...";

  // Fetch complaints from Supabase
  const { data, error } = await supabase
    .from("complaints")
    .select("name, category, complaint, created_at")
    .order("created_at", { ascending: false });

  // Handle error
  if (error) {
    list.innerHTML = " Unable to load complaints. Please try again later.";
    console.error("Supabase Error:", error);
    return;
  }

  // No data found
  if (!data || data.length === 0) {
    list.innerHTML = " No complaints submitted yet.";
    return;
  }

  // Clear previous content
  list.innerHTML = "";

  // Display each complaint
  data.forEach((c) => {
    const li = document.createElement("li");
    li.style.marginBottom = "15px";
