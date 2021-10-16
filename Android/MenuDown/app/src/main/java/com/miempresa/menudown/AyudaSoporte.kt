package com.miempresa.menudown

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle

class AyudaSoporte : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_ayuda_soporte)

        MyToolbar().show(this, "Ayuda y Soporte", true)
    }
}