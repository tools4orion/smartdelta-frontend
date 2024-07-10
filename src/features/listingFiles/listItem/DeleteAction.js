import React from 'react'
import { useFileController } from 'contexts/FileContext'
import MDBox from 'components/MDBox'
import MDBadge from 'components/MDBadge'

const DeleteAction = ({ id }) => {
  const { deleteFile, fetchFiles, dispatch } = useFileController()

  const onClickHandler = async (dispatch) => {
    try {
      const response = await deleteFile(dispatch, id)

      if (!response) {
        throw new Error('Network response was not ok')
      }

      console.log('Successfully deleted the file')
      fetchFiles()
    } catch (error) {
      console.log(`There is an error: ${error}`)
    }
  }
  return (
    <MDBox
      ml={-1}
      style={{ cursor: 'pointer' }}
      onClick={() => onClickHandler(dispatch)}
    >
      <MDBadge badgeContent="X" variant="gradient" size="sm" />
    </MDBox>
  )
}

export default DeleteAction
