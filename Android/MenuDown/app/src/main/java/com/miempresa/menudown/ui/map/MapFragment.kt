package com.miempresa.menudown.ui.map

import android.content.pm.PackageManager
import android.location.Location
import android.os.AsyncTask
import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.LinearLayoutManager
import com.android.volley.Response
import com.android.volley.toolbox.JsonArrayRequest
import com.android.volley.toolbox.Volley
import com.google.android.gms.location.FusedLocationProviderClient
import com.google.android.gms.maps.CameraUpdateFactory
import com.google.android.gms.maps.GoogleMap
import com.google.android.gms.maps.OnMapReadyCallback
import com.google.android.gms.maps.SupportMapFragment
import com.google.android.gms.maps.model.*
import com.google.android.libraries.places.api.Places
import com.google.android.libraries.places.api.model.Place
import com.google.android.libraries.places.widget.Autocomplete
import com.google.android.libraries.places.widget.model.AutocompleteActivityMode
import com.miempresa.menudown.AdaptadorElementos
import com.miempresa.menudown.Elementos
import com.miempresa.menudown.R
import kotlinx.android.synthetic.main.activity_routes.*
import kotlinx.android.synthetic.main.fragment_map.*
import kotlinx.android.synthetic.main.fragment_search.*
import kotlinx.coroutines.currentCoroutineContext
import org.json.JSONException
import java.util.jar.Manifest


class MapFragment : Fragment(), OnMapReadyCallback, GoogleMap.OnMarkerClickListener,GoogleMap.OnMyLocationClickListener{

    //private val Plaza = LatLng(-16.3988031,-71.5374435)
    private lateinit var mMap:GoogleMap
    private lateinit var fusedLocation: FusedLocationProviderClient
    private val Plaza = LatLng(-16.3988031,-71.5374435)
    private var aux : Double = 0.0
    companion object {
        private const val FROM_REQUEST_CODE = 1
        private const val TO_REQUEST_CODE = 2
    }


    private val callback = OnMapReadyCallback { googleMap ->

    }

    private lateinit var dashboardViewModel: DashboardViewModel

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        //dashboardViewModel = ViewModelProvider(this).get(DashboardViewModel::class.java)

        Places.initialize(requireActivity(),getString(R.string.claveapi_place))

        // Set the fields to specify which types of place data to
        // return after the user has made a selection.





        val root = inflater.inflate(R.layout.fragment_map, container, false)
        return root

    }
    private fun startautoCompleteform(requestCode: Int){
        val fields = listOf(Place.Field.ID, Place.Field.NAME)

        // Start the autocomplete intent.
        val intent = Autocomplete.IntentBuilder(AutocompleteActivityMode.FULLSCREEN, fields)
            .build(requireContext())
        startActivityForResult(intent, requestCode)

    }

     override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        val mapFragment = childFragmentManager.findFragmentById(R.id.fragmentMap) as SupportMapFragment?
        mapFragment?.getMapAsync(this)
         //fusedLocation = LocationServices.getFusedLocationProviderClient()
    }



    fun moverCamara(view: View?){
        mMap.moveCamera(CameraUpdateFactory.newLatLngZoom(Plaza,18f))
    }

    fun agregarMarcador(lat:Double,long:Double){

        val here = LatLng(lat,long)
        mMap.addMarker(MarkerOptions().position(here).title("Estoy Aqui"))
        mMap.moveCamera(CameraUpdateFactory.newLatLng(here))
        mMap.animateCamera(
                CameraUpdateFactory.newLatLngZoom(here, 18f),
                4000,
                null
        )
        mMap.addMarker(
                MarkerOptions().position(
                        LatLng(
                                mMap.cameraPosition.target.latitude,
                                mMap.cameraPosition.target.latitude
                        )
                ).title("Mi Ubicacion")
        )
    }

    override fun onMapReady(googleMap: GoogleMap) {
        mMap = googleMap
        val map = googleMap
        //mMap.setOnMyLocationButtonClickListener(this)
        mMap.setOnMyLocationClickListener(this)
        mMap.uiSettings.setAllGesturesEnabled(true)
        mMap.uiSettings.isZoomControlsEnabled = true
        mMap.uiSettings.isCompassEnabled = true
        mMap.uiSettings.isCompassEnabled = true

        googleMap?.apply {
            val sydney = LatLng(-16.43266, -71.550)
            addMarker(
                MarkerOptions()
                    .position(sydney)
                    .title("Paradero 1")
            )
        }
        googleMap?.apply {
            val p1 = LatLng(-16.42266, -71.530)
            addMarker(
                MarkerOptions()
                    .position(p1)
                    .title("Paradero 2")
            )
        }
        googleMap?.apply {
            val p2 = LatLng(-16.44266, -71.5730)
            addMarker(
                MarkerOptions()
                    .position(p2)
                    .title("Paradero 3")
            )
        }
        googleMap?.apply {
            val p2 = LatLng(-16.45266, -71.5220)
            addMarker(
                MarkerOptions()
                    .position(p2)
                    .title("Paradero 3")
            )
        }
        googleMap?.apply {
            val p2 = LatLng(-16.46266, -71.5610)
            addMarker(
                MarkerOptions()
                    .position(p2)
                    .title("Paradero 3")
            )
        }

        // Set a listener for marker click.
        map.setOnMarkerClickListener(this)
        //cargaRutas()

        //-16.3974312,-71.5186061,18.75 --- origen
        //-16.4231045,-71.5430121,18

        mMap = googleMap
        if (ContextCompat.checkSelfPermission(requireContext(),android.Manifest.permission.ACCESS_FINE_LOCATION)
                == PackageManager.PERMISSION_GRANTED && ContextCompat.checkSelfPermission(
                        requireContext(),
                        android.Manifest.permission.ACCESS_COARSE_LOCATION)== PackageManager.PERMISSION_GRANTED)
        {
            mMap.setMyLocationEnabled(true);

        }else{
            requestPermissions(arrayOf(android.Manifest.permission.ACCESS_FINE_LOCATION), 123)

        }
        googleMap.moveCamera(CameraUpdateFactory.newLatLngZoom(LatLng(-16.42266, -71.530), 13f))
    }

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
    }

    override fun onMarkerClick(p0: Marker?): Boolean {
        TODO("Not yet implemented")
    }

    override fun onMyLocationClick(p0: Location) {
        Toast.makeText(requireContext(), "Estas en ${p0.latitude}, ${p0.longitude}", Toast.LENGTH_SHORT).show()
        val a: Double = p0.latitude
        val b: Double = p0.longitude
        //agregarMarcador(a, b)
        //agregarMarcador(-16.399828000000000, -71.509612000000000)
    }




}
