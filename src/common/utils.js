import { toast } from 'react-toastify'
import { ALL_CARDS_URL } from './constants'

export const onDelete = async ({ id, onSuccessCallback }) => {
  try {
    const removeCardData = await fetch(`${ALL_CARDS_URL}/${id}`, {
      method: 'DELETE',
    })

    console.log(removeCardData) // TODO refetch all cards IMMEDIATELY

    toast.info('Card deleted successfully')

    onSuccessCallback()
  } catch (error) {
    toast.error(error.message)
  }
}
