
export function initHalo(paper){
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