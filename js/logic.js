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
    updatescore();
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
    updatescore();
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

function updatescore()
{
    var vis = new Array;
    var i, s, sside, x, y, d, len, L, S;
    vis[0] = new Array; vis[1] = new Array; vis[2] = new Array; vis[3] = new Array;
    
    S=0;

    for(s=0;s<4;s++)
    {

        if(s==0){ sside = 'L'; L = H; }
        else if(s==1){ sside = 'R'; L = H;}
        else if(s==2){ sside = 'U'; L = W; }
        else if(s==3){ sside = 'D'; L = W; }
        
        for(i=0;i<L;i++)
        {
            if(vis[s][i]==true) continue;

            if(sside=='L'){ x = 0; y = i; d = 'R'}
            else if(sside=='R'){ x = W-1; y = i; d = 'L'}
            else if(sside=='U'){ x = i; y=0; d='D' }
            else if(sside=='D'){ x = i; y=H-1; d='U' }
            len = 0;

            vis[s][i] = true;
            
            while(1)
            {
                if(x>=W){ vis[1][y]=true; break; }
                if(x<0){ vis[0][y]=true; break; }
                if(y>=H) { vis[3][x]=true; break; }
                if(y<0) { vis[2][x]=true; break; }
                if(field[x][y]=='x') break;

                if(field[x][y]=='/')
                {
                    if(d=='R') d='U';
                    else if(d=='D') d='L';
                    else if(d=='L') d='D';
                    else if(d=='U') d='R';
                }
                else if(field[x][y]=='\\')
                {
                    if(d=='R') d='D';
                    else if(d=='D') d='R';
                    else if(d=='L') d='U';
                    else if(d=='U') d='L';
                }

                if(d=='R') x++; if(d=='L') x--; if(d=='U') y--; if(d=='D') y++;
                len++;
            }
            
            S += Math.pow(len,2);
        }
    }

    $("div#score").html(S)
}
