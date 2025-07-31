import { useState, KeyboardEvent } from 'react';
import { BsSearch } from 'react-icons/bs';
import classes from './Search.module.css';

type SearchProps = {
    loadUser: (userName: string) => Promise<void>;
    loading: boolean;
};

export default function Search({ loadUser, loading }: SearchProps) {
    const [userName, setUserName] = useState("");

    function handleKeyDown(e: KeyboardEvent) {
        if (e.key === 'Enter' && !loading) {
            loadUser(userName);
        }
    }

    return (
        <div className={classes.search}>
            <h2>Busque por um usuário:</h2>
            <p>Conheça seus melhores repositórios</p>
            
            <div className={classes.search_container}>
                <input
                    type="text"
                    placeholder="Digite o nome do usuário"
                    onChange={(e) => setUserName(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={loading}
                />
                <button 
                    onClick={() => loadUser(userName)} 
                    disabled={loading || !userName}
                >
                    <BsSearch />
                </button>
            </div>
        </div>
    );
}