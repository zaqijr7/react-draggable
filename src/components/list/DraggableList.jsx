import React, { useEffect, useState } from 'react'
import './draggable-list.scss'
import DraggableListItem from './DraggableListItem'
const DraggableList = (props) => {
  const [data, setData] = useState(props.data)
  const [dragStarIndex, setdragStarIndex] = useState(null)

  const onDragStart = (index) => setdragStarIndex(index)

  const onDrop = (dropIndex) => {
    console.log(dropIndex);
    const dragItem = data[dragStarIndex]
    let list = [...data]
    list.splice(dragStarIndex, 1)
    if (dragStarIndex < dropIndex) {
      setData([
        ...list.slice(0, dropIndex - 1),
        dragItem,
        ...list.slice(dropIndex - 1, list.length)
      ])
    } else {
      setData([
        ...list.slice(0, dropIndex),
        dragItem,
        ...list.slice(dropIndex, list.length)
      ])
    }
  }

  useEffect(() => {
    console.log(data);
  })
  return (
    <>
      <ul className="draggable-list">
        { data.map((item, index) => {
          return (
            <DraggableListItem
              key={index}
              index={index}
              onDragStart={(index) => onDragStart(index)}
              onDrop={(index) => onDrop(index)}
            >
              {
                props.renderItemContent(item)
              }
            </DraggableListItem>
          )
        })}
        <DraggableListItem
          key={data.length}
          index={data.length}
          draggable={false}
          onDrop={(index) => onDrop(index)}
        />
      </ul>
    </>
  )
}


export default DraggableList
