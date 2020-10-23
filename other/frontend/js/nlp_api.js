function entity_recognition(input_text){
    var APIKEY = "AIzaSyA4aOIGeiNo_8v9aKHhIJH7AOKSHXFlRTA";

   $.ajax({
    type        : "POST",
    url         : "https://language.googleapis.com/v1/documents:analyzeEntitySentiment?key="+ APIKEY, 
    contentType : "application/json; charset=utf-8",
    data        : 
                    JSON.stringify({
                        "document": {
                            "type": "PLAIN_TEXT",
                            "language": "en",
                            "content": input_text

                        },
                        "encodingType": "UTF8"}),
    success     : function(_result){ 

        if (_result) { 
        	 unpack_entity(_result);
            //console.log(_result);
        } else {
            alert('ERROR');
        }
    },

    error       : function(_result){

    }
});
}


function sentiment_recognition(input_text){
    var APIKEY = "AIzaSyA4aOIGeiNo_8v9aKHhIJH7AOKSHXFlRTA";

   $.ajax({
    type        : "POST",
    url         : "https://language.googleapis.com/v1/documents:analyzeSentiment?key="+ APIKEY, 
    contentType : "application/json; charset=utf-8",
    data        : 
                    JSON.stringify({
                        "document": {
                            "type": "PLAIN_TEXT",
                            "language": "en",
                            "content": input_text

                        },
                        "encodingType": "UTF8"}),
    success     : function(_result){ 

        if (_result) { 
        	unpack_sentiment(_result);
            //console.log(_result);
        } else {
            alert('ERROR');
        }
    },

    error       : function(_result){

    }
});
}

function syntax_recognition(input_text){
    var APIKEY = "AIzaSyA4aOIGeiNo_8v9aKHhIJH7AOKSHXFlRTA";

   $.ajax({
    type        : "POST",
    url         : "https://language.googleapis.com/v1/documents:analyzeSyntax?key="+ APIKEY, 
    contentType : "application/json; charset=utf-8",
    data        : 
                    JSON.stringify({
                        "document": {
                            "type": "PLAIN_TEXT",
                            "language": "en",
                            "content": input_text

                        },
                        "encodingType": "UTF8"}),
    success     : function(_result){ 

        if (_result) { 
        	unpack_syntax(_result);
            //console.log(_result);
        } else {
            alert('ERROR');
        }
    },

    error       : function(_result){

    }
});
}

function unpack_entity(json)
{
	//console.log("unpack");
	//console.log(json);
	for(var i = 0; i < json.entities.length; i++) 
	{
    	var obj = json.entities[i];
		//console.log(obj);
		if (obj.type == "LOCATION")
			{
			console.log("Location = " + obj.name);
			find_background(obj.name);
			}
		if (obj.type == "ORGANIZATION")
			{
			//console.log("Location = " + obj.name);
			find_background(obj.name);
			}
	}
   
}

function unpack_sentiment(json)
{
	//console.log("unpack");
	//console.log(json);
	var sentiment_value = json.documentSentiment.score;
	console.log("sentiment = " + sentiment_value);
		
	}

function unpack_syntax(json)
{	
	let scene_object = [];
	console.log(json);
	for(var i = 0; i < json.tokens.length; i++) 
	{
    	var obj = json.tokens[i];
		//console.log(obj);
		if (obj.partOfSpeech.tag == "NOUN")
			{
				
				var noun_object = {order: i, object: obj.text.content, adj: "",v:"",de: obj.dependencyEdge.headTokenIndex};
				scene_object.push(noun_object); 
				//console.log(obj.text.content + ", order : "+  i);  
			}
	
	}
	for(var i = 0; i < json.tokens.length; i++) 
			{	
				var obj = json.tokens[i];
				for(var  n = 0; n < scene_object.length; n++)
				{	
					//console.log("word :" + obj.text.content + " -- obj.dependencyEdge.headTokenIndex:" + obj.dependencyEdge.headTokenIndex + "| " + scene_object[n].object + " --  scene_object.order: " + scene_object[n].order);
					if (obj.dependencyEdge.headTokenIndex == scene_object[n].order)
						{
							if (obj.partOfSpeech.tag == "ADJ"){scene_object[n].adj = obj.text.content;}
							else if (obj.partOfSpeech.tag == "VERB"){scene_object[n].v = obj.text.content;}
							
						//console.log("-->" + obj.text.content);
						} 
				
				//console.log("-->" + json.tokens[i].text.content);
				}
					
			}
		
	for(var  n = 0; n < scene_object.length; n++)
			{	
			for(var i = 0; i < json.tokens.length; i++) 
				{	
				var obj = json.tokens[i];
				if (obj.dependencyEdge.headTokenIndex == scene_object[n].de)
					{
						if (obj.partOfSpeech.tag == "ADJ"){
							if(scene_object[n].adj == ""){
								scene_object[n].adj = obj.text.content;
								}
							}
							
						if (obj.partOfSpeech.tag == "ADV"){
							if(scene_object[n].adj == ""){
								scene_object[n].adj = obj.text.content;
								}
							}
						else if (obj.partOfSpeech.tag == "VERB"){
							if (scene_object[n].v == ""){
								scene_object[n].v = obj.text.content;
								}
							}
						
					//console.log("-->" + obj.text.content);
					
					} 
				}
			}
	
	text_to_object(scene_object);
	console.log(scene_object);
   
}	

function text_to_object(scene_object)
	{
	for(var  n = 0; n < scene_object.length; n++)
			{
			var mood = "stand";
			if(scene_object[n].adj != "")
				{
				mood = scene_object[n].adj
				}
			else if (scene_object[n].v != "")
				{
				mood = scene_object[n].v
				}
			
			generate(scene_object[n].object, mood);
			//console.log(scene_object[n]);
			}

	}



function nlp_process(input_text){ 
	entity_recognition(input_text);
	sentiment_recognition(input_text);
	syntax_recognition(input_text);
}
//nlp_process("once upon a time, there is a happy rabbit and a sad turtle");




