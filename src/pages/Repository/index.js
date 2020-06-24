import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import Container from '../../components/Container';
import { Loading, Owner } from './styles';

export default function Repository({ match }) {
    Repository.propTypes = {
        match: PropTypes.shape({
            params: PropTypes.shape({
                repository: PropTypes.string,
            }),
        }).isRequired,
    };

    const [repository, setRepository] = useState({});
    const [issues, setIssue] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(async () => {
        const repoName = decodeURIComponent(match.params.repository);

        const [repository, issues] = await Promise.all([
            api.get(`/repos/${repoName}`),
            api.get(`/repos/${repoName}/issues`, {
                params: {
                    state: 'open',
                    per_page: 5,
                },
            }),
        ]);
        setRepository(repository.data);
        setIssue(issues.data);
        setLoading(false);
    }, []);

    if (loading) {
        return <Loading>Carregando</Loading>;
    }

    return (
        <>
            <Container>
                <Owner>
                    <Link to="/">Voltar aos repositórios</Link>
                    <img
                        src={repository.owner.avatar_url}
                        alt={repository.owner.login}
                    />
                    <h1>{repository.name}</h1>
                    <p>{repository.description}</p>
                </Owner>
            </Container>
            ;
        </>
    );
}
