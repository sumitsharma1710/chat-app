const socket = io();

const $messageForm = document.querySelector('#message-form');
const $messageInputForm = $messageForm.querySelector('input');
const $messagebuttonForm = $messageForm.querySelector('button');

socket.on('message', (msg)=>{
    console.log(msg);
});

document.querySelector('#message-form').addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = e.target.elements.message.value;
    socket.emit('sendMessage', message, (err)=>{
        if(err){
            return console.log(err);
        }
        console.log("Delivered Successfully!");
    });
});

document.querySelector('#curlocation').addEventListener('click',()=>{

    if(!navigator.geolocation){
        return alert('Geoloaction is not supported by you browser');
    }

    navigator.geolocation.getCurrentPosition((position)=>{
        socket.emit('sendLocation',{
            latitude : position.coords.latitude,
            longitude : position.coords.longitude
        }, ()=>{
            console.log("Location Shared!");
        });
    })
});
