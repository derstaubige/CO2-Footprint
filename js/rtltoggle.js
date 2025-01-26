function toggleRTL(){
    if ( document.getElementsByTagName("HTML")[0].dir === "rtl"){
        document.getElementsByTagName("HTML")[0].dir = "";
    }else{
        document.getElementsByTagName("HTML")[0].dir = "rtl";
    }
}

for (e of document.getElementsByClassName("rtllink")){
    e.addEventListener("click", (event) =>{
        toggleRTL();
    });
}