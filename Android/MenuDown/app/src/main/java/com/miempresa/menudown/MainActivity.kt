package com.miempresa.menudown

import android.content.Intent
import android.os.Bundle
import android.provider.Settings
import android.view.MenuItem
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.GravityCompat
import androidx.navigation.Navigation
import androidx.navigation.findNavController
import androidx.navigation.ui.AppBarConfiguration
import androidx.navigation.ui.setupActionBarWithNavController
import androidx.navigation.ui.setupWithNavController
import com.google.android.gms.maps.MapFragment
import com.google.android.material.bottomnavigation.BottomNavigationView
import com.google.android.material.navigation.NavigationView
import com.miempresa.menudown.ui.favorite.FavoriteFragment
import kotlinx.android.synthetic.main.activity_main.*
import kotlinx.android.synthetic.main.header.*

class MainActivity : AppCompatActivity(), NavigationView.OnNavigationItemSelectedListener {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)


        //val navigationView: NavigationView = findViewById(R.id.nav_view2)
        //navigationView.setNavigationItemSelectedListener(this)
        val navigationView: NavigationView =findViewById(R.id.nav_view2)
        navigationView.setNavigationItemSelectedListener(this)

        //setSupportActionBar(findViewById(R.id.mitoolbar))
        //supportActionBar?.setHomeAsUpIndicator(android.R.drawable.ic_menu_preferences)
        //supportActionBar?.setDisplayHomeAsUpEnabled(true)

        val navView: BottomNavigationView = findViewById(R.id.nav_view)

        val navController = findNavController(R.id.nav_host_fragment)
        // Passing each menu ID as a set of Ids because each
        // menu should be considered as top level destinations.
        val appBarConfiguration = AppBarConfiguration(setOf(
                R.id.navigation_favorite, R.id.navigation_map, R.id.navigation_search))
        //setupActionBarWithNavController(navController, appBarConfiguration)
        navView.setupWithNavController(navController)

    }

    fun onProviderDisabled(provider: String?) {
        val intent = Intent(Settings.ACTION_LOCATION_SOURCE_SETTINGS)
        startActivity(intent)
    }

    override fun onNavigationItemSelected(p0: MenuItem): Boolean {
        when(p0.itemId){
            R.id.nav_home -> {
                val llamaractividad = Intent(applicationContext, MainActivity::class.java)
                startActivity(llamaractividad)
            }
            R.id.nav_settings -> {
                val llamaractividad = Intent(applicationContext, Configuracion::class.java)
                startActivity(llamaractividad)
            }
            R.id.nav_logout -> {
                val llamaractividad = Intent(applicationContext, AuthActivity::class.java)
                startActivity(llamaractividad)
            }
            R.id.nav_routes -> {
                val llamaractividad = Intent(applicationContext, routes::class.java)
                startActivity(llamaractividad)
            }
            R.id.nav_alert -> {
                val llamaractividad = Intent(applicationContext, Alerta::class.java)
                startActivity(llamaractividad)
            }
            R.id.ayuda_soporte -> {
                val llamaractividad = Intent(applicationContext, AyudaSoporte::class.java)
                startActivity(llamaractividad)
            }
        }
        return true
    }
}