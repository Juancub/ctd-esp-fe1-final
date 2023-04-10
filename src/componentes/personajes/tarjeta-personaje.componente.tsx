import { useEffect, useState } from 'react';
import BotonFavorito from '../botones/boton-favorito.componente';
import './tarjeta-personaje.css';
import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import { changeId } from '../../redux/dataSlice';
import { useNavigate } from 'react-router-dom';

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

    //const idApi = useAppSelector((state) => state.images.idApi)
    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    const [isFavorite, setIsFavorite] = useState(isFav)

    //const newId = useAppSelector((state) => state.images.idApi)

    const handleClickImg = () => {
        //console.log(newId);
        
        dispatch(changeId(id))
        navigate(`/detalle`);
    }




    const handleClickFav = () => {

        const newCharacter:Character = {
            id: id,
            name: name,
            image: imagen,
            isFav: !isFav
        };
    
        const charactersStorage = JSON.parse(localStorage.getItem("characters") || "[]");
        //charactersStorage.splice(charactersStorage.indexOf(charactersStorage.find(data => data.id === id)))
        //console.log(charactersStorage.indexOf(charactersStorage.find((data: {id: number}) => data.id === id)))
        //console.log(charactersStorage.find((data: {id: number}) => data.id === id));
        //console.log('nombre',charactersStorage.indexOf(charactersStorage[0].name,"id",charactersStorage[0].id));
        const indexToDelete = charactersStorage.findIndex((character: {id: number}) => character.id === id);

        if (indexToDelete !== -1) {
            charactersStorage.splice(indexToDelete, 1);
            localStorage.setItem("characters", JSON.stringify(charactersStorage));
            //console.log("encontro el mismo id",charactersStorage);
        } else {
            const updatedCharacters = [...charactersStorage, newCharacter];
            localStorage.setItem("characters", JSON.stringify(updatedCharacters));
        }
        
        
        
        setIsFavorite(!isFavorite)
    //     setCharacter({
    //         ...character,
    //         id: character.id,
    //         name: character.name,
    //         image: character.image,
    //         isFav: character.isFav
    //     });
        
        //setFav(!isFav);
        // const newCharacter = {
        //     name: character.name,
        //     id: character.id,
        //     image: character.image,
        //     isFav:!character.isFav
        // }

        // dispatch(upDateCharacter(character))
        // console.log('click fav with id',id);
        //console.log('este es el objeto traido')
        // const characterId: Object | undefined = images.images.find(character => character.id === id)
        // characterId?characterId.isFav = isFav
        //setCharacter({...character, newCharacter})
        // console.log('este es el objeto traido',newCharacter)
        //localStorage.setItem("personaje", JSON.stringify(newCharacter))
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