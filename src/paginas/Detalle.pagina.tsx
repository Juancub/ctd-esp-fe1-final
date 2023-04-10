import "./Detalle.css";
import BotonFavorito from "../componentes/botones/boton-favorito.componente";
import TarjetaEpisodio from "../componentes/episodios/tarjeta-episodio.componente";
import { useAppDispatch, useAppSelector } from "../hooks/hook";
import { useEffect, useMemo } from "react";
import { getData } from "../redux/dataSlice";

/**
 * Esta es la pagina de detalle. Aqui se puede mostrar la vista sobre el personaje seleccionado junto con la lista de episodios en los que aparece
 * 
 * EL TRABAJO SOBRE ESTE ARCHIVO ES OPCIONAL Y NO ES REQUISITO DE APROBACION
 * 
 * 
 * 
 * Uso: 
 * ``` <PaginaDetalle /> ```
 * 
 * @returns la pagina de detalle
 */

interface CharacterApiResponse {
        id: number;
        name: string;
        status: string;
        species: string;
        type: string;
        gender: string;
        origin: {
            name: string;
            url: string;
        };
        location: {
            name: string;
            url: string;
        };
        image: string;
        episode: string[];
        url: string;
        created: string;
}

interface CharacterStorage {
    id: number;
    isFav: boolean;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: {
        name: string;
        url: string;
    };
    location: {
        name: string;
        url: string;
    };
    image: string;
    episode: string[];
    url: string;
    created: string;
}

const PaginaDetalle = () => {

    const dispatch = useAppDispatch()
    const images = useAppSelector(state => state.images)
    const charactersStorage : CharacterStorage[] = JSON.parse(localStorage.getItem("characters") || "[]");
    const newId = useAppSelector((state) => state.images.idApi)
    const apiCharacter: CharacterApiResponse  = images.character;

    useEffect(
        () => {
        dispatch(getData({
            page: images.GetDataArgs.page,
            name: images.GetDataArgs.name,
            id: newId
        }))
        },
        [dispatch, images.GetDataArgs, newId]
    )

    const charactersWithIsFav = useMemo(() => {

        if(apiCharacter !== undefined && charactersStorage.length > 0) {
            console.log(apiCharacter);
            
            const newCharacters: CharacterStorage = {
            ...apiCharacter,
            isFav: false,
            };

            const index = charactersStorage.findIndex((obj: CharacterStorage) => obj.id === apiCharacter.id);
            
            // for (const localCharacter of charactersStorage) {
            //     const foundCharacter = newCharacters.find((character) => character.id === localCharacter.id);
            //     if (foundCharacter) {
            //         foundCharacter.isFav = localCharacter.isFav;
            //     }
            // }

            if (index !== -1) {
                newCharacters.isFav = charactersStorage[index].isFav;
            }

            return newCharacters;
        }
        else return null;
        
        
    }, [apiCharacter, charactersStorage]);

    //console.log("localStorage ",charactersStorage);
    //console.log("personaje de la api ",apiCharacter);

    console.log("este personaje es favorito",charactersWithIsFav);
    

    return <div className="container">
        {
            charactersWithIsFav?
            <>
                <h3>{charactersWithIsFav.name}</h3>
                    <div className={"detalle"}>
                        <div className={"detalle-header"}>
                            <img src={charactersWithIsFav.image} alt={charactersWithIsFav.name}/>
                            <div className={"detalle-header-texto"}>
                            
                                <p>{charactersWithIsFav.name}</p>
                                <p>Planeta: {charactersWithIsFav.location.name}</p>
                                <p>Genero: {charactersWithIsFav.gender}</p>
                            </div>
                            <BotonFavorito esFavorito={charactersWithIsFav.isFav} />
                        </div>
                    </div>
                    <h4>Lista de episodios donde apareció el personaje</h4>
                    <div className={"episodios-grilla"}>
                        <TarjetaEpisodio />
                        <TarjetaEpisodio />
                        <TarjetaEpisodio />
                    </div>
            </>
            :
            <>
                <h3>{apiCharacter.name}</h3>
                    <div className={"detalle"}>
                        <div className={"detalle-header"}>
                            <img src={apiCharacter.image} alt={apiCharacter.name}/>
                            <div className={"detalle-header-texto"}>
                            
                                <p>{apiCharacter.name}</p>
                                <p>Planeta: {apiCharacter.location.name}</p>
                                <p>Genero: {apiCharacter.gender}</p>
                            </div>
                            <BotonFavorito esFavorito={false} />
                        </div>
                    </div>
                    <h4>Lista de episodios donde apareció el personaje</h4>
                    <div className={"episodios-grilla"}>
                        <TarjetaEpisodio />
                        <TarjetaEpisodio />
                        <TarjetaEpisodio />
                    </div>
            </>
        }
    </div>
}

export default PaginaDetalle