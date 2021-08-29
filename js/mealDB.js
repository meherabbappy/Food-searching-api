document.getElementById('error-message').style.display ='none';
const searchFood = () =>{
const searchField = document.getElementById('search-field')
const searchText = searchField.value;
// clear data 
searchField.value = '';
document.getElementById('error-message').style.display ='none';
if(searchText == ''){
    // write some thing 
}

else{
    // load data 
const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
fetch(url)
.then(res => res.json())
.then(data => displaySearchResult(data.meals))
.catch(error => displayError(error));
}

}
const displayError =(error)=>{
    document.getElementById('error-message').style.display ='block';
}



const displaySearchResult = (meals) =>{
    // console.log(meals);
    const searchResult = document.getElementById('search-result')
    searchResult.textContent = '';
    if(meals.length == 0){
        // show some error message 
        // <h2>Here is Nothing </h2>
    }
    meals.forEach(meal =>{
        
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div onclick="loadMealDetails(${meal.idMeal})" class="card h-100 w-75 mx-auto">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                     <h5 class="card-title">${meal.strMeal}</h5>
                    <p class="card-text">${meal.strInstructions.slice(0,250)}</p>
                </div>
        </div>
        `;
        searchResult.appendChild(div);
    })
}

const loadMealDetails =(mealId)=>{
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayDetails(data.meals[0]));
}

const displayDetails = (meal) =>{
    const mealDetails = document.getElementById('meal-details');
    mealDetails.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">${meal.strMeal}</h5>
        <p class="card-text">${meal.strInstructions.slice(0,150)}</p>
        <a href="${meal.strYoutube}" class="btn btn-primary">Go For Details</a>
    </div>
    `;
    mealDetails.appendChild(div)
}