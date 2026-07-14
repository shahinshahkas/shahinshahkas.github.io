const CSV_FILE = "data/transferlog.csv";

let records = [];

// Load CSV
Papa.parse(CSV_FILE, {

    download: true,
    header: true,
    skipEmptyLines: true,

    complete: function (results) {

        records = results.data;

        console.log(records);

        populateOfficerDropdown();

    }

});

// Populate Officer Dropdown
function populateOfficerDropdown() {

    const dropdown = document.getElementById("searchValue");

    dropdown.innerHTML = "";

    const officers = [...new Set(records.map(r => r["Officer Name"]))];

    officers.sort();

    officers.forEach(name => {

        if (!name) return;

        const option = document.createElement("option");

        option.value = name;

        option.textContent = name;

        dropdown.appendChild(option);

    });

}

// Search Button
document
.getElementById("searchValue")
.addEventListener("change", searchOfficer);

// Search Function
function searchOfficer() {

    const officer = document.getElementById("searchValue").value;

    const results = records.filter(r => r["Officer Name"] === officer);

    const tbody = document.querySelector("tbody");

    tbody.innerHTML = "";

    if(results.length===0){

        tbody.innerHTML=`
        <tr>
            <td colspan="4">
                No records found.
            </td>
        </tr>
        `;

        return;

    }

    results.forEach(r=>{

        tbody.innerHTML+=`

        <tr>

            <td>${r["Officer Name"]}</td>

            <td>${r["Designation"]}</td>

            <td>${r["Department"]}</td>

            <td>${r["District"]}</td>

        </tr>

        `;

    });

}