/* ―――――――――――――――――――― LANGUAGES ―――――――――――――――――――― */

let colon;
var selectedLanguage = "fr";


fetch('./languages/' + selectedLanguage + '.json')
.then(response => response.json())
.then(data => {
    colon = data.colon;
})
.catch(error => console.error('Error loading JSON file:', error));

/* ―――――――――――――――――――― DOM VARIABLES ―――――――――――――――――――― */

const container = document.querySelector('#json-container');
const checkboxReplaceNumbersByNames = document.querySelector('#replaceNumbersByNames');

/* ―――――――――――――――――――― SHOW MESSAGE SUCCESS ―――――――――――――――――――― */

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

/* ―――――――――――――――――――― SHOW MESSAGE ERROR ―――――――――――――――――――― */

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

/* ―――――――――――――――――――― CREATE OBJECT OR ARRAY ―――――――――――――――――――― */

export function createJsonObjectElement(key, values, depth = 0, parentElement = null) {
    const elementDiv = document.createElement('div');
    elementDiv.classList.add('array');

    let arrayName = key;

    if (checkboxReplaceNumbersByNames.checked && !isNaN(key)) {
        arrayName = parentElement ? parentElement.dataset.key : '';
        arrayName = `${arrayName.replace(/s$/, '')} ${key}`;
    }

    elementDiv.style.marginLeft = `20px`;
    if (depth > 0 && key !== undefined) {
        elementDiv.style.marginLeft = `40px`;
    }

    elementDiv.dataset.key = arrayName;
    elementDiv.innerText = `${arrayName}${colon}`;

    if (parentElement) {
        parentElement.appendChild(elementDiv);
    } else {
        container.appendChild(elementDiv);
    }

    displayValues(values, elementDiv, depth + 1);
}

/* ―――――――――――――――――――― CLOSE ALL DEFAULT CHILDREN OF THE JSON FILE ―――――――――――――――――――― */

export function closeAllDefaultChildren(parentElement) {
    parentElement.querySelectorAll('.array').forEach(child => {
        child.style.display = 'none';
    });
}

/* ―――――――――――――――――――― DISPLAY OBJECT, ARRAY OR CONTENT  ―――――――――――――――――――― */

export function displayValues(values, parentElement, depth) {
    if (Array.isArray(values)) {
        values.forEach((element, index) => {
            createJsonObjectElement(index, element, depth, parentElement);
            parentElement.classList.add("json-array");
            parentElement.classList.add('arrow');
        });

        closeAllDefaultChildren(parentElement);

    } else if (typeof values === 'object' && values !== null) {
        parentElement.classList.add("json-object");
        parentElement.classList.add('arrow');

        
        Object.entries(values).forEach(([property, propertyValue]) => {
            createJsonObjectElement(property, propertyValue, depth, parentElement);
        });

        closeAllDefaultChildren(parentElement);
    } else {
        const valueDiv = document.createElement('div');
        valueDiv.innerText = `${values}`;
        valueDiv.style.marginLeft = `20px`;
        parentElement.appendChild(valueDiv);
    }
}

/* ―――――――――――――――――――― OPEN/CLOSE CONTENT OF OBJECTS/ARRAYS ―――――――――――――――――――― */

document.addEventListener('click', function (event) {
    const clickedElement = event.target;

    if (clickedElement.classList.contains('arrow')) {
        const parentElement = clickedElement.closest('.array');

        if (parentElement) {
            const children = parentElement.children;

            for (let i = 0; i < children.length; i++) {
                const child = children[i];

                // Ignore the arrow element (the clicked element)
                if (child !== clickedElement) {
                    child.style.display = (child.style.display === 'none') ? '' : 'none';
                }
            }

            clickedElement.classList.toggle('active');
        }
    }
});

/* ―――――――――――――――――――― GET THE CURRENT LANGUAGE  ―――――――――――――――――――― */

export function getLanguage() {
    
}