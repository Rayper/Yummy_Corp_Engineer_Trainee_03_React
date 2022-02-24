import { User } from "../../../models/user";


// parameter pertama yaitu initial value, awal saat kita belum dapat data users
// action => event yang terjadi pada apps kita, yang merubah state ( parameter pertama )
export const setUserReducers = (state = {user: new User()}, action: {type: string, user: User }) => {
    // immutable => setiap kita ada perubahan, harus create new object
    switch(action.type) {
        case "SET_USER":
            return {
                // semua yang state punya akan selalu sama, kita hanya merubah user di dalam 
                ...state,
                user: action.user
            } 

        default: 
            return state;
    }
    
}