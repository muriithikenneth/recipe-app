document.addEventListener('DOMContentLoaded', () => {
    const searchBox = document.querySelector('.searchBox');
    const searchBtn = document.querySelector('.searchBtn');
    const recipeContainer = document.querySelector('.Recipe-container');
    const recipeDetailscontent = document.querySelector('.recipe-details-content');
    const recipeCloseBtn = document.querySelector('.recipe-close-btn');

    // Function to get recipes
    const fetchRecipes = async (query) => {
        // Check if the search query is empty or whitespace
        if (!query.trim()) {
            alert('Please enter a valid search query.');
            return;
        }

        recipeContainer.innerHTML = "<h2>Fetching Recipes...</h2>";
        try {
            const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
            const response = await data.json();

            if (response.meals) {
                recipeContainer.innerHTML = ""; // Clear previous results
                response.meals.forEach(meal => {
                    const recipeDiv = document.createElement('div');
                    recipeDiv.classList.add('recipe');
                    recipeDiv.innerHTML = `
                        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                        <h3>${meal.strMeal}</h3>
                        <p><span>${meal.strArea}</span> Dish</p>
                        <p>Belongs to <span>${meal.strCategory}</span> category</p>
                    `;
                    const button = document.createElement('button');
                    button.textContent = "View Recipe";
                    recipeDiv.appendChild(button);

                    // Adding Event listener to recipe button
                    button.addEventListener('click', () => {
                        openRecipePopup(meal);
                    });

                    recipeContainer.appendChild(recipeDiv);
                });
            } else {
                recipeContainer.innerHTML = "<h2>No recipes found.</h2>";
            }
        } catch (error) {
            console.error('Error fetching recipes:', error);
            recipeContainer.innerHTML = "<h2>Error fetching recipes. Please try again later.</h2>";
        }
    }

    // Function to fetch ingredients and measurements
    const fetchIngredients = (meal) => {
        let ingredients = "";
        for (let i = 1; i < 20; i++) {
            const ingredient = meal[`strIngredient${i}`];
            if (ingredient) {
                const measure = meal[`strMeasure${i}`];
                ingredients += `<li>${measure} ${ingredient}</li>`;
            } else {
                break;
            }
        }
        return ingredients;
    }

    // Function to open recipe popup
    const openRecipePopup = (meal) => {
        recipeDetailscontent.innerHTML = `
            <h2 class="recipeName">${meal.strMeal}</h2>
            <h3>Ingredients:</h3>
            <ul class="ingredientsList">${fetchIngredients(meal)}</ul>
            <div class="recipe-instruction">
                <h3>Instruction</h3>
                <p>${meal.strInstructions}</p>
            </div>
        `;
        recipeDetailscontent.parentElement.style.display = "block";
    }

    // Event listener for the close button in the recipe popup
    recipeCloseBtn.addEventListener('click', () => {
        recipeDetailscontent.parentElement.style.display = "none";
    });

    // Event listener for the search button
    searchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const searchInput = searchBox.value.trim();
        if (!searchInput) {
            recipeContainer.innerHTML = `<h2>Type the meal in the search box</h2>`;
            return;
        }
        fetchRecipes(searchInput);
    });
});
