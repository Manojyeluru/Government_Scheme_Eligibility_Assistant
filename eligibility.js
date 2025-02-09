document.addEventListener("DOMContentLoaded", function () {
    function calculateAge(dob) {
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    window.checkEligibility = function () {
        const dob = document.getElementById("dob").value;
        const income = parseInt(document.getElementById("income").value);
        const gender = document.getElementById("gender").value;
        const occupation = document.getElementById("occupation").value;
        const age = calculateAge(dob);

        if (!dob || isNaN(income)) {
            alert("Please fill out all fields correctly.");
            return;
        }

        const userDetails = { age, income, gender, occupation };
        sessionStorage.setItem("userDetails", JSON.stringify(userDetails));

        const schemes = [
            { 
                name: "Skill India Mission", 
                criteria: { age: { min: 18, max: 30 }, occupation: ["student", "unemployed"], income: { min: 10000, max: 100000 } }, 
                apply_link: "https://skillindiamission.in/" ,
                instruction_link: "https://www.skillindiadigital.gov.in/home"
            },
            { 
                name: "Atal Pension Yojana", 
                criteria: { age: { min: 28, max: 100 }, occupation: ["employed", "self-employed"], income: { min: 10000, max: 100000 } }, 
                apply_link: "https://www.npscra.nsdl.co.in/nsdl-forms.php",
                instruction_link: "https://www.skillindiadigital.gov.in/home" 
            },
            { 
                name: "Pradhan Mantri Kisan Samman Nidhi", 
                criteria: { age: { min: 18, max: 60 }, occupation: ["farmer"], income: { min: 10000, max: 600000 } }, 
                apply_link: "https://pmkisan.gov.in" ,
                instruction_link: "https://pmkisan.gov.in/HowToApply"
            },
            { 
                name: "MUDRA Yojana", 
                criteria: { age: { min: 18, max: 50 }, occupation: ["employed", "self-employed"], income: { min: 10000, max: 100000 } }, 
                apply_link: "https://www.mudra.org.in",
                instruction_link: "https://www.mudra.org.in/how-to-apply"
            },
            { 
                name: "PM Awas Yojana", 
                criteria: { age: { min: 25, max: 60 }, occupation: ["employed", "unemployed", "self-employed", "farmer"], income: { min: 10000, max: 800000 } }, 
                apply_link: "https://pmaymis.gov.in",
                instruction_link: "https://pmaymis.gov.in/HowToApply"
            }
        ];

        let resultHTML = "<h3>Eligibility Results:</h3><ul>";
        let eligible = false;

        schemes.forEach(scheme => {
            if (
                age >= scheme.criteria.age.min &&
                age <= scheme.criteria.age.max &&
                scheme.criteria.occupation.includes(occupation) &&
                income >= scheme.criteria.income.min &&
                income <= scheme.criteria.income.max
            ) {
                eligible = true;
                resultHTML += `
                    <li>
                        <strong>${scheme.name}</strong> - 
                        <a href="${scheme.apply_link}" target="_blank" style="color: blue;">Apply Here</a>
                        ${scheme.instruction_link ? `<a href="${scheme.instruction_link}" target="_blank" style="color: green; margin-left: 10px;">How to Apply</a>` : ""}
                    </li>
                `;
            }
        });

        resultHTML += "</ul>";

        if (!eligible) {
            resultHTML = "<p style='color: red;'>❌ No schemes match your criteria.</p>";
        }

        document.getElementById("result").innerHTML = resultHTML;
    };
});
