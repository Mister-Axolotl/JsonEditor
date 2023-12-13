let lineNumberMessage, lineContent, arrayContent;

var selectedLanguage = "fr";

fetch('./languages/' + selectedLanguage + '.json')
    .then(response => response.json())
    .then(data => {
        lineNumberMessage = data.lineNumberMessage;
        arrayContent = data.arrayContent;
        lineContent = data.lineContent;
    })
    .catch(error => console.error('Error loading JSON file:', error));

export function showSuccess(text) {
    const successContainer = document.querySelector('.messages-container');
    const successMessage = document.createElement('div');
    successMessage.textContent = text;
    successMessage.classList.add('success-message');

    successContainer.prepend(successMessage);

    setTimeout(() => {
        successMessage.classList.add('hide');
        setTimeout(() => {
            successMessage.remove();
        }, 300);
    }, 2000);
}

export function showError(text) {
    const errorContainer = document.querySelector('.messages-container');
    const errorMessage = document.createElement('div');
    errorMessage.textContent = text;
    errorMessage.classList.add('error-message');

    errorContainer.prepend(errorMessage);

    setTimeout(() => {
        errorMessage.classList.add('hide');
        setTimeout(() => {
            errorMessage.remove();
        }, 300);
    }, 2000);
}

export function sendArray(content) {
    const lines = content.split('\n');
    let lineNumber = 0;

    const regex = /"([^"]*)"/g; // Regular expression to extract content enclosed in double quotes
    
    lines.forEach(function (line) {
        lineNumber++;
        var container = document.getElementById('container');
        var arrayDiv;
        if (line.includes('{')) {
            const matches = line.match(regex);

            if (matches) {
                matches.forEach(match => {
                    const values = match.substring(1, match.length - 1).split(',').map(value => value.trim());
                    console.log("Array:", values);
                });
            } else {
                
                /*matches.forEach(match => {
                    let array = match.replaceAll('"', '').replaceAll("'", '')

                    arrayDiv = document.createElement('div');
                    arrayDiv.classList.add('array');

                    var lineNumberDiv = document.createElement('div');
                    lineNumberDiv.textContent = lineNumberMessage + lineNumber;
                    arrayDiv.appendChild(lineNumberDiv);

                    var arrayContentDiv = document.createElement('div');
                    arrayContentDiv.textContent = arrayContent + array;
                    arrayDiv.appendChild(arrayContentDiv);
                });*/
            }
        } else {
            var arrayContentDiv = document.createElement('div');
            arrayDiv = document.createElement('div');
            arrayDiv.classList.add('array');
            let array = line.replaceAll('"', '').replaceAll("'", '');
            arrayContentDiv.textContent = lineContent + array;
            arrayDiv.appendChild(arrayContentDiv);
            container.appendChild(arrayDiv);
        }
    });
}

/*if (!line.includes('{') && !line.includes('}')) {
    if (line.includes('[')) { // detect an array
        var matches = line.match(regex);
        var container = document.getElementById('container');
        var arrayDiv;
        if (matches) {
            matches.forEach(function (match) {
                let array = match.replaceAll('"', '').replaceAll("'", '')

                arrayDiv = document.createElement('div');
                arrayDiv.classList.add('array');

                var lineNumberDiv = document.createElement('div');
                lineNumberDiv.textContent = lineNumberMessage + lineNumber;
                arrayDiv.appendChild(lineNumberDiv);

                var arrayContentDiv = document.createElement('div');
                arrayContentDiv.textContent = arrayContent + array;
                arrayDiv.appendChild(arrayContentDiv);
            });
        }
        container.appendChild(arrayDiv);
    }
}*/