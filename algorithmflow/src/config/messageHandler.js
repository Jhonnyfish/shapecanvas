import { graph } from "@/view/apps";

export var handleMessage = function (msg) {
  msg.handle();
};

var BuildResolve = function () {};
BuildResolve.prototype.handle = function () {
  graph.clear()
};

var GraphRes = function () {};
GraphRes.prototype.handle = function () {
  window.chrome.webview.postMessage(getMessageStr("graphChange",JSON.stringify(graph.toJSON(),null,4)))
};

var messageDictionary = {
  buildNew: new BuildResolve(),
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
