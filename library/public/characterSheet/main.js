const charSheetInfo = {
  id:"",
  statistics:{},
  battle:{},
  affinity:[],
  resistances:[],
  senses:[],
  powers:[],
  caracteristics:[],
  skills:[],
  equipment:[],
  handleEvent: async function (event){
    let toUpdate = event.detail.toUpdate;
    for(let i = 0; i < toUpdate.length;i++){
    }
  }
}

async function initializeCharSheet(){
  charSheetInfo.id = await getPlayerToken();
  if(charSheetInfo.id == ""){
    callMTFunc("closeFrame","aurora physics character sheet");
    return;
  } 
  document.addEventListener("tokenUpdate",charSheetInfo);

}
