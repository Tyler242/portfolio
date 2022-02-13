package com.tyler.quotesaverfinal.models

import java.time.LocalDate

/**
 * Quote class for the quotes
 * */
data class Quote(
    var text: String,
    var source: String,
    var date: LocalDate,
    var keywords: List<String>) {
}