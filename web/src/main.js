define(function(require, exports, module) {
  // choose your test here

  var Engine = require('famous/core/Engine');
  var Surface = require("famous/core/Surface");
  var View = require('famous/core/View');
  var Modifier  = require("famous/core/Modifier");
  var Transform = require("famous/core/Transform");
  var Easing = require('famous/transitions/Easing');
  var GridLayout = require("famous/views/GridLayout");
  var EventHandler = require('famous/core/EventHandler');
    var EdgeSwapper = require("famous/views/EdgeSwapper");
  var InputSurface = require("famous/surfaces/InputSurface");
  var ContainerSurface = require('famous/surfaces/ContainerSurface');
  var Deck = require('famous/views/Deck');
  var ImageSurface = require('famous/surfaces/ImageSurface');
  var Transitionable = require('famous/transitions/Transitionable');
  var SpringTransition = require('famous/transitions/SpringTransition');
    var FastClick = require('famous/inputs/FastClick');
  Transitionable.registerMethod('spring', SpringTransition);
  
  var CurrentContext = Engine.createContext();
  
    CurrentContext.setPerspective(800);
  var navbarView = new View(
      { 
          size:[window.width,70],
      });

  var navbarBack = new Surface({
      size:[window.width,70],

      properties:{
          backgroundColor:'#1db1d4'
      }
  });
  var logo = new Surface({
      size:[200,70],
      content: 'appier',
      properties:{
          backgroundColor:'#34bfe0',
          fontSize:'40px',
          color:'white',
          lineHeight:'70px',
          textAlign:'center',
          paddingLeft:'20px',
          paddingRight:'20px',
          cursor:'pointer',
      }
  });
  var navbarPos = new Modifier({
      origin: [0.5,-0.2]
  });
  var logoPos = new Modifier({
      origin:[0,-1]
  });
    navbarPos.setOrigin(
        [0.5,0],
        {duration:1000, curve: Easing.outBounce}
    );
    
    logoPos.setOrigin(
        [0,0],
        {duration:1000, curve: Easing.inBounce}
    );
    
    var buttonView = new View({
            size:[300,70]
    });
    
    var buttonMod = new Modifier({
        origin:[1.5,0]
    });
    buttonMod.setOrigin(
        [1.5,0],
        {duration:800, curve: Easing.inBounce}
    );
    buttonMod.setOrigin(
        [1,0],
        {duration:1000, curve: Easing.outElastic}
    );
    var websiteButton = new Surface({
        size: [150,70],
        content: 'Website',
        properties:{
            backgroundColor:'#34bfe0',
            cursor:'pointer'
        }
    });
    
    var accountButton = new Surface({
        size: [150,70],
        content:'Log In',
        properties:{
            backgroundColor:'#1db1d4',
            cursor:'pointer'
        }
    });
    
    websiteButton.addClass('btn');
    
    var webBtn = new Modifier({
        transform: Transform.translate(-150,0,1)
    });
    accountButton.addClass('btn');
    
    
    CurrentContext.add(navbarPos).add(navbarView);
    navbarView.add(navbarBack);
    navbarView.add(logoPos).add(logo);
    navbarView.add(buttonMod).add(buttonView);
    buttonView.add(webBtn).add(websiteButton);
    buttonView.add(accountButton);
    

    var body =  new EdgeSwapper();
    
    var website = new View(
        {
            size:[undefined,undefined]
        });
    var editor = new View(
        {
            size:[undefined,undefined]
        });
    var webSurface = new Surface({
        size:[undefined, CurrentContext.getSize()[1]-70],
        classes: ['webSur'],
        properties:{}
    });
    var websiteName = new InputSurface({
                    placeholder: "Your famous website name",
                    value: "",
                    type:"text",
                    name:"name",
                    size:[400,70]});
    var nameMod = new Modifier({
                transform: Transform.translate(200,CurrentContext.getSize()[1]/2-30,0)
    });
    var websiteSubmitButton = new InputSurface({
                        value:"Create",
                        type:"button",
                        name:"create",
                        size:[200,70],
                        properties:{
                            backgroundColor:"#e04848",
                            color:'white',
                        }
                            
    });
    var websiteSubmitButtonMod = new Modifier({
                        transform: Transform.translate(200,CurrentContext.getSize()[1]/2+50,0)
    });
    
    var iPadContainer = new ContainerSurface({
                        size: [CurrentContext.getSize()[1]/1.3*0.7,CurrentContext.getSize()[1]/1.3],
                        properties: {
                        }
    });
    

    websiteSubmitButton.on('click',function(e){
        if(websiteName.getValue() !== "")
        {
            alert('hi');
            webEditorMod.setOrigin([0,0],{duration:1000,curve:Easing.inElastic});
        }
    });

    
    var iPadContainerMod = new Modifier({
                        transform: Transform.translate(800,150,0)});
    
    var iPadImg = new ImageSurface({
                        content:'./content/ipad.png',
                        properties:{
                        },
                        size:[CurrentContext.getSize()[1]/1.3*0.7,CurrentContext.getSize()[1]/1.3]
          });
    var websiteView = new View();
    
    var iPadContent = new View({
                        size:[iPadImg.getSize()[0],iPadImg.getSize()[1]]
    });
    
    var iPadContentObj = new ContainerSurface({
                    size:[CurrentContext.getSize()[1]/1.6*0.75,CurrentContext.getSize()[1]/1.65],
                    properties:{
                        backgroundColor:'#b0f0ff',
                        overflow:'hidden'
                    }
    });
    
    var iPadContentObjMod = new Modifier({
                    origin: [0.5,0.5]
    });
    var webMod = new Modifier({
        transform: Transform.translate(0,70,0)
    });
    
    var iPadImgMod = new Modifier({
                        });
    
    
    website.add(webMod).add(webSurface);
    
    website.add(nameMod).add(websiteName);
   
    iPadContainer.add(iPadImgMod).add(iPadImg);

    website.add(iPadContainerMod).add(iPadContainer);
    iPadContent.add(iPadContentObjMod).add(iPadContentObj);
    iPadContainer.add(iPadContent);    website.add(websiteSubmitButtonMod).add(websiteSubmitButton);
    
    
    
    websiteView.add(website);    
    CurrentContext.add(body);
    body.show(websiteView);
    
    websiteButton.on('click', function(){
websiteButton.setProperties({backgroundColor:'#34bfe0'});
accountButton.setProperties({backgroundColor:'#1db1d4'});
        body.show(websiteView);
    });
    
    
    accountButton.on('click',function(){ websiteButton.setProperties({backgroundColor:'#1db1d4'});    
accountButton.setProperties({backgroundColor:'#34bfe0'});
        body.show(editor);
    });
    
    
    
  //resize manager  
    CurrentContext.on('resize',function(){
 websiteSubmitButtonMod.setTransform(Transform.translate(200,CurrentContext.getSize()[1]/2+50,0));
 nameMod.setTransform(Transform.translate(200,CurrentContext.getSize()[1]/2-30,0));
        webSurface.setSize([undefined, CurrentContext.getSize()[1]-70]);
        iPadImg.setSize([CurrentContext.getSize()[1]/1.3*0.7,CurrentContext.getSize()[1]/1.3]);
        iPadContentObj.setSize([CurrentContext.getSize()[1]/1.6*0.75,CurrentContext.getSize()[1]/1.65]);
        iPadContainer.setSize([CurrentContext.getSize()[1]/1.3*0.7,CurrentContext.getSize()[1]/1.3]);
        webEditor.setSize([CurrentContext.getSize()[0],CurrentContext.getSize()[1]]);
    });
    
    

//Deck animation in iPad
	var surfaces = [];
	var myLayout = new Deck({
        itemSpacing: 10,
        transition: {
            method: 'spring',
            period: 300,
            dampingRatio: 0.5
        },
        stackRotation: 0.02
    });

    myLayout.sequenceFrom(surfaces);

    for(var i = 0; i < 5; i++) {
        var temp = new Surface({
            size: [50, 100],
            classes: ['test'],
            properties: {
                backgroundColor: 'hsla(' + ((i*5 + i)*15 % 360) + ', 60%, 50%, 0.8)'
            },
            content: i
        });

        temp.on('click', function() {
            myLayout.toggle();
        });
        surfaces.push(temp);
    }

    var containerModifier = new Modifier({
        origin: [0.5, 0.5]
    });

    iPadContentObj.add(containerModifier).add(myLayout); 
    //socket and server interaction
        
		
		
   //webeditor code//
    
    var webEditor = new ContainerSurface({
            size:[CurrentContext.size()[0],CurrentContext.size()[1]],
    });
    
    var webEditorMod = new Modifier({
        origin:[-1,0]
    });

    var editingTools = new View({
    });
    
    var toolsBackGround = new Surface({
                    size:[80, undefined],
                    properties:
                    {
                        backgroundColor:'#1db1d4',
                        color:'white',
                        textAlign:'center',
                        lineHeight:'20px'
                    }
    });
    editingTools.add(webEditorMod).add(toolsBackGround);
    webEditor.add(editingTools);
    CurrentContext.add(webEditorMod).add(webEditor);
    
	//Editor Tool docks
	
	var toolImg = [];
	var toolImgMod = [];
	
	for (var i = 0;i < 11; i++)
	{
		toolImg[i] = new ImageSurface({
                        content:'./content/ipad.png',
                        properties:{
                        },
                        size:[80,80]
          });
		toolImgMod[i] = new Modifier({
			transform: Transform.translate(0,80*i,1)
		});
		webEditor.add(toolImgMod[i]).add(toolImg[i]);
	}
	
	toolImg[0].on('click',function(){
		//fix me//
	});
	toolImg[1].on('click',function(){
		//fix me//
	});	
	toolImg[2].on('click',function(){
		//fix me//
	});	
	toolImg[3].on('click',function(){
		//fix me//
	});	
	toolImg[4].on('click',function(){
		//fix me//
	});
	
	toolImg[0].setContent('./content/ipad.png');
	toolImg[1].setContent('./content/ipad.png');
	toolImg[2].setContent('./content/ipad.png');
	toolImg[3].setContent('./content/ipad.png');
	toolImg[4].setContent('./content/ipad.png');
    

});
	
	
	
	
	
	
	
	
	
	
	
	
