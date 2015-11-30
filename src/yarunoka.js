

exports.handler = function(event, context) {
    console.log(event);
    if(event.text === "<@USLACKBOT>: やんのか！"){
        context.done(null, {text: "<@USLACKBOT>: やんのか！！",
            "username": "slackbot",
            "icon_emoji": ":slackbot:"
        });
    }else if(event.text === "<@USLACKBOT>: やんのか！！"){
        context.done(null, {text: "<@USLACKBOT>: やんのか！！！",
            "username": "slackbot2",
            "icon_emoji": ":robot_face:"
        });
    }else if(event.text === "<@USLACKBOT>: やんのか！！！"){
        context.done(null, {text: "https://techresi.slack.com/files/shibata_ko/F0FG6S5GW/oshima_kiss.jpg",
            "username": "slackbot",
            "icon_emoji": ":slackbot:"
        });
    }else{
        context.done(null, {text: "やんのか！！"});
    }

};