package com.miempresa.menudown

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import com.miempresa.menudown.manager.MQTTConnectionParams
import com.miempresa.menudown.manager.MQTTmanager
import com.miempresa.menudown.protocols.UIUpdaterInterface
import kotlinx.android.synthetic.main.activity_alerta.*

class Alerta : AppCompatActivity(), UIUpdaterInterface {

    var mqttManager: MQTTmanager? = null
    //var ipAddressField = "54.81.179.17"
    //var topicField = "Lamp"
    //var messageField = "robo"
    //var messageHistoryView = ""
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_alerta)

        MyToolbar().show(this, "Alerta", true)

        resetUIWithConnection(true)

        alerta_robo.setOnClickListener(){
            mqttManager?.publish("robo")
        }
        alerta_accidente.setOnClickListener(){
            mqttManager?.publish("accidente")
        }

    }

    // Interface methods
    override fun resetUIWithConnection(status: Boolean) {

        //ipAddressField.isEnabled  = status
        //topicField.isEnabled      = status
        //messageField.isEnabled    = status
        connectBtn.isEnabled      = status
        //sendBtn.isEnabled         = status

        // Update the status label.
        if (status) {
            updateStatusViewWith("Connected")
        } else {
            updateStatusViewWith("Disconnected")
        }
    }

    override fun updateStatusViewWith(status: String) {
        statusLabl.text = status
    }

    override fun update(message: String) {

        //var text = messageHistoryView.text.toString()
        /*var newText = """
            $text
            $message
            """*/
        //var newText = text.toString() + "\n" + message +  "\n"
        //messageHistoryView.setText(newText)
        //messageHistoryView.setSelection(messageHistoryView.text.length)
    }
        fun connect(view: View){
//" + ipAddressField.text.toString() + "
            var host = "tcp://54.81.179.17:1883"
            var topic = "Lamp"
            var connectionParams = MQTTConnectionParams("MQTTSample",host,topic,"","")
            mqttManager = MQTTmanager(connectionParams,applicationContext,this)
            mqttManager?.connect()
        }
/*
        fun sendMessage(view: View){

            mqttManager?.publish(messageField.text.toString())

            messageField.setText("")
        }*/
}
