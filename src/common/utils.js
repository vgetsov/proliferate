import { toast } from 'react-toastify'
import { ALL_CARDS_URL, CARD_DELETED, FAILED_TO_DELETE } from './constants'

export const onDelete = async ({ id, onSuccessCallback }) => {
  try {
    const removeCardData = await fetch(`${ALL_CARDS_URL}/${id}`, {
      method: 'DELETE',
    })

    console.log(removeCardData)

    toast.info(CARD_DELETED)

    onSuccessCallback()
  } catch (error) {
    toast.error(FAILED_TO_DELETE)
  }
}
