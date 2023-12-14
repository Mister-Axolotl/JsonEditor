let colon;

var selectedLanguage = "fr";
const container = document.querySelector('#json-container');
const checkboxReplaceNumbersByNames = document.querySelector('#replaceNumbersByNames');

fetch('./languages/' + selectedLanguage + '.json')
    .then(response => response.json())
    .then(data => {
        colon = data.colon;
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

export function createJsonObjectElement(key, values, depth = 0, parentElement = null) {
    const elementDiv = document.createElement('div');
    elementDiv.classList.add('array');

    let arrayName = key;

    if (checkboxReplaceNumbersByNames.checked && !isNaN(key)) {
        arrayName = parentElement ? parentElement.dataset.key : '';
        arrayName = `${arrayName.replace(/s$/, '')} ${key}`;
    }

    elementDiv.style.marginLeft = `20px`;

    elementDiv.dataset.key = arrayName;
    elementDiv.innerText = `${arrayName}${colon}`;

    if (parentElement) {
        parentElement.appendChild(elementDiv);
    } else {
        container.appendChild(elementDiv);
    }

    displayValues(values, elementDiv, depth + 1);
}

export function displayValues(values, parentElement, depth) {
    if (Array.isArray(values)) {
        values.forEach((element, index) => {
            createJsonObjectElement(index, element, depth, parentElement);
            parentElement.classList.add("json-array");
            parentElement.classList.add('arrow');
        });
    } else if (typeof values === 'object' && values !== null) {
        parentElement.classList.add("json-object");
        parentElement.classList.add('arrow');
        Object.entries(values).forEach(([property, propertyValue]) => {
            createJsonObjectElement(property, propertyValue, depth, parentElement);
        });
    } else {
        const valueDiv = document.createElement('div');
        valueDiv.innerText = `${values}`;
        valueDiv.style.marginLeft = `20px`;
        parentElement.appendChild(valueDiv);
    }
}

document.addEventListener('click', function (event) {
    const clickedElement = event.target;

    if (clickedElement.classList.contains('arrow')) {
        const parentElement = clickedElement.closest('.array');

        if (parentElement) {
            // Récupérez tous les enfants de l'élément parent
            const children = parentElement.children;

            // Parcourez tous les enfants et ajustez leur style
            for (let i = 0; i < children.length; i++) {
                const child = children[i];

                // Ignorez l'élément de la flèche (l'élément cliqué)
                if (child !== clickedElement) {
                    // Alternez entre l'affichage et la non-affichage
                    child.style.display = (child.style.display === 'none') ? '' : 'none';
                }
            }
        }
    }
});