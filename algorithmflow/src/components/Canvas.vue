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
    mouted(){
        this.init()
    },
    init(){
        alert('输出一句话')
    }
}
</script>