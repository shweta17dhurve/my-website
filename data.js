// DRUG DATA
const drugData = [
  {
    name: "Aspirin",
    class: "NSAID",
    disease: "Cardiovascular Disease",
    gene: "PTGS1",
    gene_full: "Prostaglandin-Endoperoxide Synthase 1",
    clinical: "Reduces platelet aggregation",
    response: "Good response in most patients",
    mechanism: "Inhibits COX enzyme",
    reference: "PMID: 123456"
  },
  {
    name: "Warfarin",
    class: "Anticoagulant",
    disease: "Thrombosis",
    gene: "VKORC1",
    gene_full: "Vitamin K Epoxide Reductase Complex Subunit 1",
    clinical: "Dose varies with genotype",
    response: "Variable response",
    mechanism: "Inhibits vitamin K cycle",
    reference: "PMID: 234567"
  },
  {
    name: "Clopidogrel",
    class: "Antiplatelet",
    disease: "Myocardial Infarction",
    gene: "CYP2C19",
    gene_full: "Cytochrome P450 2C19",
    clinical: "Poor metabolizers have reduced effect",
    response: "Reduced in poor metabolizers",
    mechanism: "Inhibits platelet activation",
    reference: "PMID: 345678"
  }
];

// GENE DATA
const geneData = ["CYP2C19", "CYP2C9", "VKORC1", "PTGS1"];

// PAPERS DATA
const papersData = [
  {
    title: "Pharmacogenomics in Cardiology",
    author: "Smith et al.",
    year: "2020",
    link: "https://pubmed.ncbi.nlm.nih.gov/"
  },
  {
    title: "Gene–Drug Interaction Review",
    author: "Johnson et al.",
    year: "2021",
    link: "https://pubmed.ncbi.nlm.nih.gov/"
  }
];