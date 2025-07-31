import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import classes from './Repos.module.css'

interface Repo {
    id: number
    name: string
    html_url: string
    stargazers_count: number
    forks_count: number
}

export default function Repos() {
    const { username } = useParams()
    const [repos, setRepos] = useState<Repo[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        const loadRepos = async () => {
            try {
                const res = await fetch(
                    `https://api.github.com/users/${username}/repos?sort=stars&per_page=10`
                )

                if (!res.ok) throw new Error()

                const data = await res.json()
                setRepos(data)
            } catch (error) {
                setError(true)
            } finally {
                setLoading(false)
            }
        }

        loadRepos()
    }, [username])

    if (loading) return <div className={classes.loading}>Carregando repositórios...</div>
    if (error) return <div className={classes.error}>Erro ao carregar repositórios</div>

    return (
        <div className={classes.container}>
            <Link to="/" className={classes.backButton}>
                <FiArrowLeft /> Voltar
            </Link>

            <h2>Top repositórios de {username}</h2>

            <div className={classes.reposList}>
                {repos.map(repo => (
                    <div key={repo.id} className={classes.repoCard}>
                        <h3>
                            <a
                                href={repo.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {repo.name}
                            </a>
                        </h3>

                        <div className={classes.stats}>
                            <span>⭐ {repo.stargazers_count}</span>
                            <span>⑂ {repo.forks_count}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}