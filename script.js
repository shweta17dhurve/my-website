// ================= GLOBAL DATA =================
let drugData = [];


// ================= LOAD CSV =================
async function loadCSV() {
  try {
    let response = await fetch("data/drugs.csv");
    let text = await response.text();

    let rows = text.split("\n").slice(1); // remove header

    drugData = rows.map(row => {
      let cols = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);

      return {
        name: cols[2],        // Drug Name
        class: cols[3],       // Drug Class
        disease: cols[1],     // Disease
        gene: cols[4],        // Target Gene
        gene_full: cols[5],   // Gene Full Name
        clinical: cols[6],    // Clinical Significance
        response: cols[7],    // Drug Response
        mechanism: cols[8],   // Mechanism
        reference: cols[10]   // Reference
      };
    }).filter(d => d.name); // remove empty rows

    console.log("✅ Total drugs loaded:", drugData.length);

  } catch (error) {
    console.error("❌ Error loading CSV:", error);
  }
}


// ================= SEARCH =================
window.searchDrug = function(event) {
  event.preventDefault();

  let query = document.getElementById("searchInput").value.toLowerCase().trim();

  let found = drugData.find(d =>
    d.name.toLowerCase().includes(query)
  );

  if (found) {
    window.location.href = "drug-details.html?drug=" + found.name;
  } else {
    let box = document.getElementById("messageBox");
    if (box) {
      box.innerText = "Drug not found";
      box.style.display = "block";
    }
  }
}


// ================= DRUG LIST =================
function loadDrugList() {
  const list = document.getElementById("drugList");
  if (!list) return;

  list.innerHTML = "";

  drugData.forEach(drug => {
    let btn = document.createElement("button");
    btn.className = "list-group-item list-group-item-action";
    btn.innerText = drug.name;

    btn.onclick = () => {
      window.location.href = "drug-details.html?drug=" + drug.name;
    };

    list.appendChild(btn);
  });
}


// ================= DRUG DETAILS =================
function loadDrugDetails() {
  const params = new URLSearchParams(window.location.search);
  const drugName = params.get("drug");

  if (!drugName) return;

  const drug = drugData.find(d => d.name === drugName);
  if (!drug) return;

  // Fill data safely
  if (document.getElementById("drug"))
    document.getElementById("drug").innerText = drug.name;

  if (document.getElementById("drug_class"))
    document.getElementById("drug_class").innerText = drug.class;

  if (document.getElementById("disease"))
    document.getElementById("disease").innerText = drug.disease;

  if (document.getElementById("gene"))
    document.getElementById("gene").innerText = drug.gene;

  if (document.getElementById("gene_full"))
    document.getElementById("gene_full").innerText = drug.gene_full;

  if (document.getElementById("clinical"))
    document.getElementById("clinical").innerText = drug.clinical;

  if (document.getElementById("response"))
    document.getElementById("response").innerText = drug.response;

  if (document.getElementById("mechanism"))
    document.getElementById("mechanism").innerText = drug.mechanism;

  if (document.getElementById("reference"))
    document.getElementById("reference").innerText = drug.reference;

  if (document.getElementById("drug_img")) {
    document.getElementById("drug_img").src =
      "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/" +
      drug.name +
      "/PNG";
  }
}


// ================= DASHBOARD =================
function loadDashboard() {
  if (document.getElementById("total_genes")) {
    let genes = [...new Set(drugData.map(d => d.gene))];

    document.getElementById("total_genes").innerText = genes.length;
    document.getElementById("total_drugs").innerText = drugData.length;
    document.getElementById("total_interactions").innerText =
      genes.length * drugData.length;
  }
}


// ================= AUTO RUN =================
window.onload = function () {
  loadCSV().then(() => {
    loadDrugList();
    loadDrugDetails();
    loadDashboard();
  });
};
