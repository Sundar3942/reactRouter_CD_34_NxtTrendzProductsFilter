import './index.css'

const FiltersGroup = props => {
  const {
    categoryClickHandler,
    categoryOptions,
    ratingClickHandler,
    inputChangeHandler,
    ratingsList,
    searchInput,
    clearFiltersHandler,
  } = props
  const onChangeInput = event => {
    inputChangeHandler(event.target.value)
  }

  const onClickCategory = event => {
    categoryClickHandler(event.target.id)
  }

  const onClickRating = event => {
    console.log(event.target.id)
    ratingClickHandler(event.target.id)
  }

  const onClickClearFilters = () => {
    clearFiltersHandler()
  }

  return (
    <div className="filters-group-container">
      <div className="search-input-container">
        <input
          id="input"
          type="search"
          value={searchInput}
          className="search-input"
          onChange={onChangeInput}
          placeholder="search"
        />
        <img
          src="https://img.icons8.com/search"
          className="search-icon"
          alt="search"
        />
      </div>

      <h3>Category</h3>
      <ul className="category-container">
        {categoryOptions.map(each => (
          <li key={each.name} className="category-item">
            <button
              id={each.categoryId}
              type="button"
              className="category-btn"
              onClick={onClickCategory}
            >
              <p id={each.categoryId}>{each.name}</p>
            </button>
          </li>
        ))}
      </ul>
      <h3>Rating</h3>
      <ul className="ratings-container">
        {ratingsList.map(each => (
          <li key={each.imageUrl} className="rating-item">
            <button
              id={each.ratingId}
              type="button"
              className="rating-btn"
              onClick={onClickRating}
            >
              <div id={each.ratingId} className="rating-and-up">
                <img
                  id={each.ratingId}
                  src={each.imageUrl}
                  alt={`rating ${each.ratingId}`}
                  className="rating-image"
                />
                <p id={each.ratingId} className="up-ele">
                  & up
                </p>
              </div>
            </button>
          </li>
        ))}
      </ul>
      <div className="clear-btn-container">
        <button
          type="button"
          className="clear-filters-btn"
          onClick={onClickClearFilters}
        >
          Clear Filters
        </button>
      </div>
    </div>
  )
}

export default FiltersGroup
