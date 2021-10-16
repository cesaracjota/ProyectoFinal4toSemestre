package com.miempresa.menudown.ui.search

import android.content.Intent
import android.os.AsyncTask
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.DividerItemDecoration
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.android.volley.Response
import com.android.volley.toolbox.JsonArrayRequest
import com.android.volley.toolbox.Volley
import com.google.android.gms.maps.CameraUpdateFactory
import com.google.android.gms.maps.GoogleMap
import com.google.android.gms.maps.OnMapReadyCallback
import com.google.android.gms.maps.model.CameraPosition
import com.google.android.gms.maps.model.LatLng
import com.google.android.gms.maps.model.Marker
import com.google.android.gms.maps.model.MarkerOptions
import com.miempresa.menudown.*
import kotlinx.android.synthetic.main.elementoslistavehiculos.*
import kotlinx.android.synthetic.main.fragment_search.*
import org.json.JSONException

class SearchFragment : Fragment() {

    private lateinit var notificationsViewModel: NotificationsViewModel
    var llenarLista = ArrayList<Elementos>()
    private var adapter: RecyclerView.Adapter<AdaptadorElementos.ViewHolder>? = null

    private val Plaza = LatLng(-16.3988031,-71.5374435)
    private lateinit var mMap:GoogleMap

    override fun onCreateView(
            inflater: LayoutInflater,
            container: ViewGroup?,
            savedInstanceState: Bundle?
    ): View? {
        //notificationsViewModel =
        //        ViewModelProvider(this).get(NotificationsViewModel::class.java)
        val root = inflater.inflate(R.layout.fragment_search, container, false)

        //listavehiculos.adapter = adapter

        //cargarLista()
        //listavehiculos.layoutManager = LinearLayoutManager(context)

        return root
    }

    override fun onViewCreated(itemView: View, savedInstanceState: Bundle?) {
        super.onViewCreated(itemView, savedInstanceState)
        
            listavehiculos.layoutManager = LinearLayoutManager(activity)
            //listavehiculos.adapter = AdaptadorElementos()
            var llenarLista = ArrayList<Elementos>()
            AsyncTask.execute {
                val queue = Volley.newRequestQueue(activity)
                val url = getString(R.string.urlAPI) + "/api/vehicles"
                val stringRequest = JsonArrayRequest(url,
                        Response.Listener { response ->
                            try {
                                for (i in 0 until response.length()) {
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
                                listavehiculos.adapter = adapter

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


        btnBuscarVehiculo.setOnClickListener(){
            buscarVehiculo()
        }
    }
    fun buscarVehiculo() {
        listavehiculos.addItemDecoration(DividerItemDecoration(requireContext(), DividerItemDecoration.VERTICAL))
        listavehiculos.layoutManager = LinearLayoutManager(requireContext())
        var texto = txtBuscarVehiculo.text.toString()
        var llenarLista = ArrayList<Elementos>()
        AsyncTask.execute {
            val queue = Volley.newRequestQueue(activity)
            val url = getString(R.string.urlAPI) + "/api/vehicles?q="+texto
            val stringRequest = JsonArrayRequest(url,
                    Response.Listener { response ->
                        try {
                            for (i in 0 until response.length()) {
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
                            val adapter = AdaptadorElementos(llenarLista)
                            listavehiculos.adapter = adapter
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
    }
}