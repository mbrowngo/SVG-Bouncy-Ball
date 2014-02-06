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
        
        var positionXCurrent = parseInt($("#bouncyBall").attr("cx")); 
        var positionYCurrent = parseInt($("#bouncyBall").attr("cy")); 
        
        var positionXNew = positionXCurrent + parseInt(velocityStep(velocityX)); 
        var positionYNew = positionYCurrent + parseInt(velocityStep(velocityY));
       
        bouncyBall.cx.baseVal.value = positionXNew; 
        bouncyBall.cy.baseVal.value = positionYNew;
         
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
     
	
	
	$(function(){
		$( "#red, #green, #blue" ).slider({
			orientation: "horizontal",
			range: "min",
			max: 255,
			slide: setBallColor,
			change: setBallColor
		});
		$( "#ballsize" ).slider({
			orientation: "horizontal",
			range: "min",
			max: 200,
			slide: resizeBall,
			change: setBallColor
		});
			$( "#ballsize" ).slider( "value", 20);
			$( "#red" ).slider( "value", 140 );
			$( "#green" ).slider( "value", 0 );
			$( "#blue" ).slider( "value", 0 );
		});
	
    // Resize functions
	function resizeBall(){
		ballRadius = $( "#ballsize" ).slider( "value" );
		$("#bouncyBall").attr("r",ballRadius);
	};
	
	function setSvgArea(){
		$("svg").attr({
			width: winWidth,
			height: winHeight,
			viewbox: '0 0 ' + winWidth + ' ' + winHeight
		});
	};
	
	function setBallColor(){
		ballColor = "rgb(" + $( "#red" ).slider( "value" ) + "," + $( "#green" ).slider( "value" ) + "," + $( "#blue" ).slider( "value" ) + ")";
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
		
});