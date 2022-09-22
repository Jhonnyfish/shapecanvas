import { graph,commandManager} from "@/view/apps";
var msgBody = null
export var handleMessage = function (msg) {
  msg.handle();
};
var RefreshModel = function () {};
RefreshModel.prototype.handle = function () {
  var refreshInfo = JSON.parse(msgBody)
  var model = graph.getCell(refreshInfo.id)
  model.set("options",refreshInfo.options)
};

var BuildResolve = function () {};
BuildResolve.prototype.handle = function () {
  graph.clear()
};

var GraphJson = function () {};
GraphJson.prototype.handle = function () {
  window.chrome.webview.postMessage(getMessageStr("graphChange",JSON.stringify(graph.toJSON(),null,4)))
};

var GraphChange = function () {};
GraphChange.prototype.handle = function () {
  commandManager.reset()
  graph.fromJSON(JSON.parse(msgBody))
};

var messageDictionary = {
  buildNew: new BuildResolve(),
  graphJson: new GraphJson(),
  graphChange: new GraphChange(),
  refreshModel: new RefreshModel()
};

export function createHandlerInstance(msg) {
  msgBody = msg.body
  return messageDictionary[msg.head.messageType]
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