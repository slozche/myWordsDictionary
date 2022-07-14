import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { createDictionary, editDictionary } from '../redux/modules/dictionary'

const Edit = () => {
    const words = useSelector((state) => state.dictionary.list)

    const word = React.useRef(null)
    const meaning = React.useRef(null)
    const example = React.useRef(null)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const index = useParams().index

    // const changeHandler = (e) => {
    //     e.target.value = e.target.value
    // }
    const editDictionary = () => {
        dispatch(editDictionary({
                    word : word.current.value,
                    meaning : meaning.current.value,
                    example : example.current.value,
                    index : index
              }))
        navigate(-1)
    }

    return (
        <div>
            <label htmlFor="word">이름</label>
            <input id="word" ref={word} placeholder={words[index].word}></input>
            <label htmlFor="meaning">의미</label>
            <input id="meaning" ref={meaning} placeholder={words[index].meaning}/>
            <label htmlFor="example">예문</label>
            <input id="example" ref={example} placeholder={words[index].example}/>
            <button onClick={editDictionary}>입력</button>
        </div>
    );
};

export default Edit;