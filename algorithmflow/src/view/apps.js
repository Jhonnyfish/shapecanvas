import { LINK_COLOR } from "@/theme";
import { initHalo, initLinkTools } from "../config/initAccessories";
import { createInspector } from "../config/inspector";
import { defineMyShape } from "../models/shapes";
import { createStencil } from "../config/stencil";
import { createToolbar } from "../config/toolbar";
import { initKeyBoard } from "../config/keyboardController";
import * as joint from "../../build/package/rappid.js";

window.joint = joint;
export var graph = new joint.dia.Graph();
export var paper = new joint.dia.Paper({
  width: 1000,
  height: 1000,
  gridSize: 10,
  drawGrid: true,
  model: graph, // Set graph as the model for paper
  defaultLink: function () {
    var link = new joint.shapes.standard.Link({
      attrs: {
        line: { stroke: LINK_COLOR },
      },
    });
    link.set("router", {
      name: "manhattan",
      args: {
        step: 10, //和papper的grid大小相等时最好
        maximumLoops: 500, //最大寻路循环次数，超出这个数字后就变成直连
        padding: 20, //障碍物填充
        maxAllowedDirectionChange: 90, //最大弯曲角度
        startDirections: ["left", "right"],
      },
    });
    return link;
  },
  linkPinning: true, //不允许线连接到空白处
  interactive: { linkMove: false },
  snapLinks: { radius: 70 },
  defaultConnectionPoint: { name: "boundary" },
});
export function init() {
  var paperScroller = new joint.ui.PaperScroller({
    paper: paper,
    autoResizePaper: true,
    cursor: "grab",
  });
  initKeyBoard(graph);
  document.querySelector(".paper-container").appendChild(paperScroller.el);
  paperScroller.render().center();
  createToolbar(paperScroller, graph);
  defineMyShape();
  //创建左侧边栏
  // createStencil(paperScroller)
  // createInspector(paper)
  initHalo(paper);
  initLinkTools(paper);

  paper.on("blank:pointerdown", function () {
    paper.removeTools();
  });

  // React on changes in the graph.
  // graph.on('change add remove', function() {
  //     var diagramJsonString = JSON.stringify(graph.toJSON());
  //     console.log('Diagram JSON', diagramJsonString);
  // });
  // graph.on('change:level', function(cell, level) {
  //     var color = (level > 8) ? 'red' : 'white';
  //     cell.prop('attrs/body/fill', color);
  // });
}