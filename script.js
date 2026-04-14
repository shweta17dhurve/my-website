// ---------- SEARCH FUNCTION ----------
function searchDrug(event) {
  event.preventDefault();

  let query = document.getElementById("searchInput").value.toLowerCase();

  let found = drugData.find(d => d.name.toLowerCase() === query);

  if (found) {
    // Redirect to details page
    window.location.href = "drug-details.html?drug=" + found.name;
  } else {
    let box = document.getElementById("messageBox");
    box.innerText = "Drug not found";
    box.style.display = "block";
  }
}


// ---------- LOAD DRUG DETAILS ----------
function loadDrugDetails() {
  const params = new URLSearchParams(window.location.search);
  const drugName = params.get("drug");

  if (!drugName) return;

  const drug = drugData.find(d => d.name === drugName);

  if (!drug) return;

  // Fill values
  document.getElementById("drug").innerText = drug.name;
  document.getElementById("drug_title").innerText = drug.name + " Pharmacogenomic Profile";
  document.getElementById("drug_class").innerText = drug.class;
  document.getElementById("disease").innerText = drug.disease;
  document.getElementById("gene").innerText = drug.gene;
  document.getElementById("gene_full").innerText = drug.gene_full;
  document.getElementById("clinical").innerText = drug.clinical;
  document.getElementById("response").innerText = drug.response;
  document.getElementById("mechanism").innerText = drug.mechanism;
  document.getElementById("reference").innerText = drug.reference;

  // Image
  document.getElementById("drug_img").src =
    "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/" + drug.name + "/PNG";

  // Links
  document.getElementById("pubmed_link").href =
    "https://pubmed.ncbi.nlm.nih.gov/?term=" + drug.name;

  document.getElementById("gene_link").href =
    "https://www.ncbi.nlm.nih.gov/gene/?term=" + drug.gene;

  document.getElementById("drugbank_link").href =
    "https://go.drugbank.com/unearth/q?searcher=drugs&query=" + drug.name;
}


// ---------- LOAD DRUG LIST ----------
function loadDrugList() {
  const list = document.getElementById("drugList");
  if (!list) return;

  drugData.forEach(drug => {
    let btn = document.createElement("button");
    btn.className = "list-group-item list-group-item-action text-start";
    btn.innerText = drug.name;

    btn.onclick = () => {
      window.location.href = "drug-details.html?drug=" + drug.name;
    };

    list.appendChild(btn);
  });
}


// ---------- LOAD GENE LIST ----------
function loadGeneList() {
  const list = document.getElementById("geneList");
  if (!list) return;

  geneData.forEach(gene => {
    let li = document.createElement("li");
    li.className = "list-group-item";
    li.innerText = gene;
    list.appendChild(li);
  });
}


// ---------- LOAD PAPERS ----------
function loadPapers() {
  const tbody = document.querySelector("#papersTable tbody");
  if (!tbody) return;

  papersData.forEach(p => {
    let row = `
      <tr>
        <td>${p.title}</td>
        <td>${p.author}</td>
        <td>${p.year}</td>
        <td><a href="${p.link}" target="_blank">View</a></td>
      </tr>
    `;
    tbody.innerHTML += row;
  });
}


// ---------- DASHBOARD ----------
function loadDashboard() {
  if (document.getElementById("total_genes")) {
    document.getElementById("total_genes").innerText = geneData.length;
    document.getElementById("total_drugs").innerText = drugData.length;
    document.getElementById("total_interactions").innerText =
      geneData.length * drugData.length;
  }
}


// ---------- AUTO RUN ----------
window.onload = function () {
  loadDrugDetails();
  loadDrugList();
  loadGeneList();
  loadPapers();
  loadDashboard();
};