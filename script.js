import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// SUPABASE CONNECTION
const supabaseUrl = "https://etolbcnppnrbgkcvhtlz.supabase.co";
const supabaseKey = "sb_publishable_yW9TdRO-Ku1dALC1JnHIoA_DcKBAQic";

const supabase = createClient(supabaseUrl, supabaseKey);

// ================= STUDENT COMPLAINT =================
window.submitComplaint = async function () {
  const name = document.getElementById("name").value;
  const category = document.getElementById("category").value;
  const complaint = document.getElementById("complaint").value;
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
