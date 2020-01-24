import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Card, CardImg, CardHeader } from 'reactstrap';
import { Spinner } from 'react-bootstrap';
import update from 'immutability-helper';
import { useDrag, useDrop } from 'react-dnd';
import Popup from './Popup';

function DragCard({ id, index, moveCard, dataset }) {

    const [cardSelected, setCardSelected] = useState(null)
    const ref = useRef(null)
    const [, drop] = useDrop({
        accept: 'cardtype',
        hover(item) {
            if (!ref.current) {
                return
            }
        const dragIndex = item.index
        const hoverIndex = index

        if (dragIndex === hoverIndex) {
            return
        }
        moveCard(dragIndex, hoverIndex)
        item.index = hoverIndex
    },
  })

    const [{ isDragging }, drag] = useDrag({
        item: { type: 'cardtype', id, index },
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
    })

    const opacity = isDragging ? 0 : 1
    drag(drop(ref))

    const onSelectStatusChange = () => {
        setCardSelected(null);
    }

    return (
        <div ref={ref} style={{ opacity }}>
            <Card onClick={() => { setCardSelected(dataset) }}>
                <CardHeader style={{ textAlign: 'left' }}>{dataset.title !== null ? dataset.title : 'Loading'}</CardHeader>
                <CardImg src={dataset.img} alt={dataset.type}></CardImg>
            </Card>
            <Popup cardSelected={cardSelected} onSelectedChange={onSelectStatusChange} />
        </div>
    )
}


function useDidChange(value) {
    let ref = useRef()
    let hasChanged = ref.current !== value
    useEffect(() => {
        ref.current = value
    })
    return hasChanged
}


function DragItem(props) {
    let dataset = props.content
    let datasetDidChange = useDidChange(dataset)
    const [cards, setCards] = useState(dataset)

    useEffect(() => {
        if (datasetDidChange) {
        setCards(dataset)
        }
    }, [datasetDidChange, dataset, cards])

    const moveCard = useCallback(
        (dragIndex, hoverIndex) => {
            const dragCard = cards[dragIndex]
            setCards(
            update(cards, {
                $splice: [
                [dragIndex, 1],
                [hoverIndex, 0, dragCard],
                ],
            }),
        )}, [cards])

    const imgcard = cards.map((card, i) => {
        return (
            <div key={card.id} className="col-12 col-sm-6 col-md-4 mb-2">
                <DragCard id={card.id} index={i} moveCard={moveCard} dataset={card}></DragCard>
            </div>
        )
    });

    const updateGrid = () => {
        props.onOrderChange(cards)
    }

    if (dataset.length === 0) {
        return (
            <div className="container" style={{ marginTop:200 }}>
                <div className="row justify-content-md-center m-4">
                    <Spinner animation="border" role="status"></Spinner>
                </div>
            </div>
        )
    } else {
        return (
            <div className="container">
                <div className="row" style={{ cursor: 'move' }}>
                    {imgcard}
                </div>
                <div className='row justify-content-md-center m-4'>
                    <button onClick={updateGrid}>Update</button>
                </div>
            </div>
        )
    }
}

export default DragItem