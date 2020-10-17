function AddMateriaToTable(materia) {
    var table = document.getElementById('tCuerpo');
    if(materia!= null && materia != undefined){
        materia.forEach(m => {
            var tr = document.createElement("tr");
            var tdId = document.createElement("td");
            var tdNombre = document.createElement("td");
            var tdCuatri = document.createElement("td");
            var tdFecha = document.createElement("td");
            var tdTurno = document.createElement("td");
            tdId.textContent = m.id;
            tdId.className = "invisibilitTd";
            tdNombre.textContent=m.nombre;
            tdCuatri.textContent =m.cuatrimestre;
            tdFecha.textContent =m.fechaFinal;
            tdTurno.textContent = m.turno;
            tr.appendChild(tdId);
            tr.appendChild(tdNombre);
            tr.appendChild(tdCuatri);
            tr.appendChild(tdFecha);
            tr.appendChild(tdTurno);
            tr.setAttribute("id",m.id);
            table.appendChild(tr);
        });
    }
}

function changeRow(objMateria) {
    var arraysTds = $(objMateria.id).childNodes;
    if(arraysTds.length>= 5){
        arraysTds[1].textContent = objMateria.nombre;
        arraysTds[2].textContent = objMateria.cuatrimestre;
        arraysTds[3].textContent = objMateria.fechaFinal;
        arraysTds[4].textContent = objMateria.turno;
    }
}

function modificar(event) {

    var id = $("idName").value;
    var name = $("name").value;
    var cuatri = $("cuatri").value;
    var fec = getDate();    
    var turn =consultRdibtn();
    //hacer validaciones;
    if(validateMatera(name)&&isChecked()&&validateDate(fec)){
        $("name").className ="inputSinError";
        $("mna").className ="inputSinError";
        $("ncha").className ="inputSinError";
        var materia = '{"id":'+id+',"nombre":"'+name+'","cuatrimestre": "'+cuatri+'","fechaFinal":"'+fec+'","turno":"'+turn+'"}';
        if(materia != null && materia != undefined){
            var obj = JSON.parse(materia);
            editarMateria(obj);
            closePopUp();
        }
    }
    

}

function borrar(){
    var id = $("idName").value;
    var name = $("name").value;
    var cuatri = $("cuatri").value;
    var fec = $("fechaFin").value;
    var turn =consultRdibtn();
    var materia = '{"id":'+id+',"nombre":"'+name+'","cuatrimestre": "'+cuatri+'","fechaFinal":"'+fec+'","turno":"'+turn+'"}';
    if(materia != null && materia != undefined){
        var obj = JSON.parse(materia);
        eliminarMateria(obj);      
        closePopUp();
    }
}

function deleteRow(id){ 
    var table =document.getElementById("tCuerpo");
    var fila = $("id");
    table.deleteRow(fila);
}


function validateMatera(m) {
    if(m == "" && m.length < 6){
        $("name").className ="inputError";
        return false;
    }
    $("name").className ="inputSinError";
    return true;
}


function rowClick() {
    var table = document.getElementById("tCuerpo");
    table.addEventListener("dblclick",function(item) {
        var row = item.path[1]; 
        var materia = [];

        for (var j = 0; j < row.cells.length; j++) { 
            console.log( row.cells[j].innerHTML)
            materia.push(row.cells[j].innerHTML);
        } 
        console.log(materia);

        getDataForPopup(materia);
    });
}


function getDataForPopup(materia) {
    if(materia != undefined && materia != null){
        $("idName").value = materia[0];
        $("name").value = materia[1];
        $("cuatri").value = materia[2];
       // $("fechaFin").value = materia[3];
       setDate(materia[3]);
        //$("turno").value = materia[4];
        radioBtn(materia[4])
        showPopUp();
    }
}


function setDate(fecha) {
    var arrayF = fecha.split("/");
    var d = arrayF[0];
    var m = arrayF[1];
    var a = arrayF[2];
    $("fechaFin").value = a+"-"+m+"-"+d;
}

function getDate() {
    var fecha = $("fechaFin").value;
    var arrayF = fecha.split("-");
    var a = arrayF[0];
    var m = arrayF[1];
    var d = arrayF[2];
    return  d+"/"+m+"/"+a;
}


function validateDate(dateString) {
    var validation = true;
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); 
    var yyyy = today.getFullYear();
    today = dd + '-' + mm + '-' + yyyy;
    var arrayF = dateString.split("/");
    var d = arrayF[0];
    var m = arrayF[1];
    var a = arrayF[2];

    if(yyyy>a){
        validation= false;
    }else if(a==yyyy && mm>m){
        validation= false;
    }else if(a==yyyy && mm==m && dd>d){
        validation = false;
    }
    return validation;
}

