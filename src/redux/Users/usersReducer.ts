import { UnknownAction } from '@reduxjs/toolkit'
import { User } from '../../types/user'

// type ActionAddUser = {
//     type: 'users/add'
//     payload: User
// }

// type ActionDeleteUser = {
//     type: 'users/delete'
//     payload: string
// }

// type ActionSelectEditinUser = {
//     type: 'users/selectEditingUser'
//     payload: string
// }

// type Action = ActionAddUser | ActionDeleteUser | ActionSelectEditinUser

type InitialState = {
    users: User[]
    editingUserId: string | null
}

const INITIAL_STATE:InitialState = {
    users: [],
    editingUserId: null,
}

export const usersReducers = (state = INITIAL_STATE, action: UnknownAction) => {
    switch (action.type) {
        case "users/add": {
            return {
                ...state,
                users: [...state.users, action.payload],
            } as InitialState
        }
        case 'users/delete': {
            return {
                ...state,
                users: state.users.filter((user: User) => user.id !== action.payload),
            } as InitialState
        }
        case "users/selectEditingUser": {
            return {
                ...state,
                editingUserId: action.payload,
            } as InitialState
        }
        default:
            return state
    }
}

export const addUser = (payload: User) => {
    return {
        type: 'users/add',
        payload: payload,
    } as const
}

export const deleteUser = (profileId: string) => {
    return {
        type: 'users/delete',
        payload: profileId,
    } as const
}

export const selectEditingUser = (userId: string) => {
    return {
        type: 'users/selectEditingUser',
        payload: userId,
    } as const
}
