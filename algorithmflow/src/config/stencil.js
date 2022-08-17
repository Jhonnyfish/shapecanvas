import { createModel } from "./shapes";
import { createMyShape2 } from "./shapes";
export function createStencil(paperScroller){
    var stencil = new joint.ui.Stencil({
        paper: paperScroller,
        scaleClones: true,
        width: 240,
        groups: {
            myShapesGroup1: { index: 1, label: ' 基础形状' },
            myShapesGroup2: { index: 2, label: ' 输入输出' },
            myShapesGroup3: { index: 3, label: ' 特殊形状' }
        },
        dropAnimation: true, //拖拽时的样式
        groupsToggleButtons: true, //groups全部展开
        search: {
            '*': ['type', 'attrs/label/text']
        },
        layout: true
    });

    document.querySelector('.stencil-container').appendChild(stencil.el);
    var model = createModel()
    var model2 = createMyShape2()
    stencil.render().load({
        myShapesGroup1: [{
            type: 'standard.Rectangle',
        },model],
        myShapesGroup2: [{
            type: 'myApp.MyShape',
            attrs: {
                 label: { text: '输入输出' },
                },
            ports: { 
                items: [
                { group: 'in' },
                { group: 'in' },
                { group: 'out' }, 
                { group: 'out' }
            ],          
        },      
        size: {  width:200,height: 150 },
        }],
        myShapesGroup3: [model2]
    });
}