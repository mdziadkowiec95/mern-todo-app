import { types } from './types'

const MOCK_UPLOAD_LIST = [
  ...new Array(3).fill().map((item, i) => ({
    id: `${i}124124`,
    fileName: 'Michał Dziadkowiec.jpg' + i,
    percentCompleted: 100,
  })),
]

export const initialState = {
  isSidebarOpen: false,
  isAddTaskModalOpen: false,
  isManageLabelsModalOpen: false,
  uploadList: [...MOCK_UPLOAD_LIST],
}

export const uiReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case types.TOGGLE_SIDEBAR:
      return {
        ...state,
        isSidebarOpen: payload,
      }
    case types.TOGGLE_ADD_TASK_MODAL:
      return {
        ...state,
        isAddTaskModalOpen: payload,
      }
    case types.TOGGLE_MANAGE_LABELS_MODAL:
      return {
        ...state,
        isManageLabelsModalOpen: payload,
      }
    case types.UPDATE_UPLOAD_LIST:
      const itemIndex = state.uploadList.findIndex(item => item.id === payload.id)

      const updatedList = [...state.uploadList]

      if (itemIndex !== -1) {
        updatedList[itemIndex] = payload
      } else {
        updatedList.push(payload)
      }

      return {
        ...state,
        uploadList: updatedList,
      }
    case types.CLEAR_FINISHED_UPLOADS:
      return {
        ...state,
        uploadList: state.uploadList.filter(upload => upload.percentCompleted !== 100),
      }
    default:
      return state
  }
}
