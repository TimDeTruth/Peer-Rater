import React, { useEffect, useState } from 'react';
import Group from './Group';
import logo from '../img/peerrater.png';
import { CardMedia, Typography } from '@mui/material';


const GroupPage = () => {
    const [peerGroups, setNewPeerGroups] = useState('')
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        var bearer = 'Bearer ' + user.access_token;
        const fetchData = async () => {
            const result = await fetch(`https://praterlaravel.azurewebsites.net/api/peer-groups/`, {
                method: 'get',
                headers: {
                    'Authorization': bearer,
                    'Content-Type': 'application/json'
                }
            });
            const body = await result.json();
            setNewPeerGroups(body);
        }
        fetchData();
    }, []);
    let group_list = Object.values(peerGroups)
    return (<>
        <div className="row">
            <CardMedia
                component="img"
                height="300"
                image={logo}
                alt="peer rater banner"
                sx={{ paddingBottom: '25px' }}
            />
            {group_list.map((group, key) => (
                <Group key={key} img="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2944&q=80"
                    title="COMP 3975" description={group.description} id_value={group.id} />
            ))}
            {/* <Typography variant="h4" align="left">
                Peer Rater
            </Typography>
            <Typography variant="h11" align="left">
                Rate your team today! View how you performed for the project/work today
            </Typography> */}
        </div>
    </>
    );
}



export default GroupPage;