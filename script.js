var table=[];
document.addEventListener("DOMContentLoaded", function start(){
var grid = document.querySelector('.grid');
const hand=document.querySelector(".hand");
var mouth=document.getElementById("mouth");
var card= document.getElementsByClassName("card");
var dragitem=null;
let state=0;
const namejson=["data/Graphisme.json", "data/Audiovisuelle.json", "data/Développement.json"]



for(var i of card){
    i.addEventListener('dragstart', dragStart);
    i.addEventListener('dragend', dragEnd);
}
//Début de l'action drag
function dragStart(){
    dragitem=this;
    setTimeout(()=>this.style.display="none", 0)
}
//Relachement du drag
function dragEnd(){
    setTimeout(()=>this.style.display="block", 0);
    dragItem=null;
}
//Action activé par survol, entrée dans, départ de, et dépot dans la zone bouche
    mouth.addEventListener('dragover', dragOver);
    mouth.addEventListener('dragenter', dragEnter)
    mouth.addEventListener('dragleave', dragLeave)
    mouth.addEventListener('drop', Drop)

//Dépot si la zone de dépôt est déjà rempli, remplace par le nouveau drop et ramène l'ancienne carte dans la main
function Drop(){
    if(state!==0){
    const current=document.querySelector("#mouth div");
    console.log("hello");
    mouth.firstElementChild.remove();
    hand.append(current);
    hand.lastChild.style.display="block";
    }
    this.append(dragitem);
    this.lastChild.style.display="none"
    state=dragitem.id;
    console.log(state);
    insertgrid();
    this.style.border="none"
}
//Survol en drag
function dragOver(e){
    e.preventDefault();
    this.style.border="5px solid black"
}
//Entrée en drag
function dragEnter(e){
   e.preventDefault(); 
}
function dragLeave(e){
    this.style.border="none"
}



//Function async fetch
function fetchdata(i){
console.log(namejson);
    fetch(namejson[i])
    .then((response)=>response.json())
    .then((json)=>table.push(json))
    console.log(table);
    let aza="aza"
    return aza
}

  
function cleargrid(){
    table=[];
    document.querySelectorAll(".grid-item").forEach(element=>{
        element.remove()
    })
    grid.style.height="0px"
} 
function  insertimg(){
  

    table.forEach(element=>{
        element.forEach(function(element,i){
            const div="<div class='grid-item' id='"+i+"'> <img src='"+element.Img+"'> </div>"
            grid.innerHTML+=div; 
            //var num = Math.floor(Math.random()*10) + 1; 
            //num *= Math.round(Math.random()) ? 1 : -1;
           //grid.lastChild.style.rotate=num+"deg"
        });
        grid.style.height="auto";
        grid.style.minHeight="100vh";
    })
    popup();
//Création d'une fenêtre modale à chaque clique sur un grid item, la fenêtre se ferme quand on clique sur sa croix de fermeture
}

function insertvid(){
    table.forEach(element=>{
        element.forEach(function(element,i){
            const div="<div class='grid-item' id='"+i+"'> <iframe src='"+element.Img+"'  width='100%' height='480' allow=''> </iframe> <h2>"+element.Titre+"</h2><p>"+element.Description+"</p></div>"
            console.log(element);
            console.log(div);
            grid.innerHTML+=div; 
            //var num = Math.floor(Math.random()*10) + 1; 
            //num *= Math.round(Math.random()) ? 1 : -1;
           //grid.lastChild.style.rotate=num+"deg"
        });
        grid.style.height="auto";
        grid.style.minHeight="100vh";
    })
    popupvid();
};
//Pop up
function popup(){
    document.querySelectorAll(".grid-item").forEach(e=>{
        e.addEventListener("click", function(){
            const popupnum=e.id;
            let popupdiv="<div class='polaroid'><div class='overlay'></div><span>X</span><a href='"+table[0][popupnum].Img+"' target='_blank'><img src='"+table[0][popupnum].Img+"' alt=''></a><caption><h2>"+ table[0][popupnum].Titre+"</h2><p>"+table[0][popupnum].Description+"</p></caption></div>";
            console.log(popupdiv);
            document.querySelector("#popup").innerHTML=popupdiv;
            document.querySelector("#popup").style.display="flex"
            document.querySelector("#popup span").addEventListener("click", function(){
                document.querySelector(".polaroid").remove()
                document.querySelector("#popup").style.display="none"
                popup();
            })
           
        })
    })
}

//Pop up vid
function popupvid(){
    document.querySelectorAll(".grid-item").forEach(e=>{
        e.addEventListener("click", function(){
            const popupnum=e.id;
            let popupdiv="<div class='polaroid'><div class='overlay'></div><span>X</span><a href='"+table[0][popupnum].Img+"' target='_blank'><img src='"+table[0][popupnum].Img+"' alt=''></a><caption><h2>"+ table[0][popupnum].Titre+"</h2><p>"+table[0][popupnum].Description+"</p></caption></div>";
            console.log(popupdiv);
            document.querySelector("#popup").innerHTML=popupdiv;
            document.querySelector("#popup").style.display="flex"
            document.querySelector("#popup span").addEventListener("click", function(){
                document.querySelector(".polaroid").remove()
                document.querySelector("#popup").style.display="none"
            })
           
        })
    })
}
function insertgrid(){
    if(state=="un"){
//Graphisme
let i=0
    cleargrid()
       fetchdata(i)
       setTimeout(insertimg, 30)
     
    }
    else if(state=="deux"){
        let i=1
        cleargrid();
        fetchdata(i);
        setTimeout(insertvid,30);
    }
    else  if(state=="trois"){
        let i=2;
      
        cleargrid();
        fetchdata(i);
        setTimeout(insertimg,30);

    }
    else{
        cleargrid()

    }
}
/*
imagesLoaded( grid ).on( 'progress', function() {
  // layout Masonry after each image loads
  msnry.layout();
});
*/
})  
