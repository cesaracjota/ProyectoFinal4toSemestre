package com.miempresa.menudown

//data class Elementos(val imagen:String, val placa:String, val driver_name:String, val status:String, val modelo:String)
data class Elementos(
        val id: Int,
        val number:String,
        val type:String,
        val model:String,
        val capacity:Int,
        val insurance_renewal_date: String,
        val fuel:String,
        val photo:String
        )

data class Elementos2(
        val id: Int,
        val nombre:String
)

/*
falta implementar la ubicacion real de cada vehiculo
 */
