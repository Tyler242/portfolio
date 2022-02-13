package com.tyler.quotesaverfinal.fragments

import android.os.Build
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.EditText
import androidx.annotation.RequiresApi
import com.tyler.quotesaverfinal.R
import com.tyler.quotesaverfinal.data.FileIO
import com.tyler.quotesaverfinal.models.Quote
import java.time.LocalDate

class CreateFragment : Fragment() {
//    initialize a quote object if we have a quote to edit
//    this will enable us to autofill the EditText views
    var quoteToEdit: Quote? = null

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_create, container, false)
    }

    @RequiresApi(Build.VERSION_CODES.O)
    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

//        get the EditTexts and button
        val etQuoteText = view.findViewById<EditText>(R.id.etQuoteText)
        val etSource = view.findViewById<EditText>(R.id.etSource)
        val etKeywords = view.findViewById<EditText>(R.id.etKeywords)
        val createButton = view.findViewById<Button>(R.id.createButton)

//        populate the fields with the current quote data
//        if we are editing an existing quote
        if (quoteToEdit != null) {
            val edit = "Update Quote"
            etQuoteText.setText(quoteToEdit!!.text)
            etSource.setText(quoteToEdit!!.source)
            etKeywords.setText(quoteToEdit!!.keywords.toString().split('[')[1].split(']')[0])
            createButton.text = edit
        }

//      read the file in
        val file = FileIO()
        val quotes: MutableList<Quote> = file.readFile(requireContext())

//        set the listener
        createButton.setOnClickListener {

//            get the new data and create a new quote object
            val keywords = etKeywords.text.toString().split(",")
            val newQuote = Quote(
                etQuoteText.text.toString(),
                etSource.text.toString(),
                LocalDate.now(),
                keywords
            )

//            add the new quote or replace the old quote
            if (quoteToEdit == null) {
                quotes.add(newQuote)
            } else {
                val index = quotes.indexOf(quoteToEdit)
                quotes[index] = newQuote
            }
//            update the file
            file.writeFile(requireContext(), quotes)

//            switch back to the list view
            val listFragment = ListFragment()
            val manager = parentFragmentManager.beginTransaction()
            manager.replace(R.id.fragment_container, listFragment)
            manager.commit()

        }
    }
}