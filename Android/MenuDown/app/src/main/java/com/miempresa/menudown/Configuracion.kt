package com.miempresa.menudown

import android.os.Bundle
import android.widget.AdapterView
import android.widget.ArrayAdapter
import android.widget.ListView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import kotlinx.android.synthetic.main.activity_configuracion.*

class Configuracion : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_configuracion)

        MyToolbar().show(this, "Configuración", true)

        val values = arrayOf(
                "Ciudad",
                "Notificaciones",
                "Planificacion de viaje",
                "Mapa",
                "privacidad"
        )
        val adapter = ArrayAdapter(
                this,
                android.R.layout.simple_list_item_1, android.R.id.text1,
                values
        )

        listConfiguracion.adapter = adapter

        listConfiguracion.onItemClickListener =
                AdapterView.OnItemClickListener { parent, view, position, id ->
                    val itemPosition = position
                    val itemValue = listConfiguracion.getItemAtPosition(position) as String
                    Toast.makeText(this, "position"+itemPosition+" Item "+itemValue,
                    Toast.LENGTH_LONG).show()
                }

    }
}