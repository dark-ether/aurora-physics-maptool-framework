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
  return JSON.parse(MTScript.execMacro(`[r:getTokens("json",${json})]`));
}

