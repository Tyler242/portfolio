package com.tyler.quotesaverfinal.fragments

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.EditText
import com.tyler.quotesaverfinal.R

class SearchFragment : Fragment() {
//    will be set to the type of search being performed
    lateinit var hint: String

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_search, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

//        get the view objects
        val searchBtn = view.findViewById<Button>(R.id.search)
        val etSearchKey = view.findViewById<EditText>(R.id.search_key)

//        set the EditText hint to the type of search being performed
        etSearchKey.hint = hint

        searchBtn.setOnClickListener {
//            listener for the search button

//            since we are switching back to the list view,
//            create a ListFragment object
            val listFragment = ListFragment()

//            set the attributes that will sort the quotes correctly
            listFragment.searchParam = hint
            listFragment.searchString = etSearchKey.text.toString()

//            swap the active fragments
            val manager = parentFragmentManager.beginTransaction()
            manager.replace(R.id.fragment_container, listFragment)
            manager.commit()
        }
    }
}