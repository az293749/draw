var canvas = document.querySelector("#canvas");
var context = canvas.getContext("2d");
var color = ["#ff0000","#0d00ff","#09ff00","#ffffff"];
var save_value = document.querySelector(".save");
var color_container = document.querySelector(".color_container");
var clear_value = document.querySelector(".clear");
var currentcolor = color[0];
clear_value.addEventListener("click", ()=> {
    context.clearRect(0,0,canvas.width,canvas.height);
});
save_value.addEventListener("click",() => {
    var link = document.createElement("a");
    link.download = new Date().toDateString() + ".png";
    link.href = canvas.toDataURL();
    link.click();
});
color.forEach((c1)=>{
    const use = document.createElement("div");
    use.className = "c1";
    use.style.backgroundColor = c1;
    use.onclick = ()=>
    {
        currentcolor = c1;
    };
    color_container.insertAdjacentElement("beforeend",use);
});
const draw = (event) =>{
    const rect = canvas.getBoundingClientRect();
    context.lineWidth = 5;
    context.lineCap = "round";
    context.lineTo(event.pageX-rect.left,event.pageY-rect.top);
    context.strokeStyle = currentcolor;
    context.stroke();
    context.moveTo(event.pageX-rect.left,event.pageY-rect.top);
};
var ismousedown = false;
canvas.onmousedown = (event)=>{
    ismousedown = true;
    draw(event);
};
canvas.onmousemove = (event)=>{
    if(ismousedown) draw (event);
};
canvas.onmouseup = (event)=>{
    context.beginPath();
    ismousedown = false;
};