
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
    joint.dia.Element.define('myApp.Question', {
            optionHeight: 30,
            questionHeight: 45,
            paddingBottom: 30,
            minWidth: 150,
            question: null,
            ports: {
                groups: {
                    'in': {
                        position: 'top',
                        attrs: {
                            circle: {
                                magnet: 'passive',
                                stroke: 'white',
                                fill: '#feb663',
                                r: 14
                            },
                            text: {
                                pointerEvents: 'none',
                                fontSize: 12,
                                fill: 'white'
                            }
                        },
                        label: {
                            position: {
                                name: 'left',
                                args: { x: 5 }
                            }
                        }
                    },
                    out: {
                        position: 'right',
                        attrs: {
                            'circle': {
                                magnet: true,
                                stroke: 'none',
                                fill: '#31d0c6',
                                r: 10
                            }
                        }
                    }
                },
                items: [{
                    group: 'in',
                    attrs: {
                        text: { text: 'in' }
                    }
                },{
                    group: 'out',
                    
                },
                {
                    group: 'out',
                   
                },
                {
                    group: 'out',
                   
                }]
            },
            attrs: {
                '.': {
                    magnet: false
                },
                '.body': {
                    refWidth: '100%',
                    refHeight: '100%',
                    rx: '1%',
                    ry: '2%',
                    stroke: 'none',
                    fill: {
                        type: 'linearGradient',
                        stops: [
                            { offset: '0%', color: '#FEB663' },
                            { offset: '100%', color: '#31D0C6' }
                        ],
                        // Top-to-bottom gradient.
                        attrs: { x1: '0%', y1: '0%', x2: '0%', y2: '100%' }
                    }
                },
                '.btn-add-option': {
                    refX: 10,
                    refDy: -22,
                    cursor: 'pointer',
                    fill: 'white'
                },
                '.btn-remove-option': {
                    xAlignment: 10,
                    yAlignment: 13,
                    cursor: 'pointer',
                    fill: 'white'
                },
                '.options': {
                    refX: 0
                },
    
                // Text styling.
                text: {
                    fontFamily: 'Arial'
                },
                '.option-text': {
                    fontSize: 11,
                    fill: '#4b4a67',
                    refX: 30,
                    yAlignment: 'middle'
                },
                '.question-text': {
                    fill: 'white',
                    refX: '50%',
                    refY: 15,
                    fontSize: 15,
                    textAnchor: 'middle',
                    style: {
                        textShadow: '1px 1px 0px gray'
                    }
                },
    
                // Options styling.
                '.option-rect': {
                    rx: 3,
                    ry: 3,
                    stroke: 'white',
                    strokeWidth: 1,
                    strokeOpacity: .5,
                    fillOpacity: .5,
                    fill: 'white',
                    refWidth: '100%'
                }
            }
        },
        {
    
        markup: '<rect class="body"/><text class="question-text"/><g class="options"></g>',
        // optionMarkup: '<g class="option"><rect class="option-rect"/><path class="btn-remove-option" d="M0,0 15,0 15,5 0,5z"/><text class="option-text"/></g>',
    });
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
export function createMyShape2(){
    return new joint.shapes.myApp.Question({
        position: { x: 400 - 50, y: 30 },
        size: { width: 100, height: 70 },
    });
}