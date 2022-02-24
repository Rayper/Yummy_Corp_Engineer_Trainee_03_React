import { User } from "../../../models/user";

// actions => sebuah event untuk menampung data lalu di set dan disiapkan ketika akan ada perubahan data pada users yang dilakukan oleh reducers
export const setUser = (user: User) => {
    return {
        type: 'SET_USER',
        user
    }
}