// Sortiere die Daten anhand der Keys aufsteigend, außer absteigend = true
function sortiereDaten(key, absteigend=false, sortiereDaten=CO2Daten){
  //prüfe ob der übergebene Key, nach dem sortiert werden soll, existiert
  if(["Unternehmen", "Land", "CO2Ausstoß"].includes(key)){
    if(absteigend){
      return sortiereDaten.sort((a,b) => (a[key] < b[key]) ? 1 : ((b[key] < a[key]) ? -1 : 0));
    }else{
      return sortiereDaten.sort((a,b) => (a[key] > b[key]) ? 1 : ((b[key] > a[key]) ? -1 : 0));
    }
  }else{
    return sortiereDaten;
  }  
}

// Füge die Daten in die Tabelle ein
function insertDaten(daten){
  leereTabelle();

  let tabelleBody = document.getElementById("CO2TabelleBody");
  daten.forEach(element => {

    //erstelle neue Kindelemente für dieses Element aus der Tabelle
    let tr = document.createElement("tr");
    let tdUnternehmen = document.createElement("td");
    let tdLand = document.createElement("td");
    let tdCO2Ausstoß = document.createElement("td");

    // fülle die Spalten mit Werten
    tdUnternehmen.innerText = element['Unternehmen'];
    tdLand.innerText = element['Land'];
    tdCO2Ausstoß.innerText = Number(element['CO2Ausstoß']).toLocaleString("de-DE", {minimumFractionDigits: 2});
    tdCO2Ausstoß.setAttribute("class","text-end");

    tr.appendChild(tdUnternehmen);
    tr.appendChild(tdLand);
    tr.appendChild(tdCO2Ausstoß);

    tabelleBody.appendChild(tr);
  });
}

// Utility Funktion zum leeren der Tabelle
function leereTabelle(){
  document.getElementById("CO2TabelleBody").innerHTML = "";
}

function toogleSortierung(element, absteigend=false){

  let spaltenID = element.dataset.id;

  // entferne alle bisherigen Sortierungssymbole
  for (symbol of document.getElementsByClassName("sortiersymbol")){
    symbol.remove();
  }

  // entferne alle Sortierreihenfolgen aus den Javascript Daten Attributen
  for (p of document.querySelectorAll('p[data-id]')){
    p.dataset.sort = "null";
  }

  // sortiere die daten neu
  CO2DatenSortiertGefiltert = sortiereDaten(spaltenID, absteigend, CO2DatenSortiertGefiltert);
  
  // zeige die daten an
  insertDaten(CO2DatenSortiertGefiltert);
  
  // setzte die neue Sortierreihenfolge
  element.dataset.sort = absteigend ? "absteigend" : "aufsteigend";

  // setze das neue Sortierungssymbol
  let span = document.createElement("span");
  span.setAttribute("class","sortiersymbol ps-2");
  span.innerHTML = absteigend ? "&xdtri;" : "&xutri;";
  element.appendChild(span);
}

// filter die Daten anhand der Usereingabe
function filterDaten(){
  filterObject = {
    "Land" : String(document.querySelector('input[data-FilterName="Land"]').value).toLowerCase(),
    "Unternehmen" : String(document.querySelector('input[data-FilterName="Unternehmen"]').value).toLowerCase(),
  }

  // filter die Quelldaten und füge danach eine eventuell vorhandene Sortierung ein
  CO2DatenSortiertGefiltert = CO2Daten.filter(e => {
    if(e["Land"].toLowerCase().includes(filterObject["Land"]) && e["Unternehmen"].toLowerCase().includes(filterObject["Unternehmen"])){
      return true;
    }else{
      return false;
    }
  });

  let sortierelementId = document.getElementsByClassName("sortiersymbol")[0].parentElement.dataset.id;
  let absteigend = document.getElementsByClassName("sortiersymbol")[0].parentElement.dataset.sort === "aufsteigend" ? false : true;
  CO2DatenSortiertGefiltert = sortiereDaten(sortierelementId, absteigend, CO2DatenSortiertGefiltert);

  insertDaten(CO2DatenSortiertGefiltert);
}

//co2 Daten
const CO2Daten = [
    {
      "Unternehmen": "GreenPlanet",
      "Land": "Indonesia",
      "CO2Ausstoß": 871047.01
    },
    {
      "Unternehmen": "CarbonGuardians",
      "Land": "South Korea",
      "CO2Ausstoß": 386067.01
    },
    {
      "Unternehmen": "EcoCrusaders",
      "Land": "Singapore",
      "CO2Ausstoß": 942530.25
    },
    {
      "Unternehmen": "CarbonProtectors",
      "Land": "Russia",
      "CO2Ausstoß": 577889.16
    },
    {
      "Unternehmen": "EcoWarriors",
      "Land": "Malaysia",
      "CO2Ausstoß": 458474.86
    },
    {
      "Unternehmen": "EcoWave",
      "Land": "Ireland",
      "CO2Ausstoß": 983453.74
    },
    {
      "Unternehmen": "GreenInnovators",
      "Land": "Italy",
      "CO2Ausstoß": 404870
    },
    {
      "Unternehmen": "GreenWarriors",
      "Land": "Ireland",
      "CO2Ausstoß": 869765.99
    },
    {
      "Unternehmen": "EcoSaviors",
      "Land": "Singapore",
      "CO2Ausstoß": 437858.62
    },
    {
      "Unternehmen": "CarbonWarriors",
      "Land": "Australia",
      "CO2Ausstoß": 427276.4
    },
    {
      "Unternehmen": "EcoProtectors",
      "Land": "Malaysia",
      "CO2Ausstoß": 942097.7
    },
    {
      "Unternehmen": "GreenWorld",
      "Land": "Norway",
      "CO2Ausstoß": 171864.89
    },
    {
      "Unternehmen": "GreenPlanet",
      "Land": "Brazil",
      "CO2Ausstoß": 955861.71
    },
    {
      "Unternehmen": "SustainableSolutions",
      "Land": "Australia",
      "CO2Ausstoß": 928074.27
    },
    {
      "Unternehmen": "GreenDefenders",
      "Land": "Switzerland",
      "CO2Ausstoß": 904062.86
    },
    {
      "Unternehmen": "CarbonDefenders",
      "Land": "Spain",
      "CO2Ausstoß": 410692.96
    },
    {
      "Unternehmen": "CarbonNeutral",
      "Land": "Germany",
      "CO2Ausstoß": 362004.88
    },
    {
      "Unternehmen": "EcoPioneers",
      "Land": "Thailand",
      "CO2Ausstoß": 426794.35
    },
    {
      "Unternehmen": "CarbonWarriors",
      "Land": "USA",
      "CO2Ausstoß": 83880.03
    },
    {
      "Unternehmen": "GreenInnovators",
      "Land": "Austria",
      "CO2Ausstoß": 430854.54
    },
    {
      "Unternehmen": "CarbonConscious",
      "Land": "Italy",
      "CO2Ausstoß": 998953.5
    },
    {
      "Unternehmen": "EcoWarriors",
      "Land": "New Zealand",
      "CO2Ausstoß": 265297.85
    },
    {
      "Unternehmen": "CarbonChampions",
      "Land": "Canada",
      "CO2Ausstoß": 445354.39
    },
    {
      "Unternehmen": "GreenGuardians",
      "Land": "South Africa",
      "CO2Ausstoß": 846920.37
    },
    {
      "Unternehmen": "GreenFuture",
      "Land": "Canada",
      "CO2Ausstoß": 414060
    },
    {
      "Unternehmen": "EcoChampions",
      "Land": "USA",
      "CO2Ausstoß": 953700.22
    },
    {
      "Unternehmen": "GreenHeroes",
      "Land": "Brazil",
      "CO2Ausstoß": 492780.88
    },
    {
      "Unternehmen": "GreenAdvocates",
      "Land": "Switzerland",
      "CO2Ausstoß": 128504.84
    },
    {
      "Unternehmen": "CarbonClean",
      "Land": "Switzerland",
      "CO2Ausstoß": 175561.68
    },
    {
      "Unternehmen": "GreenCrusaders",
      "Land": "China",
      "CO2Ausstoß": 591702.53
    },
    {
      "Unternehmen": "EcoWarriors",
      "Land": "Canada",
      "CO2Ausstoß": 100257.05
    },
    {
      "Unternehmen": "CarbonConscious",
      "Land": "Norway",
      "CO2Ausstoß": 744324.38
    },
    {
      "Unternehmen": "EcoVision",
      "Land": "Canada",
      "CO2Ausstoß": 647828.7
    },
    {
      "Unternehmen": "GreenWarriors",
      "Land": "Brazil",
      "CO2Ausstoß": 767920.77
    },
    {
      "Unternehmen": "CarbonConscious",
      "Land": "Sweden",
      "CO2Ausstoß": 787989.61
    },
    {
      "Unternehmen": "EcoSaviors",
      "Land": "Switzerland",
      "CO2Ausstoß": 156307.57
    },
    {
      "Unternehmen": "CarbonSavers",
      "Land": "Thailand",
      "CO2Ausstoß": 457874.63
    },
    {
      "Unternehmen": "CarbonCutters",
      "Land": "Singapore",
      "CO2Ausstoß": 578866.33
    },
    {
      "Unternehmen": "CarbonZero",
      "Land": "New Zealand",
      "CO2Ausstoß": 543947.84
    },
    {
      "Unternehmen": "EcoGuardians",
      "Land": "Netherlands",
      "CO2Ausstoß": 749202.13
    },
    {
      "Unternehmen": "GreenLife",
      "Land": "South Africa",
      "CO2Ausstoß": 322584.33
    },
    {
      "Unternehmen": "CarbonDefenders",
      "Land": "Austria",
      "CO2Ausstoß": 556124.39
    },
    {
      "Unternehmen": "CarbonBusters",
      "Land": "Norway",
      "CO2Ausstoß": 806278.98
    },
    {
      "Unternehmen": "EcoSaviors",
      "Land": "Japan",
      "CO2Ausstoß": 116444.45
    },
    {
      "Unternehmen": "GreenDefenders",
      "Land": "Canada",
      "CO2Ausstoß": 281041.1
    },
    {
      "Unternehmen": "GreenInnovators",
      "Land": "Netherlands",
      "CO2Ausstoß": 152175.88
    },
    {
      "Unternehmen": "CarbonProtectors",
      "Land": "South Korea",
      "CO2Ausstoß": 43319.54
    },
    {
      "Unternehmen": "EcoGuardians",
      "Land": "India",
      "CO2Ausstoß": 492780.88
    },
    {
      "Unternehmen": "GreenTech",
      "Land": "Switzerland",
      "CO2Ausstoß": 128504.84
    },
    {
      "Unternehmen": "CarbonBusters",
      "Land": "Thailand",
      "CO2Ausstoß": 175561.68
    },
    {
      "Unternehmen": "GreenAdvocates",
      "Land": "India",
      "CO2Ausstoß": 591702.53
    },
    {
      "Unternehmen": "GreenHeroes",
      "Land": "USA",
      "CO2Ausstoß": 100257.05
    },
    {
      "Unternehmen": "CarbonSavers",
      "Land": "France",
      "CO2Ausstoß": 744324.38
    },
    {
      "Unternehmen": "EcoVision",
      "Land": "Denmark",
      "CO2Ausstoß": 647828.7
    },
    {
      "Unternehmen": "GreenAdvocates",
      "Land": "Spain",
      "CO2Ausstoß": 767920.77
    },
    {
      "Unternehmen": "EcoChampions",
      "Land": "Ireland",
      "CO2Ausstoß": 787989.61
    },
    {
      "Unternehmen": "GreenTech",
      "Land": "Canada",
      "CO2Ausstoß": 156307.57
    },
    {
      "Unternehmen": "CarbonSavers",
      "Land": "Mexico",
      "CO2Ausstoß": 457874.63
    },
    {
      "Unternehmen": "CarbonProtectors",
      "Land": "Australia",
      "CO2Ausstoß": 578866.33
    },
    {
      "Unternehmen": "EcoStewards",
      "Land": "Thailand",
      "CO2Ausstoß": 543947.84
    }
  ];

// Fügen OnClick Events zu den Tabellenheadern hinzu
for (p of document.querySelectorAll("th p")) {
  p.dataset.sort = null;
  p.addEventListener("click", (event) => {
    let absteigend = false;
    if (event.srcElement.dataset.sort === "aufsteigend"){
      absteigend = true;
    }
    toogleSortierung(event.srcElement, absteigend);
  })
}

// Füge das input Event für die Filter ein
for (i of document.querySelectorAll('input[data-FilterName]')){
  i.addEventListener("input", (event) => {
    // Ändere das Symbol des Buttons um anzuzueigen, dass hier gerade gefiltert wird 
    let filterName = event.srcElement.dataset.filtername;
    if(event.srcElement.value){
      document.querySelector('button[data-FilterButton="' + filterName +'"]').innerHTML = "&#9930;"
    }else{
      document.querySelector('button[data-FilterButton="' + filterName +'"]').innerHTML = "&#9929;"
    }
    filterDaten();
  })
}

// Füge OnClick Events zu den Mülleimer hinzu, um die Filter zu löschen
for (span of document.querySelectorAll('span[data-deleteFilter]')){
  span.addEventListener("click", (event) =>{
    deleteWert = event.srcElement.dataset.deletefilter;
    // lösche den Inhalt des Filter Inputs
    document.querySelector('input[data-FilterName="' + deleteWert + '"]').value = "";
    // Ändere das Symbol
    document.querySelector('button[data-FilterButton="' + deleteWert +'"]').innerHTML = "&#9929;"
    let sortierelementId = document.getElementsByClassName("sortiersymbol")[0].parentElement.dataset.id;
    let absteigend = document.getElementsByClassName("sortiersymbol")[0].parentElement.dataset.sort === "aufsteigend" ? false : true;

    // Lade die ungefilterten Daten und zeige sie an
    CO2DatenSortiertGefiltert = sortiereDaten(sortierelementId, absteigend);
    filterDaten()
  });
}

document.querySelector('p[data-id="CO2Ausstoß"]').dataset.sort = "aufsteigend";
var CO2DatenSortiertGefiltert = sortiereDaten("CO2Ausstoß");
insertDaten(CO2DatenSortiertGefiltert);