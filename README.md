
# slackBot

this repo has some slack bot(running on AWS-Lambda and NodeJS)

the functions are

- botChat
    - simplest sample of "slack outgoing web-hook" with "AWS Lambda & API Gateway"
    - bots communicate each other.

- dustAlert
    - sample of "slack incoming web-hook" with "scheduled AWS Lambda"
    - when dust day has come, alert it.

- weatherReport
    - sample of "slack incoming web-hook" with "scheduled AWS Lambda"
    - when today will be rainy, alert it.

- temperatureReport
    - sample of "slack incoming web-hook" with "scheduled AWS Lambda"
    - when today will be cold/hot(±5 than yesterday), alert it.