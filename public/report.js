var AllexportButton = document.getElementById("AllexportButton");
AllexportButton.addEventListener("click", function () {
        var workbook=XLSX.utils.table_to_book(document.getElementById("AllTable"), {
            sheet: "All Users Data"
        });
    XLSX.writeFile(workbook, "Allusers_data.xlsx");
});

var volunteerexportButton = document.getElementById("volunteerexportButton");
volunteerexportButton.addEventListener("click", function () {
    var workbook = XLSX.utils.table_to_book(document.getElementById("volunteerTable"), { sheet: "volunteer Data" });
    XLSX.writeFile(workbook, "volunteer_data.xlsx");
});

var counselexportButton = document.getElementById("counselexportButton");
counselexportButton.addEventListener("click", function () {
    var workbook = XLSX.utils.table_to_book(document.getElementById("counselTable"), { sheet: "counsel Data" });
    XLSX.writeFile(workbook, "counsel_data.xlsx");
});
