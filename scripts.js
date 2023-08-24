// Get the modal
var winmodal = document.getElementById('myWinningModal');
var itemmodal = document.getElementById('myItemModal');

// Get the <span> element that closes the modal
var winspan = document.getElementsByClassName("close")[0];
var itemspan = document.getElementsByClassName("close")[1];

function units(codepoint) {
    const tmp = codepoint - 0x10000
    const padded = tmp.toString(2).padStart(20, '0')
    const unit1 = Number.parseInt(padded.substr(0, 10), 2) + 0xD800;
    const unit2 = Number.parseInt(padded.substr(10), 2) + 0xDC00;
    return [unit1, unit2]
}

const face = units(0x0001F9CD);
const tone = units(0x1F3FF);
const char = String.fromCharCode(...face, ...tone);

var items = [];

var images = ["images/tree.png", "images/book.jpg", "images/frog.jpg", "images/button.jpg", "images/flower.png", "images/pants.jpg", "images/letter.png", "images/leaf.jpg", "images/quilt.jpg", "images/road.png"];
var desc = ["tree", "book", "frog", "button", "flower", "pants", "letter", "leaf", "quilt", "road"];

function arraysEqual(a, b) 
{
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  for (var i = 0; i < a.length; ++i) 
  {
    if (a[i] !== b[i]) return false;
  }

  return true;
}

modelfunwin = function() 
{
    winmodal.style.display = "block";
    x = document.querySelector(".gameheadwin");
    x.textContent = "Congratulations! You found your way out of the field and collected " + m.getFound() + " out of 10 items!";
}

founditem = function() 
{
    itemmodal.style.display = "block";
    x = document.querySelector(".gameheaditem");
    if (m.getFound() === 9)
    {
        x.textContent = "You found the " + desc.shift() + "! There is 1 item left to find.";
    }
    
    else
    {
        x.textContent = "You found the " + desc.shift() + "! There are " + (10-m.getFound()) + " items left to find.";
    }
    
    img = document.querySelector("#img");
    img.src = images.shift();
    playing = false;
}

document.getElementById("demo").addEventListener("click", myFunction);

function myFunction() {
    document.location.reload();
}

// When the user clicks on <span> (x), close the modal
winspan.onclick = function() {
    itemmodal.style.display = "none";
    winmodal.style.display = "none";
    playing = true;
}

itemspan.onclick = function() {
    itemmodal.style.display = "none";
    winmodal.style.display = "none";
    playing = true;
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == winmodal) {
        winmodal.style.display = "none";
        playing = true;
    }
    if (event.target == itemmodal) {
        itemmodal.style.display = "none";
        playing = true;
    }
}

playing = true
window.addEventListener('keydown',doKeyDown,true);

function doKeyDown(evt)
{
    var handled = false;
    if (playing) {
        switch (evt.keyCode) {
            case 38:  /* Up arrow was pressed */
                m.moveup("canvas");
                handled = true;
                break;
            case 87:  /* Up arrow was pressed */
                m.moveup("canvas");
                handled = true;
                break;
            case 40 :  /* Down arrow was pressed */
                m.movedown("canvas");
                handled = true;
                break;
            case 83 :  /* Down arrow was pressed */
                m.movedown("canvas");
                handled = true;
                break;
            case 37:  /* Left arrow was pressed */
                m.moveleft("canvas");
                handled = true;
                break;
            case 65:  /* Left arrow was pressed */
                m.moveleft("canvas");
                handled = true;
                break;
            case 39:  /* Right arrow was pressed */
                m.moveright("canvas");
                handled = true;
                break;
            case 68:  /* Right arrow was pressed */
                m.moveright("canvas");
                handled = true;
                break;
        }
        if (m.checker("canvas"))
            playing = false

    }
    if (handled)
        evt.preventDefault(); // prevent arrow keys from scrolling the page (supported in IE9+ and all other browsers)
}


var dsd = function (size) 
{
    this.N = size;
    this.P = new Array(this.N);
    this.R = new Array(this.N);

    this.init = function () 
    {
        for (var i = 0; i < this.N; i++) 
        {
            this.P[i] = i;
            this.R[i] = 0;
        }
    }

    this.union = function (x, y) 
    {
        var u = this.find(x);
        var v = this.find(y);
        if (this.R[u] > this.R[v]) 
        {
            this.R[u] = this.R[v] + 1;
            this.P[u] = v;
        }

        else 
        {
            this.R[v] = this.R[u] + 1;
            this.P[v] = u;
        }
    }

    this.find = function (x) {
        if (x == this.P[x])
            return x;
        this.P[x] = this.find(this.P[x]);
        return this.P[x];
    }
};

function random(min, max)      
{ 
    return (min + (Math.random() * (max - min))); 
}

function randomChoice(choices) 
{ 
    return choices[Math.round(random(0, choices.length-1))]; 
}

var maze = function (X, Y) {
    this.N = X;
    this.M = Y;
    this.S = 25;
    this.found = 0;
    this.Board = new Array(2 * this.N + 1);
    this.EL = new Array();
    this.vis = new Array(2 * this.N + 1);
    this.delay = 2;
    this.x = 1;
    this.init = function () {
        for (var i = 0; i < 2 * this.N + 1; i++) {
            this.Board[i] = new Array(2 * this.M + 1);
            this.vis[i] = new Array(2 * this.M + 1);
        }

        for (var i = 0; i < 2 * this.N + 1; i++) {
            for (var j = 0; j < 2 * this.M + 1; j++) {
                if (!(i % 2) && !(j % 2)) {
                    this.Board[i][j] = '+';
                }
                else if (!(i % 2)) {
                    this.Board[i][j] = '-';
                }
                else if (!(j % 2)) {
                    this.Board[i][j] = '|';
                }
                else {
                    this.Board[i][j] = ' ';
                }
                this.vis[i][j] = 0;
            }
        }
    }


    this.add_edges = function () {
        for (var i = 0; i < this.N; i++) {
            for (var j = 0; j < this.M; j++) {
                if (i != this.N - 1) {
                    this.EL.push([[i, j], [i + 1, j], 1]);
                }
                if (j != this.M - 1) {
                    this.EL.push([[i, j], [i, j + 1], 1]);
                }
            }
        }
    }


    // Hash function
    this.h = function (e) {
        return e[1] * this.M + e[0];
    }
    this.randomize = function (EL) {
        for (var i = 0; i < EL.length; i++) {
            var si = Math.floor(Math.random() * 387) % EL.length;
            var tmp = EL[si];
            EL[si] = EL[i];
            EL[i] = tmp;
        }
        return EL;
    }

    this.breakwall = function (e) {
        var x = e[0][0] + e[1][0] + 1;
        var y = e[0][1] + e[1][1] + 1;
        this.Board[x][y] = ' ';
    }

    this.gen_maze = function () {
        this.EL = this.randomize(this.EL);
        var D = new dsd(this.M * this.M);
        D.init();
        var s = this.h([0, 0]);
        var e = this.h([this.N - 1, this.M - 1]);
        this.Board[1][0] = ' ';
        this.Board[2 * this.N - 1][2 * this.M] = ' ';
        //Run Kruskal
        for (var i = 0; i < this.EL.length; i++) {
            var x = this.h(this.EL[i][0]);
            var y = this.h(this.EL[i][1]);
            if (D.find(s) == D.find(e)) {
                if (!(D.find(x) == D.find(s) && D.find(y) == D.find(s))) {
                    if (D.find(x) != D.find(y)) {
                        D.union(x, y);
                        this.breakwall(this.EL[i]);
                        this.EL[i][2] = 0;
                    }
                }
                //break;
            }

            else if (D.find(x) != D.find(y)) {
                D.union(x, y);
                this.breakwall(this.EL[i]);
                this.EL[i][2] = 0;
            }
            else {
                continue;
            }
        }

    };


    this.draw_canvas = function (id) {
        this.canvas = document.getElementById(id);
        var scale = this.S;
        temp = [];
        allChoices = [];
        if (this.canvas.getContext) {
            this.ctx = this.canvas.getContext('2d');
            this.Board[1][0] = '$'
            for (var i = 0; i < 2 * this.N + 1; i++) {
                for (var j = 0; j < 2 * this.M + 1; j++) {
                    if (this.Board[i][j] != ' ')
                    {
                        this.ctx.fillStyle = "#460063";
                        this.ctx.fillRect(scale * i, scale * j, scale, scale);
                    }

                    else
                    {
                        if (i<5 && j<5)
                        {
                            temp.push([i,j])
                        }
                        allChoices.push([i,j]);
                    }
                }
            }

            var x = randomChoice(temp);
            this.Board[x[0]][x[1]] = '&';
            this.ctx.font = "24px Arial";
            this.ctx.fillText(char,scale* x[0], scale * x[1]+21);

            for (var i = 0; i < 10; i++)
            {
                var randomIndex = Math.round(random(0, allChoices.length-1));
                var y = allChoices[randomIndex];

                if (arraysEqual(x,y))
                {
                    allChoices.splice(randomIndex,1);
                    randomIndex = Math.round(random(0, allChoices.length-1));
                    y = allChoices[randomIndex];
                }

                items.push(y);
                allChoices.splice(randomIndex,1);
                this.ctx.fillStyle = "#9a81a6";
                this.ctx.fillRect(scale*y[0], scale*y[1], scale, scale);
                this.ctx.font = "15px Arial";
                this.ctx.fillStyle = "#000000";
                this.ctx.fillText("?",scale*y[0]+8, scale * y[1]+18);
            }
        }
    };

    this.checkPos = function (id) {
        for (var i = 0; i < 2 * this.N + 1; i++) {
            for (var j = 0; j < 2 * this.M + 1; j++) {
                if (this.Board[i][j] == '&') {
                    // console.log(i,j)
                    return [i,j]
                }
            }
        }
    }

    this.moveclear = function (a,b) {
        var scale = this.S;
        this.ctx = this.canvas.getContext('2d');
        this.ctx.fillStyle = "#bababa";
        this.ctx.fillRect(scale * a, scale * b, scale, scale);
        this.Board[a][b] = ' '
    }

    this.move =  function (a,b) {
        var scale = this.S;
        this.ctx = this.canvas.getContext('2d');
        this.ctx.font = "24px Arial";
        this.ctx.fillText(char, scale*a, scale*b+21);
        this.Board[a][b] = '&';

        cord = this.checkPos("canvas");

        for (var i = 0; i < items.length; i++)
        {
            if (arraysEqual(cord,items[i]))
            {
                this.found += 1;
                items.splice(i,1);
                founditem();
                break;
            }
        }
    }

    this.moveup = function (id) {
        cord = this.checkPos(id);
        var scale = this.S;
        i = cord[0]
        j = cord[1]
        j -= 1
        if (j < 0)
            return
            else if (j > 2 * this.M)
                return
                else if (this.Board[i][j] == ' ') {
                    this.moveclear(i,j+1);
                    this.move(i,j);}
        else
            return
    }

    this.movedown = function (id) {
        cord = this.checkPos(id);
        var scale = this.S;
        i = cord[0]
        j = cord[1]
        j+=1
        if(j<0)
            return
            else if(j>2*this.M)
                return
                else if(this.Board[i][j] == ' ') {
                    this.moveclear(i,j-1);
                    this.move(i,j);}
        else
            return
    }

    this.moveleft = function (id) {
        cord = this.checkPos(id);
        var scale = this.S;
        i = cord[0]
        j = cord[1]
        i-=1
        if(i<0)
            return
            else if(i>2*this.N)
                return
                else if(this.Board[i][j] == ' ') {
                    this.moveclear(i+1,j);
                    this.move(i,j);}
        else
            return
    }

    this.moveright = function (id) {
        cord = this.checkPos(id);
        var scale = this.S;
        i = cord[0]
        j = cord[1]
        i+=1
        if(i<0)
            return
            else if(i>2*this.N)
                return
                else if(this.Board[i][j] == ' ') {
                    this.moveclear(i-1,j);
                    this.move(i,j);}
        else
            return
    }
    this.checker = function (id) {
        cord = this.checkPos(id);
        i = cord[0]
        j = cord[1]
        if ((i == 19 && j== 20) || (i==1 && j==0)) {
            modelfunwin();
            return 1
        }
        return 0
    }

    this.getFound = function () {
        return this.found;
    }

};

m = new maze(10 , 10);
m.init();
m.add_edges();
m.gen_maze();
m.draw_canvas("canvas");
function drawFound() {
    document.getElementById("c").innerHTML = "Items Found: "+ m.getFound() + " / 10"
}
// drawFound();
setInterval(drawFound, 100);

//addEvents();