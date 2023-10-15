import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import FiltersGroup from '../FiltersGroup'
import ProductCard from '../ProductCard'
import ProductsHeader from '../ProductsHeader'

import './index.css'

const categoryOptions = [
  {
    name: 'Clothing',
    categoryId: '1',
  },
  {
    name: 'Electronics',
    categoryId: '2',
  },
  {
    name: 'Appliances',
    categoryId: '3',
  },
  {
    name: 'Grocery',
    categoryId: '4',
  },
  {
    name: 'Toys',
    categoryId: '5',
  },
]

const sortbyOptions = [
  {
    optionId: 'PRICE_HIGH',
    displayText: 'Price (High-Low)',
  },
  {
    optionId: 'PRICE_LOW',
    displayText: 'Price (Low-High)',
  },
]

const ratingsList = [
  {
    ratingId: '4',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png',
  },
  {
    ratingId: '3',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png',
  },
  {
    ratingId: '2',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png',
  },
  {
    ratingId: '1',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png',
  },
]

class AllProductsSection extends Component {
  state = {
    productsList: [],
    isLoading: false,
    activeOptionId: sortbyOptions[0].optionId,
    searchInput: '',
    activeCategory: '',
    activeRating: '',
    apiFailure: false,
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    // this.setState({
    //   isLoading: true,
    // })
    const jwtToken = Cookies.get('jwt_token')

    // TODO: Update the code to get products with filters applied

    const {
      activeOptionId,
      activeCategory,
      activeRating,
      searchInput,
    } = this.state
    console.log(activeOptionId, activeCategory, activeRating, searchInput)
    const apiUrl = `https://apis.ccbp.in/products?sort_by=${activeOptionId}&category=${activeCategory}&rating=${activeRating}&title_search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.products.map(product => ({
        title: product.title,
        brand: product.brand,
        price: product.price,
        id: product.id,
        imageUrl: product.image_url,
        rating: product.rating,
      }))
      if (!response.ok) {
        this.setState({apiFailure: true, isLoading: false})
      }
      this.setState({
        apiFailure: false,
        productsList: updatedData,
        isLoading: false,
      })
    }
  }

  changeSortby = activeOptionId => {
    this.setState({activeOptionId}, this.getProducts)
  }

  renderProductsList = () => {
    const {productsList, activeOptionId, apiFailure} = this.state

    // TODO: Add No Products View
    if (apiFailure) {
      return this.renderFailureView()
    }
    if (productsList.length === 0) {
      return (
        <div className="no-products-section">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
            alt="no products"
            className="no-products-image"
          />
          <h3>No Products Found</h3>
          <p>We could not found any products. Try other filters.</p>
        </div>
      )
    }
    return (
      <div className="all-products-container">
        <ProductsHeader
          activeOptionId={activeOptionId}
          sortbyOptions={sortbyOptions}
          changeSortby={this.changeSortby}
        />
        <ul className="products-list">
          {productsList.map(product => (
            <ProductCard productData={product} key={product.id} />
          ))}
        </ul>
      </div>
    )
  }

  inputChangeHandler = value => {
    this.setState({searchInput: value}, this.getProducts)
  }

  categoryClickHandler = categoryId => {
    this.setState({activeCategory: categoryId}, this.getProducts)
  }

  ratingClickHandler = ratingId => {
    this.setState({activeRating: ratingId}, this.getProducts)
  }

  clearFiltersHandler = () => {
    this.setState(
      {
        activeOptionId: sortbyOptions[0].optionId,
        searchInput: '',
        activeCategory: '',
        activeRating: '',
      },
      this.getProducts,
    )
  }

  renderLoader = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  // TODO: Add failure view
  renderFailureView = () => (
    <div className="failure-section">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
        alt="products failure"
        className="failure-image"
      />
      <h3>Oops! Something Went Wrong</h3>
      <p>
        We are having some trouble processing your request. Please try again.
      </p>
    </div>
  )

  render() {
    const {activeCategory, isLoading, searchInput} = this.state

    return (
      <div className="all-products-section">
        {/* TODO: Update the below element */}
        <FiltersGroup
          categoryOptions={categoryOptions}
          categoryClickHandler={this.categoryClickHandler}
          activeCategory={activeCategory}
          ratingsList={ratingsList}
          ratingClickHandler={this.ratingClickHandler}
          inputChangeHandler={this.inputChangeHandler}
          searchInput={searchInput}
          clearFiltersHandler={this.clearFiltersHandler}
        />
        {isLoading ? this.renderLoader() : this.renderProductsList()}
      </div>
    )
  }
}

export default AllProductsSection
