import {graph} from "../view/apps"
export function renderEl(cellMsg) {
    if(cellMsg.shapeType=='myApp.Algorithm'){
        var cellSize = { width: 150, height: 125 }
        var centerX = cellMsg.point.x - cellSize.width/2
        var centerY = cellMsg.point.y - cellSize.height/2
        var model = new joint.shapes.myApp.Algorithm({
            position: {x:centerX,y:centerY},
            // size: cellSize,
            name: '算法',
            options: [
                { id: 'in-1', name: '输入' ,style: 'in'},
                { id: 'out-2', name: '输出' ,style: 'out'},
            ]
        });
        model.addTo(graph)
    }
}
