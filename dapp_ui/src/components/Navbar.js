import Nav from 'react-bootstrap/Nav';
import '../components/Navbar.css';
function Navbar() {
    return (
        <>
            <Nav defaultActiveKey="/" className="flex-column">
                <Nav.Link href="/" className="modify">Patient Data DApp</Nav.Link>
                <Nav.Link eventKey="link-1" className="modify">Profile</Nav.Link>
                <Nav.Link eventKey="link-2">Medical history</Nav.Link>
                <Nav.Link eventKey="link-3">Insurance claim</Nav.Link>
            </Nav>
        </>
    )
}

export default Navbar