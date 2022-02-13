package com.tyler.quotesaverfinal.fragments

import android.os.Build
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.annotation.RequiresApi
import androidx.recyclerview.widget.RecyclerView
import com.tyler.quotesaverfinal.R
import com.tyler.quotesaverfinal.adapter.ItemAdapter
import com.tyler.quotesaverfinal.data.FileIO
import com.tyler.quotesaverfinal.data.Sort
import com.tyler.quotesaverfinal.models.Quote

class ListFragment(
) : Fragment() {

//    create a sort object for searching
    var sortService = Sort()

//    if we have a quote to delete, this will the quote object to delete
    var quoteToDelete: Quote? = null

//    if we are searching, this will be the type of search being performed
    var searchParam: String? = null

//    this is the value we are searching for.
    lateinit var searchString: String

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_list, container, false)
    }

    @RequiresApi(Build.VERSION_CODES.O)
    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

//        read the quotes from the file
        val quotes = FileIO().readFile(requireContext())
        var sortedQuotes: MutableList<Quote>

//        sort the quotes, if no searchParam was set then
//        we will set the sortedQuotes to the entire list of quotes
        sortedQuotes = when (searchParam) {
            "Word" -> {
                sortService.sortWord(searchString, quotes)
            }
            "Source" -> {
                sortService.sortSource(searchString, quotes)
            }
            "Keyword" -> {
                sortService.sortKeyword(searchString, quotes)
            }
            else -> quotes
        }

//        delete the quote, write the quotes, and read the file back in
        if (quoteToDelete != null) {
            quotes.remove(quoteToDelete)
            FileIO().writeFile(requireContext(), quotes)
            sortedQuotes = FileIO().readFile(requireContext())
        }

//        set up the list view with the views for each quote
        val recyclerView = requireView().findViewById<RecyclerView>(R.id.list_quotes)
        recyclerView.adapter = ItemAdapter(sortedQuotes)
    }
}