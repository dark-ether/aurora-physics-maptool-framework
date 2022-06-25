"use strict";
let prefix = "aurora."
function getPlayerName(){
  return MTScript.execMacro("[r:getPlayerName()]");
}

function findToken(name){
  return MTScript.execMacro(`[r:findToken("${name}")]`);
}

function getOwned(player){
  return JSON.parse(MTScript.execMacro(`[r:getOwned("${player}","json")]`));
}

function getTokens(object){
  json = JSON.stringify(object);
  return JSON.parse(MTScript.execMacro(`[r:getTokens("json","${json}")]`));
}

function getImpersonated(){
  return MTScript.execMacro("[r:getImpersonated()]");
}

function getSelected() {
  return JSON.parse(MTScript.execMacro("[r:getSelected('json')]"));
}

function roll(number,sides) {
  return Number(MTScript.execMacro(`[r:roll("${number}","${sides}")]`));
}

function getPlayerToken(){
  let owned = getOwned();
  let playerToken = "";
  if(owned.length == 1){
    playerToken = owned[0];
  }
  if(playerToken == ""){
    playerToken = getImpersonated();
  }
  if(playerToken == ""){
    playerToken = getSelected()[0];
  }
  return playerToken;
}

function currentToken(){
  return MTScript.execMacro("[r:currentToken()]");
}

function prepareToken(tokenId){
  let token = MapTool.tokens.getTokenByID(tokenId);
  if(token.getProperty(prefix+"setup")!= "complete"){
    resetToken(tokenId);
  }
}

function resetToken(tokenId){
  let token = MapTool.tokens.getTokenByID(tokenId);
  token.setProperty(prefix+"statistics",JSON.stringify({
    life:0,
    stamina:0,
    agility:0,
    strength:0,
    intelligence:0,
    movement:0,
    resources:0,
    currentResources:0,
    constitution:0,
    will:0
  });)
  token.setProperty(prefix+"battle",JSON.stringify({
    hp:0,
    ep:0,
    maxhp:0,
    maxep:0,
    conditions:[],
    pa:0,
    pm:0
  }));
  token.setProperty(prefix+"affinity","[]");
  token.setProperty(prefix+"resistances","[]");
  token.setProperty(prefix+"senses","[]");
  token.setProperty(prefix+"powers","[]");
  token.setProperty(prefix+"caracteristics","[]");
  token.setProperty(prefix+"skills","[]");
  token.setProperty(prefix+"equipment","[]");
  token.setProperty(prefix+"setup","complete");
}
