import { useRef, useState } from 'react';
import ElementsList from '../elementList/elementsList';
import ElementBlock from '../elementBlock/elementBlock';
import { resizePointClassName } from '../../const/classNameConst';
import { textBlockType } from '../../const/blockTypes';
import './workspace.css'
import { centerPosition } from '../../const/positionTypes';
import WorkspaceDropBlock from '../workspaceUtils/workspaceDropBlock'
import InstrumentsTable from './instrumentsTable';
import { baseURL, uploadItems } from '../../const/endpoints';

// просто пример как выглядит объект элемента
let initialElements = [
    { id: '1', content: 'element 1', description: 'element 1',type: textBlockType, blockStyle: {left: 0, top: 0, width: "100px",  height: "100px"}, isSelected: true, contentStyles: {...centerPosition, textAlign:"center", fontFamily:"arial", fontSize:'14px', fonstStyle: 'normal', color:"#000000"}, },
];



const dragClickType = "drag"
const resizeClickType = "resize"

export default function Workspace({backgroundURL}) {
    const [elements, updateElements] = useState(initialElements);
    const [isDropListActive, setDropListActive] = useState(false)
    // contextMenu - это окошко, которое появляется при клике на воркспейс для добавления НОВЫХ элементов
    const [contextMenu, setContextMenu] = useState(null)
    const [selectedElement, setSelectedElement] = useState(elements[0])

    const elementCoord = useRef({startX: 0, startY: 0, lastX: 0, lastY: 0,})
    const clickType = useRef(null)
    const clickedElement = useRef(null);


    function deserializeElements() {
        const newElementsList = elements.map((obj) => {
            const newObj = {...obj}
            delete newObj.isSelected
            delete newObj.display
    
            if (newObj.contentStyles.marginRight == "auto" & newObj.contentStyles.marginLeft == "auto") {
                newObj.contentStyles.position = "center"
            } else if (newObj.contentStyles.marginLeft == "0") {
                newObj.contentStyles.position = "left"
            } else if (newObj.contentStyles.marginRight == "0") {
                newObj.contentStyles.position = "right"
            }
                
            delete newObj.marginRight
            delete newObj.marginLeft
    
            return newObj
        })
    
        return newElementsList
    }

    const downloadResult = (event) => {
        // TODO: отправка на сервер вместе с картинкой. Думааю, будет лучше просто передавать сериалайзер...
        console.log(deserializeElements())
    }

    const sendInitialElementsToServer = async (event) => {
        try {
            const response = await fetch(`${baseURL}${uploadItems}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(initialElements),
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error status: ${response.status}`);
            }
    
            // Обработка успешного ответа
            const data = await response.json();
            console.log('Data sent successfully:', data);
        } catch (error) {
            console.error('Error sending data:', error);
        }
    };


    const onMouseUp = (event) => {
        clickedElement.current = null;
        // deActivateListners()    
    }    

    // Это обработка нажатий на сам элемент.
    function onMouseDown(id, event) {

        clickedElement.current = id
        
        let currentElement = document.getElementById(id)
        const localClassName = event.target.className;
        try {
            if (localClassName.includes(resizePointClassName)) {
                clickType.current = resizeClickType;
                
                elementCoord.current.lastX = currentElement.offsetWidth;
                elementCoord.current.lastY = currentElement.offsetHeight;

                elementCoord.current.startX = event.clientX;
                elementCoord.current.startY = event.clientY;
                // activateListners()

            } else {
            clickType.current = dragClickType

            elementCoord.current.lastX = currentElement.offsetLeft;
            elementCoord.current.lastY = currentElement.offsetTop;
            
            elementCoord.current.startX = event.clientX
            elementCoord.current.startY = event.clientY    

            // activateListners()
        }   
    } catch (e) {
        // localClassName.includes(resizePointClassName) может возваращать фигню, когда localClassName получается от нажатия на svg
        return;
    }
}
    
    const onMouseMove = (event) => {
        if (clickedElement.current === null)  return;
        if (clickType.current === resizeClickType) {
            
            const newElements = elements.map((obj) => {
                if (obj.id === clickedElement.current) {
                    let width = `${ Number(elementCoord.current.lastX) + Number(event.clientX) - Number(elementCoord.current.startX) }px`;
                    let height = `${ Number(elementCoord.current.lastY) + Number(event.clientY) - Number(elementCoord.current.startY) }px`;
                    const newBlockStyle = {...obj.blockStyle, width: width, height: height}

                    return {...obj, blockStyle: newBlockStyle};
                }     
                return obj;
            })    
            updateElements(newElements)
            return;
        }
        
        if (clickType.current === dragClickType) {
            
            const nextX = event.clientX - elementCoord.current.startX + elementCoord.current.lastX;
            const nextY = event.clientY - elementCoord.current.startY + elementCoord.current.lastY;  
            
            const newElements = elements.map((obj) => {
                
                if (obj.id === clickedElement.current) {
                    const newBlockStyle = {...obj.blockStyle, left: nextX, top: nextY}
                    return {...obj, blockStyle:newBlockStyle};
                }     
                return obj;
            })    
            updateElements(newElements)
    
        } 
    }     

   
    function onSelectElement(id) {
        const newElements = elements.map((obj) => {
             if (obj.id === id) {
                setSelectedElement(obj)
                return {...obj, isSelected: true}
             } else {
                return {...obj, isSelected: false}
             }
         })

        updateElements(newElements);
    }


    const onUpdateElements =(elements)=>{
        updateElements(elements)
    }    

    const onUpdateOneElement =(id, newElement)=>{
        const newElements = elements.map((obj) => {            
            if (obj.id === id) {
                if (newElement===null) {
                    return
                }
                return {...newElement}
            } else {
                return {...obj, isSelected: false}
            }
        })
        updateElements(newElements)
    }    

    const onUpdateElementStyle =(id, newStyles)=>{
        const newElements = elements.map((obj) => {            
            if (obj.id === id) {
                const styles = {...obj.contentStyles}
                const newContentStyles = Object.assign(styles, newStyles)
                const newElement = {...obj}
                newElement.contentStyles = newContentStyles;
                return newElement
            } else {
                return {...obj}
            }
        })
        updateElements(newElements)
    }    


    function onWorkspaceMouseDown(event) {
        if (String(event.target.id) === "redactor" || String(event.target.id) === "workspace" || String(event.target.id) === "redactor-image") {
            onSelectElement("redactor")
            clickedElement.current = null;
            setDropListActive(false);
        } 
        
        const localClassName = String(event.target.className);
        if (localClassName.includes("box") || localClassName.includes("element-block") || String(event.target.className) === "box") {
            setDropListActive(false);
        }

        if (!localClassName.includes("workspace__context-menu")) {
            setContextMenu(null)
        }
    }

    function onRedactorContextMenu(event) {
        event.preventDefault()

        if (event.target.className.includes("box") || event.target.className.includes("element-block")) {
            setContextMenu(null)
            return
        }

        const position = {left: event.clientX, top: event.clientY}
        setContextMenu(<WorkspaceDropBlock 
            position={position}  
            elements={elements}
            updateElements={updateElements}
            className="workspace__context-menu"
            ></WorkspaceDropBlock>
        )
    }

    function setElementToUp(id) {
        const lastLayoutElement = elements.find((obj) => obj.id === id)
        let newElements = new Array();
        elements.map((obj) =>{
            if (obj.id !== id) {
                newElements.push(obj)
            }});

        newElements.push(lastLayoutElement)
        updateElements(newElements)
    }

    function setElementToDown(id) {
        const firstLayoutElement = elements.find((obj) => obj.id === id)
        let newElements = new Array();
        
        newElements.push(firstLayoutElement)
        elements.map((obj) =>{
            if (obj.id !== id) {
                newElements.push(obj)
            }});

        updateElements(newElements)
    }

    function addNewElement(newElement) {
        let newItems = Array.from(elements);
        newItems.push(newElement)
        
        updateElements(newItems)
    }

    return (
        
        <div style={{position:"absolute", width:"100%", height:"100%", display: "flex", justifyContent: "center"}}>
            
                {/* Здесь у нас рендерятся все */}
                <div id ='redactor'
                 onMouseDown={(event) => {onWorkspaceMouseDown(event)}}
                 onContextMenu={(event) => {onRedactorContextMenu(event)}}
                 onMouseMove={onMouseMove}
                    onMouseUp={onMouseUp}
                    style={{height: "100%", marginRight: 33}}
                >                
                <img src={`${backgroundURL}`} alt='здесь должен был быть ваш макет' id='redactor-image' className='workspace-redactor__background-image' style={{maxHeight:"1000px"}}/>
                    <div className='wrokspace-redactor__elements' style={{position:"absolute"}}>
                    {elements.map((element, index) => {
                        try {
                            return (
                                <ElementBlock 
                                    element={element}
                                    zIndexElement={index}
                                    setElementToUp={setElementToUp}
                                    setElementToDown={setElementToDown}
                                    updateElement={onUpdateOneElement}
                                    onSelect={onSelectElement} 
                                    onDragging={onMouseDown} 
                                    setDropListActive={setDropListActive}
                                    isActiveDropList={isDropListActive} 
                                    key={index}
                                >

                                </ElementBlock>
                            )
                        } catch (e) {

                        }
                    })}   

                    </div>
                    {contextMenu}
                </div>

                
                    
                <div id = "toolbar" style={{height: "100%", width: "23rem"}}>
                    {/* здесь будут все полезные инструменты */}
                    <InstrumentsTable
                    elementsCount={elements.length}
                    setNewElement={addNewElement}
                    setElementToUp={setElementToUp}
                    setElementToDown={setElementToDown}
                    updateElement={onUpdateElementStyle}
                    element={selectedElement}
                    selectElement={onSelectElement}
                    downloadResult={downloadResult}
                    elementsList={<ElementsList elements = {elements} updateElements={onUpdateElements} />}
                    ></InstrumentsTable>
                </div>

                {/* <div style={{position:"absolute", right:"0px", width: "400px", height: "300px"}}>
                    <ElementsList elements = {elements} updateElements={onUpdateElements} />
                </div> */}
                
        </div>
        
    )
}