'user server'

import { error } from "console"

export async function getDashboardData(){
    try{

        // Panggil API untuk ambil data dashboard
        const response = await fetch('https://your-api.com/api/dashboard', {
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = response.json()

        if(!response.ok){
            return {
                success: false,
                error: 'Gagal Mengambil data'
            }
        }

        return{
            success: true,
            data: data
        }

    
    }catch{
        console.error('Dashboard error :', error)
        return{
            success: false,
            error: 'Terjadi Kesalahn server'
        }
    }
}