// GLOBAL DATA
let drugData = [];

// ================= LOAD CSV =================
async function loadCSV() {
  let response = await fetch("data/drugs.csv");
  let text = await response.text();

  let rows = text.split("\n").slice(1);

  drugData = rows.map(row => {
    let cols = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);

    return {
      name: cols[2],
      class: cols[3],
      disease: cols[1],
      gene: cols[4],
      gene_full: cols[5],
      clinical: cols[6],
      response: cols[7],
      mechanism: cols[8],
      reference: cols[10]
    };
  }).filter(d => d.name);

  console.log("Total drugs loaded:", drugData.length);
}

// ================= SEARCH =================
function searchDrug(event) {
  event.preventDefault();

  let query = document.getElementById("searchInput").value.toLowerCase().trim();

  let found = drugData.find(d =>
    d.name.toLowerCase().includes(query)
  );

  if (found) {
    window.location.href = "drug-details.html?drug=" + found.name;
  } else {
    let box = document.getElementById("messageBox");
    box.innerText = "Drug not found";
    box.style.display = "block";
  }
}

// ================= DRUG LIST =================
function loadDrugList() {
  const list = document.getElementById("drugList");
  if (!list) return;

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

  document.getElementById("drug").innerText = drug.name;
  document.getElementById("drug_class").innerText = drug.class;
  document.getElementById("disease").innerText = drug.disease;
  document.getElementById("gene").innerText = drug.gene;
  document.getElementById("gene_full").innerText = drug.gene_full;
  document.getElementById("clinical").innerText = drug.clinical;
  document.getElementById("response").innerText = drug.response;
  document.getElementById("mechanism").innerText = drug.mechanism;
  document.getElementById("reference").innerText = drug.reference;

  document.getElementById("drug_img").src =
    "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/" + drug.name + "/PNG";
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
