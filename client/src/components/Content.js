import React, { useEffect, useState } from 'react';
import DragItem from './DragItem';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';

function Content(props) {
    const [dataset, setDataset] = useState([])

    useEffect(() => {
        console.log("Component mounted successfully!")
        var request = new Request('http://localhost:' + props.port + '/banks', {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache'
        }); 
        fetch(request)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            setDataset(data)
        })         
        .catch((err) => {
            console.log(err);
        });
    },[props.port])


    const updateData = (id, index) => {
        let newdata = {pos: index}
        var request = new Request('http://localhost:' + props.port + '/banks/' + id, {
            method: 'PUT',
            mode: 'cors',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify(newdata)
        });     
        fetch(request)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
        })
        .catch((err) => {
            console.log(err);
        });
    }

    const callbackOrderChange = (newGrid) => {
        console.log(newGrid)
        newGrid.forEach((card,i) => {
            card.position = i;
            updateData(card.id, i)
        })
        setDataset(newGrid)
    }

    return (
        <div>   
            <DndProvider backend={Backend}>
                <DragItem content={dataset} onOrderChange={callbackOrderChange}/>
            </DndProvider>              
        </div>    
    )

}

export default Content