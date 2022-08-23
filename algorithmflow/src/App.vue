<template>
<div id="app">
    <div class="toolbar-container"></div>
    <div class="stencil-container"></div>
    <div class="paper-container"></div>
    <div class="inspector-container"></div>
</div>
</template>

<script>
import {init,getJoint} from './config/apps.js'
import { THEME } from './theme'

const joint = getJoint()
export default {
    data() {
        return {
            joint : joint
        }
    },
    mounted() {
        joint.setTheme(THEME)
        //joint.setTheme('modern')
        //joint.setTheme('dark');
        //joint.setTheme('material');
        //joint.setTheme('default');
        init(this.joint)
    },
    methods: {

    }

}
</script>