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
    currentPage: number;
}


export const getData = createAsyncThunk(
    'data/images',
    async (page: number) => {
        const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
        const parseResponse = await response.json();
        return parseResponse
    }
)

const initialState: initialType = {
    images : [],
    loading: false,
    currentPage: 1
}

const dataSlice = createSlice({
    name: 'images',
    initialState,
    reducers: {
        incrementPage(state) {
            return {
                ...state,
                currentPage: state.currentPage + 1,
            };
        },
        decrementPage(state) {
            return {
                ...state,
                currentPage: state.currentPage - 1,
            };
        }
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

export const {incrementPage, decrementPage} = dataSlice.actions
export default dataSlice.reducer