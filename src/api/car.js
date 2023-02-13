// this is where our api calls for thcars resource will live
import apiUrl from '../apiConfig'
import axios from 'axios'

// READ -> Index
export const getAllCars = () => {
    return axios(`${apiUrl}/cars`)
}

// READ -> Show
export const getOneCar = (id) => {
    return axios(`${apiUrl}/cars/${id}`)
}

// Create (create a car)
export const createCar = (user, newCar) => {
    console.log('this is the user', user)
    console.log('this is the newCar', newCar)
    return axios({
        url: `${apiUrl}/cars`,
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { car: newCar }
    })
}

// Update (update a car)
export const updateCar = (user, updatedCar) => {
    return axios({
        url: `${apiUrl}/cars/${updatedCar.id}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { car: updatedCar }
    })
}

// Delete (delete a car)
export const removeCar = (user, carId) => {
    return axios({
        url: `${apiUrl}/cars/${carId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}