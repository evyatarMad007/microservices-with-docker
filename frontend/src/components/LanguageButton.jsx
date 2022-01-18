import React, { useState } from 'react'

const LanguageButton = ({checkLanguage}) => {


    const [optionList, setOptionList] = useState(false)
    const [language, setLanguage] = useState(localStorage.getItem('Language') || 'en')


    const setLanguageHandler = lang => {
        setLanguage(lang)
        checkLanguage(lang)
        localStorage.setItem('Language', lang)
        
    }

    
    return (
        <div className="lang-btn-wrapper">
            <div className="lang-btn"  onMouseLeave={ () => setOptionList(false) }>
                <div className='lang-btn__select-box' onClick={ () => setOptionList(!optionList) }>
                <span className="lang-btn__current-language">{language === 'en' ? 'En' : 'עב'}</span>
                </div>

                <ul className={`lang-btn__options-list ${optionList && 'lang-btn__options-list-on'}`}>
                    <li className="lang-btn__option"  
                        onClick={ () => {
                            setOptionList(false) 
                            setLanguageHandler('en')
                        } }
                    >En
                    </li>

                    <li className="lang-btn__option"  
                        onClick={ () => {
                            setOptionList(false) 
                            setLanguageHandler('he')
                        }}
                    >עב
                    </li>
                    
                </ul>
            </div>
        </div>
    )
}

export default LanguageButton
