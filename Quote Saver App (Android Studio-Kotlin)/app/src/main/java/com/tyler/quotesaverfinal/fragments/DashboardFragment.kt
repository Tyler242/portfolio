package com.tyler.quotesaverfinal.fragments

import android.os.Build
import android.os.Bundle
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.TextView
import androidx.annotation.RequiresApi
import androidx.recyclerview.widget.RecyclerView
import com.tyler.quotesaverfinal.MainActivity
import com.tyler.quotesaverfinal.R
import com.tyler.quotesaverfinal.adapter.ItemAdapter
import com.tyler.quotesaverfinal.data.FileIO

class DashboardFragment : Fragment() {

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {

        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_dashboard, container, false)
    }

    @RequiresApi(Build.VERSION_CODES.O)
    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
//        read the quotes in
        val quotes = FileIO().readFile(requireContext())

//        get the index of the final quote for the recently added view
        val lastQuoteIndex = quotes.size - 1

//        views for the recently added quote
        val rQuoteText = view.findViewById<TextView>(R.id.tvQuote)
        val rQuoteSource = view.findViewById<TextView>(R.id.tvSource)
        val rQuoteKeywords = view.findViewById<TextView>(R.id.tvKeywords)

//        set the content of the recently added quote views
        rQuoteText.text = quotes[lastQuoteIndex].text
        rQuoteSource.text = quotes[lastQuoteIndex].source
        rQuoteKeywords.text = quotes[lastQuoteIndex].keywords.toString()

//        get the search buttons
        val btnSearchWord = view.findViewById<Button>(R.id.wordSearch)
        val btnSearchSource = view.findViewById<Button>(R.id.sourceSearch)
        val btnSearchKeyword = view.findViewById<Button>(R.id.keywordSearch)

//        search fragment for switching in the event listeners
        val searchFragment = SearchFragment()

        btnSearchWord.setOnClickListener {
//            search by word listener

//            set the hint in the EditText box in the search Fragment
            searchFragment.hint = "Word"
//            replace the active fragment
            fragmentSwitcher(searchFragment)

        }
        btnSearchSource.setOnClickListener {
//            search by source listener

//            set the hint in the EditText box in the searchFragment
            searchFragment.hint = "Source"
//            replace the active fragment
            fragmentSwitcher(searchFragment)

        }
        btnSearchKeyword.setOnClickListener {
//            search by keyword listener

//            set the hint in the EditText box in the searchFragment
            searchFragment.hint = "Keyword"
//            replace the active fragment
            fragmentSwitcher(searchFragment)
        }
    }

    private fun fragmentSwitcher(fragment: Fragment) {
//        switch the active fragment
        val manager = parentFragmentManager.beginTransaction()
        manager.replace(R.id.fragment_container, fragment)
        manager.commit()
    }
}