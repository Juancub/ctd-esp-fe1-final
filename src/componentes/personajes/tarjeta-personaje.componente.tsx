import BotonFavorito from '../botones/boton-favorito.componente';
import './tarjeta-personaje.css';
import { changeId, toggleFavorite } from '../../redux/dataSlice';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/hook';
import { useState } from 'react';

/**
 * Tarjeta para cada personaje dentro de la grilla de personajes. 
 * 
 * Deberás agregar las propiedades necesarias para mostrar los datos de los personajes
 * 
 * 
 * @returns un JSX element 
 */

    interface TarjetaPersonajeProps {
        imagen: string;
        name: string;
        id: number;
        isFav: boolean;
        // Esfavorito: boolean;
    }

    interface Character {
        id: number;
        name: string;
        image: string;
        isFav: boolean;
    }

const TarjetaPersonaje = ({imagen, name, id, isFav}:TarjetaPersonajeProps) => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    const [isFavorite, setIsFavorite] = useState(isFav)

    const handleClickImg = () => {
        //console.log(newId);
        dispatch(changeId(id))
        navigate(`/detalle`);
    }




    const handleClickFav = () => {
        dispatch(toggleFavorite(id))
        const newCharacter:Character = {
            id: id,
            name: name,
            image: imagen,
            isFav: !isFav
        };
    
        const charactersStorage = JSON.parse(localStorage.getItem("characters") || "[]");
        const indexToDelete = charactersStorage.findIndex((character: {id: number}) => character.id === id);

        if (indexToDelete !== -1) {
            charactersStorage.splice(indexToDelete, 1);
            localStorage.setItem("characters", JSON.stringify(charactersStorage));
        } else {
            const updatedCharacters = [...charactersStorage, newCharacter];
            localStorage.setItem("characters", JSON.stringify(updatedCharacters));
        }
        
        setIsFavorite(!isFavorite)
    }

    return <div className="tarjeta-personaje">
        <img onClick={handleClickImg} src={imagen} alt={name}/>
        <div className="tarjeta-personaje-body">
            <span>{name}</span>
            <BotonFavorito onClick={handleClickFav} esFavorito={isFavorite} />
            
        </div>
    </div>
}

export default TarjetaPersonaje;