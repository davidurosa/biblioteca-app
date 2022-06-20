import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Card } from "react-bootstrap";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      

<Card bg="success" style={{ height: '12rem' }} text="light">
  <Card.Img  height="100rem" variant="top" src={user.picture} alt={user.name} />
  <Card.Body>
    <Card.Title><p>{user.name}</p></Card.Title>
    <Card.Text>
    {user.email}
    </Card.Text>
  </Card.Body>
</Card>
      
    )
  );
};

export default Profile;