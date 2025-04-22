document.addEventListener("readystatechange",()=>{
    if(event.target.readyState == "complete") {
        console.log("complete");
        initApp();
    }
})


const initApp = ()=>{

    let currentMusic = 0;

    const music = document.querySelector("#audio");
    const tittle = document.querySelector("h2");
    const artist = document.querySelector("h3");
    const image = document.querySelector(".image");
    const seekBar = document.querySelector(".seek-bar");
    const currentTime = document.querySelector(".current-time");
    const songDuration = document.querySelector(".song-duration");
    const backwardBtn = document.querySelector(".backward-btn");
    const forwardBtn = document.querySelector(".forward-btn");
    const playBtn = document.querySelector(".play-btn");


    // song data

    const songs = [
        {
            name:"kathal Vaithu",
            artist:"Vijay Yesudas",
            imgPath:"image/kadhal.png",
            musicPath:"music/Kadhal-Vaithu.mp3"
        },
        {
            name:"Nenjil-Mamalai",
            artist:"Haricharan",
            imgPath:"image/nenjil.png",
            musicPath:"music/Nenjil-Mamazhai-Thanthu.mp3"
        },
        {
            name:"Orey Oru Vartaikaga",
            artist:"Devi Sri Prasad",
            imgPath:"image/oery-oru.png",
            musicPath:"music/Orey-Oru-Varthaikaga.mp3"
        },
        {
            name:"Oru Paarvaiyil",
            artist:"ranjith",
            imgPath:"image/oru-paarvaiyil.png",
            musicPath:"music/Oru-Paarvaiyil.mp3"
        },
        {
            name:"Para Para",
            artist:"N.R.Ragunathan",
            imgPath:"image/para.png",
            musicPath:"music/Para-Para.mp3"
        }
    ]

    
    // play and pause button functions

    playBtn.addEventListener("click",()=>{

        if(playBtn.className.includes("pause")){
            music.play()
        }else {
            music.pause()
        }
        playBtn.classList.toggle("pause-btn");
        image.classList.toggle("disk-rotate");
    });


    // set music 

    const setMusic = (i)=>{
        seekBar.value = 0;
        let song = songs[i];
        music.src = song.musicPath;
        tittle.textContent = song.name;
        artist.textContent =  song.artist;
        image.style.backgroundImage =   `url(${song.imgPath})`;
        currentMusic = i
        currentTime.textContent = "00:00";
    }
        
    // format time function 

    const formatTime = (time)=>{
        let min = Math.floor(time / 60);
        if(min < 10){
            min = `0${min}`;
        }
        let sec = Math.floor(time % 60);
        if (sec<10){
            sec = `0${sec}`
        }

        return `${min}:${sec}`
        
    }

    const playMusic = ()=>{
        music.play();
        playBtn.classList.remove("pause-btn");
        image.classList.add("disk-rotate");

    }

        
        // set song current  time

        setInterval(()=>{
            seekBar.value = music.currentTime;
            currentTime.textContent = formatTime(music.currentTime)
        },500)


        seekBar.addEventListener("change",()=>{
            music.currentTime = seekBar.value
        })


        // next song function 

        forwardBtn.addEventListener("click",()=>{
            if(currentMusic >= songs.length -1){
                currentMusic = 0;
            }else {
                currentMusic++;
                
            }
            setMusic(currentMusic);
            console.log(currentMusic)
            playMusic();
            console.log(music);
            setTimeout(() => {
                console.log(music.duration)
            }, 500);


            // set song duration 
        
            setTimeout(()=>{
            seekBar.max = music.duration;
            songDuration.textContent = formatTime(music.duration);
            console.log(music)
            
        },500)
            
            

        }) 

        // previous song function

            backwardBtn.addEventListener("click",()=>{
                if(currentMusic <= 0 ){
                    currentMusic = songs.length - 1;

                }
                else{
                    currentMusic--;
                }
                setMusic(currentMusic)
                console.log(currentMusic)
                playMusic()

                // set song duration

                setTimeout(()=>{
                    seekBar.max = music.duration;
                    songDuration.textContent = formatTime(music.duration);
                    console.log(music)
                    
                },300)
            })

            // set song duration

            setTimeout(()=>{
                seekBar.max = music.duration;
                songDuration.textContent = formatTime(music.duration);
                console.log(music)
                
            },300)
        
    

    setMusic(4)
    console.log(currentMusic)

    


    
}