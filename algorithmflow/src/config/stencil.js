// import { createAlgorithmWithName } from "./factory";
import {defineStencilAlgorithm} from "./stencil.shapes"
export function createStencil(paperScroller) {
    var stencil = new joint.ui.Stencil({
        paper: paperScroller,
        scaleClones: true,
        width: 240,
        groups: {
            myShapesGroup1: { index: 1, label: ' 基础形状' },
            myShapesGroup2: { index: 2, label: ' 输入输出' },
        },
        dropAnimation: false, //拖拽时的样式
        groupsToggleButtons: true, //groups全部展开
        search: {
            '*': ['type', 'attrs/label/text']
        },
        // dragStartClone: (element: joint.dia.Element) => {
        //     const name = element.get('name');
        //     const Shape = shapes.app[name];
        //     if (!Shape) throw new Error(`Invalid stencil shape name: ${name}`);
        //     return Shape.fromStencilShape(element);
        // },
        layout: {
            columnWidth : 200,
            columns: 1,
            rowHeight: 'auto'
        }
    });

    document.querySelector('.stencil-container').appendChild(stencil.el);
    defineStencilAlgorithm()
    
    // var model = createAlgorithmWithName('')
    stencil.render().load({
        myShapesGroup1: [
            new joint.shapes.stencil.Algorithm,
        ],
        myShapesGroup2: [model]
    });
}