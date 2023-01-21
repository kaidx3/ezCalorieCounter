let addCalorieBtn = document.querySelector("#add-calories-btn")
let removeEntryBtn = document.querySelector("#remove-entry-btn")
let clearBtn = document.querySelector("#clear-btn")
let caloriesListContainer = document.querySelector(".entries-list")
let calorieCounter = document.querySelector("#calorie-count")
let entriesCount = 1;
let totalCalories = 0;

let caloriesList = []

addCalorieBtn.addEventListener("click", () => {
    let calorieEntry = getValidNumber("Please enter the ammount of calories", "Must be a number")
    if (calorieEntry != 0){
        caloriesList.push(calorieEntry)
        updateListDisplay()
    }
    updateCalorieCounter()
})

removeEntryBtn.addEventListener("click", () => {
    let index = getValidNumber("Please enter the item number from the list", "must be a number") - 1
    if (caloriesList.length > 0 && index >= 0){
        while (index + 1 > caloriesList.length){
            index = getValidNumber("Must be a valid list item", "must be a number") - 1
        }
        if (index >= 0 && index <= caloriesList.length - 1){
            caloriesList.splice(index, 1)
            updateListDisplay()
        }
        updateCalorieCounter()
    }
})

clearBtn.addEventListener("click", () => {
    caloriesList = []
    updateListDisplay()
    updateCalorieCounter()
})

const updateListDisplay = () => {
    caloriesListContainer.innerHTML = ""
    entriesCount = 1

    caloriesList.forEach(entry => {
        caloriesListContainer.innerHTML += `${entriesCount}. ${entry}<br>`
        entriesCount ++
    })
}

const updateCalorieCounter = () => {
    totalCalories = 0
    caloriesList.forEach(entry => {
        totalCalories += parseInt(entry)
    })

    calorieCounter.innerText = totalCalories
}

const getValidNumber = (promptText, errorText) => {
    let number = prompt(promptText)

    while (isNaN(number)){
        number = prompt(errorText)
    }

    if (number == null){
        return 0
    }
    return number
}