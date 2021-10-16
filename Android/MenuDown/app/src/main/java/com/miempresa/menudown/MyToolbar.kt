package com.miempresa.menudown

import androidx.appcompat.app.AppCompatActivity

class MyToolbar {
    fun show(activities: AppCompatActivity, title:String, upButton:Boolean){
        activities.setSupportActionBar(activities.findViewById(R.id.mitoolbar))
        activities.supportActionBar?.title= title
        activities.supportActionBar?.setDisplayHomeAsUpEnabled(upButton)
    }
}