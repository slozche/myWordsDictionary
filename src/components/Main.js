import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components';
import DoneSrc from '../img/done_24.png';
import EditSrc from '../img/edit_24.png';
import DelSrc from '../img/delete_24.png';
import OnDoneSrc from '../img/done_on_24.png';
import OnEditSrc from '../img/edit_on_24.png';
import OnDelSrc from '../img/delete_on_24.png';
import AddSrc from '../img/add_40.png';
import { updateDictionary, deleteDictionaryFB, updateDictionaryFB } from '../redux/modules/dictionary'

const Main = () => {
    const words = useSelector((state) => state.dictionary.list)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const check = (e) => {
        const dictionary_index = e.target.parentElement.parentElement.id
        dispatch(updateDictionaryFB(dictionary_index))
    }
    const edit = (e) => {
        const index = e.target.parentElement.parentElement.id
        navigate(`/edit/${index}`)
    }
    const del = (e) => {
        const dictionary_index = e.target.parentElement.parentElement.id
        dispatch(deleteDictionaryFB(dictionary_index))
    }

    return (
            <ItemContainer>
                {words.map((item) => {
                    return (
                        <div className={item.check} key={item.id} id={item.id}>
                            <strong className='word'>{item.word}</strong>
                            <p className='meaning'>{item.meaning}</p>
                            <p className='example'>{item.example}</p>
                            <ul className='btnWrap'>
                                <button className='check' onClick={check}></button>
                                {/* <button className='edit' onClick={edit}></button> */}
                                <button className='del' onClick={del}></button>
                            </ul>
                        </div>
                    )
                })}
                <button className='create' onClick={() => {navigate('/create')}}></button>
            </ItemContainer>
    );
};

const ItemContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    div {
        width: 25vw;
        min-width: 400px;
        height: 180px;
        border: 1px solid grey;
        padding: 20px;
        border-radius: 5px;
        margin: 10px;
        position: relative;
    }
    div > .word {
        display: block;
        margin-top: 20px;
        font-size: 24px;
    }
    div > .meaning {
        margin-top: 24px;
        font-size: 20px;
    }
    div > .example {
        margin-top: 24px;
        font-size: 20px;
        color: blue;
    }
    div > .btnWrap {
        position: absolute;
        top: 0px;
        right: 20px;
    }
    div > .btnWrap >.check {
        background: url(${DoneSrc}) no-repeat;
        width: 24px;
        height: 24px;
        padding: 6px;
        border: none;
        margin: 4px;
        cursor: pointer;
    }
    div > .btnWrap >.edit {
        background: url(${EditSrc}) no-repeat;
        width: 24px;
        height: 24px;
        padding: 6px;
        border: none;
        margin: 4px;
        cursor: pointer;
    }
    div > .btnWrap >.del {
        background: url(${DelSrc}) no-repeat;
        width: 24px;
        height: 24px;
        padding: 6px;
        border: none;
        margin: 4px;
        cursor: pointer;
    }
    
    .create {
        width: 44px;
        height: 44px;
        border: 1px solid #bdbdbd;
        border-radius: 24px;
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: url(${AddSrc}) no-repeat;
        cursor: pointer;       
    }

    .on {
        background-color: green;
        color: white;

        .example {
            color: lightgrey;
        }

        .btnWrap > .check {
            background: url(${OnDoneSrc}) no-repeat;
        }
        .btnWrap > .edit {
            background: url(${OnEditSrc}) no-repeat;
        }
        .btnWrap > .del {
            background: url(${OnDelSrc}) no-repeat;
        }
    }
`

export default Main;