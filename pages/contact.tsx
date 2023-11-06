import React, { useState } from 'react';
import Navbar from "../components/navbar";
import { TextField, Button, Container, Box, Typography } from '@mui/material';

export default function Contact() {
    const [emailData, setEmailData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (e) => {
        setEmailData({
            ...emailData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Here you would send a POST request to your API endpoint
        // This endpoint would be responsible for sending the email
        try {
            const res = await fetch('/api/sendEmail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(emailData),
            });

            const data = await res.json();
            if (data.success) {
                // Handle success - maybe clear the form or show a success message
            } else {
                // Handle error - show an error message
            }
        } catch (error) {
            console.error("Failed to send email", error);
        }
    };

    return (
        <>
            <Navbar />
            <Container maxWidth="sm">
                <Box my={4}>
                    <Typography variant="h4" component="h1" gutterBottom   style={{color:"white"}}>
                        Kapcsolat
                    </Typography>
                    <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                        <TextField
                            label="Name"
                            name="name"
                            fullWidth
                            margin="normal"
                            value={emailData.name}
                            onChange={handleChange}
                            style={{backgroundColor:"white"}}
                        />
                        <TextField
                            label="Email"
                            name="email"
                            fullWidth
                            margin="normal"
                            value={emailData.email}
                            onChange={handleChange}
                            style={{backgroundColor:"white"}}
                        />
                        <TextField
                            label="Message"
                            name="message"
                            fullWidth
                            margin="normal"
                            multiline
                            rows={4}
                            value={emailData.message}
                            onChange={handleChange}
                            style={{backgroundColor:"white"}}
                        />
                        <Button variant="contained" color="primary" type="submit">
                            Send
                        </Button>
                    </form>
                </Box>
            </Container>
        </>
    );
}
