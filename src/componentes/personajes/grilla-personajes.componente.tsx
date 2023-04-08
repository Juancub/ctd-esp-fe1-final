import { useEffect } from 'react';
import './grilla-personajes.css';
import TarjetaPersonaje from './tarjeta-personaje.componente';
import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import { getData } from '../../redux/dataSlice';

/**
 * Grilla de personajes para la pagina de inicio
 * 
 * Deberás agregar las funciones necesarias para mostrar y paginar los personajes
 * 
 * 
 * @returns un JSX element 
 */

const GrillaPersonajes = () => {

        //const [page, setPage] = useState(1)
    
        const dispatch = useAppDispatch()
        const images = useAppSelector(state => state.images)
        // const claves = getData({
        //     page: images.GetDataArgs.page,
        //     name: images.GetDataArgs.name
        // })
    
        useEffect(
            () => {
            dispatch(getData({
                page: images.GetDataArgs.page,
                name: images.GetDataArgs.name
            }))
            },
            [dispatch, images.GetDataArgs]
        )
        
        console.log("esto es lo que obtiene",images.images);
        console.log("hasta aca");
        

    return <div className="grilla-personajes">
        {   

            images.images?.map((image) => 
            <TarjetaPersonaje key={image.id} imagen={image.image} name={image.name}/>)
        }
    </div>
}

export default GrillaPersonajes;