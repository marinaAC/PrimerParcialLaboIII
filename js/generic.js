function $(id){
    return document.getElementById(id);
}

function spinnerVisible(){
    $("load").hidden = false;
    $("list").hidden = true;
}

function spinnerHidden(){
    $("load").hidden = true;
    $("list").hidden = false;
}

function showPopUp() {
    $("containerPopup").hidden = false;
}

function closePopUp() {
    $("containerPopup").hidden = true;
}

function radioBtn(txt) {
    if(txt != null && txt == "Mañana"){
        $("mna").checked=true;
    }else if(txt=="Noche"){
        $("ncha").checked=true;
    }
}

function consultRdibtn() {
    if($("mna").checked){
        return "Mañana";
    }else if($("ncha").checked){
        return "Noche";
    }
}

function isChecked() {
    return $("mna").checked || $("ncha").checked;
}