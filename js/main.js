//variables
let addCalorieBtn = document.querySelector("#add-calories-btn")
let removeEntryBtn = document.querySelector("#remove-day-entry-btn")
let removeDayBtn = document.querySelector("#remove-timeline-entry-btn")
let clearBtn = document.querySelector("#clear-btn")
let caloriesListContainerDay = document.querySelector("#day-list")
let caloriesListContainerTimeline = document.querySelector("#timeline-list")
let calorieCounter = document.querySelector("#calorie-count")
let submitDayBtn = document.querySelector("#submit-day-btn")
let entriesCount = 1
let entriesCountTimeline = 1
let totalCalories = 0
let caloriesList = []
let caloriesTimeline = []

//event listeners
window.addEventListener("load", () => {
    if (localStorage.getItem("caloriesList") != null && localStorage.getItem("entriesCount") != null && localStorage.getItem("caloriesTimeline") != null){
        loadData()
        updateAllDisplays()
    }
})

window.addEventListener("onbeforeunload", () => {
    saveData()
})

addCalorieBtn.addEventListener("click", () => {
    let calorieEntry = getValidNumber("Please enter the ammount of calories", "Must be a number")
    if (calorieEntry > 0){
        caloriesList.push(calorieEntry)
        updateAllDisplaysAndSave()
    }
})

removeEntryBtn.addEventListener("click", () => {
    removeEntry(caloriesList)
    updateAllDisplaysAndSave()
})

removeDayBtn.addEventListener("click", () => {
    removeEntry(caloriesTimeline)
    updateAllDisplaysAndSave()
})

clearBtn.addEventListener("click", () => {
    caloriesList = []
    updateAllDisplaysAndSave()
})

submitDayBtn.addEventListener("click", () => {
    caloriesTimeline.push(totalCalories)
    totalCalories = 0
    caloriesList = []
    updateAllDisplaysAndSave()
})


//functions
const updateListDisplay = (display, list) => {
    display.innerHTML = ""
    entriesCount = 1
    list.forEach(entry => {
        display.innerHTML += `${entriesCount}. ${entry}<br>`
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

const removeEntry = (list) => {
    let index = getValidNumber("Please enter the item number from the list", "must be a number") - 1
    if (list.length > 0 && index >= 0){
        while (index + 1 > list.length){
            index = getValidNumber("Must be a valid list item", "must be a number") - 1
        }
        if (index >= 0 && index <= list.length - 1){
            list.splice(index, 1)
        }
    }
}

const saveData = () => {
    localStorage.setItem("caloriesList", JSON.stringify(caloriesList))
    localStorage.setItem("entriesCount", JSON.stringify(entriesCount))
    localStorage.setItem("caloriesTimeline", JSON.stringify(caloriesTimeline))
}

const loadData = () => {
    caloriesList = JSON.parse(localStorage.getItem("caloriesList"))
    entriesCount = JSON.parse(localStorage.getItem("entriesCount"))
    caloriesTimeline = JSON.parse(localStorage.getItem("caloriesTimeline"))
}

const updateAllDisplaysAndSave = () => {
    updateCalorieCounter()
    updateListDisplay(caloriesListContainerDay, caloriesList)
    updateListDisplay(caloriesListContainerTimeline, caloriesTimeline)
    saveData()
}

const updateAllDisplays = () => {
    updateCalorieCounter()
    updateListDisplay(caloriesListContainerDay, caloriesList)
    updateListDisplay(caloriesListContainerTimeline, caloriesTimeline)
}