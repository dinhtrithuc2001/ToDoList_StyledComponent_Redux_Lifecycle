import { ManagerTheme } from '../../theme/ManagerTheme'
import { CHANGE_THEME, ADD_TASK, DELETE_TASK, COMPLETED_TASK, RESTORE_TASK, EDIT_TASK, UPDATE_TASK } from '../type/ToDoListType'

const initialState = {
    theme: ManagerTheme[0],
    taskList: [
        { id: '1', taskName: 'Task 1', done: true },
        { id: '2', taskName: 'Task 2', done: false },
        { id: '3', taskName: 'Task 3', done: false },
    ],
    taskEdit: { id: '', taskName: '', done: false },
    isUpdate: false
}

export default (state = initialState, { type, themeId, newTask, taskId, taskEdit, taskName }) => {
    switch (type) {
        case CHANGE_THEME: {
            let theme = ManagerTheme.find(item => item.id == themeId)
            if (theme) {
                return { ...state, theme }
            }
            return { ...state }
        }
        case ADD_TASK: {
            let taskList = [...state.taskList]
            let index = taskList.findIndex(item => item.taskName == newTask.taskName)
            if (index == -1) {
                taskList.push(newTask)
                return { ...state, taskList, isUpdate: false }
            } else {
                alert('Task is already exist')
            }
        }
        case DELETE_TASK: {
            return { ...state, taskList: state.taskList.filter(item => item.id !== taskId) }
        }
        case COMPLETED_TASK: {
            let taskList = [...state.taskList]
            let newTask = taskList.find(item => item.id == taskId)
            if (newTask) {
                newTask.done = true
            }
            return { ...state, taskList }
        }
        case RESTORE_TASK: {
            let taskList = [...state.taskList]
            taskList[taskList.findIndex(item => item.id == taskId)].done = false
            return { ...state, taskList }
        }
        case EDIT_TASK: {
            return { ...state, taskEdit, isUpdate: true }
        }
        case UPDATE_TASK: {
            if (taskName !== '') {
                let taskList = [...state.taskList]
                let index = taskList.findIndex(item => item.taskName == taskName)
                if(index !== -1){
                    alert('Task is already exist')
                    return {...state, isUpdate: true}
                }
                else{
                    taskList[taskList.findIndex(item => item.id == state.taskEdit.id)].taskName = taskName
                    return { ...state, taskList, isUpdate: false }
                }
            }else {
                alert('task update is required')
                return {...state, isUpdate: true}
            }
        }
        default: {
            return { ...state }
        }
    }
}
