	var ballColorR = 128;
	var ballColorG = 0;
	var ballColorB = 0;
	var ballColor = "rgb(" + ballColorR + "," + ballColorG + "," + ballColorB + ")";
	var ballRadius = '';

    var boxWidth = '';
    var boxHeight = '';
    
	var winHeight = window.innerHeight;
	var winWidth = window.innerWidth;
	
	var timer; 
    var delay = 10;
       
    var velocityX = "";
    var velocityY = "";
    
	function init()
    {
      timer = setInterval(doAnimation, delay); 
    } 
	
	function velocityStep(velocityStep)
    {     
      return (velocityStep / 1000) * delay; 
    } 
    
    // Animate
    function doAnimation(){
        var velocityX = $("#bouncyBall").attr("vx");
        var velocityY = $("#bouncyBall").attr("vy");
//        console.log("x: " + velocityX + "  y: " + velocityY);
        
        var positionXCurrent = parseInt($("#bouncyBall").attr("cx")); 
        var positionYCurrent = parseInt($("#bouncyBall").attr("cy")); 
//        console.log("x: " + $('#bouncyBall').attr('cx') + "  y: " + $('#bouncyBall').attr('cy'));
        
        var positionXNew = positionXCurrent + parseInt(velocityStep(velocityX)); 
        var positionYNew = positionYCurrent + parseInt(velocityStep(velocityY));
//        console.log("Nx: " + positionXNew + "  Ny: " + positionYNew);
       
        bouncyBall.cx.baseVal.value = positionXNew; 
        bouncyBall.cy.baseVal.value = positionYNew;
//        console.log("Nx: " + bouncyBall.cx.baseVal.value + "  Ny: " + bouncyBall.cy.baseVal.value);
         
        console.log(boxWidth + ' ' + boxHeight);
        if (verticalWallCollision(ballRadius, winWidth)){
        	velocityX *= -1; 
        	$("#bouncyBall").attr("vx",velocityX);
        }
        
        if (horizontalWallCollision(ballRadius, winHeight)){
        	velocityY *= -1;
        	$("#bouncyBall").attr("vy",velocityY);
        }
        
    	// collision functions
        function verticalWallCollision(ballRadius, boxWidth)
        {
        	return (bouncyBall.cx.baseVal.value <= ballRadius || bouncyBall.cx.baseVal.value >= (winWidth - ballRadius));
        }
        
        function horizontalWallCollision(ballRadius, boxHeight)
        {
        	return (bouncyBall.cy.baseVal.value <= ballRadius || bouncyBall.cy.baseVal.value >= (winHeight - ballRadius));
        }
    }
     
    // Resize functions
	function resizeBall(inputVal){
		ballRadius = inputVal;
		$("#bouncyBall").attr({
			r:inputVal
		});
	};	
	

	
	function setSvgArea(){
		$("svg").attr({
			width: winWidth,
			height: winHeight,
			viewbox: '0 0 ' + winWidth + ' ' + winHeight
		});
	};
	
	function setBallColor(colorComponent,colorVal){
		if(colorComponent == "r"){
			ballColorR = colorVal;
		} else if(colorComponent == "g") {
			ballColorG = colorVal;
		} else if(colorComponent == "b") {
			ballColorB = colorVal;
		}
		ballColor = "rgb(" + ballColorR + "," + ballColorG + "," + ballColorB + ")";
		$("#bouncyBall").css("fill",ballColor);
	};

	$(document).ready(function() {
		setSvgArea();
		setBall();
		
	    ballRadius = parseInt($("#bouncyBall").attr("r"));
	    boxHeight = parseInt($("svg").attr("height"));
	    boxWidth = parseInt($("svg").attr("width"));
	    
		$("#bouncyBall").attr("vx",400);
		$("#bouncyBall").attr("vy",400);
		
		$("#controlarea").css({
			top: winHeight-10,
			left: winWidth-285
		});
		
		$("#bouncyBall").mousedown(function(){
			init();
		});
		
	    // Window resize functions
		$(window).resize(function(){
			$("svg").attr({
				width: window.innerWidth,
				height: window.innerHeight,
				viewbox: '0 0 ' + window.innerWidth + ' ' + window.innerHeight
			});
			$("#controlarea").css({
				top: window.innerHeight-10,
				left: window.innerWidth-285
			});
			winHeight = window.innerHeight;
			winWidth = window.innerWidth;
		});

		function setBall(){
			$("#bouncyBall").attr("r",20);
			$("#bouncyBall").attr("cx",(winWidth-20)/2);
			$("#bouncyBall").attr("cy",(winHeight-20)/2);
			$("#bouncyBall").css({"fill":ballColor,"stroke-width":10});
		};
		
		$("#BallSizeSlider").attr({
			type: 'range',
			min: '20',
			max: '200',
			step: '10',
			value: '20',
			onChange: 'resizeBall(this.value)'
		}); 
		
		$("#BallColorSliderR").attr({
			type: 'range',
			min: '0',
			max: '255',
			step: '1',
			value: ballColorR,
			onChange: 'setBallColor("r",this.value)'
		});
	
		$("#BallColorSliderG").attr({
			type: 'range',
			min: '0',
			max: '255',
			step: '1',
			value: ballColorG,
			onChange: 'setBallColor("g",this.value)'
		});
	
		$("#BallColorSliderB").attr({
			type: 'range',
			min: '0',
			max: '255',
			step: '1',
			value: ballColorB,
			onChange: 'setBallColor("b",this.value)'
		});
		
	});