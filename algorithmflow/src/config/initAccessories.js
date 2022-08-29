import {paper} from "./apps"

export function initHalo(){
    paper.on('element:pointerup', function(elementView, evt) {

        var halo = new joint.ui.Halo({
            cellView: elementView,
            useModelGeometry: true,
            type: 'toolbar'
        });

        halo.removeHandle('resize')
            .removeHandle('rotate')
            .removeHandle('fork')
            .removeHandle('link')
            .render();
    }, this);
}

export function initLinkTools(){
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
}