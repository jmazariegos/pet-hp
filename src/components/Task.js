import { useState } from 'react';

function Task (props) {
    const [tally, setTally] = useState(0);

    //Add to tally when pressing the +1 button
    const add = () => {
        //Update tally then send values for total calculation in Calculator
        setTally(tally => tally + 1);

        //If this task has an index property meaning it is a class task
        if(props.index){
            props.getTotal(tally * props.modifier, (tally + 1) * props.modifier, props.index);
        }else{
            props.getTotal(tally * props.modifier, (tally + 1) * props.modifier);
        }
    };

    //Set value when changing value through input
    const set = (evt) => {
        //Update tally to be value inputted and makes sure its always >= 0
        let value = parseInt(evt.target.value);
        if(isNaN(value) || value < 0) {
            value = 0
        }

        //Change tally to new value then send values for total calculation in Calculator
        setTally(tally => value);

        //If this task has an index property meaning it is a class task
        if(props.index){
            props.getTotal(tally * props.modifier, value * props.modifier, props.index);
        }else{
            props.getTotal(tally * props.modifier, value * props.modifier);
        }
    };

    //Task layout
    return (
        <div className='horizontal'>
            <h4>{props.task.toUpperCase()}:</h4>
            <div>
                <input type='number' onInput={evt => set(evt)} value={tally}/>
                <button onClick={add}>+1</button>
                <label>{props.modifier * tally}</label>
            </div>
        </div>
    );
}

export default Task;