package com.miempresa.menudown

import android.content.Intent
import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.android.volley.AuthFailureError
import com.android.volley.Response
import com.android.volley.toolbox.StringRequest
import com.android.volley.toolbox.Volley
import kotlinx.android.synthetic.main.activity_signup.*
import org.json.JSONObject

//import sun.security.jgss.GSSUtil.login


class SignUpActivitty : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_signup)

        signup.setOnClickListener() {
            postDataUsingVolley()
        }
        lin.setOnClickListener() {
            val it = Intent(this, AuthActivity::class.java)
            startActivity(it)
        }
    }


    private fun postDataUsingVolley() {

        val email = mail.text.toString()
        print(email)
        val usuario = usrusr.text.toString()
        print(usuario)
        val clave = pswrdd.text.toString()
        print(clave)
        val phone = mobphone.text.toString().toInt()
        print(phone)
        val estado = "Active"
        print(estado)
        val trips: Int = 0
        print(trips)
        // url para realizar POST a nuestro API
        var url = getString(R.string.urlAPI) + "/api/passengers"
        // creando una nueva variable para nuestra cola de solicitudes
        val queue = Volley.newRequestQueue(this)

        val request: StringRequest = object : StringRequest(

            Method.POST, url,
            Response.Listener { response ->
                Toast.makeText(applicationContext, "Exito al Ingresar Datos", Toast.LENGTH_SHORT).show()
                val it = Intent(this, AuthActivity::class.java)
                startActivity(it)
            }, Response.ErrorListener { error -> // método para manejar errores.
                Toast.makeText(
                    applicationContext,"Compuebe si tiene internet",
                    Toast.LENGTH_LONG
                ).show()
            }) {

            override fun getBodyContentType(): String {

                return "application/son"}

            @Throws(AuthFailureError::class)
            override fun getBody(): ByteArray {
                val params2 = HashMap<Any, Any>()

                params2["name"] = usuario
                params2["mobile"] = phone
                params2["trips"] = trips
                params2["email"] = email
                params2["status"] = estado
                params2["password"] = clave
                val json =JSONObject(params2 as Map<*, *>).toString()
                print(json)

                return JSONObject(params2 as Map<*, *>).toString().toByteArray()
            }


        }
        queue!!.add(request!!)
    }



}





