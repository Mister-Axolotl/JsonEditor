import { showError, showSuccess, createJsonObjectElement } from "./functions.js";

var selectedLanguage = "fr";

fetch('./languages/' + selectedLanguage + '.json')
    .then(response => response.json())
    .then(data => {
        document.getElementById('jsonForm').addEventListener('submit', function (e) {
            e.preventDefault(); // prevent the default behavior associated with this event (submit)

            var fileInput = document.querySelector('#jsonFile');
            var jsonContainer = document.querySelector('#json-container');
            jsonContainer.innerHTML = "";

            var file = fileInput.files[0]; // takes the list of selected files
            var reader = new FileReader(); // is used to read the contents of the file

            reader.onload = function (e) { // triggered when the entire file is read
                var content = e.target.result; // content of the file
                var jsonContent;

                try {
                    jsonContent = JSON.parse(content);
                } catch (error) {
                    showError(data.errorMessageInvalidJSON, error);
                    return;
                }

                for (const key in jsonContent) {
                    if (jsonContent.hasOwnProperty(key)) {
                        createJsonObjectElement(key, jsonContent[key]);
                    }
                }
            };

            reader.readAsText(file);
        });
    })
    .catch(error => console.error('Error loading JSON file:', error));
