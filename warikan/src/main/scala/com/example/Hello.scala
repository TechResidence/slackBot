package com.example

import com.amazonaws.services.lambda.runtime.Context

import scala.collection.JavaConversions._
import scala.collection.mutable

object Hello {
	def main(args: Array[String]): Unit = {
		println("Hello, world!")
	}

	def hello(list: java.util.List[MyObj], context: Context) = {
		println("Hello World!!")
		val list_ :mutable.Buffer[MyObj] = list
		list_.map(println(_))
		println(list)
		list
	}
}
