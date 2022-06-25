try{
  prepareToken(MTScript.getMTScriptCallingArgs()[0]);
}
catch(e){MapTool.chat.broadcast(""+e+"\n"+e.stack);}
