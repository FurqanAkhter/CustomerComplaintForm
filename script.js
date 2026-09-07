const form = document.getElementById("form");

const fullName = document.getElementById("full-name");
const email = document.getElementById("email");
const orderNo = document.getElementById("order-no");
const productCode = document.getElementById("product-code");
const quantity = document.getElementById("quantity");

const complaintsGroup = document.getElementById("complaints-group");
const otherComplaint = document.getElementById("other-complaint");
const complaintDescription = document.getElementById("complaint-description");

const solutionsGroup = document.getElementById("solutions-group");
const otherSolution = document.getElementById("other-solution");
const solutionDescription = document.getElementById("solution-description");

const messageBox = document.getElementById("message-box");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const orderNoRegex = /^2024\d{6}$/;
const productCodeRegex = /^[A-Za-z]{2}\d{2}-[A-Za-z]\d{3}-[A-Za-z]{2}\d$/;

function isCheckedGroup(name) {
    return Array.from(document.getElementsByName(name)).some((el) => el.checked);
}

function validateForm() {
    const complaintOtherChecked = otherComplaint.checked;
    const solutionOtherChecked = otherSolution.checked;

    return {
        "full-name": fullName.value.trim() !== "",
        "email": emailRegex.test(email.value.trim()),
        "order-no": orderNoRegex.test(orderNo.value.trim()),
        "product-code": productCodeRegex.test(productCode.value.trim()),
        "quantity": Number.isInteger(Number(quantity.value)) && Number(quantity.value) > 0 && quantity.value.trim() !== "",
        "complaints-group": isCheckedGroup("complaint"),
        "complaint-description": complaintOtherChecked
            ? complaintDescription.value.trim().length >= 20
            : true,
        "solutions-group": isCheckedGroup("solutions"),
        "solution-description": solutionOtherChecked
            ? solutionDescription.value.trim().length >= 20
            : true,
    };
}

function isValid(validationObj) {
    return Object.values(validationObj).every((value) => value === true);
}

function setBorderColor(el, valid) {
    el.style.borderColor = valid ? "green" : "red";
}

fullName.addEventListener("change", () => {
    setBorderColor(fullName, validateForm()["full-name"]);
});

email.addEventListener("change", () => {
    setBorderColor(email, validateForm()["email"]);
});

orderNo.addEventListener("change", () => {
    setBorderColor(orderNo, validateForm()["order-no"]);
});

productCode.addEventListener("change", () => {
    setBorderColor(productCode, validateForm()["product-code"]);
});

quantity.addEventListener("change", () => {
    setBorderColor(quantity, validateForm()["quantity"]);
});

document.getElementsByName("complaint").forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
        setBorderColor(complaintsGroup, validateForm()["complaints-group"]);
    });
});

complaintDescription.addEventListener("change", () => {
    if (otherComplaint.checked) {
        setBorderColor(complaintDescription, validateForm()["complaint-description"]);
    }
});

document.getElementsByName("solutions").forEach((radio) => {
    radio.addEventListener("change", () => {
        setBorderColor(solutionsGroup, validateForm()["solutions-group"]);
    });
});

solutionDescription.addEventListener("change", () => {
    if (otherSolution.checked) {
        setBorderColor(solutionDescription, validateForm()["solution-description"]);
    }
});

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const validation = validateForm();
    const formIsValid = isValid(validation);

    setBorderColor(fullName, validation["full-name"]);
    setBorderColor(email, validation["email"]);
    setBorderColor(orderNo, validation["order-no"]);
    setBorderColor(productCode, validation["product-code"]);
    setBorderColor(quantity, validation["quantity"]);
    setBorderColor(complaintsGroup, validation["complaints-group"]);
    setBorderColor(solutionsGroup, validation["solutions-group"]);

    if (otherComplaint.checked) {
        setBorderColor(complaintDescription, validation["complaint-description"]);
    }

    if (otherSolution.checked) {
        setBorderColor(solutionDescription, validation["solution-description"]);
    }

    if (formIsValid) {
        messageBox.textContent = "Complaint submitted successfully.";
        messageBox.style.color = "green";
    } else {
        messageBox.textContent = "Please fix the highlighted fields.";
        messageBox.style.color = "red";
    }
});