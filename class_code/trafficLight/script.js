var clickButton =$('#clicker')
var currentVal = "green"
var dim = '20%'
var bright = '100%'
var changeLight = function(){
    if (currentVal == "green"){
        currentVal = "yellow";
        $('#go').css("opacity", dim);
        $('#yield').css("opacity", bright);
    }
     else if (currentVal == "yellow"){
        currentVal = "red";
        $('#yield').css("opacity", dim);
        $('#stop').css("opacity", bright);
    }
     else if (currentVal == "red"){
        currentVal = "green";
        $('#stop').css("opacity", dim);
        $('#go').css("opacity", bright);
    }
}
clickButton.click(changeLight);