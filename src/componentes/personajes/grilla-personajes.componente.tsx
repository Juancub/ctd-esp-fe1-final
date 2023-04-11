import { useEffect, useMemo } from 'react';
import './grilla-personajes.css';
import TarjetaPersonaje from './tarjeta-personaje.componente';
import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import { getData } from '../../redux/dataSlice';
import { useLocation } from 'react-router-dom';

/**
 * Grilla de personajes para la pagina de inicio
 * 
 * Deberás agregar las funciones necesarias para mostrar y paginar los personajes
 * 
 * 
 * @returns un JSX element 
 */

    interface CharactersProps {
            isFav: boolean;
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

const GrillaPersonajes = () => {

    const location = useLocation();
    const isHome = location.pathname === '/';

        //const [page, setPage] = useState(1)
    
        const dispatch = useAppDispatch()
        const images = useAppSelector(state => state.images)
        //const personajes = useAppSelector(state => state.images.personajes)
        // const claves = getData({
        //     page: images.GetDataArgs.page,
        //     name: images.GetDataArgs.name
        // })
        const apiCharacters = images.images;
        const charactersStorage = JSON.parse(localStorage.getItem("characters") || "[]");


        //console.log("personajes ",personajes);
        
        const charactersWithFav = apiCharacters.map((character) => {
            return { ...character, isFav: false };
          });
        
          console.log("personajes con la prop isFav",charactersWithFav);
          
        //dispatch(upDatePersonajes(charactersWithFav))

        // const personajes = useAppSelector(state => state.images.personajes)

        //   console.log("personajes con la prop isFav",personajes);
          

        useEffect(
            () => {
            dispatch(getData({
                page: images.GetDataArgs.page,
                name: images.GetDataArgs.name,
                id: images.GetDataArgs.id
            }))
            },
            [dispatch, images.GetDataArgs]
        )

        

        const charactersWithIsFav = useMemo(() => {

            if(apiCharacters !== undefined) {
                const newCharacters = apiCharacters.map((character) => ({
                ...character,
                isFav: false,
                }));
                
                for (const localCharacter of charactersStorage) {
                    const foundCharacter = newCharacters.find((character) => character.id === localCharacter.id);
                    if (foundCharacter) {
                        foundCharacter.isFav = localCharacter.isFav;
                    }
                }
                return newCharacters;
            }
            else return [];
            
            
        }, [apiCharacters, charactersStorage]);

        
        

        // useEffect(()=>{
        //     setDataStorage(JSON.parse(localStorage.getItem("characters") || "[]"))
        // },[charactersWithIsFav])

        console.log("Estamos en Home",isHome);
        
        //console.log("esto es lo que obtiene",images.images);
        //console.log("hasta aca");
        

    return <div className="grilla-personajes">
        {   
            isHome
            ?
            charactersWithIsFav?.map((character) => 
            <TarjetaPersonaje key={character.id} id={character.id} imagen={character.image} name={character.name} isFav={character.isFav}/>)
            :
            charactersStorage.map((character: CharactersProps) => 
            <TarjetaPersonaje key={character.id} id={character.id} imagen={character.image} name={character.name} isFav={character.isFav}/>)
        }
    </div>
}

export default GrillaPersonajes;