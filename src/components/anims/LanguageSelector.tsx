import React from 'react';
import TestingMenuAnim from './TestingMenuAnim';
import brIcon from '../../assets/br.png';
import usIcon from '../../assets/us.png';
import './LanguageSelector.css'

interface Props { }

interface State {
    isLoading: boolean;
}

class LanguageSelector extends React.Component<Props, State> {
    state: State = {
        isLoading: false,
    };

    translateContent = async (language: string) => {
        if (language === 'en') {
            this.setState({ isLoading: true });
            const htmlContent = document.documentElement.innerHTML;
            console.log("Sending request to API with HTML content.");
            try {
                const response = await fetch('https://translaterum-production.up.railway.app/api/translate', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ html: htmlContent }),
                });
                if (!response.ok) {
                    console.error('Response not OK:', response.status);
                    throw new Error('Falha na tradução!');
                }
                const data = await response.json();
                console.log("Response received:", data);
                document.documentElement.innerHTML = data.translated_html;
            } catch (error) {
                console.error('Erro ao traduzir:', error);
            }
            this.setState({ isLoading: false });
        } else {
            window.location.reload();
        }
    };

    render() {
        const { isLoading } = this.state;
        return (
            <>
                {isLoading && <TestingMenuAnim />}
                <div className='LanguageSelector'>
                    <img src={usIcon} alt="Translate to English" onClick={() => this.translateContent('en')} />
                    <img src={brIcon} alt="Translate to Portuguese" onClick={() => this.translateContent('br')} />
                </div>
            </>
        );
    }
}

export default LanguageSelector;