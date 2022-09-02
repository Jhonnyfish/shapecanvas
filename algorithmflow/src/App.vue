<template>
  <div id="app">
    <div class="toolbar-container"></div>
    <!-- <div class="stencil-container"></div> -->
    <div class="paper-container"></div>
    <!-- <div class="inspector-container"></div> -->
  </div>
</template>

<script>
import { graph, init, paper } from "./view/apps";
import { THEME } from "./theme";
import { renderEl } from "./models/factory";
import {dropListen,model} from "./config/dropResolve"
export default {
  data() {
    return {
      joint: joint,
    };
  },
  mounted() {
    joint.setTheme(THEME);
    //joint.setTheme('modern')
    //joint.setTheme('dark');
    //joint.setTheme('material');
    //joint.setTheme('default');
    init()
    dropListen(graph)
    //监听本机发的消息
    window.chrome.webview.addEventListener("message", (event) => {
      if (event.data == "myApp.Algorithm") {
        console.log("111");
      }
      var msg = event.data;
      var paperPoint = paper.clientToLocalPoint(msg.X, msg.Y);
      var pointMsg = { point: paperPoint, shapeType: msg.ShapeType };
      console.log(pointMsg);
      renderEl(pointMsg);
      // var obj = JSON.parse(event.data)
      // temp_dropObject = obj;
      //alert(obj)
      // document.getElementById("box1").innerText +=  obj+"\n"
    });
  },
  methods: {},
};
</script>
