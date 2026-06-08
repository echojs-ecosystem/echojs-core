import {
  activateUserMutation,
  deleteUserMutation,
  suspendUserMutation,
} from '@entities/api/index'

export const suspendUser = suspendUserMutation.create()
export const activateUser = activateUserMutation.create()
export const deleteUser = deleteUserMutation.create()
