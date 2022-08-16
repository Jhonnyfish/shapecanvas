
var inport ={
    position:{
      name:'left'  
    },
    label:{
        position:{
            name:'in'
        },
        markup:[{
            tagName:'text',
            selector:'label'
        }]
    },
    attrs:{
        portBody:{
            magnet:true,
            width:16,
            height:16,
            x: -8,
            y: -8,
            fill:'#FE854F'
        },
        label:{
        }
    },
    markup:[{
        tagName:'rect',
        selector:'portBody'
    }]
}
var outport ={
    position:{
        name:'right'  
    },
    label:{
        position:{
            name:'out'
        },
        markup:[{
            tagName:'text',
            selector:'label'
        }]
    },
    attrs:{
        portBody:{
            magnet:true,
            width:16,
            height:16,
            x: -8,
            y: -8,
            fill:'#FE854F'
        },
        label:{
            
        }
    },
    markup:[{
        tagName:'rect',
        selector:'portBody'
    }]
}

export function createModel(){
    var model =  new joint.shapes.standard.Rectangle({
        size:{width:90,height:90},
        attrs:{
            body:{
                fill:'#8ECAE8'
            }
        },
        ports:{
            groups:{
                'in':inport,
                'out':outport
            }
        }
    })
    model.addPorts([
    {
        group:'in'
    },
    {
        group:'in'
    },
    {
        group:'out'
    },    
    {
        group:'out'
    }
    ])
    return model
}

export function defineMyShape(){
    joint.dia.Element.define('myApp.MyShape', {
        attrs: {
            body: {
                refWidth: '100%',
                refHeight: '100%',
                strokeWidth: 2,
                stroke: '#000000',
                fill: '#FE854F'
            },
            label: {
                textVerticalAnchor: 'middle',
                textAnchor: 'middle',
                refX: '50%',
                refY: '50%',
                fontSize: 14,
                fill: '#333333',
                text:"自定义输入输出"
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
                        tagName: 'rect',
                        selector: 'portBody',
                        // attributes: { r: 12 }
                    }],
                    z: -1,
                    attrs: {
                        portBody: {
                            magnet: true,
                            fill: '#FFFFFF',
                            width: 15,
                            height: 15,
                            x:-10,
                            y:-7
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
        size: {  width:200,height: 100 },
        position: { x: 50, y: 50 },
        attrs: { label: { text: 'My Shape' }},
        level: 2,
        ports: { items: [{ id: 'in1', group: 'in' }, { group: 'out', id: 'out1' }] }
    });
}