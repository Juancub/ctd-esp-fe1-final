import { useEffect, useState } from 'react';
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
    
        useEffect(
            () => {
            dispatch(getData(images.currentPage))
            },
            [dispatch, images.currentPage]
        )

        //console.log(images.page);
        

    return <div className="grilla-personajes">
        {
            images.images.map((image) => 
            <TarjetaPersonaje key={image.id} imagen={image.image} name={image.name}/>)
        }
    </div>
}

export default GrillaPersonajes;