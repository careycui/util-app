class Utils{
  constructor(win){
    this.win = win;
  }
  //最小化窗口
  min(){
    console.log(this.win);
    this.win.minimize();
  }
  //最大化窗口
  max(){
    let win = this.win;
    if(win.isMaximized()){
      win.unmaximize();
    }else{
      win.maximize();
    }
  }
  //关闭窗口
  close(){
    this.win.close();
  }
}
export { Utils }