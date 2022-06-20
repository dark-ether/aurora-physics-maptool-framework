const charSheetInfo = {
  id:"",
  skills:[],
  caracteristics:[],
  powers:[],
  life:0,
  stamina:0,
  agility:0,
  intelligence:0,
  movement:0,
  resources:0,
  strength:0,
  affinity:{},
  constitution:0,
  will:0,
  resistances:{},
  senses:{},
  equipment:[]
}
function initializeCharSheet(){
  charSheetInfo.id = getPlayerToken();
  
}
function updateCharSheet(){}
try {
  
} catch (e) {
  console.log(""+e+"\n"+e.stack);
}
