'use strict';
let id = "";
//  statistics:{},
//  battle:{},
//  affinity:[],
//  resistances:[],
//  senses:[],
//  powers:[],
//  caracteristics:[],
//  skills:[],
//  equipment:[]

async function initializeCharSheet(){
  id = await getPlayerToken();
  if(id == ""){
    callMTFunc("closeFrame","aurora physics character sheet");
    return;
  } 
  document.addEventListener("tokenUpdate",handleEvent);
  callCharacterSheetUpdate();
}
//NOTE:if too slow separate call to update events
function handleEvent(event){
  updateStatistics();
//  updateBattle();
//  updateSenses();
//  updatePowers();
//  updateCaracteristics();
}

function callCharacterSheetUpdate(){
  const event = new Event("tokenUpdate");
  document.dispatchEvent(event);
}
async function updateStatistics(){
  const statistics = await getTokenJSON(id,"aurora.statistics");
  const affinity = await getTokenJSON(id,"aurora.affinity");
  const resistances = await getTokenJSON(id,"aurora.resistances");
  const senses = await getTokenJSON(id,"aurora.senses");
}
