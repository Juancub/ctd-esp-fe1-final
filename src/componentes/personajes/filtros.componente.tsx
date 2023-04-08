import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import { changeName, changeText, resetPage } from '../../redux/dataSlice';

import { getData } from '../../redux/dataSlice';
import './filtros.css';

//const Filtros: React.FC = () => {
const Filtros = () => {

    const [text, setText] = useState("");

    const dispatch = useAppDispatch()

    const texto = useAppSelector((state) => state.images.texto)
    //const [texto, setTexto] = useState("");
        // const claves = getData({
        //     page: images.GetDataArgs.page,
        //     name: images.GetDataArgs.name
        // })
    

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(text);
        setText(e.target.value);
        dispatch(changeName(e.target.value))
        dispatch(changeText(e.target.value))
        dispatch(resetPage())

    }

    return <div className="filtros">
        <label htmlFor="nombre">Filtrar por nombre:</label>
        <input onChange={handleChange} type="text" placeholder="Rick, Morty, Beth, Alien, ...etc" value={texto} name="nombre" />
    </div>
}

export default Filtros;