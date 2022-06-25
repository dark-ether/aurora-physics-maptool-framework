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
  update();
}
//NOTE:if too slow separate call to update events
function update(){
  updateStatistics().catch(e => console.log(""+e+"\n"+e.stack));
  
//  updateBattle();
//  updateSenses();
//  updatePowers();
//  updateCaracteristics();
}

async function updateStatistics(){
  //const statistics = await getTokenJSON(id,"aurora.statistics");
  const affinity = await getTokenJSON(id,"aurora.affinity");
  //const resistances = await getTokenJSON(id,"aurora.resistances");
  //const senses = await getTokenJSON(id,"aurora.senses");
  console.log(affinity);
  buildTableInId(["name","value"],"affinity",affinity);
}

try{
  initializeCharSheet().catch(e => console.log(""+e+"\n"+e.stack));
}
catch(e){
  console.log(""+e+"\n"+e.stack);
}
