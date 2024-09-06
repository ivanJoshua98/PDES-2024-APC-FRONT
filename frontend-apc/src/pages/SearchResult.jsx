import React from 'react'
import NavbarWithSearcher from '../components/NavbarWithSearcher'
import SearchedProductsList from '../components/SearchedProductsList'

const SearchResult = () => {
  return (
    <div>
        <NavbarWithSearcher/>
        <SearchedProductsList/>
    </div>
  )
}

export default SearchResult
