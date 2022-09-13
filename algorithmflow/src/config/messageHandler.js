export var handleMessage = function(msg){
    msg.handle()
}

var BuildResolve = function(){}
BuildResolve.prototype.handle = function(){
    console.log('build instance')
}


var messageDictionary = {
    'build' : new BuildResolve()
}

export function createHandlerInstance(messageType){
    return messageDictionary[messageType]
}