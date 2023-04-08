import BotonFavorito from '../botones/boton-favorito.componente';
import './tarjeta-personaje.css';

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
        // Esfavorito: boolean;
    }

const TarjetaPersonaje = ({imagen, name}:TarjetaPersonajeProps) => {

    return <div className="tarjeta-personaje">
        <img src={imagen} alt={name}/>
        <div className="tarjeta-personaje-body">
            <span>{name}</span>
            <BotonFavorito esFavorito={false} />
        </div>
    </div>
}

export default TarjetaPersonaje;