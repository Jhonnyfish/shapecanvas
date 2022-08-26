import {graph} from "./apps"
export function renderEl(cellMsg) {
    if(cellMsg.shapeType=='myApp.Algorithm'){
        var cellSize = { width: 100, height: 70 }
        var centerX = cellMsg.point.x - cellSize.width/2
        var centerY = cellMsg.point.y - cellSize.height/2
        var model = new joint.shapes.myApp.Algorithm({
            position: {x:centerX,y:centerY},
            size: cellSize,
            algorithm: "算法",
            inPorts: [{ id: 'in', label: 'In' }, { id: 'in2', label: 'In2' }],
            options: [
                { id: 'in-1', text: '输入1' ,style: 'in'},
                { id: 'out-2', text: '输出2' ,style: 'out'},
            ]
        });
        model.addTo(graph)
    }
}