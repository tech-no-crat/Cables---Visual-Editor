var img = ["x","+","/","\\"];
var ctx;
var W = 40;
var H = 16;
var field = new Array();
var next = new Array();
next["x"] = "x";
next["+"] = "/";
next["/"] = "\\";
next["\\"] = "+";

$(document).ready(function(){

    $("#editor").click(function(eventObject) {
        mouseX = eventObject.pageX - this.offsetLeft;
        mouseY = eventObject.pageY - this.offsetTop;
        click(mouseX, mouseY);
    });

    $("#write").click(function(){
        write(); 
    });

    $("#read").click(function(){
        read();
    });
});

function start()
{
    var canvas = document.getElementById('editor');

    if (canvas.getContext){
        ctx = canvas.getContext('2d');
        load();
        draw();
    } else {
        alert("Sorry, your browser sucks.");
    }
}

function read()
{
    var str = $('textarea#solution').val();  
    lines = str.split('\n');
    size = lines[0].split(' ');
    H = size[0];
    W = size[1];

    var i, j;
    for(j=0;j<H;j++) {
        for(i=0;i<W;i++){
            if(field[i]==undefined) field[i]= new Array();
            if(lines[j+1][i]!='.' && lines[j+1][i]!='+' && lines[j+1][i]!='/' && lines[j+1][i]!='\\' && lines[j+1][i]!='x') alert("Invalid characters detected (" + i + ", " + j + ")!");
            if(lines[j+1][i]!='.') field[i][j]=lines[j+1][i];
            else field[i][j]='+';
        }
    }

    var canvas = document.getElementById('editor');
    canvas.width = W * 20;
    canvas.height = H * 20;
    draw();
}

function write()
{
    var str = "";
    var i, j;

    str += H + " " + W;
    str += "\n";
    for(j=0;j<H;j++) {
        for(i=0;i<W;i++) {
            str += field[i][j];
        }
        str += "\n";
    }

    $("textarea#solution").val(str);
}

function load()
{
    img["x"] = new Image();
    img["x"].src = "img/img_x.png";
    img["+"] = new Image();
    img["+"].src = "img/img_+.png";
    img["\\"] = new Image();
    img["\\"].src = "img/img_rd.png";
    img["/"] = new Image();
    img["/"].src = "img/img_lu.png";

    read();
}

function click(mx, my)
{
    var x, y;
    x = Math.floor(mx/20);
    y = Math.floor(my/20);
    field[x][y] = next[field[x][y]];
    ctx.drawImage(img[field[x][y]], x * 20, y *20);

}

function draw()
{
    var i=0, j=0;
    for(i=0;i<W;i++) {
        for(j=0;j<H;j++){
            ctx.drawImage(img[field[i][j]], i * 20, j *20);
        }
    }
}
