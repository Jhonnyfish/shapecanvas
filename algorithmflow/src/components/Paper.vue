<template>
<div class="paper-container" id="paper-container">
    <div v-html=paperScrollerHTML></div>
</div>
</template>

<script>
import * as joint from '../../build/package/rappid'

export default {
    data() {
        return {
            paper: null,
            graph: null,
            paperScroller: null,
            paperScrollerHTML: null,
        }
    },
    mounted() {
        this.init()
    },
    methods: {
        init() {
            //joint.setTheme('dark')
            //joint.setTheme('material')
            joint.setTheme('modern')
            //joint.setTheme('default')
            this.graph = new joint.dia.Graph({}, {
                cellNamespace: joint.shape
            })
            this.paper = new joint.dia.Paper({
                width: 1000,
                height: 1000,
                gridSize: 10,
                drawGrid: true,
                model: this.graph,
                defaultLink: this.defalutLink,
                interactive: {
                    linkMove: false
                },
                snapLinks: {
                    radius: 70
                },
                defaultConnectionPoint: {
                    name: 'boundary'
                },
                cellViewNamespace: joint.shape
            })

            this.paperScroller = new joint.ui.PaperScroller({
                paper: this.paper,
                autoResizePaper: true,
                cursor: 'grab'
            })
            this.paperScrollerHTML = this.paperScroller.el.outerHTML
            alert
            this.paperScroller.render().center()

        },
        defalutLink(elementView, magnet) {
            return new joint.shapes.standard.Link({
                attrs: {
                    line: {
                        stroke: 'white'
                    }
                }
            })
        }
    }
}
</script>
