//variables
let addBtn = document.querySelector("#add-btn")
let removeBtn = document.querySelector("#remove-btn")
let submitBtn = document.querySelector("#submit-btn")

let listTitle = document.querySelector("#list-title")

let dayBtn = document.querySelector("#day-btn")
let timelineBtn = document.querySelector("#timeline-btn")

let entriesList = document.querySelector("#entries")
let calorieCounter = document.querySelector("#calorie-count")

const buttons = {
    Day: 0,
    Timeline: 1,
  };

let selectedPage = buttons.Day;
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

dayBtn.addEventListener("click", () => {
    selectedPage = buttons.Day
    updateAllDisplaysAndSave()
})

timelineBtn.addEventListener("click", () => {
    selectedPage = buttons.Timeline
    updateAllDisplaysAndSave()
})

addBtn.addEventListener("click", () => {
    switch(selectedPage){
        case buttons.Day:
            pushToList(caloriesList)
            break;
        case buttons.Timeline:
            pushToList(caloriesTimeline)
            break;
    }
})

removeBtn.addEventListener("click", () => {
    switch(selectedPage){
        case buttons.Day:
            removeEntry(caloriesList)
            break;
        case buttons.Timeline:
            removeEntry(caloriesTimeline)
            break;
    }
    updateAllDisplaysAndSave()
})

submitBtn.addEventListener("click", () => {
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

const updateBtns = () => {
    switch (selectedPage){
        case buttons.Day:
            dayBtn.classList.add("selected-btn")
            timelineBtn.classList.remove("selected-btn")
            submitBtn.innerText = "Submit"
            break;
        case buttons.Timeline:
            timelineBtn.classList.add("selected-btn")
            dayBtn.classList.remove("selected-btn")
            submitBtn.innerText = "Graph"
            break;
    }
}

const updateListTitle = () => {
    switch (selectedPage){
        case buttons.Day:
            listTitle.innerHTML = "Today's Calories"
            break;
        case buttons.Timeline:
            listTitle.innerHTML = "Calories Timeline"
            break;
    }
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

const pushToList = (list) => {
    let entry = getValidNumber("Please enter the ammount of calories", "Must be a number")
    if (entry > 0){
        list.push(entry)
        updateAllDisplaysAndSave()
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

const updateAllDisplays = () => {
    switch (selectedPage){
        case buttons.Day:
            updateListDisplay(entriesList, caloriesList)
            break;
        case buttons.Timeline:
            updateListDisplay(entriesList, caloriesTimeline)
    }
    updateBtns()
    updateCalorieCounter()
    updateListTitle()
}

const updateAllDisplaysAndSave = () => {
    updateAllDisplays()
    saveData()
}