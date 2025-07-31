import { useState } from "react";
import { UserProps } from "../types/user";
import Search from "../components/Search";
import User from '../components/User';
import Error from '../components/Error';
import classes from './Home.module.css';

export default function Home() {
    const [user, setUser] = useState<UserProps | null>(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const loadUser = async(userName: string) => {
        if (!userName) return;
        
        setLoading(true);
        setError(false);
        setUser(null);
        
        try {
            const res = await fetch(`https://api.github.com/users/${userName}`);
            
            // if (!res.ok) throw new Error();
            
            const { avatar_url, login, location, followers, following } = await res.json();
            
            setUser({
                avatar_url,
                login,
                location,
                followers,
                following,
            });
        } catch (error) {
            setError(true);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={classes.container}>
            <Search loadUser={loadUser} loading={loading} />
            {loading && <div className={classes.loader}>Carregando...</div>}
            {user && <User {...user} />}
            {error && <Error />}
        </div>
    );
}