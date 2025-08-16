import { MapContainer, TileLayer, Marker, Popup ,useMap} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { supabase } from "../Supabaseclient";
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const posisidesa = [-5.7610505416301825, 105.70805353700483]

function ZoomkeMarker({lat,lng}){
    const map = useMap();
    useEffect(()=>{
        if(lat&&lng){
            map.setView([lat,lng],18);
        }
    },[lat,lng,map]);
    return null;
};

export default function petadesa(){
    const [searchparams] = useSearchParams();
    const [markers,setMarkers] = useState([]);
    const [targetMarkers,settargetMarkers] = useState(null);

    const fetchMarkers = async () => {
    const {data,error} = await supabase.from('markerdesa').select();
    if(data) setMarkers(data)

    const markerId = searchparams.get("marker");
    if(markerId){
        const target = data.find((m) => m.id.toString() === markerId);
        if(target) settargetMarkers(target);
    }
}

const getIcon = (color) => {
    const availableColors = ['red','blue','green','orange','gold','violet','grey','black'];
    const safeColor = availableColors.includes(color) ? color : 'gold';

    return new L.Icon({
        iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${safeColor}.png`,
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    })
}

    useEffect(()=>{
        fetchMarkers();
    },[]);

    return(
        <div className="max-w-4xl mx-auto pl-4 pr-4 pt-2 pb-8 mt-8 bg-brand-maroonSoft rounded shadow-[0px_0px_25px_rgba(0,0,0,0.3)]">
            <h2 className='text-2xl font-bold text-center mb-2 text-white'>Peta Desa Interaktif</h2>
            <div className='p-4 bg-brand-maroon rounded-lg shadow-lg '>
                
                <MapContainer 
                center = {posisidesa}
                zoom = {16}
                scrollWheelZoom={false}
                style={{height:'500px',width:'100%'}}
                className='z-0'
                >
                    <TileLayer
                    attribution='&copy; <a href="https://www.esri.com/">Esri</a>'
                    url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"/>
                    {markers.map((marker)=>(
                        <Marker key={marker.id} position={[marker.latitude,marker.longitude]}
                        icon={getIcon(marker.warna)}
                        >
                            <Popup>
                                <strong>{marker.nama}</strong><br/>
                                {marker.deskripsi}
                            </Popup>
                        </Marker>
                    ))}
                    {targetMarkers && (
                        <ZoomkeMarker lat={targetMarkers.latitude} lng={targetMarkers.longitude}/>
                    )}
                </MapContainer>
                <div className="mt-8">
                <h3 className="text-white te text-lg font-bold">Legenda</h3>
                <ul className="list-disc ml-6">
                    <li className='text-white font-bold flex items-center'>
                        <img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png" 
                        className='max-h-8 m-4'
                        alt="" />
                        
                        <span className="text-white capitalize">Kuning :  Rumah Kepala Desa</span>
                    </li>
                    <li className='text-white font-bold flex items-center'>
                        <img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png" 
                        className='max-h-8 m-4'
                        alt="" />
                        
                        <span className="text-white capitalize">biru :  Rumah sekertaris desa</span>
                    </li>
                    <li className='text-white font-bold flex items-center'>
                        <img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png" 
                        className='max-h-8 m-4'
                        alt="" />
                        
                        <span className="text-white capitalize">ungu :  balai desa</span>
                    </li>
                    <li className='text-white font-bold flex items-center'>
                        <img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png" 
                        className='max-h-8 m-4'
                        alt="" />
                        
                        <span className="text-white capitalize">hijau :  fasilitas ibadah</span>
                    </li>
                    <li className='text-white font-bold flex items-center'>
                        <img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png" 
                        className='max-h-8 m-4'
                        alt="" />
                        
                        <span className="text-white capitalize">oren :  fasilitas pendidikan</span>
                    </li>
                    <li className='text-white font-bold flex items-center'>
                        <img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png" 
                        className='max-h-8 m-4'
                        alt="" />
                        
                        <span className="text-white capitalize">merah :  fasilitas kesehatan</span>
                    </li>
                    <li className='text-white font-bold flex items-center'>
                        <img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png" 
                        className='max-h-8 m-4'
                        alt="" />
                        
                        <span className="text-white capitalize">abu-abu :  sebagai penanda lain</span>
                    </li>
                                      
                </ul>
            </div>
            </div>
            <h2 className="text-3xl font-bold text-center mb-6 text-white m-4">Peta Desa Tetaan</h2>
            <div className="flex justify-center">
                <img
                src="petadesa.png"
                alt="Peta Desa Tetaan"
                className="w-full max-w-3xl rounded shadow-lg"
                />
            </div>

        </div>
    );
}