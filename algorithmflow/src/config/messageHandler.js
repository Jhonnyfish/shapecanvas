import { graph } from "@/view/apps";

export var handleMessage = function (msg) {
  msg.handle();
};

var BuildResolve = function () {};
BuildResolve.prototype.handle = function () {
  console.log("build instance");
};

var GraphRes = function () {};
GraphRes.prototype.handle = function () {
  window.chrome.webview.postMessage(getMessageStr("graphJson",JSON.stringify(graph.toJSON(),null,4)))
};

var messageDictionary = {
  build: new BuildResolve(),
  graphJson: new GraphRes()
};

export function createHandlerInstance(messageType) {
  return messageDictionary[messageType];
}

export function getMessageStr(messageType,messageBody){
    var messageHead = {
        messageType: messageType
    }
    var message = {
        head: messageHead,
        body: messageBody
    }
    return JSON.stringify(message)
}
