package com.tyler.quotesaverfinal.data

import com.tyler.quotesaverfinal.models.Quote

class Sort {

    fun sortWord(word: String, quotes: List<Quote>): MutableList<Quote> {
//        sort the quotes by word
        return quotes.filter { it.text.contains(word) } as MutableList<Quote>
    }

    fun sortSource(source: String, quotes: List<Quote>): MutableList<Quote> {
//        sort the quotes by source
        return quotes.filter { it.source == source} as MutableList<Quote>
    }

    fun sortKeyword(keyword: String, quotes: List<Quote>): MutableList<Quote> {
        val sortedQuotes: MutableList<Quote> = mutableListOf()
//        sort the quotes by keyword
        for (quote in quotes) {
            quote.keywords.forEach { tag ->
                if (tag == keyword) {
                    sortedQuotes.add(quote)
                    return@forEach
                }
            }
        }
        return sortedQuotes
    }
}