import {paper} from "../view/apps"
import {getMessageStr} from "./messageHandler"
export function dropListen(graph) {
  window.addEventListener(
    "dragover",
    function (e) {
      e.preventDefault();
    },
    false
  );
  window.addEventListener(
    "drop",
    function (e) {
      e.preventDefault();
      var reader = new FileReader();
      var file = e.dataTransfer.files[0];
      // var cellSize = { width: 150, height: 125 };
      // var centerX = e.clientX - cellSize.width / 2;
      // var centerY = e.clientY - cellSize.height / 2;
      reader.onloadend = function () {
        var json = JSON.parse(reader.result);
        if(json.id==null){
          delete json["id"]
        }
        var obj = Object.assign(getPositionObj(e.clientX,e.clientY),json)
        var model = new joint.shapes.myApp.Algorithm(obj)
        window.chrome.webview.postMessage(getMessageStr("graphChange",JSON.stringify(graph.toJSON(),null,4)))
        window.chrome.webview.postMessage(getMessageStr("addModel",JSON.stringify(model)))
        model.addTo(graph)
      };
      reader.readAsText(file, "UTF-8");
    },
    false
  );
}

function getPositionObj(x,y){
    var paperPoint = paper.clientToLocalPoint(x, y);
    return {position:paperPoint}
}