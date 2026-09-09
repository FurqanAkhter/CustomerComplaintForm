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

const errorMessages = {
    "full-name": "Full name is required.",
    "email": "Enter a valid email address.",
    "order-no": "Order number must be 10 digits starting with 2024.",
    "product-code": "Product code must follow XX##-X###-XX# format.",
    "quantity": "Quantity must be a positive integer.",
    "complaints-group": "Select at least one complaint reason.",
    "complaint-description": "Description must be at least 20 characters.",
    "solutions-group": "Select a desired solution.",
    "solution-description": "Description must be at least 20 characters.",
};

function getErrorEl(el) {
    let errorEl = el.nextElementSibling;
    if (!errorEl || !errorEl.classList.contains("error-message")) {
        errorEl = document.createElement("span");
        errorEl.classList.add("error-message");
        errorEl.style.color = "red";
        errorEl.style.fontSize = "12px";
        errorEl.style.display = "block";
        el.insertAdjacentElement("afterend", errorEl);
    }
    return errorEl;
}

function showError(el, key, valid) {
    const errorEl = getErrorEl(el);
    errorEl.textContent = valid ? "" : errorMessages[key];
}

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
    const valid = validateForm()["full-name"];
    setBorderColor(fullName, valid);
    showError(fullName, "full-name", valid);
});

email.addEventListener("change", () => {
    const valid = validateForm()["email"];
    setBorderColor(email, valid);
    showError(email, "email", valid);
});

orderNo.addEventListener("change", () => {
    const valid = validateForm()["order-no"];
    setBorderColor(orderNo, valid);
    showError(orderNo, "order-no", valid);
});

productCode.addEventListener("change", () => {
    const valid = validateForm()["product-code"];
    setBorderColor(productCode, valid);
    showError(productCode, "product-code", valid);
});

quantity.addEventListener("change", () => {
    const valid = validateForm()["quantity"];
    setBorderColor(quantity, valid);
    showError(quantity, "quantity", valid);
});

document.getElementsByName("complaint").forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
        const valid = validateForm()["complaints-group"];
        setBorderColor(complaintsGroup, valid);
        showError(complaintsGroup.querySelector("legend"), "complaints-group", valid);
    });
});

complaintDescription.addEventListener("change", () => {
    if (otherComplaint.checked) {
        const valid = validateForm()["complaint-description"];
        setBorderColor(complaintDescription, valid);
        showError(complaintDescription, "complaint-description", valid);
    }
});

document.getElementsByName("solutions").forEach((radio) => {
    radio.addEventListener("change", () => {
        const valid = validateForm()["solutions-group"];
        setBorderColor(solutionsGroup, valid);
        showError(solutionsGroup.querySelector("legend"), "solutions-group", valid);
    });
});

solutionDescription.addEventListener("change", () => {
    if (otherSolution.checked) {
        const valid = validateForm()["solution-description"];
        setBorderColor(solutionDescription, valid);
        showError(solutionDescription, "solution-description", valid);
    }
});

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const validation = validateForm();
    const formIsValid = isValid(validation);

    setBorderColor(fullName, validation["full-name"]);
    showError(fullName, "full-name", validation["full-name"]);

    setBorderColor(email, validation["email"]);
    showError(email, "email", validation["email"]);

    setBorderColor(orderNo, validation["order-no"]);
    showError(orderNo, "order-no", validation["order-no"]);

    setBorderColor(productCode, validation["product-code"]);
    showError(productCode, "product-code", validation["product-code"]);

    setBorderColor(quantity, validation["quantity"]);
    showError(quantity, "quantity", validation["quantity"]);

    setBorderColor(complaintsGroup, validation["complaints-group"]);
    showError(complaintsGroup.querySelector("legend"), "complaints-group", validation["complaints-group"]);

    setBorderColor(solutionsGroup, validation["solutions-group"]);
    showError(solutionsGroup.querySelector("legend"), "solutions-group", validation["solutions-group"]);

    if (otherComplaint.checked) {
        setBorderColor(complaintDescription, validation["complaint-description"]);
        showError(complaintDescription, "complaint-description", validation["complaint-description"]);
    } else {
        showError(complaintDescription, "complaint-description", true);
    }

    if (otherSolution.checked) {
        setBorderColor(solutionDescription, validation["solution-description"]);
        showError(solutionDescription, "solution-description", validation["solution-description"]);
    } else {
        showError(solutionDescription, "solution-description", true);
    }

    if (formIsValid) {
        messageBox.textContent = "Complaint submitted successfully.";
        messageBox.style.color = "green";
    } else {
        messageBox.textContent = "Please fix the highlighted fields.";
        messageBox.style.color = "red";
    }
});
