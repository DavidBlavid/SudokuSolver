var timer;
var timerActive = false;
var paused = false;

var moves;
var move_counter;
var move_current = 0;

var solved = false;

function frame(){
	
	document.getElementById("frame-counter").innerHTML = move_current + " / " + (move_counter-1);
	
	let current = moves[move_current];
	move_current++;

	let current_element = document.getElementById((current.y + current.x * 9 + 1).toString());
	
	//dont inset value if value is 0
	if(current.value != 0){
	
		current_element.value = current.value;
		$(current_element).removeClass("box-black");
	
	} else {
		
		//color cell black
		current_element.value = "";
		current_element.classList.add("box-black");
		
	}
	
	//animation end reached, stop animating
	if(move_current == move_counter) {
		
		clearInterval(timer);
		timerActive = false;
		
		document.getElementById("play").innerHTML = "▶";
		
	}
	
}

$(".round-box").on('input', function(){
	
	clearInterval(timer);
	timerActive = false;
	
	solved = false;
	
	checkAll();
	
})

//secret :)
$("#secret").on('click', function(){
	
	document.getElementById("secret").innerHTML = "DER ARMINATOR";
	
})

//media control buttons
function toStart(){
	
	if(solved){
	
		//reset move counter
		move_current = 0;
		
		document.getElementById("frame-counter").innerHTML = "0 / " + (move_counter-1);
		
		//clear all cells
		for (let i = 0; i < 9; i++){
			
			for (let j = 0; j < 9; j++){
			
				//remove highlighting and input
				let current_element = document.getElementById(((i*9) + j + 1).toString());
				
				current_element.value = "";
				$(current_element).removeClass("box-red");
				$(current_element).removeClass("box-orange");
				current_element.classList.add("box-black");
			
			}
		
		}
		
	}
		
}

function previous(){
	
	if(solved){
	
		if(move_current > 0) {
		
			let temp = move_current;
			move_current = 0;
		
			//clear all cells
			for (let i = 0; i < 9; i++){
				
				for (let j = 0; j < 9; j++){
				
					//remove highlighting and input
					let current_element = document.getElementById(((i*9) + j + 1).toString());
					
					current_element.value = "";
					$(current_element).removeClass("box-red");
					$(current_element).removeClass("box-orange");
					current_element.classList.add("box-black");
				
				}
			
			}
			
			for (i = 0; i < temp-1; i++){
				
				frame();
				
			}
			
		}
		
	}
	
}

function play(){
	
	if(solved){
		
		if(move_current < move_counter){
			
			paused = !paused;
			
			if(paused){
			
				clearInterval(timer);
				timerActive = false;
				document.getElementById("play").innerHTML = "▶";
			
			} else {
				
				timer = setInterval(frame, 20);
				timerActive = true;
				document.getElementById("play").innerHTML = "⏸";
				
			}
			
		} else {
			
			toStart();
			timer = setInterval(frame, 20);
			timerActive = true;
			document.getElementById("play").innerHTML = "⏸";
			
		}
		
	}
	
}

function nextFrame(){
	
	if(solved) {
		
		if(move_current < move_counter){
			
			frame();
			
		}	
		
	}	
	
}

function toEnd(){
	
	if(solved){
		
		move_current = 0;
		
		//clear all cells
		for (let i = 0; i < 9; i++){
				
			for (let j = 0; j < 9; j++){
				
				//remove highlighting and input
				let current_element = document.getElementById(((i*9) + j + 1).toString());
					
				current_element.value = "";
				$(current_element).removeClass("box-red");
				$(current_element).removeClass("box-orange");
				current_element.classList.add("box-black");
				
			}
			
		}
			
		for (i = 0; i < move_counter; i++){
				
			frame();
				
		}
			
	}
	
}

function cleanAll() {

	document.getElementById("frame-counter").innerHTML = "- / -";

	solved = false;

	clearInterval(timer);
	timerActive = false;

	//clear all cells
	for (let i = 0; i < 9; i++){
		
		for (let j = 0; j < 9; j++){
		
			//remove highlighting and input
			let current_element = document.getElementById(((i*9) + j + 1).toString());
			
			current_element.value = "";
			$(current_element).removeClass("box-red");
			$(current_element).removeClass("box-orange");
			$(current_element).removeClass("box-black");
		
		}
	
	}

}

function checkAll(){
	
	document.getElementById("frame-counter").innerHTML = "- / -";
	
	//prepare array
	let board = new Array(9);

	for (i = 0; i < board.length; i++) {
	  board[i] = new Array(9);
	}
	
	//fill the array with inputs
	for (let i = 0; i < 9; i++){
		
		for (let j = 0; j < 9; j++){
		
			//get single input
			let pos = ((i*9) + j + 1).toString();
			let current_element = document.getElementById(pos);
			let current_value = current_element.value;
		
			//is it a proper input?
			if(!isNaN(Number(current_value)) && current_value.length < 2){
		
				//insert value in array
				board[i][j] = Number(current_value);
				
			}
		
		}
	
	}
	
	//check for discrepancies
	for (let i = 0; i < 9; i++){
		
		for (let j = 0; j < 9; j++){
			
			let current_element = document.getElementById(((i*9) + j + 1).toString());
			
			$(current_element).removeClass("box-black");
			
			if(board[i][j] != 0 && !isValid(board, i, j, board[i][j])) {
				
				//highlight cell red
				$(current_element).removeClass("box-orange");
				current_element.classList.add("box-red");
			
			} else {
				
				//highlight cell orange
				$(current_element).removeClass("box-red");
				current_element.classList.add("box-orange");
				
			}
			
			if(isNaN(board[i][j])){
				
				//highlight cell red
				$(current_element).removeClass("box-orange");
				current_element.classList.add("box-red");
				
			}
			
			if(board[i][j] == 0) {
				
				//dont highlight
				$(current_element).removeClass("box-red");
				$(current_element).removeClass("box-orange");
				
			}
			
		}
		
	}
	
}

function run() {

	//create a 2d array to store inputs
	var board = new Array(9);

	for (i = 0; i < board.length; i++) {
	  board[i] = new Array(9);
	}
	
	//create copy of the array
	var copy = new Array(9);
	
	for (i = 0; i < board.length; i++) {
	  copy[i] = new Array(9);
	}
	
	//is checkbox checked?
	var checked = document.getElementById("run_visual").checked;
	
	//these variables keep track of the moves being made
	moves = new Array(10000);
	move_current = 0;
	move_counter = 0;

	//array to check if will run
	var willRun = true;
	
	//fill the array with inputs
	for (let i = 0; i < 9; i++){
		
		for (let j = 0; j < 9; j++){
		
			//get single input
			let pos = ((i*9) + j + 1).toString();
			let current = document.getElementById(pos).value;
		
			//is it a proper input?
			if(!isNaN(Number(current)) && current.length < 2){
		
				//insert value in array
				board[i][j] = Number(current);
				
			} else {
				
				//highlight cell red and dont solve
				willRun = false;
				document.getElementById(pos).classList.add("box-red");
				
			}
		
		}
	
	}
	
	//check if theres discrepancies in the input
	for (let i = 0; i < 9; i++){
		
		for (let j = 0; j < 9; j++){
			
			if(board[i][j] != 0 && !isValid(board, i, j, board[i][j])) {
				
				//highlight cell red and dont solve
				willRun = false;
				document.getElementById(((i*9) + j + 1).toString()).classList.add("box-red");
			
			}
			
		}
		
	}
	
	
	
	/* 
	this is just for testing
	but i think ill leave it in here just to be sure
	
	board = [[1, 2, 9, 0, 3, 0, 4, 7, 0],
             [3, 0, 5, 4, 2, 7, 1, 6, 9],
             [6, 0, 0, 5, 1, 9, 8, 2, 0],
             [5, 4, 0, 1, 0, 3, 0, 9, 8],
             [2, 0, 3, 9, 8, 0, 6, 4, 0],
             [8, 0, 7, 2, 6, 0, 5, 0, 1],
             [9, 5, 0, 0, 4, 2, 0, 1, 0],
             [4, 3, 0, 7, 5, 0, 0, 8, 2],
             [7, 6, 0, 8, 9, 0, 3, 5, 4]];
	*/
	
	//find first empty value
	var next = findNext(board, 0, 0);
	
	//can solve and is there at least one empty cell?
	if(willRun && next.x != -1) {
		
		for (let i = 0; i < 9; i++){
			
			for (let j = 0; j < 9; j++){
			
				copy[i][j] = board[i][j];
			
			}
		
		}
		
		//finally, solve the board
		board = solve(board, next.x, next.y);
	
		//was a solution found?
		if(board.works){
			
			solved = true;
			
			if(checked && move_counter < 10000){
				
				for (let i = 0; i < 9; i++){
			
					for (let j = 0; j < 9; j++){
				
						if(copy[i][j] == 0){
				
							document.getElementById(((i*9) + j + 1).toString()).classList.add("box-black");
						
						}
				
					}
		
			}
			
			timer = setInterval(frame, 20);
			timerActive = true;
				
			} else {
				
				for (let i = 0; i < 9; i++){
			
					for (let j = 0; j < 9; j++){
				
						if(board.board[i][j] != 0){
				
							document.getElementById(((i*9) + j + 1).toString()).value = board.board[i][j];
				
						}
				
					}
			
				}
				
				if(checked) alert("Maximum number of moves was reached! Can not show a replay");
				
			}
			
		} else {
			
			document.getElementById("frame-counter").innerHTML = "- / -";
			solved = false;
			alert("Could not find a solution!");
			
		}
	
	}

}

function changeValue(board, x, y, val) {

	//check if max number of moves has been reached
	if(move_counter < 10000){

		//record move
		moves[move_counter] = {x: x, y: y, value: val};
		
		if(move_counter > 0){
			
			//sometimes identical entries are added in a row
			let prevX = moves[(move_counter-1)].x;
			let prevY = moves[(move_counter-1)].y;
			let prevVal = moves[(move_counter-1)].value;
			
			//if all are identical, this frame will be overwritten
			if(!(prevX == x && prevY == y && prevVal == val)){
				
				move_counter++;
				
			}
			
		} else {
			
			move_counter++;
			
		}
		
	}
	
	//insert value and return
	board[x][y] = val;
	return board;

}

function solve(board, y, x){
  
  var next = findNext(board, x, y);
  var returnObject = {works: true, board};
  
  //console.log("[" + x + "][" + y + "] new recursion (" + board[x][y] + ")");
  
  if(next.x == -1){
	
    for(let i = 1; i < 10; i++){
	 
		//console.log("[" + x + "][" + y + "] isValid at end?");
		if(isValid(board, x, y, i)){
		
			changeValue(board, x, y, i);
       
			returnObject.works = true;
			returnObject.board = board;
			return returnObject;
        
      }
      
    }
	
	changeValue(board, x, y, 0);
	
    returnObject.works = false;
	returnObject.board = board;
	return returnObject;
    
  } else {
  
    for(let i = 1; i < 10; i++){
	  
	//console.log("[" + x + "][" + y + "] isValid at rec? (" + i + ")");
      if(isValid(board, x, y, i)){
		  
		changeValue(board, x, y, i);
		  
		//console.log("[" + x + "][" + y + "] (" + i + ") is valid!");
		
		//recursion is right here
		var solveObject = solve(board, next.x, next.y);
	   
        if(solveObject.works) {
			
			returnObject.works = true;
			returnObject.board = solveObject.board;
			return returnObject;
			
		}
        
      }
      
    }
    
    if(board[x][y] >= 9 && !isValid(board, x, y, board[x][y])) {
      
		changeValue(board, x, y, 0);
	  
		returnObject.works = false;
		returnObject.board = board;
		return returnObject;
      
    }
    
  }
  
  changeValue(board, x, y, 0);
  
  returnObject.works = false;
  returnObject.board = board;
  return returnObject;
  
}

function findNext(board, y, x){
  
  if(x != 0 && y != 0) x++;
  
  //position that will be returned by function
  let pos = {x: -1, y: -1};
  
  //loop through board
  while(y < 10){
   
    //increment y if end is reached
    if(x == 9){
     
      y++;
      x = 0;
      
    }
    
    if(y == 9) break;
    
    if(board[y][x] == 0) {
     
      pos.x = x;
      pos.y = y;
      
      return pos;
      
    }
    
    x++;
    
  }
  
  //no 0 found -> return {-1, -1}
  return pos;
  
}


function isValid(board, x, y, num){
  
  //check horizontal line
  for(var i = 0; i < 9; i++){
    
    if(i != x){
	  
      if(board[i][y] == num) return false;
      
    }
    
  }
  
  //check vertical line
  for(var i = 0; i < 9; i++){
    
    if(i != y){
      
      if(board[x][i] == num) return false;
      
    }
    
  }
  
  //check 3x3 square
  if(num != 0){
  
    baseX = Math.floor(x / 3) * 3;
    baseY = Math.floor(y / 3) * 3;
    
    for(let i = baseY; i < baseY+3; i++){
      
      for(let j = baseX; j < baseX+3; j++){
        
        if(!(i == y && j == x)){
		  
          if(num == board[j][i]) {
			  return false;
		  }
          
        }
        
      }
      
    }
    
  }
  
  return true;
  
}