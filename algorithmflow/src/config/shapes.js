export function defineMyShape(){
    joint.dia.Element.define('myApp.MyShape', {
        attrs: {
            body: {
                refWidth: '100%',
                refHeight: '100%',
                strokeWidth: 2,
                stroke: '#000000',
                fill: '#FFFFFF'
            },
            label: {
                textVerticalAnchor: 'middle',
                textAnchor: 'middle',
                refX: '50%',
                refY: '50%',
                fontSize: 14,
                fill: '#333333'
            },
            root: {
                magnet: false // Disable the possibility to connect the body of our shape. Only ports can be connected.
            }
        },
        level: 10,
        ports: {
            groups: {
                'in': {
                    markup: [{
                        tagName: 'circle',
                        selector: 'portBody',
                        attributes: { r: 12 }
                    }],
                    z: -1,
                    attrs: {
                        portBody: {
                            magnet: true,
                            fill: '#7C68FC'
                        }
                    },
                    position: { name: 'left' },
                    label: { position: { name: 'left' }}
                },
                'out': {
                    markup: [{
                        tagName: 'circle',
                        selector: 'portBody',
                        attributes: { r: 12 }
                    }],
                    z: -1,
                    attrs: {
                        portBody: {
                            magnet: true,
                            fill: '#7C68FC'
                        }
                    },
                    position: { name: 'right' },
                    label: { position: { name: 'right' }}
                }
            }
        }
    }, {
        markup: [{
            tagName: 'rect',
            selector: 'body'
        }, {
            tagName: 'text',
            selector: 'label'
        }]
    })
}

export function createMyShape(){
    return new joint.shapes.myApp.MyShape({
        size: { width: 100, height: 100 },
        position: { x: 50, y: 50 },
        attrs: { label: { text: 'My Shape' }},
        level: 3,
        ports: { items: [{ id: 'in1', group: 'in' }, { group: 'out', id: 'out1' }] }
    });
}