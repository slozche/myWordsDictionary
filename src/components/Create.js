import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { createDictionary, addDictionaryFB } from '../redux/modules/dictionary'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';


const Create = () => {
    const word = React.useRef(null)
    const meaning = React.useRef(null)
    const example = React.useRef(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const addDictionary = () => {
        if (word.current.value != '' && meaning.current.value != '' && example.current.value != '') {
            dispatch(addDictionaryFB({
                word : word.current.value,
                meaning : meaning.current.value,
                example : example.current.value
          }))
          navigate(`/`)
        } else {
            alert('값을 입력해주세요')
        }
    }

    return (
        <ItemContainer>
            <input id="word" ref={word} placeholder='단어'></input>
            <input id="meaning" ref={meaning} placeholder='의미'/>
            <input id="example" ref={example} placeholder='예문'/>
            <button onClick={addDictionary}>입력</button>
        </ItemContainer>
    );
};

const ItemContainer = styled.div`
    height: 600px;
    display:flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    input {
        width: 400px;
        height: 44px;
        padding-left: 20px;
        border: 1px solid grey;
        margin-top: 24px;
    }

    button {
        width: 420px;
        height: 44px;
        border: none;
        margin-top: 40px;
        background-color: violet;
        font-size: 20px;
        font-weight: 700;
        color: white;
    }
`

export default Create;