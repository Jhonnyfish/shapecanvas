import {graph} from "../view/apps"
export function renderEl(cellMsg) {
    if(cellMsg.shapeType=='myApp.Algorithm'){
        var cellSize = { width: 150, height: 125 }
        var centerX = cellMsg.point.x - cellSize.width/2
        var centerY = cellMsg.point.y - cellSize.height/2
        var model = new joint.shapes.myApp.Algorithm({
            position: {x:centerX,y:centerY},
            // size: cellSize,
            id:"123",
            name: '算法',
        });
        model.addTo(graph)
        var json = [
            { id: 'in-1', name: '输入1' ,style: 'in',code:"flag1"},
            { id: 'in-2', name: '输入1' ,style: 'in',code:"flag2"},
        ]
        model.set("options",json)
    }
}