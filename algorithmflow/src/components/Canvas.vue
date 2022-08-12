<template>
<div>
    <div class="toolbar-container"></div>
    <div class="stencil-container"></div>
    <div class="paper-container"></div>
    <div class="inspector-container"></div>
</div>
</template>

<script>
import {init} from '../config/common.js'
import * as joint from '../../build/package/rappid.js'
window.joint = joint
export default {
    data() {
        return {
            joint : joint
        }
    },
    mounted() {
        this.joint.setTheme('modern')
        init(this.joint)
    },
    methods: {

    }

}
</script>
