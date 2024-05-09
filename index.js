async function searchrecipes() {
  const searchInput = document.getElementById("searchInput").value;
  const recipesContainer = document.getElementById("recipesContainer");
  recipesContainer.innerHTML = "";

  try {
    const response = await fetch(
      `https://api.edamam.com/search?q=${searchInput}&app_id=458c6b7b&app_key=d0c9bf796296c85eed36a50027c0b3a1`
    );
    if (!response.ok) {
      throw new Error(`Http error! status : ${response.status}`);
    }
    const data = await response.json();
    console.log(data);

    data.hits.forEach((recipe) => {
      const recipeHTML = `
        <div class = "recipe">
        <h2>${recipe.recipe.label}</h2>
        <img src = "${recipe.recipe.image}" alt="{recipe.recipe.label}">
        <p>Calories: ${Math.round(recipe.recipe.calories)}</p>
        <p>Servings: ${recipe.recipe.yield}</p>
        <a href = "${recipe.recipe.url}" target="_blank">View Recipe</a>
        </div>
        `;

      // Append the recipe HTML to the recipes container
      recipesContainer.innerHTML += recipeHTML;
    });
  } catch (error) {
    console.log("Error fetching recipes:", error);
  }
}
