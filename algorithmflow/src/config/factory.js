export function createAlgorithm() {
    return new joint.shapes.myApp.Algorithm({
        position: { x: 400, y: 150 },
        size: { width: 100, height: 70 },
        algorithm: "算法",
        inPorts: [{ id: 'in', label: 'In' }, { id: 'in2', label: 'In2' }],
        options: [
            { id: 'var1', text: '变量1' ,style: 'in'},
            { id: 'var2', text: '变量2' ,style: 'in'},
            { id: 'var3', text: '变量3' ,style: 'in'}
        ]
    });
}