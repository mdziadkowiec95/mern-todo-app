import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import UploadStatus from '../../components/molecules/UploadStatus/UploadStatus'

class UploadStatusContainer extends Component {
  render() {
    const { uploadList } = this.props

    console.log(uploadList)
    return uploadList.length > 0 ? <UploadStatus uploadList={uploadList} /> : null
  }
}

const mapStateToProps = ({ ui: { uploadList } }) => ({
  uploadList,
})

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(UploadStatusContainer)
