package com.miempresa.menudown

//import com.example.chapatucombi.R.style.AppTheme
//import com.example.chapatucombi.R.style.AppCompat
//import com.miempresa.menudown.R.style.AppCompat
//import com.google.firebase.auth.FirebaseAuth
//import com.example.chapatucombi.ui.home.HomeFragment
import android.content.Intent
import android.os.Bundle
import android.os.StrictMode
import android.widget.Toast
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import com.android.volley.Response
import com.android.volley.toolbox.JsonArrayRequest
import com.android.volley.toolbox.Volley
import kotlinx.android.synthetic.main.activity_auth.*
import org.json.JSONException


class AuthActivity : AppCompatActivity(){

    override fun onCreate(savedInstanceState: Bundle?) {
        //Thread.sleep(2000)
        //setTheme(R.style.AppCompat)
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_auth)
        title="Login"
        //setup()

        val policy =
            StrictMode.ThreadPolicy.Builder().permitAll().build()
        StrictMode.setThreadPolicy(policy)

        LogginButton.setOnClickListener() {
            //if (EmailEditText.text.isNotEmpty() && PasswordEditText.text.isNotEmpty()) {
            val email =  EmailEditText.text.toString()
            val password = PasswordEditText.text.toString()
            val queue = Volley.newRequestQueue(this)
            var url = getString(R.string.urlAPI) + "/api/passengers?"
            url = url + "email="+ email + "&password=" + password
            val stringRequest = JsonArrayRequest(url,
                Response.Listener { response ->
                    try {
                        val valor = response.getJSONObject(0)
                        /*
                        Toast.makeText(
                            applicationContext,
                            "Validacion de usuario " + valor.getString("usuario") +
                                    " con clave: " + valor.getString("clave") + " correcta",
                            Toast.LENGTH_LONG
                        ).show()*/
                        val llamaractividad = Intent(applicationContext, MainActivity::class.java)
                        startActivity(llamaractividad)
                        finish()
                    } catch (e: JSONException) {
                        Toast.makeText(
                            applicationContext,
                            "Error en las credenciales proporcionadas",
                            Toast.LENGTH_SHORT
                        ).show()
                    }
                }, Response.ErrorListener {
                    Toast.makeText(
                        applicationContext,
                        "Compruebe que tiene acceso a internet",
                        Toast.LENGTH_SHORT
                    ).show()
                })
            queue.add(stringRequest)
        }

        sup.setOnClickListener(){
            val it = Intent(this, SignUpActivitty::class.java)
            startActivity(it)
            finish()
        }


    }

}