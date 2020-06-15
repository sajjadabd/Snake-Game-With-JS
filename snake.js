$(document).ready(function(){
	
	
	
class Node
{	
	constructor(x,y)
	{
		this.x = x;
		this.y = y;
		this.next = null;
	}
}

class List
{
	constructor()
	{
		this.head = new Node(0,0);
		this.tail = new Node(0,0);
		this.size = 0;
	}
	
	addNode(x,y)
	{
		let temp = this.head;
		var counter = 0;
		while(counter < this.size)
		{
			temp = temp.next;
			
			counter++;
		}
		//let temp.next = new Node(x,y);
		this.tail.prev = temp.next = new Node(x,y);
		
		this.size++;
	}
	
	deleteFirst()
	{
		let temp = this.head.next;
		
		this.head.next = this.head.next.next;
		
		this.size--;
		
		return temp;
	}
	
	deleteLast()
	{
		let temp = this.tail.prev;
		
		this.tail.prev = this.tail.prev.prev;
		
		this.size--;
		
		return temp;
	}
}
	
var up    = false;
var down  = false;
var left  = false;
var right = false;

var start = false;

var pause = false;


var lengthX = 20;
var lengthY = 20;

var startX = 240;
var startY = 260;

var appleX;
var appleY;

// maximumX  480
// maximumY  460

var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

var myInterval = window.setInterval(mainFunction, 100);

let snake = new List();

snake.addNode(startX,startY);

function respawnApple()
{
	// maximumX  480
	// maximumY  460
	
	appleX = (Math.floor(Math.random() * (24-8)) + 4);// between 4 - 20
	appleY = (Math.floor(Math.random() * (23-8)) + 4);// between 4 - 19
	
	//console.log(appleX);
	//console.log(appleY);
	
	appleX *= 20;
	appleY *= 20;
	
	let temp = snake.head;
	var counter = 0;
	while(counter < snake.size)
	{
		temp = temp.next;
		
		if(appleX == temp.x && appleY == temp.y)
		{
			respawnApple();
		}
		
		counter++;
	}

}

respawnApple();

function makeAllFalse()
{
	up = down = right = left = false;
}


function mainFunction()
{
	//console.log("Hello");
	if( start == true )
	{
		//let n = new Node(startX,startY);
		//console.log(n.x + ",    " + n.y);
		
		if( up == true )
		{
			startY -= lengthY;
		} else if( down == true )
		{
			startY += lengthY;
		} else if( right == true )
		{
			startX += lengthX;
		} else if( left == true )
		{
			startX -= lengthX;
		}
		
		if( startX == appleX && startY == appleY )
		{
			respawnApple();
		}
		else
		{
			let before = snake.deleteFirst();
			ctx.fillStyle = "#FFFFFF";
			ctx.fillRect(before.x, before.y, lengthX, lengthY);
		}
		
		
		snake.addNode(startX,startY);
		
	}
	
	ctx.fillStyle = "#000000";
	let temp = snake.head;
	var counter = 0;
	console.log("snake.size : " + snake.size );
	while(counter < snake.size)
	{
		temp = temp.next;
		
		console.log(temp);
		ctx.fillRect(temp.x, temp.y, lengthX, lengthY);
		
		counter++;
	}
	
	ctx.fillStyle = "#00FF00";
	ctx.fillRect(appleX, appleY, lengthX, lengthY);
	
	
}

function fromPauseToPLay()
{
	pause = !pause;
	  
	if( pause == true )
		window.clearTimeout(myInterval)
	else 
		myInterval = window.setInterval(mainFunction, 100);
}



$(document).on("keypress",function(e) {
	
  //console.log( e.keyCode );
  
  //console.log( e.key );
  
  if( e.key == 'w' || e.key == 'W' )//up
  {
	  if( down != true )
	  {
		makeAllFalse();
		up = true;	  
	  }
	  
	  
	  if( pause == true )
		  fromPauseToPLay();
	  
	  start = true;
  } else if( e.key == 's' || e.key == 'S' )//down
  {
	  if( up != true )
	  {
		  makeAllFalse();
		  down = true;		  
	  }

	  
	  if( pause == true )
		  fromPauseToPLay();
	  
	  start = true;
  } else if( e.key == 'a' || e.key == 'A' )//left
  {
	  if( right != true )
	  {
		  makeAllFalse();
		  left = true;		  
	  }

	  
	  if( pause == true )
		  fromPauseToPLay();	  
	  
	  start = true;
  } else if( e.key == 'd' || e.key == 'D' )//right
  {
	  if( left != true )
	  {
		makeAllFalse();
		right = true;
	  }

	  
	  if( pause == true )
		  fromPauseToPLay();	  
	  
	  start = true;
  }
  else if( e.key == ' ' || e.key == ' ' )//space
  {
	  //makeAllFalse();
	  fromPauseToPLay();
	  //right = true;
  }
  
  
  //console.log((new Date()).getTime());
  
});


});