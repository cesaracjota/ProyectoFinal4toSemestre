package com.miempresa.menudown

import android.content.Context
import android.graphics.Bitmap
import android.os.AsyncTask
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.widget.Toast
import androidx.core.content.ContextCompat
import androidx.recyclerview.widget.DividerItemDecoration
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.android.volley.Response
import com.android.volley.toolbox.JsonArrayRequest
import com.android.volley.toolbox.Volley
import com.google.android.gms.maps.CameraUpdateFactory
import com.google.android.gms.maps.GoogleMap
import com.google.android.gms.maps.OnMapReadyCallback
import com.google.android.gms.maps.SupportMapFragment
import com.google.android.gms.maps.model.*
import com.miempresa.menudown.ui.search.NotificationsViewModel
import com.squareup.picasso.Picasso
import kotlinx.android.synthetic.main.activity_more_info.*
import kotlinx.android.synthetic.main.fragment_search.*
import org.json.JSONException
import java.lang.reflect.Array.getInt

class moreInfo : AppCompatActivity(), OnMapReadyCallback, GoogleMap.OnPolylineClickListener{
    private lateinit var mMap: GoogleMap

    private lateinit var notificationsViewModel: NotificationsViewModel
    var llenarLista = ArrayList<Elementos>()
    private var adapter: RecyclerView.Adapter<AdaptadorElementos.ViewHolder>? = null

    private val Plaza = LatLng(-16.3988031,-71.5374435)
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_more_info)

        MyToolbar().show(this, "Rutas", true)

        //recepcionando los datos de un vehiculo

        val bundle :Bundle ?=intent.extras
        if (bundle!=null){
            item_modelo.setText(bundle.getString("modelo").toString())
            item_placa.setText(bundle.getString("placa").toString())
            //item_imagenbus.setImageBitmap(bundle.getBundle("image").toString())
            item_capacidad.setText(bundle.getString("capacidad").toString())
            item_fecha_cad.setText(bundle.getString("fecha").toString())
        }

        val mapFragment = supportFragmentManager
            .findFragmentById(R.id.map) as SupportMapFragment?
        mapFragment?.getMapAsync(this)
    }

    override fun onMapReady(googleMap: GoogleMap) {
        mMap = googleMap
        mMap.getUiSettings().setAllGesturesEnabled(true)
        mMap.getUiSettings().setZoomControlsEnabled(true)
        mMap.getUiSettings().setCompassEnabled(true)
        // Add polylines to the map.
        // Polylines are useful to show a route or some other connection between points.
        val polyline1 = googleMap.addPolyline(
            PolylineOptions()
                .clickable(true)
                .add(
                    LatLng(-16.430528272885837,-71.51239156723021),
                    LatLng(-16.433039189141063, -71.51496648788452),
                    LatLng(-16.43388301436717, -71.51625394821167),
                    LatLng(-16.43503555021691,-71.51865720748901),
                    LatLng(-16.43526194038381, -71.51848554611206),
                    LatLng(-16.4356529773233, -71.51938676834106),
                    LatLng(-16.4358176242202, -71.52041673660278),
                    LatLng(-16.409451762560785, -71.5234637260437),
                    LatLng(-16.399365515111267, -71.52590990066528),
                    LatLng(-16.395351454929518, -71.5314245223999),
                    LatLng(-16.39461038861664, -71.52975082397461)

                )
        )

        polyline1.tag = "A"

        stylePolyline(polyline1)

        googleMap.moveCamera(CameraUpdateFactory.newLatLngZoom(LatLng(-16.41569889, -71.52938605), 13f))

        googleMap.setOnPolylineClickListener(this)
    }

    private val COLOR_BLACK_ARGB = -0xff00000
    private val POLYLINE_STROKE_WIDTH_PX = 15

    private fun stylePolyline(polyline: Polyline) {
        // Get the data object stored with the polyline.
        val type = polyline.tag?.toString() ?: ""
        when (type) {
            "A" -> {

                polyline.startCap = CustomCap(
                    BitmapDescriptorFactory.fromResource(R.drawable.quantum_ic_arrow_back_grey600_24), 5f)
            }
            "B" -> {

                polyline.startCap = RoundCap()
            }
        }
        polyline.endCap = RoundCap()
        polyline.width = POLYLINE_STROKE_WIDTH_PX.toFloat()
        polyline.color = ContextCompat.getColor(this,R.color.purple_700)
        polyline.jointType = JointType.ROUND
    }

    private val PATTERN_GAP_LENGTH_PX = 20
    private val DOT: PatternItem = Dot()
    private val GAP: PatternItem = Gap(PATTERN_GAP_LENGTH_PX.toFloat())

    private val PATTERN_POLYLINE_DOTTED = listOf(GAP, DOT)

    override fun onPolylineClick(polyline: Polyline) {

        if (polyline.pattern == null || !polyline.pattern!!.contains(DOT)) {
            polyline.pattern = PATTERN_POLYLINE_DOTTED
        } else {

            polyline.pattern = null
        }
        Toast.makeText(this, "Route type " + polyline.tag.toString(),
            Toast.LENGTH_SHORT).show()
    }
    /*
    private fun cargaRutas() {
        AsyncTask.execute {
            val queue = Volley.newRequestQueue(requireContext())
            val url = getString(R.string.urlAPI) + "/api/coordinates"
            val stringRequest = JsonArrayRequest(url,
                Response.Listener { response ->
                    try {
                        for (i in 0 until response.length()) {

                            val latitud =
                                response.getJSONObject(i).getString("latitude").toDouble()
                            val longited =
                                response.getJSONObject(i).getString("longitude").toDouble()

                            mostrarpunto(latitud,longited)

                        }

                    } catch (e: JSONException) {
                        Toast.makeText(
                            activity,
                            "EERRORR de PUNTOS",
                            Toast.LENGTH_LONG
                        ).show()
                    }
                }, Response.ErrorListener {
                    Toast.makeText(
                        requireContext(),
                        "Verifique que esta conectado a internet",
                        Toast.LENGTH_LONG
                    ).show()
                })
            queue.add(stringRequest)
        }
    }
    private fun mostrarpunto(latitud: Double, longited: Double) {
        Toast.makeText(requireContext(), "Estas en ${latitud}, ${longited}", Toast.LENGTH_SHORT).show()
        agregarMarcador(latitud,longited)
    }*/
    fun agregarMarcador(lat:Double,long:Double){
        /*
        val here = LatLng(lat,long)
        mMap.addMarker(MarkerOptions().position(here).title("Estoy Aqui"))
        mMap.moveCamera(CameraUpdateFactory.newLatLng(here))
        mMap.animateCamera(
                CameraUpdateFactory.newLatLngZoom(here, 18f),
                4000,
                null
        )*/
        /*mMap.addMarker(
                MarkerOptions().position(
                        LatLng(
                                mMap.cameraPosition.target.latitude,
                                mMap.cameraPosition.target.latitude
                        )
                ).title("Mi Ubicacion")
        )*/
    }

}

private fun SupportMapFragment?.getMapAsync(routes: routes) {

}