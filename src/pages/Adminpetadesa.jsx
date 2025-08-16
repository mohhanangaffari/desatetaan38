import { useEffect,useState } from "react";
import { MapContainer,Marker,Popup,TileLayer,useMapEvents } from "react-leaflet";
import { supabase } from "../Supabaseclient";
import L, { marker } from "leaflet";

export default function Adminpeta(){
    const [markers,setMarkers] = useState([]);
    const [selectedPosition,setSelectedPosition] = useState(null);
    const [formData,setFormData] = useState({nama:'',deskripsi:'',warna : 'Red'});
    const [uploading,setUploading] = useState(null);

    const fetchMarkers = async () => {
        const {data,error} = await supabase.from('markerdesa').select();
        if(data) setMarkers(data);
    };

    const addMarker = async () => {
        if(!selectedPosition) return;
        if(uploading) return;
        setUploading(true);
        if(!formData.nama || !formData.deskripsi || !formData.warna){
            alert("data harus di isi")
            return;
        }

        const {error} = await supabase.from('markerdesa').insert({
            ...formData,
            latitude: selectedPosition.lat,
            longitude: selectedPosition.lng,
        });

        if(!error){
            setFormData({nama:'',deskripsi:'',warna:'red'});
            setSelectedPosition(null);
            fetchMarkers();
            setUploading(false);            
            window.location.reload();
        }
    };

    const deletemarker = async (id) =>{
        await supabase.from('markerdesa').delete().eq('id',id);
        fetchMarkers();
    }

    function MapClickHandle(){
        useMapEvents({
            click(e){
                setSelectedPosition(e.latlng);
            },
        });
        return null;
    }

    const getIcon = (color) => {
        const availableColors = ['red', 'blue', 'green', 'orange', 'gold', 'violet', 'grey', 'black'];
        const safeColor = availableColors.includes(color) ? color : 'gold'; // fallback ke 'red'
        return new L.Icon({
            iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${safeColor}.png`,
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]            
        })
    }

    useEffect(() => {
        fetchMarkers();
    });

    return(
        <div className="p-4 bg-brand-maroonSoft rounded shadow-[0px_0px_25px_rgba(0,0,0,0.3)] mt-8">
            <h2 className="text-xl font-bold mb-4 text-white">Admin Peta</h2>
            <div className="grid md:grid-cols-[70%_30%] gap-4">
                <div className="bg-brand-maroon P-4 rounded">
                    <MapContainer center={[-5.7607876029617895, 105.7081100988754]}  zoom={25} 
                    style={{height:'600px',width:'95%'}} className="place-self-center m-6 z-0">
                        <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" 
                        attribution='&copy; <a href="https://www.esri.com/">Esri</a>'
                        />
                        <MapClickHandle/>
                        {markers.map((marker)=>(
                            <Marker
                            key={marker.id}
                            position={[marker.latitude,marker.longitude]}
                            icon={getIcon(marker.warna)}>
                                <Popup>
                                    <strong>{marker.nama}</strong>
                                    <br/>{marker.deskripsi}<br/>
                                    
                                    <button onClick={()=> deletemarker(marker.id)} className="text-red-400">Hapus</button>
                                </Popup>
                            </Marker>
                        ))}

                        {selectedPosition && (
                            <Marker position={selectedPosition} icon={getIcon(formData.warna)}>
                                <Popup>Marker Baru</Popup>                                
                            </Marker>
                        )}
                    </MapContainer>                    
                </div>

                        <div className="p-4 bg-brand-maroon mr-4 rounded">
                            <h3 className="text-lg font-bold mb-2 text-white">Tambah Marker Baru</h3>
                            <div className="flex flex-col gap-2">
                                <input type="text" placeholder="Nama Tempat" value={formData.nama}
                                onChange={(e) => setFormData({...formData,nama:e.target.value})}
                                className="p-2 bg-brand-maroonDark rounded placeholder-white 
                                placeholder-opacity-60 text-white"/>
                                <textarea placeholder="deskripsi"
                                value={formData.deskripsi}
                                onChange={(e)=> setFormData({...formData,deskripsi:e.target.value})}
                                className="bg-brand-maroonDark rounded p-2 placeholder-white
                                placeholder-opacity-60 text-white"
                                />

                                <select
                                value={formData.warna}
                                defaultValue="yellow"
                                onChange={(e) => setFormData({...formData,warna:e.target.value})}
                                className="bg-brand-maroonDark rounded text-white font-bold p-2"
                                >
                                    <option value="gold">kuning (Rumah Kades)</option>
                                    <option value="blue">Biru (Rumah sekdes)</option>
                                    <option value="violet">ungu (balai desa)</option>
                                    <option value="green">Hijau (fasilitas ibadah)</option>
                                    <option value="orange">oren (fasilitas Pendidikan)</option>
                                    <option value="red">merah (fasilitas kesehatan)</option>
                                    <option value="grey">abu abu (sebagai penanda yang lain)</option>
                                </select>

                                <button onClick={addMarker}
                                className="bg-brand-maroonDark font-bold text-white p-2 mt-2 rounded"
                                disabled={!selectedPosition}
                                >Tambahkan Penanda</button>

                                <div className=" bg-brand-maroon rounded mt-2">
                                    <h3 className="text-white te text-lg font-bold">Legenda</h3>
                                    <ul className="list-disc ml-2">
                                        <li className='text-white font-bold flex items-center'>
                                            <img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png" 
                                            className='max-h-6 m-2'
                                            alt="" />
                                            
                                            <span className="text-white capitalize ">Kuning :  Rumah Kepala Desa</span>
                                        </li>
                                        <li className='text-white font-bold flex items-center'>
                                            <img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png" 
                                            className='max-h-6 m-2'
                                            alt="" />
                                            
                                            <span className="text-white capitalize">biru :  Rumah sekertaris desa</span>
                                        </li>
                                        <li className='text-white font-bold flex items-center'>
                                            <img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png" 
                                            className='max-h-6 m-2'
                                            alt="" />
                                            
                                            <span className="text-white capitalize">ungu :  balai desa</span>
                                        </li>
                                        <li className='text-white font-bold flex items-center'>
                                            <img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png" 
                                            className='max-h-6 m-2'
                                            alt="" />
                                            
                                            <span className="text-white capitalize">hijau :  fasilitas ibadah</span>
                                        </li>
                                        <li className='text-white font-bold flex items-center'>
                                            <img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png" 
                                            className='max-h-6 m-2'
                                            alt="" />
                                            
                                            <span className="text-white capitalize">oren :  fasilitas pendidikan</span>
                                        </li>
                                        <li className='text-white font-bold flex items-center'>
                                            <img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png" 
                                            className='max-h-6 m-2'
                                            alt="" />
                                            
                                            <span className="text-white capitalize">merah :  fasilitas kesehatan</span>
                                        </li>
                                        <li className='text-white font-bold flex items-center'>
                                            <img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png" 
                                            className='max-h-6 m-2'
                                            alt="" />
                                            
                                            <span className="text-white capitalize">abu-abu :  sebagai penanda lain</span>
                                        </li>
                                                        
                                    </ul>
                                </div>
                            </div>
                        </div>
            </div>
 
            

        </div>
        
    )

}