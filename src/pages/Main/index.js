import React, { useState } from 'react';

import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Container, Form, SubmitButton } from './styles';
import api from '../../services/api';

export default function Main() {
    const [newRepo, setNewRepo] = useState('');
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(false);

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

        setRepos(...repos, data);
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
        </Container>
    );
}
