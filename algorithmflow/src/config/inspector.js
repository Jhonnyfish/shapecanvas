export function createInspector(paper){
    paper.on('element:pointerclick', function(elementView) {
        joint.ui.Inspector.create('.inspector-container', {
            cell: elementView.model,
            inputs: {
                'attrs/label/text': {
                    type: 'text',
                    label: 'Label',
                    group: 'basic',
                    index: 1
                },
                level: {
                    type: 'range',
                    min: 1,
                    max: 10,
                    unit: 'x',
                    defaultValue: 6,
                    label: 'Level',
                    group: 'advanced',
                    index: 2
                }
            },
            groups: {
                basic: {
                    label: 'Basic',
                    index: 1
                },
                advanced: {
                    label: 'Advanced',
                    index: 2
                }
            }
        });
    });
} 