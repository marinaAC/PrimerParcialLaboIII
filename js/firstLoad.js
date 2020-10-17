var peticionHttp = new XMLHttpRequest();

window.addEventListener('load', function(){
    //var btn = document.getElementById('btn');
    //btn.addEventListener("click",function () {
    //    ejecutarPost();
        getMaterias();
        rowClick();
        closeBtn();
        savePerson();
        deleteMateria();
    //})

})


function getMaterias() {
    peticionHttp.onreadystatechange=callbackRta;
    peticionHttp.open("GET","http://localhost:3000/materias",true);
    peticionHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    peticionHttp.send();
    
}

function editarMateria(materia) {
    peticionHttp.onreadystatechange=callbackRta;
    peticionHttp.open("POST","http://localhost:3000/editar",true);
    peticionHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    setMateriaLocalStorage(JSON.stringify(materia));
    peticionHttp.send("id="+materia.id+"&nombre="+materia.nombre+"&cuatrimestre="+materia.cuatrimestre+"&fechaFinal="+materia.fechaFinal+"&turno="+materia.turno);

}

function eliminarMateria(materia) {
    peticionHttp.onreadystatechange=callbackRtaDelete;
    peticionHttp.open("POST","http://localhost:3000/eliminar",true);
    peticionHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
 //   console.log(materia);
    peticionHttp.send("id="+materia.id+"&nombre="+materia.nombre+"&cuatrimestre="+materia.cuatrimestre+"&fechaFinal="+materia.fechaFinal+"&turno="+materia.turno);
}



function callbackRta(){
    if(peticionHttp.readyState != 4){
        spinnerVisible();
    }else{
        if(peticionHttp.status==200){
            spinnerHidden();
            var respuesta = peticionHttp.responseText;
            var rtaJson = JSON.parse(respuesta);
            if(respuesta == null || rtaJson.type == "error"){
                alert("fallo");
            }else if(rtaJson.type == "ok"){
                console.log("Cambio efectuado correctamente");
                var materia = getMateriaLocalStorage();
                changeRow(JSON.parse(materia));
            }else{
                AddMateriaToTable(rtaJson);
            }
        }else{
            alert("ERROR");
        }
    }
    
}


function callbackRtaDelete(){
    if(peticionHttp.readyState != 4){
        spinnerVisible();
    }else{
        if(peticionHttp.status==200){
            spinnerHidden();
            var respuesta = peticionHttp.responseText;
            var rtaJson = JSON.parse(respuesta);
            if(respuesta == null || rtaJson.type == "error"){
                alert("fallo");
            }else if(rtaJson.type == "ok"){
                console.log("Cambio efectuado correctamente");
                var materia = JSON.parse(getMateriaLocalStorage());
                deleteRow(materia.id);
            }
        }else{
            alert("ERROR");
        }
    }
    
}


function closeBtn() {
    $("closePopUp").addEventListener("click",closePopUp);
}

function savePerson(){
    
        $("btnSave").addEventListener("click",modificar);
    
}

function deleteMateria() {
    $("btnDelete").addEventListener("click",borrar);
}

function getMateriaLocalStorage() {
    return localStorage.getItem("materia");
}

function setMateriaLocalStorage(obj) {
    return localStorage.setItem("materia",obj);
}