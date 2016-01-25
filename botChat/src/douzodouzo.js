

exports.handler = function(event, context) {
    console.log(event);
    if(event.text === "<@USLACKBOT>: じゃあ俺がやるよ"){
        context.done(null, {text: "<@USLACKBOT>: なら俺がやるよ",
            "username": "slackbot",
            "icon_emoji": ":slackbot:"
        });
    }else if(event.text === "<@USLACKBOT>: なら俺がやるよ"){
        context.done(null, {text: "<@USLACKBOT>: いや、俺がやるよ",
            "username": "slackbot2",
            "icon_emoji": ":robot_face:"
        });
    }else if(event.text === "<@USLACKBOT>: じゃぁ俺が"){
         context.done(null, {text: "<@USLACKBOT>: どうぞどうぞ",
             "username": "slackbot",
             "icon_emoji": ":slackbot:"
         });
    }else{
        context.done(null, {text: "<@USLACKBOT>: じゃあ俺がやるよ"});
    }
};