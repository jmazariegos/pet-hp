import './Calculator.css';
import Task from './Task';
import {useEffect, useState} from 'react';

function Calculator() {
    //States & Variables
    const [totalG, setTotalG] = useState(0); //General total
    const [totalClasses, setTotalClasses] = useState([0, 0, 0, 0, 0]); //Totals for each class
    const [level, setLevel] = useState(1); //Pet level
    const [hours, setHours] = useState(0); //Hours spent studying pet
    const [hp, setHp] = useState(35); //Pet hp
    const [base, setBase] = useState(35); //Pet + Class base hp
    const [cl, setCl] = useState(0); //Class index
    const [type, setType] = useState('Dog'); //Type of animal

    //Base hp for each class for each type
    const typeClasses = {'Dog': [35, 76, 116, 156, 196],
        'Cat': [40, 75, 110, 144, 179],
        'Fish': [20, 73, 126, 178, 231],
        'Reptile': [30, 78, 126, 173, 221],
        'Bird': [40, 79, 116, 154, 191],
        'Equine': [45, 86, 126, 166, 206],
        'Small Mammal': [10, 51, 91, 131, 171],
        'Bug': [1, 40, 77, 115, 152],
        'Amphibian': [40, 77, 114, 150, 187],
        'Farm Animal': [50, 88, 126, 163, 201],
        'Exotic': [35, 83, 130, 177, 224],
        'Plant': [30, 68, 106, 143, 181]};

    const classes = ['Rogue', 'Cleric', 'Paladin', 'Ranger', 'Barbarian'];

    //Functions
    //Things I want to stay updated every new render
    useEffect(() => {
        //If class is supposed to be assigned, set class
        if(document.getElementById('max').checked) {
            const max = Math.max(...totalClasses);
            setCl(totalClasses.indexOf(max));
        }

        //Calculate level and have it by default as 1 else calculate as (General Totals + Class Totals)/Hours
        if(hours === 0){
            setLevel(1);
        }else {
            setLevel(Math.max((totalG + totalClasses[cl])/hours|0, 1));
        }

        //Calculate HP using the formula base + (user level * modifier)
        const modifier = document.getElementById('modifier').value;
        setHp(Math.floor(base + (level * modifier)));
    }, [totalG, hours, base, level, totalClasses, cl, type]);

    //Callback function for tasks to give the new value and old value to update the general total
    const getTotalG = (prevValue, value) => {
        setTotalG(totalG => totalG - prevValue + value);
    };

    //Callback function for tasks to record totals for each class
    const getTotalClasses = (prevValue, value, index=0) => {
        const newTotals = totalClasses.map((v, i) => {
            //Update the class that was updated
            if(i === index){
                return v - prevValue + value;
            }
            return v;
        });
        setTotalClasses(newTotals);
    };

    //Updates the hours and doesn't let it go below 0 or be erased
    const updateHours = (evt) => {
        let value = parseInt(evt.target.value);
        console.log(value);
        if(isNaN(value) || value < 0) {
            value = 0
        }

        setHours(value);
    };

    //Adds to hours
    const addHour = () => {
        setHours(hours => hours + 1);
    }

    //Updates class when switching class
    const updateClass = (evt) => {
        const newClass = evt.target.selectedIndex;
        if(!document.getElementById('max').checked){
            document.getElementById(classes[cl].toLowerCase()).style.display = 'none';
            document.getElementById(classes[newClass].toLowerCase()).style.display = 'block';
        }
        setCl(newClass);

        //New base hp value since new class
        setBase(typeClasses[type][newClass]);
    }

    //Updates type of animal
    const updateType = (evt) => {
        const select = evt.target;
        const newType = select.options[select.selectedIndex].text;
        setType(newType);

        //New base hp value since new type
        setBase(typeClasses[newType][cl]);
    }

    //Hides or shows extra classes depending on if checked
    const updateCheck = (evt) => {
        //Disable or enable switching classes
        document.getElementById('class').toggleAttribute('disabled');

        //All the DIVs of the classes
        const classDivs = Array.from(document.getElementById('classes').children).slice(1, 6);
        if(evt.target.checked){
            //On check reveal all other classes
            for(let i = 0; i < 5; i++){
                //Makes sure the class displayed is still the max class
                //(Technically could've made a new state to update useEffect but felt way more redundant than just doing this)
                const max = Math.max(...totalClasses);
                setCl(totalClasses.indexOf(max));

                const child = classDivs[i];
                if(i !== cl){
                    child.style.display = 'block';
                }
            }
        }else{
            //On uncheck hide all other classes
            for(let i = 0; i < 5; i++){
                const child = classDivs[i];
                if(i !== cl){
                    child.style.display = 'none';
                }
            }
        }
    };

    //The whole layout
    return (
        <div id='calculator' className='horizontal'>
            <div id='info'>
                <h2>INFO</h2>
                <div className='horizontal'>
                    <h3 id='name'>PET NAME:</h3>
                    <input type='text'/>
                </div>
                <div className='horizontal' id='hours'>
                    <h3>DURATION (HOURS):</h3>
                    <input type='number' onChange={evt => updateHours(evt)} value={hours}/>
                    <button onClick={addHour}>+1</button>
                </div>
                <div className='horizontal'>
                    <h3>TYPE:</h3>
                    <select onChange={evt => updateType(evt)} id='modifier'>
                        <option value={2.4}>Dog</option>
                        <option value={2}>Cat</option>
                        <option value={3.1}>Fish</option>
                        <option value={2.8}>Reptile</option>
                        <option value={2.3}>Bird</option>
                        <option value={2.4}>Equine</option>
                        <option value={2.4}>Small Mammal</option>
                        <option value={2.3}>Bug</option>
                        <option value={2.2}>Amphibian</option>
                        <option value={2.2}>Farm Animal</option>
                        <option value={2.8}>Exotic</option>
                        <option value={2.2}>Plant</option>
                    </select>
                </div>
                <div className='horizontal'>
                    <h3>CLASS:</h3>
                    <select onChange={evt => updateClass(evt)} value={classes[cl]} id='class'>
                        <option>Rogue</option>
                        <option>Cleric</option>
                        <option>Paladin</option>
                        <option>Ranger</option>
                        <option>Barbarian</option>
                    </select>
                </div>
                <div className='horizontal'>
                    <h3>BEST CLASS:</h3>
                    <input type='checkbox' id='max' onChange={evt => updateCheck(evt)}/>
                </div>
                <div className='horizontal'>
                    <h3>LEVEL:</h3>
                    <label>{level}</label>
                </div>
                <div className='horizontal'>
                    <h3>HP:</h3>
                    <label>{hp}</label>
                </div>
            </div>
            <div className="tallies" id='general'>
                <h2>GENERAL BEHAVIOURS</h2>
                <div>
                    <h3>FEEDING</h3>
                    <Task task='eating normal food' modifier={1} type='general' getTotal={getTotalG}/>
                    <Task task='hunting' modifier={2} type='general' getTotal={getTotalG}/>
                    <Task task='scavenging' modifier={2} type='general' getTotal={getTotalG}/>
                </div>
                <div>
                    <h3>VOCALIZATIONS</h3>
                    <Task task='song' modifier={1} type='general' getTotal={getTotalG}/>
                    <Task task='alarm call' modifier={1} type='general' getTotal={getTotalG}/>
                    <Task task='funny vocalization' modifier={2} type='general' getTotal={getTotalG}/>
                </div>
                <div>
                    <h3>GROOMING</h3>
                    <Task task='preening' modifier={1} type='general' getTotal={getTotalG}/>
                    <Task task='bathing' modifier={1} type='general' getTotal={getTotalG}/>
                    <Task task='social grooming' modifier={2} type='general' getTotal={getTotalG}/>
                </div>
                <h3>TOTAL: {totalG}</h3>
            </div>
            <div className="tallies" id='classes'>
                <h2>CLASS SPECIFIC BEHAVIOURS</h2>
                <div id='rogue'>
                    <h3>ROGUE</h3>
                    <Task task='mischievous action' modifier={3} index={0} getTotal={getTotalClasses}/>
                    <Task task='stealing something' modifier={4} index={0} getTotal={getTotalClasses}/>
                    <Task task='surprising the shit out you' modifier={5} index={0} getTotal={getTotalClasses}/>
                </div>
                <div id='cleric'>
                    <h3>CLERIC</h3>
                    <Task task='soothing action' modifier={3} index={1} getTotal={getTotalClasses}/>
                    <Task task='gentle touch' modifier={4} index={1} getTotal={getTotalClasses}/>
                    <Task task='appearing in your hour of need' modifier={5} index={1} getTotal={getTotalClasses}/>
                </div>
                <div id='paladin'>
                    <h3>PALADIN</h3>
                    <Task task='loyal action' modifier={3} index={2} getTotal={getTotalClasses}/>
                    <Task task='doing good deeds' modifier={4} index={2} getTotal={getTotalClasses}/>
                    <Task task={'bringing something you didn\'t ask for'} modifier={5} index={2} getTotal={getTotalClasses}/>
                </div>
                <div id='ranger'>
                    <h3>RANGER</h3>
                    <Task task='clever action' modifier={3} index={3} getTotal={getTotalClasses}/>
                    <Task task='gazing contemplatively' modifier={4} index={3} getTotal={getTotalClasses}/>
                    <Task task='ignoring you completely' modifier={5} index={3} getTotal={getTotalClasses}/>
                </div>
                <div id='barbarian'>
                    <h3>BARBARIAN</h3>
                    <Task task='impolite action' modifier={3} index={4} getTotal={getTotalClasses}/>
                    <Task task='courageous feat' modifier={4} index={4} getTotal={getTotalClasses}/>
                    <Task task='not giving a shit about smart stuff' modifier={5} index={4} getTotal={getTotalClasses}/>
                </div>
                <h3>TOTAL: {totalClasses[cl]}</h3>
            </div>
        </div>
    );
}

export default Calculator;