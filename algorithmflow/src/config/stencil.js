
export function createStencil(paperScroller){
    var stencil = new joint.ui.Stencil({
        paper: paperScroller,
        scaleClones: true,
        width: 240,
        groups: {
            myShapesGroup1: { index: 1, label: ' My Shapes 1' },
            myShapesGroup2: { index: 2, label: ' My Shapes 2' }
        },
        dropAnimation: true,
        groupsToggleButtons: true,
        search: {
            '*': ['type', 'attrs/label/text']
        },
        layout: true  // Use default Grid Layout
    });

    document.querySelector('.stencil-container').appendChild(stencil.el);
    stencil.render().load({
        myShapesGroup1: [{
            type: 'standard.Rectangle',
        }, {
            type: 'standard.Ellipse',
        }],
        myShapesGroup2: [{
            type: 'standard.Cylinder'
        }, {
            type: 'myApp.MyShape',
            attrs: { label: { text: 'Shape' }},
            ports: { items: [{ group: 'in' }, { group: 'out' }, { group: 'out' }] }
        }]
    });
}