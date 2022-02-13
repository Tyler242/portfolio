package com.tyler.quotesaverfinal

import android.os.Build
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import androidx.annotation.RequiresApi
import androidx.fragment.app.Fragment
import com.tyler.quotesaverfinal.fragments.CreateFragment
import com.tyler.quotesaverfinal.fragments.DashboardFragment
import com.tyler.quotesaverfinal.fragments.ListFragment
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity() {

//    set up different screen layouts
    private val dashboardFragment = DashboardFragment()
    private val listFragment = ListFragment()
    private val createFragment = CreateFragment()
    @RequiresApi(Build.VERSION_CODES.O)

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

//        set up default screen
        replaceFragment(dashboardFragment)

//        listener for the navigation bar
        bottomNav.setOnNavigationItemSelectedListener {
            when(it.itemId) {
                R.id.ic_dashboard -> replaceFragment(dashboardFragment)
                R.id.ic_list -> replaceFragment(listFragment)
                R.id.ic_create -> replaceFragment(createFragment)
            }
            true
        }
    }

//    nav fragment manager
    private fun replaceFragment(fragment: Fragment) {
//        replace the current fragment with the new one
        val transaction = supportFragmentManager.beginTransaction()
        transaction.replace(R.id.fragment_container, fragment)
        transaction.commit()
    }
}