"use strict";
let libName = "@lib:aurora.physics.plus";

async function getPlayerName() {
  let reqObj = {
    "method":"POST"
  }
  let resp = await fetch("macro:getPlayerName"+libName,reqObj);
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
  let resp = await fetch("macro:getLibProperty"+libName,reqObj)
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
  let resp = await fetch("macro:setLibProperty"+libName,reqObj);
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

try{
  translateDocument().catch(e=> console.log(""+e+"\n"+e.stack));
}
catch(e){
  console.log(""+e+"\n"+e.stack);
}
