import {graph, paper} from "../view/apps"
import { getMessageStr } from "./messageHandler";
export function initKeyBoard(graph){
  
    // var commandManager = new joint.dia.CommandManager({
    //    graph: graph,
    // })
    var clipboard = new joint.ui.Clipboard
    var keyboard = new joint.ui.Keyboard();
    var selection = initializeSelection(keyboard)
    keyboard.on({
      'delete backspace': function(evt){
        evt.preventDefault()
        graph.removeCells(selection.collection.toArray())
      },
      'ctrl+a':function(evt){
        evt.preventDefault()
        selection.collection.reset(graph.getElements())
      },
      'ctrl+c':function(){
        clipboard.copyElements(selection.collection,graph)
      },
      'ctrl+v':function(){
        var pastedCells = clipboard.pasteCells(graph)
        var elements = _.filter(pastedCells,function(cell){
          return cell.isElement()
        });
        selection.collction.reset(elements)
      },
      'ctrl+x':function(){
        clipboard.cutElements(selection.collection,graph)
      }
    });
}

function initializeSelection(keyboard){
  var selection = new joint.ui.Selection({
    paper:paper
  })
  selection.collection.on('reset add remove',function(){
    var collection = selection.collection;
    joint.ui.Halo.clear(paper);
    joint.ui.FreeTransform.clear(paper);
    joint.ui.Inspector.close();
    if (collection.length === 1) {
        var primaryCell = collection.first();
        var primaryCellView = paper.requireView(primaryCell);
        selection.destroySelectionBox(primaryCell);
        selectPrimaryCell(primaryCellView);
    } else if (collection.length === 2) {
        collection.each(function(cell) {
            selection.createSelectionBox(cell);
        });
    }
  });
  paper.on("blank:pointerdown", function () {
    selection.collection.reset([])
    paper.removeTools()
  });
  paper.on('element:pointerdown',function(elementView,evt){
    var selectModel = {
      id: elementView.model.id
    }
    window.chrome.webview.postMessage(getMessageStr("selectModel",JSON.stringify(selectModel)))
    //按住control点击一个元素
    if(keyboard.isActive('ctrl',evt)){
      if(selection.collection.find(function(cell){return cell.isLink()})){
        // Do not allow mixing links and elements in the selection 
          selection.collection.reset([elementView.model])
        }else{
          selection.collection.add(elementView.model);
        }
      }
    });
  graph.on('remove',function(cell){
    console.log(cell.id)
    window.chrome.webview.postMessage(getMessageStr("cellRemove",cell.id))
    //当一个元素从graph中移除，也要使其从selection.collection中移除
    if(selection.collection.has(cell)){
      selection.collection.reset(selection.collection.models.filter(c=>c !==cell))
    }
  })
  selection.on('selection-box:pointerdown',function(elementView,evt){
    //按住ctrl，当一个元素已经被选中时， 再次点击会取消选中该元素
    if(keyboard.isActive('ctrl meta',evt)){
      evt.preventDefault()
      selection.collection.remove(elementView.model)
    }
  })
  return selection
}

function selectPrimaryCell(cellView){
  var cell =  cellView.model
  if(cell.isElement()){
    selectPrimaryElement(cellView)
  }else{
    selectPrimaryLink(cellView)
  }
}

function selectPrimaryElement(elementView){
  var element = elementView.model;

  new joint.ui.FreeTransform({
      cellView: elementView,
      allowRotation: false,
      preserveAspectRatio: !!element.get('preserveAspectRatio'),
      allowOrthogonalResize: element.get('allowOrthogonalResize') !== false
  }).render();

  new joint.ui.Halo({
      cellView: elementView,
      handles: App.config.halo.handles,
      useModelGeometry: true
  }).render();
}

function selectPrimaryLink(linkView){
  var ns = joint.linkTools;
  var toolsView = new joint.dia.ToolsView({
      name: 'link-pointerdown',
      tools: [
          new ns.Vertices(),
          new ns.SourceAnchor(),
          new ns.TargetAnchor(),
          new ns.SourceArrowhead(),
          new ns.TargetArrowhead(),
          new ns.Segments,
          new ns.Boundary({ padding: 15 }),
          new ns.Remove({ offset: -20, distance: 40 })
      ]
  });

  linkView.addTools(toolsView);
}