import {renderEl} from "../models/factory"
export function createToolbar(paperScroller,graph){
    var toolbar = new joint.ui.Toolbar({
        groups: {
            clear: { index: 1 },
            zoom: { index: 2 }
        },
        tools: [
            { type: 'button', name: 'clear', group: 'clear', text: 'Clear Diagram' },
            { type: 'zoom-out', name: 'zoom-out', group: 'zoom' },
            { type: 'zoom-in', name: 'zoom-in', group: 'zoom' },
            { type: 'button', name: 'add',text :'Add Element'},
            { type: 'button',name:'graphJson',text:'graphJson'}
        ],
        references: {
            paperScroller: paperScroller // built in zoom-in/zoom-out control types require access to paperScroller instance
        }
    });

    toolbar.on({
        'clear:pointerclick': graph.clear.bind(graph),
        'add:pointerclick': function(){
            var msgCustom = {point:{x: 500, y: 200}, shapeType:'myApp.Algorithm'}
            renderEl(msgCustom);
        },
        'graphJson:pointerclick':function(){
            console.log(graph.toJSON())
        }
    });

    document.querySelector('.toolbar-container').appendChild(toolbar.el);
    toolbar.render();
}