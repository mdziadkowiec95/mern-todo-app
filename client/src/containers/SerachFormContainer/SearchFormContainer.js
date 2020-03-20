import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import SearchForm from '../../components/molecules/SearchForm/SearchForm'
import { quickSearch } from '../../store/search/thunks'

class SearchFormContainer extends Component {
  render() {
    const { quickSearch, suggestions, isLoading } = this.props

    return (
      <>
        <SearchForm quickSearch={quickSearch} suggestions={suggestions} isLoading={isLoading} />
      </>
    )
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ quickSearch }, dispatch)
const mapStateToProps = ({ search }) => ({
  suggestions: search.searchResults,
  isLoading: search.isLoading,
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchFormContainer)
