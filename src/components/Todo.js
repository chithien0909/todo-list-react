import React, { Component } from 'react';
import { Button, Tooltip, Input, Icon } from 'antd';
import checkB from '../images/check-black.svg';
import checkG from '../images/check-green.svg';
import trash from '../images/trash.svg';
import classnames from 'classnames';
import './Todo.css';
class Todo extends Component {
    constructor(props){
        super(props);
        this.enterKey = this.enterKey.bind(this);
        this.changeStateJob = this.changeStateJob.bind(this);
        this.deleteJob = this.deleteJob.bind(this);
        this.state = {
            todoList : [{
                job: 'Do homework',
                isComplete: false
                },{
                job: 'Clean house',
                isComplete: true
                },

            ]

        }
    }
    enterKey (event){
        if(event.keyCode !== 13) return;
        let text = event.target.value;
        text.trim();
        this.setState({
            todoList :[
                ...this.state.todoList,
                {job: text, isComplete: false}
            ]
        });
    }
    changeStateJob(item){
        let {todoList}  = this.state;
        const p = todoList.indexOf(item);
        this.setState({
            todoList: [
                ...todoList.slice(0,p),
                {...item ,isComplete: !item.isComplete},
                ...todoList.slice(p+1)
            ]
        })
    }
    deleteJob(item){
        let {todoList}  = this.state;
        const p = todoList.indexOf(item);
        this.setState({
            todoList: [
                ...todoList.slice(0,p),
                ...todoList.slice(p+1)
            ]
        });
    }
    render() {
        const list = this.state.todoList;
        return (
            <div className='Todo'>
                <h1 className='title'>Todo List</h1>
                <input

                    onKeyUp={this.enterKey}
                    className={'input-text'} type="text"
                    placeholder='Enter something you should done'
                />
                <div className='ListJob'>
                    <ul>
                        {
                            list.length !== 0 &&
                            list.map((item) => (
                                <li
                                    className={classnames({active: item.isComplete})}>
                                    <span
                                        className="icon-check"
                                        onClick={()=>this.changeStateJob(item)}
                                    >
                                        <img src={item.isComplete ? checkG : checkB} alt="Image"/>
                                    </span>
                                    {item.job}
                                    <span
                                        onClick={()=>this.deleteJob(item)}
                                        className='trash'><img src={trash} alt="Trash"/>
                                    </span>
                                </li>
                            ))
                        }
                        {
                            list.length ===0 &&
                            <li>Don't have anything to do</li>
                        }
                    </ul>
                </div>
            </div>

        )
    }
}
export default Todo;