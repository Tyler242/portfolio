package com.tyler.quotesaverfinal.data

import android.content.Context
import android.os.Build
import android.util.Log
import androidx.annotation.RequiresApi
import com.tyler.quotesaverfinal.models.Quote
import java.time.LocalDate

class FileIO {
//    this shouldn't ever change. This is the file where the quote data is stored.
    private val fileName = "quotes.txt"

    fun writeFile(context: Context, quotes: List<Quote>) {
//        configure the quote objects to be written correctly
        val textToWrite = quoteToText(quotes)

//        write the quote objects to the file
        context.openFileOutput(fileName, Context.MODE_PRIVATE).use {
            output -> output.write(textToWrite.toByteArray())
        }
    }

    private fun quoteToText(quotes: List<Quote>): String {
//        store the text to be written
        var textToWrite = ""

//        format the quote objects to text
        quotes.forEach {
//            create the string to be written
            var quoteString = "{Text>${it.text}/Source>${it.source}/Date>${it.date}/Keyword>"
//            add each keyword to the string
            it.keywords.forEach { tag -> quoteString += if (tag != it.keywords[it.keywords.size - 1]) "$tag," else tag }
            textToWrite += quoteString
        }
        return textToWrite
    }

    @RequiresApi(Build.VERSION_CODES.O)
    fun readFile(context: Context): MutableList<Quote> {
        var text: String

//        read the text from the file
        context.openFileInput(fileName).use { stream ->
            text = stream.bufferedReader().use {
                it.readText()
            }
        }
//        translate the text received to quote objects.
        val list = text.split("{")

        val listQuoteBlocks = list.filter { it.isNotEmpty() }

        val listOfQuotes = mutableListOf<Quote>()

        listQuoteBlocks.forEach { listOfQuotes.add(configQuotes(it)) }

        return listOfQuotes
    }

    @RequiresApi(Build.VERSION_CODES.O)
    private fun configQuotes(quoteBlocks: String): Quote {

//        create the quote attributes for each quote
        val keyValues = quoteBlocks.split('/')

//        get the quote text and source
        val quote = keyValues[0].split(">")[1]
        val source = keyValues[1].split(">")[1]

//        turn the date string into a date object
        val dateString = keyValues[2].split(">")[1]
        val dateList = dateString.split("-")
        val date = LocalDate.of(dateList[0].toInt(), dateList[1].toInt(), dateList[2].toInt())

//        get all the keywords
        val keywords = keyValues[3].split(">")[1]
        val keywordsList = keywords.split(",")

//        create a quote object
        return Quote(quote, source, date, keywordsList)
    }
}