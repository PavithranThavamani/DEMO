import React, { useEffect, useState } from "react"

import Recipe from "./components/Recipe"

import "./App.css"

const App = () => {
  const APP_ID = "c8cf4b0a"
  const APP_KEY = "f183597a58e3e36155547c752165ede4	"

  const [recipes, setRecipes] = useState([])
  const [search, setSearch] = useState("")
  const [query, setQuery] = useState("")

  useEffect(() => {
    const getRecipes = async () => {
      const response = await fetch(
        `http://www.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
      )
      const data = await response.json()
      setRecipes(data.hits)
    }
    getRecipes()
  }, [query])

  const updateSearch = (event) => {
    setSearch(event.target.value)
    console.log(search)
  }

  const getSearch = (event) => {
    event.preventDefault()
    setQuery(search)
    setSearch("")
  }

  return (
    <div className="App">
      <form className="search-form" onSubmit={getSearch}>
        <div className="header">
          <input
            className="search-bar"
            type="text"
            value={search}
            onChange={updateSearch}
          />
          <button type="submit" className="search-btn">
            Search
          </button>
        </div>
      </form>
      <div className="search-content">
        {recipes.map((recipe) => (
          <Recipe
            key={recipe.recipe.label}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>
    </div>
  )
}

export default App
