"use strict";
let libName = "@lib:aurora.physics.plus";
let tpmacro = "macro:frameMacros/getTokenProperty"+libName;

async function getPlayerName() {
  let reqObj = {
    "method":"POST"
  }
  let resp = await fetch("macro:frameMacros/getPlayerName"+libName,reqObj);
  let text = await resp.text();
  return text;
}

async function getLibProperty(property) {
  let reqObj = {
    "method":"POST",
    "body": JSON.stringify({
      "property":property
    })
  }
  let resp = await fetch("macro:frameMacros/getLibProperty"+libName,reqObj)
  let result = await resp.text();
  return result;
}

async function setLibProperty(property,value) {
  let reqObj = {
    "method":"POST",
    "body":JSON.stringify({
      "property":property,
      "value":value
    })
  }
  let resp = await fetch("macro:frameMacros/setLibProperty"+libName,reqObj);
  let text = await resp.text();
  return text;
}

async function getPlayerProp(prop) {
  let player = await getPlayerName();
  let playerProp = await getLibProperty(player+"."+prop);
  return playerProp;
}

async function setPlayerProp(prop,value) {
  let player = await getPlayerName();
  return setLibProperty(player+"."+prop,value);
}

async function translateDocument() {
  let language = await getPlayerProp("language");
  if(language == ""){
    language = "portugues";
  }
  let translationObject = await getLibProperty("translation."+language);
  translationObject =  JSON.parse(translationObject);
  let elementList = document.body.querySelectorAll("*");
  for(let element of elementList){
    let textToTranslate = element.innerHTML;
    if(textToTranslate in translationObject){
      element.innerHTML = translationObject[textToTranslate];
    }
  }
}

async function getPlayerToken(){
  let resp = await fetch("macro:frameMacros/getPlayerToken"+libName,{"method":"POST"});
  return await resp.text();
}

async function getTokenStatistics(tokenId) {
  let reqObj = {
    "method":"POST",
    "body":JSON.stringify({
      "token":tokenId,
      "property":"aurora.statistics",
    })
  }
  let resp = await fetch(tpmacro,reqObj);
  return await resp.json();
}

async function getTokenBattleStatistics(tokenId) {
  let reqObj = {
    "method":"POST",
    "body":JSON.stringify({
      "token":tokenId,
      "property":"aurora.battle"
    })
  }
  let resp = await fetch(tpmacro,reqObj);
  return await res.json;
}

async function getTokenSkills(tokenId) {
  let reqObj = {
    method:"POST",
    body:JSON.stringify({
      token:tokenId,
      property:"aurora.skills"
    })
  }
  let resp = await fetch(tpmacro,reqObj)
  return await resp.json();
}

async function getTokenCaracteristics(tokenId){
  let reqObj = {
    "method":"POST",
    "body":JSON.stringify({
      "token":tokenId,
      "property":"aurora.caracteristics"
    })
  }
  let resp = await fetch(tpmacro,reqObj);
  return await resp.json();
}

async function callMTFunc(funcName,...args){
  let reqObj = {
    "method":"POST",
    "body":JSON.strigify({funcName:funcName,args:args})
  }
  let resp = await fetch("macro:frameMacros/callMTFunc"+libName,reqObj);
  if(!resp.ok){
    console.trace("error in callMTFunc");
  }
  return await resp.text();
}

function createTokenUpdateEvent(toUpdate){
  const event = new CustomEvent("tokenUpdate",{detail:toUpdate})
  return event;
}

try{
  translateDocument().catch(e=> console.log(""+e+"\n"+e.stack));
}
catch(e){
  console.log(""+e+"\n"+e.stack);
}
