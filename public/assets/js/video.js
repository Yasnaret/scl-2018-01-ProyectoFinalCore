    let width = 250;
    let streaming = false;
    let data = '';
    let videoTracks = '';
    let canvas = '';

    function startup() {
        video = document.getElementById('video');
        canvas = document.getElementById('canvas');
        photo = document.getElementById('photo');
        startbutton = document.getElementById('startbutton');

        navigator.getMedia = (navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.msGetUserMedia);

        navigator.mediaDevices.getUserMedia({ video: true, audio: false })
            .then(function(stream) {
                video.srcObject = stream;
                video.play();
                videoTracks = stream.getVideoTracks();
            })
            .catch(function(err) {
                console.log("An error occurred! " + err);
            });

        video.addEventListener('canplay', function(ev) { //canplay: detector de eventos para cuando el video comienza a funcionar
            if (!streaming) {
                height = video.videoHeight / (video.videoWidth / width);
                video.setAttribute('width', width);
                video.setAttribute('height', height);
                canvas.setAttribute('width', width);
                canvas.setAttribute('height', height);
                streaming = true;
            }
        }, false);

        startbutton.addEventListener('click', function(ev) { //llamar a la función tomar foto
            takepicture();
            ev.preventDefault();
        }, false);

        clearphoto();
    }

    function clearphoto() { //limpiar el cuadro de foto
        let context = canvas.getContext('2d');
        //context.fillStyle = "#fff";
        //context.fillRect(0, 0, canvas.width, canvas.height);
        context.fillRect(0, 0, canvas.width, canvas.height);


        let data = canvas.toDataURL('image/png');
        photo.setAttribute('src', data);

        takepicture();
    }

    function takepicture() {

        let context = canvas.getContext('2d');
        context.drawImage(video, 0, 0, canvas.width, canvas.height); // dibujar el fotograma del video

        data = canvas.toDataURL('image/png'); //convertirla en formato PNG
        photo.setAttribute('src', data); //muestra la imagen

        videoTracks.forEach(function(track) { track.stop() });

        video.style = 'display: none'
            //canvas.style = 'display: block'

    };

    window.addEventListener('load', startup, false);

    function sendPhotoToStorage() {
        const photoFile = photo.files[0];
        const fileName = photoFile.name;
        const metadata = {
            contentType: photoFile.type
        };

        const task = firebase.storage().ref('images')
            .child(fileName)
            .put(photoFile, metadata);

        task.then(canvas => canvas.ref.getDownloadURL())
            .then(url => {
                urlPhoto = url
                console.log('URL del archivo > ' + url);
            });
    }