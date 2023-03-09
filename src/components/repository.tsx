import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getRepository } from "../api/github";

interface IRepository {
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
  html_url: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  owner: {
    avatar_url: string;
  };
}

const Repository = () => {
  const { owner, name } = useParams();
  const [repository, setRepository] = useState<IRepository | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepository = async () => {
      try {
        const repository = await getRepository(owner, name);
        setRepository(repository);
      } catch (error: any) {
        setError(error.response.data.message);
      }
    };
    fetchRepository();
  }, [owner, name]);

  if (!repository && !error) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1>Hell</h1>
    </>
  );

  // return (
  //   <>
  //     {error && (
  //      <Modal
  //      show={true}
  //      onHide={() => setError(null)}
  //      centered
  //    >
  //      <Modal.Header closeButton>
  //        <Modal.Title style={{ color: "blue" }}>Error</Modal.Title>
  //      </Modal.Header>
  //      <Modal.Body style={{ color: "red", textAlign: "center" }}>
  //        {error}
  //      </Modal.Body>
  //      <Modal.Footer>
  //        <Button variant="secondary" onClick={() => {
  //         return setError(null);
  //        }}>
  //          Close
  //        </Button>
  //      </Modal.Footer>
  //    </Modal>
  //     )}
  //     {repository && (
  //     <Container>
  //       <Row>
  //         <Col md={3}>
  //           <Image src={repository.owner.avatar_url} thumbnail />
  //         </Col>
  //         <Col md={9}>
  //           <h1>{repository.name}</h1>
  //           <p>{repository.description}</p>
  //           <p>Created at: {repository.created_at}</p>
  //           <p>Updated at: {repository.updated_at}</p>
  //           <p>
  //             <a href={repository.html_url}>View on GitHub</a>
  //           </p>
  //           <ListGroup>
  //             <ListGroup.Item>
  //               <strong>Language:</strong> {repository.language}
  //             </ListGroup.Item>
  //             <ListGroup.Item>
  //               <strong>Stars:</strong> {repository.stargazers_count}
  //             </ListGroup.Item>
  //             <ListGroup.Item>
  //               <strong>Forks:</strong> {repository.forks_count}
  //             </ListGroup.Item>
  //             <ListGroup.Item>
  //               <strong>Watchers:</strong> {repository.watchers_count}
  //             </ListGroup.Item>
  //           </ListGroup>
  //         </Col>
  //       </Row>
  //     </Container>
  //     )}
  //   </>
  // );
};

export default Repository;
