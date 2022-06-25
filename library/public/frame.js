"use strict";
const libName = "@lib:aurora.physics.plus";
const tpmacro = "macro:frameMacros/getTokenProperty"+libName;

async function getPlayerName() {
  const reqObj = {
    "method":"POST"
  }
  const resp = await fetch("macro:frameMacros/getPlayerName"+libName,reqObj);
  const text = await resp.text();
  return text;
}

async function getLibProperty(property) {
  const reqObj = {
    "method":"POST",
    "body": JSON.stringify({
      "property":property
    })
  }
  const resp = await fetch("macro:frameMacros/getLibProperty"+libName,reqObj)
  const result = await resp.text();
  return result;
}

async function setLibProperty(property,value) {
  const reqObj = {
    "method":"POST",
    "body":JSON.stringify({
      "property":property,
      "value":value
    })
  }
  const resp = await fetch("macro:frameMacros/setLibProperty"+libName,reqObj);
  const text = await resp.text();
  return text;
}

async function getPlayerProp(prop) {
  const player = await getPlayerName();
  const playerProp = await getLibProperty(player+"."+prop);
  return playerProp;
}

async function setPlayerProp(prop,value) {
  const player = await getPlayerName();
  return setLibProperty(player+"."+prop,value);
}

async function translateDocument() {
  let language = await getPlayerProp("language");
  if(language == ""){
    language = "portugues";
  }
  const translationObject = await getLibProperty("translation."+language);
  translationObject =  JSON.parse(translationObject);
  const elementList = document.body.querySelectorAll("*");
  for(const element of elementList){
    const textToTranslate = element.innerText;
    if(textToTranslate in translationObject){
      element.innerText = translationObject[textToTranslate];
    }
  }
}

async function getPlayerToken(){
  const resp = await fetch("macro:frameMacros/getPlayerToken"+libName,{"method":"POST"});
  return await resp.text();
}

async function getTokenProperty(tokenId,property) {
  const reqObj = {
    "method":"POST",
    "body":JSON.stringify({
      "token":tokenId,
      "property":property,
    })
  }
  const resp = await fetch(tpmacro,reqObj);
  return await resp.text();
}
async function getTokenJSON(tokenId,property) {
  const reqObj = {
    "method":"POST",
    "body":JSON.stringify({
      "token":tokenId,
      "property":property,
    })
  }
  const resp = await fetch(tpmacro,reqObj);
  return await resp.json();
}

async function callMTFunc(funcName,...args){
  const reqObj = {
    "method":"POST",
    "body":JSON.strigify({funcName:funcName,args:args})
  }
  const resp = await fetch("macro:frameMacros/callMTFunc"+libName,reqObj);
  if(!resp.ok){
    console.trace("error in callMTFunc");
  }
  return await resp.text();
}

function buildTable(headers,id,values){
  const table = document.getElementById(id);
  const tHead = table.createTHead();
  const tHeaders = tHead.insertRow(0);
  for(const header of headers){
    const headerElement = tHeaders.insertCell(-1);
    headerElement.innerText = header;
  }
  const tBody = table.createTBody();
  for(const value of values){
    const elementRow = tBody.insertRow(-1);
    for(const header of headers){
      let cellText = "gave object without value to table builder:"+(new Error()).stack;
      if(header in value){
        cellText = value[header];
      }
      const cell = elementRow.insertCell(-1);
      cell.innerText = cellText;
    }
  }
}
try{
  translateDocument().catch(e=> console.log(""+e+"\n"+e.stack));
  buildTable(["test","sucess"],"affinity",[{test:"sucess",sucess:"affinity"},{test:"my test"}]);
}
catch(e){
  console.log(""+e+"\n"+e.stack);
}
