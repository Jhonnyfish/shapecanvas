export function createAlgorithm() {
    return new joint.shapes.myApp.Algorithm({
        position: { x: 400, y: 150 },
        size: { width: 100, height: 70 },
        algorithm: "算法",
        inPorts: [{ id: 'in', label: 'In' }, { id: 'in2', label: 'In2' }],
        options: [
            { id: 'in-1', text: '输入1' ,style: 'in'},
            { id: 'out-2', text: '输出2' ,style: 'out'},
        ]
    });
}