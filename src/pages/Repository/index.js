import React, { useState, useEffect } from 'react';
import api from '../../services/api';

export default function Repository({ match }) {
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

    return (
        <>
            <h1>Repository: {match.params.repository}</h1>;
        </>
    );
}
