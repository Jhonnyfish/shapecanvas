<template>
  <div id="app">
    <div class="toolbar-container"></div>
    <!-- <div class="stencil-container"></div> -->
    <div class="paper-container"></div>
    <!-- <div class="inspector-container"></div> -->
  </div>
</template>

<script>
import { init, getJoint } from "./config/apps.js";
import { THEME } from "./theme";
import {renderEl} from "./config/el-render";

const joint = getJoint();
export default {
  data() {
    return {
      joint: joint
    };
  },
  mounted() {
    var graph = new joint.dia.Graph
    joint.setTheme(THEME);
    //joint.setTheme('modern')
    //joint.setTheme('dark');
    //joint.setTheme('material');
    //joint.setTheme('default');
    init(graph);
    //监听本机发的消息
    window.chrome.webview.addEventListener("message", (event) => {
      if(event.data == 'myApp.Algorithm'){
        renderEl(graph);
      }
      console.log(event.clientX,event.clientY);
      // var obj = JSON.parse(event.data)
      // temp_dropObject = obj;
      //alert(obj)
      // document.getElementById("box1").innerText +=  obj+"\n"
    });
  },
  methods: {
  },
};
</script>
