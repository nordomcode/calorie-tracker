class CalorieTracker {
    constructor() {
        this._caloriesLimit = 2500;
        this._totalCalories = 0;
        this._meals = [];
        this._workouts = [];

        this._displayCaloriesTotal();
        this._displayCaloriesLimit();
        this._displayCaloriesConsumed();
        this._displayCaloriesBurned();
        this._displayCaloriesRemain();
        this._displayCaloriesProgress();
    }

//Public methods/API

    addMeal(meal) {
        this._meals.push(meal);
        this._totalCalories += meal.calories;
        this._render();
    }

    addWorkout(workout) {
        this._workouts.push(workout);
        this._totalCalories -= workout.calories;
        this._render();
    }


    //Private methods/API

    _displayCaloriesTotal() {
        const totalCaloriesEl = document.getElementById('calories-total');
        totalCaloriesEl.innerHTML = this._totalCalories;
    }

    _displayCaloriesLimit() {
        const caloriesLimitEl = document.getElementById('calories-limit');
        caloriesLimitEl.innerHTML = this._caloriesLimit;
    }

    _displayCaloriesConsumed() {
        const caloriesConsumedEl = document.getElementById('calories-consumed');

        let consumed = this._meals.reduce((total, meal) => total + meal.calories, 0);
        
        caloriesConsumedEl.innerHTML = consumed;
    }

    _displayCaloriesBurned() {
        const caloriesBurnedEl = document.getElementById('calories-burned');

        let burned = this._workouts.reduce((total, workout) => total + workout.calories, 0);
        
        caloriesBurnedEl.innerHTML = burned;
    }

    _displayCaloriesRemain() {
        const caloriesRemainEl = document.getElementById('calories-remaining');
        let remain = this._caloriesLimit - this._totalCalories; 
        caloriesRemainEl.innerHTML = remain;

        const progressEl = document.getElementById('calorie-progress')
        if(remain < 0) {
            caloriesRemainEl.parentElement.parentElement.classList.remove('bg-light');
            caloriesRemainEl.parentElement.parentElement.classList.add('bg-danger');
            progressEl.classList.remove('bg-success');
            progressEl.classList.add('bg-danger');
        } else {
            caloriesRemainEl.parentElement.parentElement.classList.remove('bg-danger');
            caloriesRemainEl.parentElement.parentElement.classList.add('bg-light');
            progressEl.classList.remove('bg-danger');
            progressEl.classList.add('bg-success');
        }
    }

    _displayCaloriesProgress() {
        const progressEl = document.getElementById('calorie-progress');
        const percentage = (this._totalCalories / this._caloriesLimit) * 100;
        const width = Math.min(percentage, 100); 
        progressEl.style.width = `${width}%`;   
    }

    _render() {
        this._displayCaloriesTotal();
        this._displayCaloriesConsumed();
        this._displayCaloriesBurned();
        this._displayCaloriesRemain();
        this._displayCaloriesProgress();
    }
}


class Meal {
    constructor(name, calories) {
        this.id = Math.random().toString(16).slice(2);
        this.name = name;
        this.calories = calories;
    }
}

class Workout {
    constructor(name, calories) {
        this.id = Math.random().toString(16).slice(2);
        this.name = name;
        this.calories = calories;
    }
}

const tracker = new CalorieTracker();

const breakfast = new Meal('Breakfast', 400);
const run = new Workout('Morning run', 300);
const lunch = new Meal ('Lunch', 350)



tracker.addMeal(breakfast);
tracker.addWorkout(run);
tracker.addMeal(lunch);

console.log(tracker._meals)
console.log(tracker._workouts);
console.log(tracker._totalCalories)