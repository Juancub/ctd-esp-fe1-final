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
    character:CharacterApiResponse;
    loading: boolean;
    texto: string;
    idApi: number;
    characterStorage: [{
        id: number;
        name: string;
        image: string;
        isFav: boolean;
    }]
    GetDataArgs: {
        page: number;
        name: string;
        id: number;
    }
}

interface GetDataArgs {
    claves: {
    page: number;
    name: string;
    id: number;
    }
}

export const getData = createAsyncThunk(
    'data/images',
    async ({page, name, id}:GetDataArgs["claves"]) => {
    //async (page : number) => {
        //const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
        const response1 = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}&name=${name}`);
        const response2 = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
        const parseResponse1 = await response1.json();
        const parseResponse2 = await response2.json();
        //console.log("este es la respuesta",parseResponse);
        return {
            data1: parseResponse1,
            data2: parseResponse2,
        }
    }
)

const initialState: initialType = {
    images : [],
    character: {
        id: 0,
        name: "",
        status: "",
        species: "",
        type: "",
        gender: "",
        origin: {
            name: "",
            url: "",
        },
        location: {
            name: "",
            url: "",
        },
        image: "",
        episode: [],
        url: "",
        created: "",
    },
    loading: false,
    texto: "",
    idApi: 0,
    characterStorage: [{
        id: 0,
        name: "",
        image: "",
        isFav: false
    }],
    GetDataArgs: {
        page: 1,
        name: '',
        id: 1,
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
        changeId(state, action) {
            return {
               ...state,
               idApi: action.payload
            };
        },
    },
    extraReducers:
    (builder) => {
        builder.addCase(getData.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getData.fulfilled, (state, action) => {
            state.images = action.payload.data1.results
            state.character = action.payload.data2
            state.loading = false
        })
    }
})

export const {incrementPage, decrementPage, changeName, resetPage, changeText, resetText, changeId} = dataSlice.actions
export default dataSlice.reducer