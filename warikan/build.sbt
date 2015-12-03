name := """warikan"""

lazy val root = (project in file(".")).settings(
  name := "aws-lambda-scala",
  version := "1.0",
  organization := "com.example",
  scalaVersion := "2.11.7",
  libraryDependencies ++= Seq(
    "com.amazonaws" % "aws-lambda-java-core" % "1.0.0",
    "com.amazonaws" % "aws-lambda-java-events" % "1.1.0",
    "org.scalatest" %% "scalatest" % "2.2.5" % "test"
  )
)