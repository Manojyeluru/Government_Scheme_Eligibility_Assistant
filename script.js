document.addEventListener("DOMContentLoaded", function () {
    function showSchemes() {
        let occupation = document.getElementById("occupation").value;
        let schemesDropdown = document.getElementById("schemes");
        
        // Clear previous options
        schemesDropdown.innerHTML = '<option value="">--Select--</option>';

        // Define schemes based on occupation
        let schemes = {
            student: ["National Scholarship Scheme", "PM eVidya", "Skill India"],
            employed: ["EPFO Pension Scheme", "Pradhan Mantri Jan Arogya Yojana"],
            unemployed: ["Mahatma Gandhi NREGA", "PM Kaushal Vikas Yojana"],
            farmer: ["PM Kisan Samman Nidhi", "Fasal Bima Yojana"],
            senior_citizen: ["Pradhan Mantri Vaya Vandana Yojana", "Varishtha Pension Bima Yojana"],
            others: ["Ayushman Bharat", "Stand-Up India Scheme"]
        };

        // Populate schemes based on selected occupation
        if (occupation && schemes[occupation]) {
            schemes[occupation].forEach(scheme => {
                let option = document.createElement("option");
                option.value = scheme;
                option.textContent = scheme;
                schemesDropdown.appendChild(option);
            });
        }
    }

    // Attach the function to the dropdown change event
    document.getElementById("occupation").addEventListener("change", showSchemes);
});
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("income").addEventListener("input", function () {
        if (this.value < 60000) {
            this.value != 0;  // Resets negative values to 0
        }
    });
});





document.addEventListener("DOMContentLoaded", function () {
    // Load selected scheme from sessionStorage
    let selectedScheme = sessionStorage.getItem("selectedScheme");
    if (selectedScheme) {
        document.getElementById("scheme-name").textContent = selectedScheme;
    } else {
        document.getElementById("scheme-name").textContent = "No scheme selected!";
    }
});

// Eligibility check function
function checkEligibility() {
    let dob = document.getElementById("dob").value;
    let income = parseFloat(document.getElementById("income").value);
    let scheme = sessionStorage.getItem("selectedScheme");

    if (!dob || isNaN(income)) {
        alert("Please fill all the details correctly!");
        return;
    }

    let age = calculateAge(dob);

    // Define eligibility criteria
    let schemeCriteria = {
        "National Scholarship Scheme": { minAge: 18, maxIncome: 200000 },
        "PM eVidya": { minAge: 15, maxIncome: 300000 },
        "Skill India": { minAge: 16, maxIncome: 250000 },
        "EPFO Pension Scheme": { minAge: 60, maxIncome: 500000 },
        "Pradhan Mantri Jan Arogya Yojana": { minAge: 0, maxIncome: 500000 },
        "Mahatma Gandhi NREGA": { minAge: 18, maxIncome: 100000 },
        "PM Kaushal Vikas Yojana": { minAge: 18, maxIncome: 250000 },
        "PM Kisan Samman Nidhi": { minAge: 21, maxIncome: 150000 },
        "Fasal Bima Yojana": { minAge: 18, maxIncome: 200000 },
        "Pradhan Mantri Vaya Vandana Yojana": { minAge: 60, maxIncome: 800000 },
        "Varishtha Pension Bima Yojana": { minAge: 60, maxIncome: 600000 },
        "Ayushman Bharat": { minAge: 0, maxIncome: 500000 },
        "Stand-Up India Scheme": { minAge: 21, maxIncome: 400000 }
    };

    let applyLinks = {
        "National Scholarship Scheme": "https://scholarships.gov.in/",
        "PM eVidya": "https://pmevidya.education.gov.in/",
        "Skill India": "https://skillindia.gov.in/",
        "EPFO Pension Scheme": "https://www.epfindia.gov.in/",
        "Pradhan Mantri Jan Arogya Yojana": "https://www.pmjay.gov.in/",
        "Mahatma Gandhi NREGA": "https://nrega.nic.in/",
        "PM Kaushal Vikas Yojana": "https://www.pmkvyofficial.org/",
        "PM Kisan Samman Nidhi": "https://pmkisan.gov.in/",
        "Fasal Bima Yojana": "https://pmfby.gov.in/",
        "Pradhan Mantri Vaya Vandana Yojana": "https://licindia.in/",
        "Varishtha Pension Bima Yojana": "https://licindia.in/",
        "Ayushman Bharat": "https://www.pmjay.gov.in/",
        "Stand-Up India Scheme": "https://www.standupmitra.in/"
    };

    let resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "";

    if (scheme && schemeCriteria[scheme]) {
        let criteria = schemeCriteria[scheme];

        if (age >= criteria.minAge && income <= criteria.maxIncome) {
            resultDiv.innerHTML = `<p style="color: green;">✅ You are eligible for ${scheme}.</p>
                                   <a href="${applyLinks[scheme]}" class="btn apply-btn" target="_blank">Apply Here</a>`;
        } else {
            resultDiv.innerHTML = `<p style="color: red;">❌ You are not eligible for ${scheme}.</p>`;
        }
    } else {
        resultDiv.innerHTML = `<p style="color: red;">⚠ No scheme selected. Please go back and select a scheme.</p>`;
    }
}

// Function to calculate age from DOB
function calculateAge(dob) {
    let birthDate = new Date(dob);
    let today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    let monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

// Save selected scheme in sessionStorage from schemes.html
function saveScheme() {
    let selectedScheme = document.getElementById("schemes").value;
    if (selectedScheme) {
        sessionStorage.setItem("selectedScheme", selectedScheme);
    }
}
