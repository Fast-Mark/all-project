import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import List from '@mui/material/List';
import { Input } from "@mui/material";
import TextFieldsIcon from '@mui/icons-material/TextFields';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

export default function ElementsList({elements, updateElements}) {

  const ariaLabel  = {'element-prop':"description"}

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const items = Array.from(elements);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateElements(items)
  };

  return (
    <>
    <List
      sx={{
        width: '100%',
        bgcolor: 'background.paper',
        overflow: 'auto',
        maxHeight: 140,
        '& ul': { padding: 0 },
        border: 1,
        borderRadius: 1,
      }}
    >
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="elements">
        {(provided) => (
          <ul {...provided.droppableProps} ref={provided.innerRef}>
              {elements.map((element, index) => {
                return (
                  <Draggable key={element.id} draggableId={`${element.id}__draggable`} index={index}>
                    {(provided) => {
                      return (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          key={element.id}
                          >
                            <DragIndicatorIcon fontSize="small"/>
                            <TextFieldsIcon fontSize="small"/>
                            <Input inputProps={ariaLabel} defaultValue={element.description}/>
                        </li>
                      )}
                    }
                  </Draggable>
                )}
              )}
              {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
    </List>
    </>
  );
};

