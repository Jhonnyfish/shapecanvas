<template>
<div>
    <div class="toolbar-container" ref="toolbar-container">工具条</div>
    <div class="stencil-container" ref="stencil-container">模板</div>
    <div class="paper-container" ref="paper-container">画纸</div>
    <div class="inspector-container" ref="inspector-container">监视器</div>
</div>
</template>

<script>
import * as joint from '../../build/package/rappid'
export default {
    mounted() {
        this.init()
    },
    methods: {
        init() {
            //joint.setTheme('dark')
            //joint.setTheme('material')
            joint.setTheme('modern')
            //joint.setTheme('default')
            let graph = new joint.dia.Graph({},{cellNamespace:joint.shape})
            let paper = new joint.dia.Paper({
                width: 1000,
                height: 1000,
                gridSize: 10,
                drawGrid: true,
                model: graph, 
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

            let paperScroller = new joint.ui.PaperScroller({
                paper: paper,
                autoResizePaper: true,
                cursor: 'grab'
            })
            document.querySelector('.paper-container').appendChild(paperScroller.el)
            paperScroller.render().center()
        },  
        defalutLink(elementView, magnet){
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
