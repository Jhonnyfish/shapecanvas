
export function initKeyBoard(){
    var keyboard = new joint.ui.Keyboard();
    keyboard.on({
      'all':function(){
          console.log('1')
      }
    });
}