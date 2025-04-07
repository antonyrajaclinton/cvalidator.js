function inputRequiredElements(individualElement) {
    let returnData = false;
    if (individualElement?.disabled) {
        return true;
    }
    if (individualElement?.value !== null && individualElement.value.trim() === "") {
        if (!document.getElementById(individualElement?.id + "_id_error_message")) {
            let newChild = document.createElement("small");
            let getPlaceholder = individualElement.getAttribute("placeholder")?.toLowerCase();
            getPlaceholder = getPlaceholder?.replaceAll("enter", "")?.replaceAll("your", "")?.replaceAll('select', "");
            newChild.textContent = getPlaceholder ? getPlaceholder + " required" : "this field required";
            newChild.style.color = "red";
            newChild.id = individualElement?.id ? individualElement?.id + "_id_error_message" : "undefined_id_error_message";
            individualElement.parentNode.appendChild(newChild);
        }
    } else if (individualElement?.id !== null && individualElement?.value !== null && individualElement?.value.trim() !== "") {
        document.getElementById(individualElement?.id + "_id_error_message")?.remove();
        returnData = true;
    }
    return returnData;
}
function radioChackboxRequiredElements(individualElement) {
    let returnData = false;
    let selectedElement = 0;
    for (let radioData of document.querySelectorAll('input[name="' + individualElement.name + '"]')) {
        if (radioData.checked && radioData?.value) {
            selectedElement = 1;
        }
    }
    if (selectedElement === 0) {
        if (!document.getElementById(individualElement.name + "_id_error_message")) {
            let newChild = document.createElement("small");
            let getPlaceholder = individualElement.getAttribute("placeholder")?.toLowerCase();
            getPlaceholder = getPlaceholder?.replaceAll("enter", "")?.replaceAll("your", "")?.replaceAll('select', "");
            newChild.textContent = getPlaceholder ? getPlaceholder + " required" : "this field required";
            newChild.style.color = "red";
            newChild.id = individualElement.name ? individualElement.name + "_id_error_message" : "undefined_id_error_message";
            individualElement.parentNode.parentNode.parentNode.appendChild(newChild);
        }
    } else {
        document.getElementById(individualElement.name + "_id_error_message")?.remove();
        returnData = true;
    }
    return returnData;
}
const inputValidation = (elements) => {
    if (elements) {
        let returnData = {};
        let totalElementsCount = 0;

        for (let indData of elements.split(",")) {
            let getElements = (indData.search("name=") == -1) ? document.querySelectorAll(indData) : [document.querySelector(indData)];
            for (let indElements of getElements) {
                totalElementsCount++;
                if (indElements?.type && (indElements.type == 'radio')) {
                    let getReturnData = radioChackboxRequiredElements(indElements);
                    if (getReturnData) {
                        for (let radioData of document.querySelectorAll('input[name="' + indElements.name + '"]')) {
                            if (radioData.checked && radioData?.value) {
                                returnData[indElements.name] = radioData.value;
                            }
                        }
                    }
                } else {
                    let getReturnData = inputRequiredElements(indElements);
                    if (getReturnData) {
                        returnData[indElements.id] = indElements.value;
                    }
                }

            }
        }
        if (totalElementsCount == Object.keys(returnData).length) {
            return returnData;
        } else {
            return null;
        }
    }
};


const inputValueData = (elements) => {  //not required values
    if (elements) {
        let returnData = {};
        function validationElements(individualElement) {
            if (individualElement.type) {
                if (individualElement.type == 'radio') {
                    if (individualElement.checked) {
                        returnData[individualElement.name] = (individualElement?.value) ? individualElement?.value : "";
                    }
                } else if (individualElement?.id !== null) {
                    returnData[individualElement.id] = (individualElement?.value) ? individualElement?.value : "";
                }
            }


        }
        for (let indData of elements.split(",")) {
            let getElements = document.querySelectorAll(indData);
            for (let indElements of getElements) {
                validationElements(indElements);
            }
        }
        return returnData;
    }
};



document.addEventListener('input', function (event) {
    if (event.target && event.target.matches('.numericOnly')) {
        event.target.value = event.target.value.replace(/[^0-9]/g, '');
    }
    if (event.target && event.target.matches('.numericFloatOnly')) {
        let getVal = event.target.value.replace(/[^0-9.]/g, '');
        if ((getVal.match(/\./g) || []).length > 1) {
            getVal = getVal.replace(/\.(?=[^.]*\.)/, '');
        }
        event.target.value = getVal;
    }
});




function validateTimeRange(projectStartTime, projectEndTime) {
    const timePattern = /^([01]?[0-9]|2[0-3]):([0-5]?[0-9])\s([APap][Mm])$/;
    if (!timePattern.test(projectStartTime) || !timePattern.test(projectEndTime)) {
        return "Invalid time format. Please use the format HH:MM AM/PM.";
    }
    const startDate = new Date(`01/01/2000 ${projectStartTime}`);
    const endDate = new Date(`01/01/2000 ${projectEndTime}`);
    if (endDate <= startDate) {
        return "End time must be after the start time.";
    }
    return true;
}

function isValidDate(dateString) {
    const regex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/;
    if (!regex.test(dateString)) {
        return "Invalid date format. Please use the format DD-MM-YYYY.";
    }
    const [day, month, year] = dateString.split('-').map(Number);
    const d = new Date(year, month - 1, day);
    return d.getDate() === day && d.getMonth() + 1 === month && d.getFullYear() === year;
}
