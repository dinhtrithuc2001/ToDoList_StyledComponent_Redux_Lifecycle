import { CHANGE_THEME, ADD_TASK, DELETE_TASK, COMPLETED_TASK, RESTORE_TASK, EDIT_TASK, UPDATE_TASK } from "../type/ToDoListType";

export const changeTheme = (themeId) => ({
    type: CHANGE_THEME,
    themeId
})
export const addTask = (newTask) => ({
    type: ADD_TASK,
    newTask
})
export const deleteTask = (taskId) => ({
    type: DELETE_TASK,
    taskId
})
export const completedTask = (taskId) => ({
    type: COMPLETED_TASK,
    taskId
})
export const restoreTask = (taskId) => ({
    type: RESTORE_TASK,
    taskId
})

export const editTask = (taskEdit) => ({
    type: EDIT_TASK,
    taskEdit
})
export const updateTask = (taskName) => ({
    type: UPDATE_TASK,
    taskName
})
