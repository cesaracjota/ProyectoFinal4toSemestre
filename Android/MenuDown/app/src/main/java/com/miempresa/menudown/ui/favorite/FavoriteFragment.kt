package com.miempresa.menudown.ui.favorite

import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.os.AsyncTask
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import android.widget.Toast
import androidx.fragment.app.Fragment
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProvider
import androidx.recyclerview.widget.DividerItemDecoration
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.android.volley.Response
import com.android.volley.toolbox.JsonArrayRequest
import com.android.volley.toolbox.Volley
import com.google.android.gms.maps.GoogleMap
import com.google.android.gms.maps.model.LatLng
import com.miempresa.menudown.AdaptadorElementos
import com.miempresa.menudown.Elementos
import com.miempresa.menudown.R
import com.miempresa.menudown.ui.search.NotificationsViewModel
import kotlinx.android.synthetic.main.fragment_favorite.*
import kotlinx.android.synthetic.main.fragment_search.*
import org.json.JSONException

class FavoriteFragment : Fragment() {

    private lateinit var notificationsViewModel: NotificationsViewModel
    var llenarLista = ArrayList<Elementos>()
    private var adapter: RecyclerView.Adapter<AdaptadorElementos.ViewHolder>? = null

    private val Plaza = LatLng(-16.3988031,-71.5374435)
    private lateinit var mMap: GoogleMap

    override fun onCreateView(
            inflater: LayoutInflater,
            container: ViewGroup?,
            savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.fragment_favorite, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        rv_Favoritos.layoutManager = LinearLayoutManager(activity)
        //listavehiculos.adapter = AdaptadorElementos()
        var llenarLista = ArrayList<Elementos>()
        AsyncTask.execute {
            val queue = Volley.newRequestQueue(activity)
            val url = getString(R.string.urlAPI) + "/api/vehicles"
            val stringRequest = JsonArrayRequest(url,
                Response.Listener { response ->
                    try {
                        for (i in 0 until 5) {
                            val id =
                                response.getJSONObject(i).getString("id").toInt()
                            val placa =
                                response.getJSONObject(i).getString("number")
                            val type=
                                response.getJSONObject(i).getString("type")
                            val modelo =
                                response.getJSONObject(i).getString("model")
                            val capacidad =
                                response.getJSONObject(i).getString("capacity").toInt()
                            val date =
                                response.getJSONObject(i).getString("insurance_renewal_date")
                            val fuel =
                                response.getJSONObject(i).getString("fuel")
                            val foto =
                                response.getJSONObject(i).getString("photo")
                            llenarLista.add(Elementos(id,placa,type,modelo,capacidad,date,fuel,foto))
                        }
                        adapter = AdaptadorElementos(llenarLista)
                        rv_Favoritos.adapter = adapter

                    } catch (e: JSONException) {
                        Toast.makeText(
                            activity,
                            "Error al obtener los datos",
                            Toast.LENGTH_LONG
                        ).show()
                    }
                }, Response.ErrorListener {
                    Toast.makeText(
                        activity,
                        "Verifique que esta conectado a internet",
                        Toast.LENGTH_LONG
                    ).show()
                })
            queue.add(stringRequest)
        }
        //cargarLista()
        //adapter = AdaptadorElementos(llenarLista)


       // btnBuscarVehiculo.setOnClickListener(){
         //   buscarVehiculo()
        //}
    }
}

/*
        var llenarLista = ArrayList<Elementos>()
        for (i in 1 until 10){
            llenarLista.add(Elementos("Elemento "+i,
                BitmapFactory.decodeResource(resources, R.drawable.ic_marquet_background))
            )
        }
        val adapter = AdaptadorCardView(llenarLista)
        rv_Favoritos.adapter = adapter*/

    
