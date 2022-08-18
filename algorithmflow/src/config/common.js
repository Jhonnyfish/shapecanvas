import { createInspector } from "./inspector";
import { createMyShape, defineMyShape } from "./shapes";
import { createStencil } from "./stencil";
import { createToolbar } from "./toolbar";

export function init(joint) {
    var graph = new joint.dia.Graph

    var paper = new joint.dia.Paper({
        width: 1000,
        height: 1000,
        gridSize: 10,
        drawGrid: true,
        model: graph, // Set graph as the model for paper
        defaultLink: function(elementView, magnet) {
            var link =  new joint.shapes.standard.Link({
                attrs: {
                     line: { stroke: 'white' }
                },
            });
            link.set('router',{
                name: 'manhattan',
                args:{
                    step:10, //和papper的grid大小相等时最好
                    maximumLoops: 500,//最大寻路循环次数，超出这个数字后就变成直连
                    padding: 20, //障碍物填充
                    maxAllowedDirectionChange: 90 ,//最大弯曲角度
                    startDirections:['left','right']
                }
            })
            return link
        },
        linkPinning: false,//不允许线连接到空白处
        interactive: { linkMove: false },
        snapLinks: { radius: 70 },
        defaultConnectionPoint: { name: 'boundary' }
    });

    var paperScroller = new joint.ui.PaperScroller({
        paper: paper,
        autoResizePaper: true,
        cursor: 'grab'
    })

    document.querySelector('.paper-container').appendChild(paperScroller.el);
    paperScroller.render().center();
    
    defineMyShape()
    //创建左侧边栏
    createStencil(paperScroller)
    createInspector(paper)

    // Halo
    // ----

    paper.on('element:pointerclick', function(elementView) {
        var handles = [{
            name: 'remove',
            position: 'nw',
            events: { pointerdown: 'removeElement' }
        }, {
            name: 'myCustomAction',
            position: 'ne',
            icon: 'data:image/gif;base64,R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKUE1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7'
        }];
        if (!elementView.model.hasPorts()) {
            // Only shapes without ports will have the "link" handle in the Halo control panel. Shapes with ports can be connected by "dragging" ports.
            handles.push({
                name: 'link',
                position: 'e',
                events: { pointerdown: 'startLinking', pointermove: 'doLink', pointerup: 'stopLinking' }
            });
        }
        var halo = new joint.ui.Halo({
            cellView: elementView,
            handles: handles
        }).render();

        halo.on('action:myCustomAction:pointerdown', function(evt) {
            alert('My Control Button Clicked!');
        })
    })

    // Link Tools
    // ----------
    // 指针在链接上释放时触发,显示工具箱
    paper.on('link:pointerup', function(linkView) {
        paper.removeTools();
        var toolsView = new joint.dia.ToolsView({
            name: 'my-link-tools',
            tools: [
                // new joint.linkTools.Vertices(),
                new joint.linkTools.SourceArrowhead(),
                new joint.linkTools.TargetArrowhead(),
                // new joint.linkTools.Segments,
                new joint.linkTools.Remove({ offset: -20, distance: 40 })
            ]
        });
        linkView.addTools(toolsView);
    });

    paper.on('blank:pointerdown', function() {
        paper.removeTools();
    });

    createToolbar(paperScroller,graph)
    var myShape = createMyShape()
    graph.addCell(myShape)

    // Get element from the graph and change its properties.
    myShape = graph.getElements()[0];
    // myShape.prop('size/width', 150);
    myShape.prop('level', 2);
    myShape.prop('attrs/body/fill', '#FFFF');

    // Create a clone of an element.
    var myShape2 = myShape.clone();
    myShape2.translate(400, 0);
    graph.addCell(myShape2);

    // Create a link that connects two elements.
    var myLink = new joint.shapes.standard.Link({
        attrs: { line: { stroke: 'white' }},
        source: { id: myShape.id, port: 'out1' },
        target: { id: myShape2.id, port: 'in1' }
    });
    graph.addCell(myLink);

    // React on changes in the graph.
    // graph.on('change add remove', function() {
    //     var diagramJsonString = JSON.stringify(graph.toJSON());
    //     console.log('Diagram JSON', diagramJsonString);
    // });
    // graph.on('change:level', function(cell, level) {
    //     var color = (level > 8) ? 'red' : 'white';
    //     cell.prop('attrs/body/fill', color);
    // });
}