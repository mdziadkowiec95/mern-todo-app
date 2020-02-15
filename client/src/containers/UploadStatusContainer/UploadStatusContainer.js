import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import UploadStatus from '../../components/molecules/UploadStatus/UploadStatus'
import { clearFinishedUploads } from '../../store/ui/actions'

class UploadStatusContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      allFinished: false,
    }
  }

  componentDidMount() {
    this.checkAllFinished()
  }

  componentDidUpdate(prevProps) {
    if (this.props.uploadList !== prevProps.uploadList) {
      this.checkAllFinished()
    }
  }

  checkAllFinished() {
    const allFinished = this.props.uploadList.every(upload => upload.percentCompleted === 100)

    this.setState({
      allFinished: allFinished,
    })
  }

  handleClearFinished = () => {
    this.props.clearFinishedUploads()
  }
  render() {
    const { uploadList } = this.props
    const { allFinished } = this.state

    const uploadActive = uploadList.length > 0 && !allFinished

    return uploadList.length > 0 ? (
      <UploadStatus
        uploadList={uploadList}
        allFinished={this.state.allFinished}
        uploadActive={uploadActive}
        onClear={this.handleClearFinished}
      />
    ) : null
  }
}

UploadStatusContainer.propTypes = {
  uploadList: PropTypes.array,
  clearFinishedUploads: PropTypes.func.isRequired,
}

UploadStatusContainer.defaultProps = {
  uploadList: [],
}

const mapStateToProps = ({ ui: { uploadList } }) => ({
  uploadList,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      clearFinishedUploads,
    },
    dispatch,
  )

export default connect(mapStateToProps, mapDispatchToProps)(UploadStatusContainer)
