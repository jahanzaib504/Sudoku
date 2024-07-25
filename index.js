function getRandomInt(start, end) {
    var range = start + Math.floor(Math.random() * (end - start + 1));
    return range;
}

class Sudoku {
    grid = [];
    coordinates = {x:0, y:0}; //Just for transfering values
      errorCell = {x:0, y:0}      //Cell where error has occured
    errorHasOccured = false  //flag 
    selected = {x:-1, y:-1};
    constructor() {
        for (var i = 0; i < 9; i++) {
            this.grid[i] = [];
            for (var j = 0; j < 9; j++) {
                var element = document.createElement("div");
                element.addEventListener("click", this.handleEvent.bind(this));
                if(i == 8)
                    element.style.borderBottom = "1px solid black";
                if(j == 8)
                element.style.borderRight = "1px solid black";
                this.grid[i].push(element);
                if(j!=0 && j%3 == 0)
                element.style.borderLeft = "2px solid black";
                if(i!=0 && i%3 == 0)
                element.style.borderTop = "2px solid black";
            }
        }
       var numSequence = [];
       for(var i=1; i<=9; i++) //putting numbers in array
       numSequence.push(i);

       for(var i=0; i<8; i++){ //Shuffling
        var r = getRandomInt(i+1, 8),
        temp  = numSequence[i];
        numSequence[i] = numSequence[r];
        numSequence[r] = temp;
       }
       this.fill(numSequence)
    }
    handleEvent(event) {
       //Find the x and y coordinate of div tag which has been selected by the user
       this.clear();
       for(var i=0; i<9; i++){
        for(var j=0; j<9; j++){
            if(event.target == this.grid[i][j]){
                this.selected.x = i; this.selected.y = j;
                break;
            }
        }
       }
       event.target.classList.add("selected");
    }
    fill(numSequence, i = 0, j = -1,index = 0) {
        if (index == 81)
            return 1;
        this.coordinates.x = i;
        this.coordinates.y = j;
        this.findNextEmptyCell(this.coordinates);
        i = this.coordinates.x;
        j = this.coordinates.y;
        for (var idx = 0; idx < numSequence.length; idx++) {
            this.grid[i][j].innerHTML = numSequence[idx];
            if (!this.check(i, j) && this.fill(numSequence, i, j, index+1))
                return 1;
        }
        this.grid[i][j].innerHTML = '';
       return 0;
    }
    findNextEmptyCell(obj){
       obj.x = obj.x + Math.floor((obj.y+1)/9);
       obj.y = (obj.y+1)%9;
    }
    clear(){
        for(var i=0; i<9; i++){
            for(var j=0; j<9; j++){
                this.grid[i][j].classList.remove("selected");
            }
        }
    }
    check(row, col) { //Check for error
        var v = this.grid[row][col].innerHTML;
        for (var i = 0; i < 9; i++) {
            if (i != row && this.grid[i][col].innerHTML === v)
                return 1;

            if (i != col && this.grid[row][i].innerHTML === v)
                return 1;
            
        }

        var i = Math.floor(row / 3) * 3, j = Math.floor(col / 3) * 3;
        for (var k = i; k < i + 3; k++) {
            for (var l = j; l < j + 3; l++) {
                if (k != row && l != col && this.grid[k][l].innerHTML == v)
                    return 1;
            }
        }
        return 0;
    }

    print() {
        var container = document.querySelector(".sudo-grid");
        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 9; j++) {
                this.grid[i][j].classList.add("make-cell");
                container.appendChild(this.grid[i][j]);
            }
        }
    }
}
function func(event){
    
    if(this.selected.x === -1 || event.key > 57 || event.key < 48)
    return;

    
}
var s = new Sudoku();
s.print();
document.body.addEventListener("keydown", func.bind(s));




