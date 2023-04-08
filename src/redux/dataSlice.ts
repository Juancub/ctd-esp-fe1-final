import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

interface CharacterApiResponse {
    // info: {
    //     count: number;
    //     pages: number;
    //     next: string | null;
    //     prev: string | null;
    // };
    // results: {
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
    // }
}

interface initialType {
    images:CharacterApiResponse[];
    loading: boolean;
    texto: string;
    GetDataArgs: {
        page: number;
        name: string;
    }
}

interface GetDataArgs {
    claves: {
    page: number;
    name: string;
    }
}


export const getData = createAsyncThunk(
    'data/images',
    async ({page, name}:GetDataArgs["claves"]) => {
    //async (page : number) => {
        //const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
        const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}&name=${name}`)
        const parseResponse = await response.json();
        //console.log("este es la respuesta",parseResponse);
        return parseResponse
    }
)

const initialState: initialType = {
    images : [],
    loading: false,
    texto: "",
    GetDataArgs: {
        page: 1,
        name: ''
    }
}

const dataSlice = createSlice({
    name: 'images',
    initialState,
    reducers: {
        incrementPage(state) {
            return {
                ...state,
                GetDataArgs: {
                  ...state.GetDataArgs,
                    page: state.GetDataArgs.page + 1
                }
            };
        },
        decrementPage(state) {
            return {
                ...state,
                GetDataArgs: {
                    ...state.GetDataArgs,
                      page: state.GetDataArgs.page - 1
                }
            };
        },
        resetPage(state) {
            return {
                ...state,
                GetDataArgs: {
                    ...state.GetDataArgs,
                      page: 1
                }
            };
        },
        changeName(state, action) {
            return {
               ...state,
                GetDataArgs: {
                    ...state.GetDataArgs,
                    name: action.payload
                }
            };
        },
        changeText(state, action) {
            return {
               ...state,
                texto: action.payload
            };
        },
        resetText(state) {
            return {
               ...state,
                texto: ""
            };
        },
    },
    extraReducers:
    (builder) => {
        builder.addCase(getData.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getData.fulfilled, (state, action) => {
            state.images = action.payload.results
            state.loading = false
        })
    }
})

export const {incrementPage, decrementPage, changeName, resetPage, changeText, resetText} = dataSlice.actions
export default dataSlice.reducer