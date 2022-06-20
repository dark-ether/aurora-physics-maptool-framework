"use strict";

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
