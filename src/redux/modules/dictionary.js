// dictionary.js
import { db } from '../../firebase'
import { collection, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc } from "firebase/firestore"; 
import { useNavigate } from 'react-router-dom';

// Actions
const LOAD   = 'dictionary/LOAD';
const CREATE = 'dictionary/CREATE';
const UPDATE = 'dictionary/UPDATE';
const DELETE = 'dictionary/DELETE';
const EDIT = 'dictionary/EDIT';


const initialState = {
    list : [
        { word : 'predict',
          meaning : '예측[예견]하다',
          example : 'a reliable method of predicting earthquakes ',
          check: 'off'
        },
        { word : 'predict',
          meaning : '예측[예견]하다',
          example : 'a reliable method of predicting earthquakes ',
          check: 'off'
        },
        { word : 'predict',
          meaning : '예측[예견]하다',
          example : 'a reliable method of predicting earthquakes ',
          check: 'off'
        },
        { word : 'predict',
          meaning : '예측[예견]하다',
          example : 'a reliable method of predicting earthquakes ',
          check: 'off'
        },
        { word : 'predict',
          meaning : '예측[예견]하다',
          example : 'a reliable method of predicting earthquakes ',
          check: 'off'
        }
      ]
}


// Action Creators
export function loadDictionary(dictionary_list) {
  return { type: LOAD, dictionary_list };
}

export function createDictionary(word) {
  return { type: CREATE, word };
}

export function updateDictionary(dictionary_index) {
  return { type: UPDATE, dictionary_index };
}

export function deleteDictionary(dictionary_index) {
  return { type: DELETE, dictionary_index };
}

export function editDictionary(word) {
    return { type: EDIT, word };
  }

// Middlewares
export const loadDictionaryFB = () => {
  return async function (dispatch) {
    const dictionary_data = await getDocs(collection(db, 'dictionary'));
    
    let dictionary_list  = [];

    dictionary_data.forEach((item) => {
      dictionary_list.push({ id: item.id, ...item.data() });
    });

    dispatch(loadDictionary(dictionary_list));
  }
}
export const addDictionaryFB = (voca) => {
  return async function (dispatch) {
    const docRef = await addDoc(collection(db, 'dictionary'), voca)
    const voca_data = {id: docRef.id, ...voca}
    
    dispatch(createDictionary(voca_data))
  }
}
export const updateDictionaryFB = (dictionary_index) => {
  return async function (dispatch) {
    const docRef = doc(db, 'dictionary', dictionary_index)
    if ((await getDoc(docRef)).data().check == 'off') {
      await updateDoc(docRef, {'check': 'on'})
    } else {
      await updateDoc(docRef, {'check': 'off'})
    }
    
    dispatch(updateDictionary(dictionary_index))
  }
}
export const deleteDictionaryFB = (dictionary_index) => {
  return async function (dispatch, getState) {
    if (!dictionary_index) {
      window.alert('아이디가 없네요')
      return
    }

    const docRef = doc(db, 'dictionary', dictionary_index)
    await deleteDoc(docRef)

    dispatch(deleteDictionary(dictionary_index))
  }
}


// Reducer
export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case 'dictionary/LOAD': {
            return {list : action.dictionary_list}
        } 
        case 'dictionary/CREATE': {
            const new_dictionary = [...state.list, action.word] 
            return {list : new_dictionary}
        }
        case 'dictionary/UPDATE': {
            const new_dictionary = state.list.map((item) => {
                if (item.id == action.dictionary_index) {
                    if (item.check == 'off') {item.check = 'on'} else {item.check = 'off'}
                }
                return item
            })
            return {list: new_dictionary};
        }    
        case 'dictionary/DELETE': {
            const new_dictionary = state.list.filter((item) => {
              return action.dictionary_index !== item.id;
            })
            return {list: new_dictionary};
        }
        case 'dictionary/EDIT': {
            console.log(action.word.index)
            const new_dictionary = state.list.map((item, idx) => {
                if (idx == action.word.index) {
                    item.word = action.word.word
                    item.meaning = action.word.meaning
                    item.example = action.word.example
                }
                return item
            })
            return {list: new_dictionary};
        }    
        default: return state;
    }
  }