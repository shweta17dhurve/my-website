// ================= GLOBAL DATA =================
let drugData = [];


// ================= LOAD CSV =================
async function loadCSV() {
  try {
    let response = await fetch("./data.csv"); // ✅ FIXED PATH
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
    window.location.href = "./drugs.html?drug=" + encodeURIComponent(found.name); // ✅ FIXED
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
      window.location.href = "./drug.html?drug=" + encodeURIComponent(drug.name); // ✅ FIXED PAGE NAME
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
