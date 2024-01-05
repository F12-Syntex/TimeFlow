import React, {userState} from 'react'

export const TodoForm = () => {
    const [val,setVal] = userState("");

    const submissionHandler = e => {
        //prevents placeholder to be submitted
        e.preventDefault();
        addTodo(val);
    }
    return(
        <form className='TodoForm' onSubmit={submissionHandler}>
            <input type="text" className='todoInput' placeholder='Whats the play today??' 
            onChange={(e)=> setVal(e.target.val)}></input>
            <button type='submit' className='todoButton'>Add Chore</button>
        </form>
    )
}