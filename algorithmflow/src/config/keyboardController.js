import {paper} from "./apps"
export function initKeyBoard(graph){
  
    var commandManager = new joint.dia.CommandManager({ graph: graph })
    var clipboard = new joint.ui.Clipboard
    var keyboard = new joint.ui.Keyboard();
    var selection = initializeSelection(keyboard)
    keyboard.on({
      'delete backspace': function(evt){
        evt.preventDefault()
        graph.removeCells(selection.collection.toArray())
      },
      'ctrl+z':function(){
        commandManager.undo()
        console.log(commandManager.undoStack)
        selection.collection.reset([])
      },
      'ctrl+y':function(){
        commandManager.redo()
        console.log(commandManager.redoStack)
        selection.collection.reset([])
      }
    });
}

function initializeSelection(keyboard){
  var selection = new joint.ui.Selection({
    paper:paper
  })
  paper.on('element:pointerdown',function(elementView,evt){
    //Select an element if Ctrl/meta key is pressed while the element is clicked
    if(keyboard.isActive('ctrl',evt)){
      if(selection.collection.find(function(cell){return cell.isLink()})){
        // Do not allow mixing links and elements in the selection 
          selection.collection.reset([elementView.model])
        }else{ 
          selection.collection.add(elementView.model);
        }
      }
    })
    return selection
}