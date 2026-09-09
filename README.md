
https://github.com/user-attachments/assets/d63cf5e2-da72-4b13-9561-ddb206c2c613


📝 Customer Complaint Form

A responsive, client-side web application designed for collecting, validating, and processing customer complaints and solution requests. Built using HTML5, CSS3, and modern JavaScript, this project features real-time dynamic form validation with Regular Expressions (RegEx) and visual feedback indicators.
📖 Overview

The Customer Complaint Form ensures high data accuracy by enforcing strict client-side validation rules on order details, contact information, complaint types, and desired outcomes. Fields highlight in real time to guide users through accurate data entry before submission.

🌟 Key Features

✅ Real-Time Regex 
Validation: Validates specific field formats:
                             Email: Standard email format checking (user@domain.com).
                             Order Number: Enforces standard pattern (2024######).
                             Product Code: Validates custom structural formatting (XX##-X###-XX#).
                             
🎯 Dynamic Conditional Logic:
Requires a detailed text explanation (minimum 20 characters) whenever "Other" is selected under complaint reasons or desired solutions.
🎨 Interactive Visual Feedback:
Outlines input borders in green (valid) or red (invalid) dynamically upon change and submission.
📱 Fully Responsive Design:
Clean layout built with custom box-shadow styling and flexible structural units for desktop and mobile devices.
♿ Accessible Elements: 
Uses semantic <fieldset> grouping, clear <label> tags, and aria-live attributes for real-time submission announcements.
🛠️ Tech StackHTML5:
Semantic forms, inputs, fieldsets, legends, and accessibility attributes.CSS3: Custom styling, responsive container sizing, box shadows, and border feedback.JavaScript (ES6+): RegEx testing, DOM event management (change, submit), conditionally required fields, and dynamic styling.

📁 File StructurePlaintextCustomer-Complaint-Form/

├── index.html     # Semantic form markup

├── style.css      # Form layout & visual styling

├── script.js      # Dynamic validation & event logic

└── README.md      # Documentation

🚀 Getting Started

Installation & Running LocallyClone the repository:Bashgit clone https://github.com/YourUsername/Customer-Complaint-Form.git
Navigate to the project directory:Bashcd Customer-Complaint-Form
Run the project: Open index.html directly in any modern browser or launch it using VS Code Live Server.⚙️ Validation Rules SummaryFieldRule / RegexFull NameCannot be empty or whitespaceEmail Address^[^\s@]+@[^\s@]+\.[^\s@]+$Order Number^2024\d{6}$ (Starts with 2024 followed by 6 digits)Product Code^[A-Za-z]{2}\d{2}-[A-Za-z]\d{3}-[A-Za-z]{2}\d$QuantityMust be a positive integer greater than 0Complaint / Solution ReasonAt least one checkbox/radio option selectedDescriptions (if "Other")Minimum 20 characters required
