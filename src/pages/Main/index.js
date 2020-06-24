import React, { useEffect, useState } from 'react';

import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Container from '../../components/Container';
import { Form, SubmitButton, List } from './styles';
import api from '../../services/api';

export default function Main() {
    const [newRepo, setNewRepo] = useState('');
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(false);

    // Carregar dados do local storage
    useEffect(() => {
        const storageRepos = localStorage.getItem('repos');

        if (storageRepos) {
            setRepos(JSON.parse(storageRepos));
        }
    }, []);

    // Salvar dados do local storage
    useEffect(() => {
        localStorage.setItem('repos', JSON.stringify(repos));
    }, [repos]);

    function handleInputChange(event) {
        setNewRepo(event.target.value);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setLoading(true);
        const response = await api.get(`/repos/${newRepo}`);

        const data = {
            name: response.data.full_name,
        };

        setRepos([...repos, data]);
        setNewRepo('');
        setLoading(false);
    }

    return (
        <Container>
            <h1>
                <FaGithubAlt />
                Repositórios
            </h1>
            <Form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Adicionar Repositório"
                    value={newRepo}
                    onChange={handleInputChange}
                />
                <SubmitButton loading={loading}>
                    {loading ? (
                        <FaSpinner color="#FFF" size={14} />
                    ) : (
                        <FaPlus color="FFF" size={14} />
                    )}
                </SubmitButton>
            </Form>

            <List>
                {repos.map((repo) => (
                    <li key={repo.name}>
                        <span>{repo.name}</span>
                        <Link
                            to={`/repository/${encodeURIComponent(repo.name)}`}
                        >
                            Detalhes
                        </Link>
                    </li>
                ))}
            </List>
        </Container>
    );
}
