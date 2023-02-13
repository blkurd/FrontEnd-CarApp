import apiUrl from '../apiConfig'
import axios from 'axios'

// CREATE
// /covers/:carId
export const createCover = (carId, newCover) => {
    return axios({
        url: `${apiUrl}/covers/${carId}`,
        method: 'POST',
        data: { cover: newCover }
    })
}

// UPDATE
// /covers/:carId/:coverId
export const updateCover = (user, carId, updatedCover) => {
    return axios({
        url: `${apiUrl}/covers/${carId}/${updatedCover._id}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { cover: updatedCover }
    })
}

// DELETE
// /covers/:carId/:coverId
export const deleteCover = (user, carId, coverId) => {
    // console.log('this the coverId', coverId)
    return axios({
        url: `${apiUrl}/covers/${carId}/${coverId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}