import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ThemeProvider } from 'styled-components';
import { Button } from '../component/Button';
import { Container } from '../component/Container';
import { Dropdown } from '../component/Dropdown';
import { Heading1, Heading2, Heading3 } from '../component/Heading';
import { Table, Th, Thead, Tr } from '../component/Table';
import { TextField } from '../component/TextField';
import { addTask, changeTheme, completedTask, deleteTask, editTask, restoreTask, updateTask } from '../redux/action/ToDoListAction';
import { ManagerTheme } from '../theme/ManagerTheme';

class ToDoList extends Component {

    state = {
        taskName: '',
        isUpdate: false
    }

    renderThemeOption = () => ManagerTheme.map((theme, index) => <option value={theme.id} key={index}>{theme.name}</option>)

    renderTaskToDo = () => {
        return this.props.taskList.filter((item) => !item.done).map((task, index) => <Tr key={index}>
            <Th>{task.taskName}</Th>
            <Th className='text-end'>
                <Button onClick={() => {this.handleEditTask(task)}} className='me-2'><i className="fa-solid fa-pen-to-square"></i></Button>
                <Button onClick={() => this.handleCompletedTask(task.id)} className='me-2'><i className="fa-solid fa-check"></i></Button>
                <Button onClick={() => this.handleDeleteTask(task.id)} className='me-2'><i className="fa-solid fa-trash"></i></Button>
            </Th>
        </Tr>)
    }

    renderTaskCompleted = () => {
        return this.props.taskList.filter((item) => item.done).map((task, index) => <Tr key={index}>
            <Th>{task.taskName}</Th>
            <Th className='text-end'>
                <Button onClick={() => this.handleRestoreTask(task.id)} className='me-2'><i className="fa-solid fa-rotate-right"></i></Button>
                <Button onClick={() => this.handleDeleteTask(task.id)} className='me-2'><i className="fa-solid fa-trash"></i></Button>
            </Th>
        </Tr>)
    }

    handleAddNewTask = () => {
        let { taskName } = this.state
        if (taskName.trim() !== '') {
            let newTask = {
                id: Date.now(),
                taskName: taskName.trim(),
                done: false
            }
            this.props.dispatch(addTask(newTask))
            
        }
        else {
            alert('Task is required')
        }
    }

    handleDeleteTask = (taskId) => this.props.dispatch(deleteTask(taskId))

    handleCompletedTask = (taskId) => this.props.dispatch(completedTask(taskId))

    handleRestoreTask = (taskId) => this.props.dispatch(restoreTask(taskId))

    handleEditTask = (task) => this.props.dispatch(editTask(task))

    handleUpdateTask = () => this.props.dispatch(updateTask(this.state.taskName.trim()))
        
    static getDerivedStateFromProps(newProps, currentState){
        if(newProps.isUpdate !== currentState.isUpdate){
            currentState.isUpdate = newProps.isUpdate
        }
        return {...currentState}
    }

    render() {
        console.log(this.state.taskName);
        let {isUpdate} = this.state
        return (
            <ThemeProvider theme={this.props.theme.theme}>
                <Container className='w-50 mt-3'>
                    <Dropdown onChange={(e) => this.props.dispatch(changeTheme(e.target.value))}>
                        {this.renderThemeOption()}
                    </Dropdown>
                    <Heading1>To Do List</Heading1>
                    <TextField value={this.state.taskName} onChange={(e) => this.setState({
                        taskName: e.target.value
                    })} className='w-50 me-2' label='Task Name' />
                    <Button onClick={this.handleAddNewTask} className={`me-2 ${isUpdate ? 'd-none':''}`}><i className="fa-solid fa-plus"></i> Add Task</Button>
                    <Button onClick={this.handleUpdateTask} className={`${isUpdate ? '':'d-none'}`}><i className="fa-solid fa-upload"></i> Update Task</Button>
                    <hr />
                    <Heading3 className='fw-normal'>Task To Do</Heading3>
                    <Table>
                        <Thead>
                            {this.renderTaskToDo()}
                        </Thead>
                    </Table>
                    <Heading3 className='fw-normal'>Task Completed</Heading3>
                    <Table>
                        <Thead>
                            {this.renderTaskCompleted()}
                        </Thead>
                    </Table>
                </Container>
            </ThemeProvider>
        )
    }

    componentDidUpdate(preProps, preState) {
        if (preProps.taskEdit.id !== this.props.taskEdit.id) {
            this.setState({
                taskName: this.props.taskEdit.taskName
            })
        }
    }
}

const mapStateToProps = state => {
    return {
        theme: state.ToDoListReducer.theme,
        taskList: state.ToDoListReducer.taskList,
        taskEdit: state.ToDoListReducer.taskEdit,
        isUpdate: state.ToDoListReducer.isUpdate,
    }
}

export default connect(mapStateToProps)(ToDoList)