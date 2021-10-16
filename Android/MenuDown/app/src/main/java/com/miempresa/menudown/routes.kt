package com.miempresa.menudown

import android.os.AsyncTask
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Toast
import androidx.core.content.ContentProviderCompat.requireContext
import com.android.volley.Response
import com.android.volley.toolbox.JsonArrayRequest
import com.android.volley.toolbox.Volley
import com.google.android.gms.maps.CameraUpdateFactory
import com.google.android.gms.maps.GoogleMap
import com.google.android.gms.maps.OnMapReadyCallback
import com.google.android.gms.maps.SupportMapFragment
import com.google.android.gms.maps.model.*
import org.json.JSONException

class routes : AppCompatActivity(), OnMapReadyCallback, GoogleMap.OnPolylineClickListener{
    private lateinit var mMap: GoogleMap

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_routes)

        MyToolbar().show(this, "Rutas", true)

        // Get the SupportMapFragment and request notification when the map is ready to be used.
        val mapFragment = supportFragmentManager
            .findFragmentById(R.id.map) as SupportMapFragment?
        mapFragment?.getMapAsync(this)
    }

    override fun onMapReady(googleMap: GoogleMap) {
        mMap = googleMap
        mMap.getUiSettings().setAllGesturesEnabled(true)
        mMap.getUiSettings().setZoomControlsEnabled(true)
        mMap.getUiSettings().setCompassEnabled(true)

        // Add a marker in Sydney, Australia,
        // and move the map's camera to the same location.
        val paradero1 = LatLng(-16.364, -71.591)
        googleMap.addMarker(
            MarkerOptions()
                .position(paradero1)
                .title("Mi Paradero")
        )
        googleMap.moveCamera(CameraUpdateFactory.newLatLng(paradero1))

        // Add polylines to the map.
        // Polylines are useful to show a route or some other connection between points.
        val polyline1 = googleMap.addPolyline(
            PolylineOptions()
            .clickable(true)
            .add(
                LatLng(-16.416, -71.421),
                LatLng(-16.447, -71.592),
                LatLng(-16.364, -71.591),
                LatLng(-16.301, -71.517),
                LatLng(-16.306, -71.548),
                LatLng(-16.491, -71.509)))

        // [END maps_poly_activity_add_polyline]
        // [START_EXCLUDE silent]
        // Store a data object with the polyline, used here to indicate an arbitrary type.
        polyline1.tag = "A"
        // [END maps_poly_activity_add_polyline_set_tag]
        // Style the polyline.
        stylePolyline(polyline1)

        val polyline2 = googleMap.addPolyline(PolylineOptions()
            .clickable(true)
            .add(
                LatLng(-16.301, -71.500),
                LatLng(-16.356, -71.572),
                LatLng(-16.471, -71.587),
                LatLng(-16.481, -71.555),
                LatLng(-16.448, -71.529),
                LatLng(-16.415, -71.538)))
        polyline2.tag = "B"
        stylePolyline(polyline2)

        // [START maps_poly_activity_add_polygon]
        // Add polygons to indicate areas on the map.

        // [END_EXCLUDE]

        // Position the map's camera near Alice Springs in the center of Australia,
        // and set the zoom factor so most of Australia shows on the screen.
        googleMap.moveCamera(CameraUpdateFactory.newLatLngZoom(LatLng(-16.39889, -71.535), 12f))

        // Set listeners for click events.
        googleMap.setOnPolylineClickListener(this)
    }

    // [END maps_poly_activity_on_map_ready]

    // [START maps_poly_activity_style_polyline]
    private val COLOR_BLACK_ARGB = -0xff00000
    private val POLYLINE_STROKE_WIDTH_PX = 8

    /**
     * Styles the polyline, based on type.
     * @param polyline The polyline object that needs styling.
     */
    private fun stylePolyline(polyline: Polyline) {
        // Get the data object stored with the polyline.
        val type = polyline.tag?.toString() ?: ""
        when (type) {
            "A" -> {
                // Use a custom bitmap as the cap at the start of the line.
                polyline.startCap = CustomCap(
                    BitmapDescriptorFactory.fromResource(R.drawable.quantum_ic_arrow_back_grey600_24), 10f)
            }
            "B" -> {
                // Use a round cap at the start of the line.
                polyline.startCap = RoundCap()
            }
        }
        polyline.endCap = RoundCap()
        polyline.width = POLYLINE_STROKE_WIDTH_PX.toFloat()
        polyline.color = COLOR_BLACK_ARGB
        polyline.jointType = JointType.ROUND
    }
    // [END maps_poly_activity_style_polyline]

    // [START maps_poly_activity_on_polyline_click]
    private val PATTERN_GAP_LENGTH_PX = 20
    private val DOT: PatternItem = Dot()
    private val GAP: PatternItem = Gap(PATTERN_GAP_LENGTH_PX.toFloat())

    // Create a stroke pattern of a gap followed by a dot.
    private val PATTERN_POLYLINE_DOTTED = listOf(GAP, DOT)

    /**
     * Listens for clicks on a polyline.
     * @param polyline The polyline object that the user has clicked.
     */

    override fun onPolylineClick(polyline: Polyline) {

        // Flip from solid stroke to dotted stroke pattern.
        if (polyline.pattern == null || !polyline.pattern!!.contains(DOT)) {
            polyline.pattern = PATTERN_POLYLINE_DOTTED
        } else {
            // The default pattern is a solid stroke.
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
