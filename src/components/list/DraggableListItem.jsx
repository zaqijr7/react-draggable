import React, { useRef } from 'react'

const DraggableListItem = (props) => {
  const itemRef = useRef(null)
  const onDragStart = (e) => {
    e.dataTransfer.effectedAllowed = 'move'
    e.dataTransfer.setDragImage(e.target, 50000, 50000)
    let ghostNode = e.target.cloneNode(true)
    ghostNode.style.position = "absolute"
    ghostNode.style.top = (e.pageY - e.target.offsetHeight / 2) + 'px'
    ghostNode.style.left = (e.pageX - e.target.offsetwidth / 2) + 'px'
    ghostNode.style.height = e.target.offsetHeight + 'px'
    ghostNode.style.width = e.target.offsetWidth + 'px'
    ghostNode.style.opacity = '0.7'
    ghostNode.style.pointerEvents = 'none'
    document.body.prepend(ghostNode)
    console.log();
    ghostNode.id = 'ghostnode'
    itemRef.current.classList.add('dragstart')

    if (props.onDragStart) {
      props.onDragStart(props.index)
    }
  }

  const onDrag = (e) => {
    let ghostNode = document.querySelector('#ghostnode')
    ghostNode.style.top = (e.pageY - e.target.offsetHeight / 2) + 'px'
    ghostNode.style.left = (e.pageX - e.target.offsetwidth / 2) + 'px'
  }

  const onDragEnd = () => {
     document.querySelector('#ghostnode').remove()
     itemRef.current.classList.remove('dragstart')
     props.onDrop(props.index)
  }
  
  const onDragEnter = () => itemRef.current.classList.add('dragover')

  const onDragLeave = () => itemRef.current.classList.remove('dragover')

  const onDragOver = (e) => e.preventDefault()

  const onDrop = () => {
    itemRef.current.classList.remove('dragover')
    props.onDrop(props.index)
  }

  return (
    <>
      <li
        ref={itemRef}
        className="draggable-list__item"
        draggable={props.draggable !== undefined ? props.draggable : true}
        onDragStart={onDragStart}
        onDrag={onDrag}
        onDragEnd={onDragEnd}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        {props.children}
      </li>
    </>
  )
}

export default DraggableListItem