//import { useEffect, useState } from 'react';
import Filtros from "../componentes/personajes/filtros.componente"
import GrillaPersonajes from "../componentes/personajes/grilla-personajes.componente"
import Paginacion from "../componentes/paginacion/paginacion.componente";
// import { useAppDispatch, useAppSelector } from '../hooks/hook';
// import { getData } from '../redux/dataSlice';

/**
 * Esta es la pagina principal. Aquí se debera ver el panel de filtros junto con la grilla de personajes.
 * 
 * Uso: 
 * ``` <PaginaInicio /> ```
 * 
 * @returns la pagina de inicio
 */

const PaginaInicio = () => {

//     const [page, setPage] = useState()

//     const dispatch = useAppDispatch()
//     const images = useAppSelector(state => state)

//     useEffect(
//         () => {
//         dispatch(getData(1))
//         },
//         [dispatch]
//     )


    return <div className="container">
        <div className="actions">
            <h3>Catálogo de Personajes</h3>
            <button className="danger">Test Button</button>
        </div>
        <Filtros />
        <Paginacion />
        <GrillaPersonajes />
        <Paginacion />
    </div>
}

export default PaginaInicio